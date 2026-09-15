/**
 * Abstract navigation-instrument backdrop for the holding page.
 * All geometry is derived at module scope from fixed constants, so the server
 * and client render byte-identical markup (no hydration mismatch, no effects).
 */

const pt = (cx: number, cy: number, r: number, deg: number) => {
  const t = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as const;
};
const f = (n: number) => n.toFixed(1);

/* ---- starfield ---- */
const STARS = (() => {
  let seed = 20260915;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: 54 }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 0.8 + rnd() * 1.5,
    o: 0.1 + rnd() * 0.32,
  }));
})();

/* ---- altitude limb: centre off-canvas left, arc bulges right ---- */
const R = 498;
const CX = 120 - R;
const CY = 520;
const ALT_A = pt(CX, CY, R, 44);
const ALT_B = pt(CX, CY, R, 136);
const ALT_TICKS = Array.from({ length: 46 }, (_, i) => {
  const alt = i * 2;
  const d = -46 + alt * (92 / 90);
  const major = alt % 10 === 0;
  const [x1, y1] = pt(CX, CY, R, 90 + d);
  const [x2, y2] = pt(CX, CY, R - (major ? 26 : 11), 90 + d);
  const [lx, ly] = pt(CX, CY, R - 48, 90 + d);
  return { alt, major, x1, y1, x2, y2, lx, ly };
});
const SWEEP_A = pt(CX, CY, R + 14, 90);
const SWEEP_B = pt(CX, CY, R - 78, 90);

/* ---- azimuth limb: centre off-canvas right, arc bulges left ---- */
const AR = 430;
const ZCX = AR;
const ZCY = 450;
const AZI_A = pt(ZCX, ZCY, AR, 224);
const AZI_B = pt(ZCX, ZCY, AR, 316);
const IR = AR - 62;
const AZI_IA = pt(ZCX, ZCY, IR, 228);
const AZI_IB = pt(ZCX, ZCY, IR, 312);
const AZI_TICKS = Array.from({ length: 31 }, (_, i) => {
  const a = -46 + i * 3;
  const major = a % 12 === 0;
  const [x1, y1] = pt(ZCX, ZCY, AR, 270 + a);
  const [x2, y2] = pt(ZCX, ZCY, AR - (major ? 24 : 10), 270 + a);
  const [lx, ly] = pt(ZCX, ZCY, AR - 42, 270 + a);
  const label = String((a * 2 + 118 + 360) % 360).padStart(3, "0");
  return { a, major, x1, y1, x2, y2, lx, ly, label };
});

export default function InstrumentBackdrop() {
  return (
    <>
      <div className="glow" aria-hidden />

      <div className="stars" aria-hidden>
        {STARS.map((s, i) => (
          <i
            key={i}
            style={{
              left: `${s.x.toFixed(2)}%`,
              top: `${s.y.toFixed(2)}%`,
              width: `${s.s.toFixed(2)}px`,
              height: `${s.s.toFixed(2)}px`,
              opacity: Number(s.o.toFixed(2)),
            }}
          />
        ))}
      </div>

      <div className="frag frag-alt" aria-hidden>
        <svg width="200" height="1040" viewBox="0 0 200 1040">
          <path
            className="hair"
            opacity=".5"
            d={`M ${f(ALT_A[0])} ${f(ALT_A[1])} A ${R} ${R} 0 0 1 ${f(ALT_B[0])} ${f(ALT_B[1])}`}
          />
          {ALT_TICKS.map((t) => (
            <g key={t.alt}>
              <line
                className="hair"
                opacity={t.major ? ".6" : ".26"}
                x1={f(t.x1)}
                y1={f(t.y1)}
                x2={f(t.x2)}
                y2={f(t.y2)}
              />
              {t.major ? (
                <text
                  x={f(t.lx)}
                  y={f(t.ly + 4)}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  opacity=".4"
                >
                  {`${String(t.alt).padStart(2, "0")}°`}
                </text>
              ) : null}
            </g>
          ))}
          <g
            className="sweep"
            style={{ transformOrigin: `${f(CX)}px ${f(CY)}px` }}
          >
            <line
              className="hair"
              opacity=".85"
              x1={f(SWEEP_A[0])}
              y1={f(SWEEP_A[1])}
              x2={f(SWEEP_B[0])}
              y2={f(SWEEP_B[1])}
            />
            <circle
              cx={f(SWEEP_B[0])}
              cy={f(SWEEP_B[1])}
              r="3"
              fill="currentColor"
              opacity=".8"
            />
          </g>
          <text
            x="26"
            y="128"
            fontSize="9"
            fill="currentColor"
            opacity=".42"
            letterSpacing=".32em"
          >
            ALTITUDE
          </text>
        </svg>
      </div>

      <div className="frag frag-azi" aria-hidden>
        <svg width="200" height="900" viewBox="0 0 200 900">
          <path
            className="hair"
            opacity=".45"
            d={`M ${f(AZI_A[0])} ${f(AZI_A[1])} A ${AR} ${AR} 0 0 1 ${f(AZI_B[0])} ${f(AZI_B[1])}`}
          />
          <path
            className="hair"
            opacity=".2"
            d={`M ${f(AZI_IA[0])} ${f(AZI_IA[1])} A ${IR} ${IR} 0 0 1 ${f(AZI_IB[0])} ${f(AZI_IB[1])}`}
          />
          {AZI_TICKS.map((t) => (
            <g key={t.a}>
              <line
                className="hair"
                opacity={t.major ? ".55" : ".22"}
                x1={f(t.x1)}
                y1={f(t.y1)}
                x2={f(t.x2)}
                y2={f(t.y2)}
              />
              {t.major ? (
                <text
                  x={f(t.lx)}
                  y={f(t.ly + 4)}
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                  opacity=".36"
                >
                  {t.label}
                </text>
              ) : null}
            </g>
          ))}
          <text
            x="6"
            y="104"
            fontSize="9"
            fill="currentColor"
            opacity=".42"
            letterSpacing=".32em"
          >
            AZIMUTH
          </text>
        </svg>
      </div>
    </>
  );
}
