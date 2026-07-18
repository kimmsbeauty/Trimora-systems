// Extracted from pos-deep-dive.jsx (2026-07-18) so it can be reused by
// auto-deep-dive.jsx too -- same window-chrome mockup frame, one source
// of truth for the visual pattern, so Beauty and Auto feature showcases
// stay visually consistent by construction, not by convention.
export function MockupFrame({ label, icon: Icon, children }) {
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="rounded-xl border border-rule bg-paper-2 shadow-xl shadow-black/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-rule">
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] font-mono text-ink-soft">
            <Icon size={12} aria-hidden="true" />
            {label}
          </span>
        </div>
        <div className="p-5">{children}</div>
      </div>
      <p className="mt-3 text-center lg:text-left text-[11px] font-mono text-ink-soft">
        Illustrative preview
      </p>
    </div>
  );
}
