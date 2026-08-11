const placeholderCards = [
  { title: "Placeholder heading", text: "Add a short description or supporting detail here." },
  { title: "Another section", text: "This card is intentionally generic for layout testing." },
  { title: "One more item", text: "Replace this text with real content when it is ready." },
];

export default function PlaceholderPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Test page
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          A random page with placeholder content.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. This page is
          here so you can test the pull request and make sure the route renders
          as expected.
        </p>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {placeholderCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{card.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Placeholder callout</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Nulla facilisi. Use this space to check spacing, typography,
            responsive behaviour, or anything else needed for review.
          </p>
          <button
            type="button"
            className="mt-6 rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Placeholder action
          </button>
        </section>
      </div>
    </main>
  );
}
