"use client";

import { useEffect, useState } from "react";

const CELLS: [string, string][] = [
  ["Body", "Sun LL"],
  ["GHA", "214° 18.6′"],
  ["Dec", "N 03° 41.2′"],
  ["Hc", "42° 07.9′"],
  ["Zn", "118.4°"],
];

const p2 = (n: number) => String(n).padStart(2, "0");

export default function ReductionStrip() {
  const [utc, setUtc] = useState("00 00 00");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setUtc(
        `${p2(n.getUTCHours())} ${p2(n.getUTCMinutes())} ${p2(n.getUTCSeconds())}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="strip" aria-hidden>
      <div className="strip-inner">
        {CELLS.map(([k, v]) => (
          <div className="cell" key={k}>
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </div>
        ))}
        <div className="cell">
          <span className="k">UTC</span>
          <span className="v" suppressHydrationWarning>
            {utc}
          </span>
        </div>
      </div>
    </div>
  );
}
