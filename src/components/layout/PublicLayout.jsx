import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'
import ScrollToTop from './ScrollToTop'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col overflow-x-clip">
      <ScrollToTop />
      <Header />
      <main className="flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
