import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Comparison from "@/components/landing/comparison";
import DemoSection from "@/components/landing/demo-section";
import About from "@/components/landing/about";
import Footer from "@/components/landing/footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <Comparison />
      <DemoSection />
      <About />
      <Footer />

      {/* Floating Chatbot */}
      <ChatWidget />
    </main>
  );
}
