const skillGroups = [
  {
    title: 'Manual QA',
    points: [
      'Exploratory, regression, and acceptance testing across web and API surfaces',
      'Test planning, traceability, and clear bug reports with crisp reproduction steps',
      'Risk-based prioritization and collaboration with dev and product from design to release',
    ],
  },
  {
    title: 'Test automation',
    points: [
      'End-to-end UI flows with Playwright and Python, including stable selectors and CI integration',
      'Maintainable suites: fixtures, parametrization, parallel runs, and actionable failure output',
      'API checks, data setup/teardown, and bridging manual edge cases into automated coverage',
    ],
  },
]

const stack = [
  'Python',
  'Playwright',
  'pytest',
  'CI/CD',
  'REST APIs',
  'Git',
  'Agile / Scrum',
]

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">
          Introduction
        </p>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Masud Rana
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-base-content mb-2">
          QA Engineer
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-base-200 border border-base-300 px-4 py-1.5 text-sm text-base-content/80">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
          5+ years across manual testing and test automation
        </div>
      </header>

      <section className="card bg-base-200 border border-base-300 shadow-sm mb-8">
        <div className="card-body">
          <h2 className="card-title text-lg">About</h2>
          <p className="text-base-content/80 leading-relaxed">
            I am a QA engineer with about five years of experience delivering quality software in
            fast-moving teams. I am comfortable owning quality from requirements through release:
            clarifying acceptance criteria, finding issues early with manual exploration, and keeping
            regression fast and trustworthy with automation. My automation work is centered on
            Python and Playwright—building reliable UI checks, integrating them into pipelines, and
            making failures easy to diagnose—while still knowing when hands-on manual testing is
            the right tool.
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {skillGroups.map(({ title, points }) => (
          <section
            key={title}
            className="card bg-base-200 border border-base-300 shadow-sm h-full"
          >
            <div className="card-body">
              <h2 className="card-title text-lg">{title}</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-base-content/80">
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-lg">Tools & practices</h2>
          <p className="text-sm text-base-content/70 mb-4">
            A practical mix I use day to day; always learning adjacent tools where the team needs
            them.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((label) => (
              <span
                key={label}
                className="badge badge-lg badge-outline border-primary/40 text-base-content"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
