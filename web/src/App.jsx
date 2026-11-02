import { Route, Routes } from 'react-router-dom'
import SmoothScroll from './fx/SmoothScroll.jsx'
import ScrollManager from './fx/ScrollManager.jsx'
import Nav from './sections/Nav.jsx'
import Footer from './sections/Footer.jsx'
import { SocialDock } from './sections/Social.jsx'
import Home from './pages/Home.jsx'
import PlayerProfilePage from './pages/PlayerProfilePage.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <ScrollManager />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <SocialDock />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil-jugador" element={<PlayerProfilePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
