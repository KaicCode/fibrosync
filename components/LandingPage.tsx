"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { SolutionSection } from "@/components/landing/SolutionSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { DemoSection } from "@/components/landing/DemoSection"
import { BenefitsSection } from "@/components/landing/BenefitsSection"
import { CTASection } from "@/components/landing/CTASection"
import { Footer } from "@/components/landing/Footer"
import { WaitlistModal } from "@/components/landing/WaitlistModal"

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen font-sans" style={{ background: "var(--background)" }}>
      <Navbar onCTAClick={() => setModalOpen(true)} />
      <main>
        <HeroSection onCTAClick={() => setModalOpen(true)} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DemoSection />
        <BenefitsSection />
        <CTASection onCTAClick={() => setModalOpen(true)} />
      </main>
      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
