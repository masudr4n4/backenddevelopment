import { Link } from 'react-router-dom'

const sections = [
  { path: '/profile', title: 'Profile', desc: 'View your profile and bio.' },
  { path: '/info-board', title: 'Info Board', desc: 'Dashboard and information board.' },
  { path: '/tic-tac-toe', title: 'Tic Tac Toe', desc: 'Play a game of Tic Tac Toe.' },
  { path: '/calculator', title: 'Investment Calculator', desc: 'Calculate investment returns.' },
  { path: '/timer', title: 'Timer Challenge', desc: 'Time-based challenges.' },
  { path: '/login', title: 'Login', desc: 'Sign in to your account.' },
  { path: '/todos', title: 'Todos', desc: 'Create and manage your todos.' },
]

export default function Home() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        Welcome to Todo App
      </h1>
      <p className="text-base-content/70 text-center max-w-md mb-10">
        Use the navigation bar above to open each section, or pick one below.
      </p>
      <div className="grid gap-4 w-full max-w-xl">
        {sections.map(({ path, title, desc }) => (
          <Link
            key={path}
            to={path}
            className="card bg-base-200 hover:bg-base-300 shadow hover:shadow-md transition-all border border-base-300 hover:border-primary/30"
          >
            <div className="card-body py-4 px-6 flex-row items-center justify-between">
              <div>
                <h2 className="card-title text-lg">{title}</h2>
                <p className="text-sm text-base-content/70">{desc}</p>
              </div>
              <span className="text-primary">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
