import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import RoadmapPreview from "@/components/landing/RoadmapPreview";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <RoadmapPreview />
      </main>
    </>
  );
}