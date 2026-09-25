import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFoundPage() {
  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />
      <div className="container" style={{ padding: '10rem 0 6rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Page not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>← Back to Home</Link>
      </div>
      <Footer />
    </div>
  )
}
