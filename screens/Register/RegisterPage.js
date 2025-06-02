import RegisterForm from "./components/RegisterForm"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
} 