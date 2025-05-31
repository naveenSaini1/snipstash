import LoginForm from "./components/LoginForm"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
} 