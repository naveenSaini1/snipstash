import { HeroSection, FeaturesSection } from "./components"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}   