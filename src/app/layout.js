import "./globals.css";
import Navbar from "@/components/landing/Navbar.jsx";

export const metadata = {
  title: "RoadmapAI — Your Personalized Roadmap",
  description: "Create personalized career and skill roadmaps powered by AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
