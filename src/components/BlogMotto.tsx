"use client";

import { useState } from "react";

export default function BlogMotto() {
  const [dancing, setDancing] = useState(false);

  return (
    <button
      type="button"
      className={`blog-motto${dancing ? " blog-motto--dancing" : ""}`}
      lang="en"
      onClick={() => setDancing((value) => !value)}
      aria-pressed={dancing}
      aria-label={
        dancing
          ? "you can start up nav, hide dancer"
          : "you can start up nav"
      }
    >
      <span>
        you can <em>start</em> up nav!
      </span>
      {dancing ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/dancing-0282.gif"
          alt=""
          className="blog-motto-gif"
        />
      ) : null}
    </button>
  );
}
