import { Link } from 'react-router-dom'
import '../css/Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>🎭 Centro de Eventos</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Eventos</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Centro de Eventos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
