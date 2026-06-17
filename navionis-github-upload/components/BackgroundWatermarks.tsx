export default function BackgroundWatermarks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Nautical chart grid */}
      <svg
        className="absolute inset-0 h-full w-full text-brass/[0.045]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="chart-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M 40 0 L 40 80 M 0 40 L 80 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.25"
              opacity="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chart-grid)" />
        {/* Faint chart contour lines */}
        <path
          d="M -5% 22% Q 18% 18%, 35% 24% T 62% 20% T 105% 26%"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.35"
        />
        <path
          d="M -5% 48% Q 22% 44%, 40% 50% T 68% 46% T 105% 52%"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.25"
        />
        <path
          d="M -5% 74% Q 15% 70%, 32% 76% T 58% 72% T 105% 78%"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.2"
        />
        {/* Depth soundings */}
        <text x="12%" y="28%" fill="currentColor" fontSize="10" opacity="0.4">
          24
        </text>
        <text x="48%" y="42%" fill="currentColor" fontSize="10" opacity="0.35">
          18
        </text>
        <text x="78%" y="58%" fill="currentColor" fontSize="10" opacity="0.3">
          32
        </text>
        <text x="28%" y="68%" fill="currentColor" fontSize="10" opacity="0.25">
          12
        </text>
      </svg>
    </div>
  );
}
