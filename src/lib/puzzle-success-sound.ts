type Tone = {
  frequency: number;
  durationMs: number;
  delay: number;
  volume: number;
};

const TONES: Tone[] = [
  { frequency: 523.25, durationMs: 220, delay: 0, volume: 0.35 },
  { frequency: 659.25, durationMs: 260, delay: 90, volume: 0.35 },
  { frequency: 783.99, durationMs: 340, delay: 180, volume: 0.28 },
];

function encodeWav(frequency: number, durationMs: number, volume: number) {
  const sampleRate = 44100;
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  const dataSize = numSamples * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  for (let i = 0; i < numSamples; i += 1) {
    const t = i / sampleRate;
    const attack = Math.min(1, i / (sampleRate * 0.012));
    const release = Math.max(0, 1 - i / numSamples);
    const envelope = attack * release;
    const sample =
      Math.sin(2 * Math.PI * frequency * t) * envelope * volume;
    view.setInt16(44 + i * 2, sample * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return `data:audio/wav;base64,${window.btoa(binary)}`;
}

let primed = false;
const audioElements: HTMLAudioElement[] = [];

export function primePuzzleSuccessSound() {
  if (primed || typeof window === "undefined") return;

  primed = true;

  for (const tone of TONES) {
    const audio = new Audio(encodeWav(tone.frequency, tone.durationMs, tone.volume));
    audio.preload = "auto";
    audioElements.push(audio);
  }

  const unlock = audioElements[0];
  if (!unlock) return;

  unlock.volume = 0.001;
  void unlock
    .play()
    .then(() => {
      unlock.pause();
      unlock.currentTime = 0;
      unlock.volume = 1;
    })
    .catch(() => {
      unlock.volume = 1;
    });
}

export function playPuzzleSuccessSound() {
  if (typeof window === "undefined") return;

  try {
    primePuzzleSuccessSound();

    TONES.forEach((tone, index) => {
      window.setTimeout(() => {
        const audio = audioElements[index];
        if (!audio) return;
        audio.currentTime = 0;
        void audio.play().catch(() => {
          // Browser blocked playback — ignore silently.
        });
      }, tone.delay);
    });
  } catch {
    // Audio unavailable — ignore silently.
  }
}

function computePlacedSlots(
  current: [string | null, string | null],
  wordId: string,
  slotIndex: 0 | 1,
  source: {
    wordId: string;
    from: "bank" | "slot";
    slotIndex?: 0 | 1;
  } | null,
): [string | null, string | null] | null {
  const next: [string | null, string | null] = [...current];
  const displaced = next[slotIndex];

  if (source?.from === "slot" && source.slotIndex !== undefined) {
    if (source.slotIndex === slotIndex && source.wordId === wordId) {
      return null;
    }
    next[source.slotIndex] = displaced;
  }

  next[slotIndex] = wordId;
  return next;
}

export function willSolvePuzzle(
  current: [string | null, string | null],
  wordId: string,
  slotIndex: 0 | 1,
  source: {
    wordId: string;
    from: "bank" | "slot";
    slotIndex?: 0 | 1;
  } | null,
) {
  const next = computePlacedSlots(current, wordId, slotIndex, source);
  if (!next) return false;
  return (
    next[0] === "talent" &&
    next[1] === "preparation" &&
    !(current[0] === "talent" && current[1] === "preparation")
  );
}
