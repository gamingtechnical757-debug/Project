import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServerStatusSection } from "./components/ServerStatusSection";
import {
  AllRealmBanners,
  GameModesOverviewSection,
} from "./components/GameModesSection";
import { StoreSection } from "./components/StoreSection";
import { RulesSection } from "./components/RulesSection";
import { CommunityReviewsSection } from "./components/CommunityReviewsSection";
import { FeaturedCreatorsSection } from "./components/FeaturedCreatorsSection";
import { CommunitySocialSection } from "./components/CommunitySocialSection";
import { Footer } from "./components/Footer";
import { JoinModal } from "./components/JoinModal";
import { useServerStatus } from "./hooks/useServerStatus";

export default function App() {
  const { status, isLoading, isRefreshing, refreshNow } = useServerStatus();
  const [joinEdition, setJoinEdition] = useState<"java" | "bedrock" | null>(
    null
  );

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection
          status={status}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={refreshNow}
          onJoinPrompt={setJoinEdition}
        />

        <ServerStatusSection
          status={status}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={refreshNow}
          onJoinPrompt={setJoinEdition}
        />

        <GameModesOverviewSection />

        <StoreSection />

        <AllRealmBanners />

        <RulesSection />

        <CommunityReviewsSection />

        <FeaturedCreatorsSection />

        <CommunitySocialSection />
      </main>

      <Footer />

      <JoinModal edition={joinEdition} onClose={() => setJoinEdition(null)} />
    </div>
  );
}
