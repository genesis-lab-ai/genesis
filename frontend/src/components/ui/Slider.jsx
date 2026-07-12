/**
 * Slider — styled range input. Native <input type="range"> under the
 * hood (not a custom pointer-drag implementation) so keyboard control,
 * screen readers, and focus states all work for free.
 */
export default function Slider({ label, value, min = 0, max = 100, step = 1, unit = "", onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="font-mono text-xs text-text-primary tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        style={{
          background: `linear-gradient(90deg, var(--color-accent) ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
        }}
      />
    </div>
  );
}
