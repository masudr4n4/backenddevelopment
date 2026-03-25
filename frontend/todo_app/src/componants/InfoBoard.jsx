import { useState } from 'react'

const skills = {
  Python: {
    headline: 'Automation, scripting, and API-focused testing',
    summary:
      'Python is my primary language for test automation and small tools that keep feedback loops short.',
    bullets: [
      'E2E UI automation with Playwright and pytest: stable locators, fixtures, and parallel runs',
      'HTTP checks and contract-style tests against REST APIs (status, payloads, error paths)',
      'Helper scripts for test data, environment setup, and turning one-off manual checks into reusable code',
    ],
  },
  JavaScript: {
    headline: 'Front-end context for smarter UI testing',
    summary:
      'Enough JavaScript to pair effectively with developers and debug what breaks in the browser.',
    bullets: [
      'Reading React/component-style UIs to choose maintainable selectors and avoid brittle tests',
      'Browser DevTools for network, console, and performance clues during investigation',
      'Comfortable navigating npm-based projects and CI steps that run JS test runners',
    ],
  },
  Java: {
    headline: 'Enterprise stacks and service boundaries',
    summary:
      'Experience testing and integrating systems where Java powers APIs or background jobs.',
    bullets: [
      'Validating behaviour across services: happy path, auth, idempotency, and failure handling',
      'Working from OpenAPI/Swagger or similar specs to design negative and boundary cases',
      'Collaborating with teams on build pipelines, environments, and release checkpoints',
    ],
  },
  SQL: {
    headline: 'Data confidence behind every scenario',
    summary:
      'SQL helps me verify outcomes, seed state, and question assumptions when specs are fuzzy.',
    bullets: [
      'SELECTs with joins and filters to confirm side effects after UI or API actions',
      'Sanity checks on migrations, constraints, and reporting logic testers care about',
      'Minimal, intentional test data—clear setup and teardown so suites stay reproducible',
    ],
  },
  'QA & testing': {
    headline: 'Quality as a practice, not a phase',
    summary:
      'About five years balancing manual depth with automation that earns trust in CI.',
    bullets: [
      'Exploratory and regression testing with clear, reproducible bug reports',
      'Test strategy: what to automate first, what stays human, and how to measure coverage',
      'Playwright + Python in pipelines; flaky-test triage; fast feedback for the team',
    ],
  },
}

const skillKeys = Object.keys(skills)

function SkillTab({ label, isSelected, onSelect }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`btn btn-sm md:btn-md flex-1 md:flex-none rounded-lg whitespace-nowrap ${
        isSelected ? 'btn-primary' : 'btn-outline border-base-300'
      }`}
      onClick={onSelect}
    >
      {label}
    </button>
  )
}

export default function InfoBoard() {
  const [selectedSkill, setSelectedSkill] = useState(skillKeys[0])
  const current = skills[selectedSkill]

  return (
    <div className="w-full">
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="tablist"
        aria-label="Technical areas"
      >
        {skillKeys.map((key) => (
          <SkillTab
            key={key}
            label={key}
            isSelected={key === selectedSkill}
            onSelect={() => setSelectedSkill(key)}
          />
        ))}
      </div>

      <div
        role="tabpanel"
        aria-label={selectedSkill}
        className="card bg-base-200 border border-base-300 shadow-sm"
      >
        <div className="card-body gap-4">
          <div>
            <h3 className="text-xl font-semibold text-base-content">{selectedSkill}</h3>
            <p className="text-primary font-medium mt-1">{current.headline}</p>
          </div>
          <p className="text-base-content/80 leading-relaxed">{current.summary}</p>
          <ul className="space-y-2 text-sm text-base-content/80">
            {current.bullets.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-primary shrink-0" aria-hidden>
                  ·
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
