"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  playPuzzleSuccessSound,
  primePuzzleSuccessSound,
  willSolvePuzzle,
} from "@/lib/puzzle-success-sound";

type Word = {
  id: string;
  text: string;
  correctSlot?: 0 | 1;
};

type DragSource = {
  wordId: string;
  from: "bank" | "slot";
  slotIndex?: 0 | 1;
};

const WORDS: Word[] = [
  { id: "talent", text: "talent", correctSlot: 0 },
  { id: "preparation", text: "preparation", correctSlot: 1 },
  { id: "sugar-cube", text: "sugar cube" },
  { id: "tea", text: "tea" },
  { id: "luck", text: "luck" },
  { id: "caffeine", text: "caffeine" },
  { id: "hype", text: "hype" },
  { id: "pivot", text: "pivot" },
];

const DRAG_THRESHOLD = 6;

function isPuzzleSolved(slots: [string | null, string | null]) {
  return slots[0] === "talent" && slots[1] === "preparation";
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function PuzzleWord({ text }: { text: string }) {
  return <span className="quote-puzzle-word">{text}</span>;
}

function WordChip({
  word,
  location,
  slotIndex,
  isDraggingSource,
  onPointerPick,
  onClick,
}: {
  word: Word;
  location: "bank" | "slot";
  slotIndex?: 0 | 1;
  isDraggingSource?: boolean;
  onPointerPick: (source: DragSource, event: ReactPointerEvent) => void;
  onClick?: () => void;
}) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  return (
    <button
      type="button"
      onPointerDown={(event) => {
        // Mobilde drag sırasında tarayıcının scroll/tap davranışını bloke et.
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        startRef.current = { x: event.clientX, y: event.clientY };
        onPointerPick(
          { wordId: word.id, from: location, slotIndex },
          event,
        );
      }}
      onPointerUp={(event) => {
        const start = startRef.current;
        startRef.current = null;
        if (!start || !onClick) return;

        const moved = Math.hypot(
          event.clientX - start.x,
          event.clientY - start.y,
        );
        if (moved < DRAG_THRESHOLD) onClick();
      }}
      className={`quote-puzzle-chip${
        isDraggingSource ? " quote-puzzle-chip--source" : ""
      }${
        location === "slot" && word.correctSlot === slotIndex
          ? " quote-puzzle-chip--correct"
          : location === "slot" && word.correctSlot !== slotIndex
            ? " quote-puzzle-chip--wrong"
            : ""
      }`}
    >
      {word.text}
    </button>
  );
}

export default function QuotePuzzle() {
  const wordMap = useMemo(
    () => new Map(WORDS.map((word) => [word.id, word])),
    [],
  );

  const [bankIds, setBankIds] = useState(() =>
    WORDS.map((word) => word.id),
  );

  useEffect(() => {
    setBankIds(shuffle(WORDS.map((word) => word.id)));
  }, []);
  const [slots, setSlots] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  // Mobilde widget kalabalık yapmasın diye kapalı başlatıyoruz.
  // Masaüstünde ise mount sonrası açıyoruz.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 859px)").matches;
    setOpen(!isMobile);
  }, []);
  const [drag, setDrag] = useState<DragSource | null>(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });
  const dragSourceRef = useRef<DragSource | null>(null);
  const dragMovedRef = useRef(false);

  const placeWord = useCallback((wordId: string, slotIndex: 0 | 1) => {
    const source = dragSourceRef.current;

    setSlots((current) => {
      const next: [string | null, string | null] = [...current];
      const displaced = next[slotIndex];

      if (source?.from === "slot" && source.slotIndex !== undefined) {
        if (source.slotIndex === slotIndex && source.wordId === wordId) {
          return current;
        }
        next[source.slotIndex] = displaced;
      } else if (displaced && displaced !== wordId) {
        setBankIds((bank) =>
          bank.includes(displaced) ? bank : [...bank, displaced],
        );
      }

      next[slotIndex] = wordId;
      return next;
    });

    setBankIds((bank) => bank.filter((id) => id !== wordId));
    dragSourceRef.current = null;
  }, []);

  const returnToBank = useCallback((wordId: string, slotIndex?: 0 | 1) => {
    if (slotIndex !== undefined) {
      setSlots((current) => {
        const next: [string | null, string | null] = [...current];
        if (next[slotIndex] === wordId) next[slotIndex] = null;
        return next;
      });
    }

    setBankIds((bank) => (bank.includes(wordId) ? bank : [...bank, wordId]));
    dragSourceRef.current = null;
  }, []);

  const finishDrag = useCallback(
    (clientX: number, clientY: number) => {
      const source = dragSourceRef.current;
      if (!source || !dragMovedRef.current) {
        dragSourceRef.current = null;
        setDrag(null);
        return;
      }

      const dropTarget = document
        .elementFromPoint(clientX, clientY)
        ?.closest<HTMLElement>("[data-puzzle-drop]");

      const dropKind = dropTarget?.dataset.puzzleDrop;

      if (dropKind === "slot-0") {
        if (
          willSolvePuzzle(slots, source.wordId, 0, source)
        ) {
          playPuzzleSuccessSound();
        }
        placeWord(source.wordId, 0);
      } else if (dropKind === "slot-1") {
        if (
          willSolvePuzzle(slots, source.wordId, 1, source)
        ) {
          playPuzzleSuccessSound();
        }
        placeWord(source.wordId, 1);
      } else if (dropKind === "bank") {
        const fromSlot = slots.findIndex((id) => id === source.wordId);
        returnToBank(
          source.wordId,
          fromSlot >= 0 ? (fromSlot as 0 | 1) : undefined,
        );
      } else {
        dragSourceRef.current = null;
      }

      setDrag(null);
      dragMovedRef.current = false;
    },
    [placeWord, returnToBank, slots],
  );

  useEffect(() => {
    if (!drag) return undefined;

    const onPointerMove = (event: PointerEvent) => {
      dragMovedRef.current = true;
      setGhostPos({ x: event.clientX, y: event.clientY });
    };

    const onPointerUp = (event: PointerEvent) => {
      finishDrag(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [drag, finishDrag]);

  const handlePointerPick = useCallback(
    (source: DragSource, event: ReactPointerEvent) => {
      primePuzzleSuccessSound();
      dragSourceRef.current = source;
      dragMovedRef.current = false;
      setGhostPos({ x: event.clientX, y: event.clientY });
      setDrag(source);
    },
    [],
  );

  const solved = isPuzzleSolved(slots);
  const ghostWord = drag ? wordMap.get(drag.wordId) : undefined;

  return (
    <aside
      className={`quote-puzzle${drag ? " quote-puzzle--dragging" : ""}${
        open ? "" : " quote-puzzle--closed"
      }`}
      aria-label="Malcolm Gladwell alıntısı bulmacası"
    >
      {open ? (
      <div className="quote-puzzle-panel">
        <div className="quote-puzzle-board">
          <div className="quote-puzzle-line quote-puzzle-line--static">
            <PuzzleWord text="achievement" />
          </div>
          <div className="quote-puzzle-line quote-puzzle-line--static">
            <PuzzleWord text="is" />
          </div>
          <div className="quote-puzzle-line quote-puzzle-line--slot">
            <DropSlot
              slotIndex={0}
              placeholderLength={6}
              word={slots[0] ? wordMap.get(slots[0]) : undefined}
              draggingWordId={drag?.wordId}
              onClear={(wordId) => returnToBank(wordId, 0)}
              onPointerPick={handlePointerPick}
            />
          </div>
          <div className="quote-puzzle-line quote-puzzle-line--static">
            <PuzzleWord text="plus" />
          </div>
          <div className="quote-puzzle-line quote-puzzle-line--slot">
            <DropSlot
              slotIndex={1}
              placeholderLength={11}
              word={slots[1] ? wordMap.get(slots[1]) : undefined}
              draggingWordId={drag?.wordId}
              onClear={(wordId) => returnToBank(wordId, 1)}
              onPointerPick={handlePointerPick}
            />
          </div>
        </div>

        <div className="quote-puzzle-bank" data-puzzle-drop="bank">
          <p className="quote-puzzle-bank-label">kelimeler</p>
          <div className="quote-puzzle-bank-words">
            {bankIds.map((wordId) => {
              const word = wordMap.get(wordId);
              if (!word) return null;
              return (
                <WordChip
                  key={word.id}
                  word={word}
                  location="bank"
                  isDraggingSource={drag?.wordId === word.id}
                  onPointerPick={handlePointerPick}
                />
              );
            })}
          </div>
        </div>

        <footer className="quote-puzzle-footer">
          {solved ? (
            <>
              <span className="quote-puzzle-solved">✓</span>
              — Malcolm Gladwell, <cite lang="en">Outliers</cite>
            </>
          ) : (
            <span className="quote-puzzle-hint">boşlukları doldur</span>
          )}
        </footer>
      </div>
      ) : null}

      <button
        type="button"
        className="quote-puzzle-sticker-btn"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Bulmacayı kapat" : "Bulmacayı aç"}
      >
        <img
          src="/sticker_n.png"
          alt=""
          className="quote-puzzle-sticker"
          draggable={false}
        />
      </button>

      {drag && ghostWord ? (
        <span
          className="quote-puzzle-ghost"
          style={
            {
              left: ghostPos.x,
              top: ghostPos.y,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          {ghostWord.text}
        </span>
      ) : null}
    </aside>
  );
}

function DropSlot({
  slotIndex,
  placeholderLength,
  word,
  draggingWordId,
  onClear,
  onPointerPick,
}: {
  slotIndex: 0 | 1;
  placeholderLength: number;
  word?: Word;
  draggingWordId?: string;
  onClear: (wordId: string) => void;
  onPointerPick: (source: DragSource, event: ReactPointerEvent) => void;
}) {
  return (
    <span
      className={`quote-puzzle-slot${word ? " quote-puzzle-slot--filled" : ""}`}
      data-puzzle-drop={`slot-${slotIndex}`}
      style={
        word
          ? undefined
          : ({ "--slot-chars": placeholderLength } as CSSProperties)
      }
    >
      {word ? (
        <WordChip
          word={word}
          location="slot"
          slotIndex={slotIndex}
          isDraggingSource={draggingWordId === word.id}
          onPointerPick={onPointerPick}
          onClick={() => onClear(word.id)}
        />
      ) : (
        <span className="quote-puzzle-slot-empty" aria-hidden="true" />
      )}
    </span>
  );
}
