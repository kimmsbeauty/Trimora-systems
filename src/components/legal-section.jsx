export function LegalSection({ heading, body, list, subsections, footnote }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl text-text mb-3">{heading}</h2>
      {body?.map((paragraph, i) => (
        <p key={i} className="text-text-dim leading-relaxed mb-3">
          {paragraph}
        </p>
      ))}
      {list && (
        <ul className="list-disc pl-6 space-y-1.5 mb-3">
          {list.map((item, i) => (
            <li key={i} className="text-text-dim leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )}
      {subsections?.map((sub, i) => (
        <div key={i} className="mb-4">
          <h3 className="text-sm font-semibold text-gold-400 mb-1.5">{sub.label}</h3>
          {sub.body?.map((paragraph, j) => (
            <p key={j} className="text-text-dim leading-relaxed">
              {paragraph}
            </p>
          ))}
          {sub.list && (
            <ul className="list-disc pl-6 space-y-1 mt-1">
              {sub.list.map((item, j) => (
                <li key={j} className="text-text-dim leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {footnote && <p className="text-text-faint text-sm italic">{footnote}</p>}
    </section>
  );
}

export function LegalDocLayout({ title, effectiveDate, children }) {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl sm:text-4xl text-text mb-2">{title}</h1>
        <p className="text-text-faint text-sm mb-1">Trimora Systems Limited</p>
        <p className="text-text-faint text-sm mb-12">
          Effective Date: {effectiveDate} · Last Updated: {effectiveDate}
        </p>
        {children}
      </div>
    </main>
  );
}
