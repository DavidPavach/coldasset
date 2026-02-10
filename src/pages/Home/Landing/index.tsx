// Components
import AssetsSection from "./Assets";
import DownloadSection from "./Download";
import FeaturesSection from "./Features";
import HeroSection from "./HeroSection";
import SecuritySection from "./Security";
import StatsSection from "./Stats";

const index = () => {
   return (
      <main>
         <HeroSection />
         <StatsSection />
         <FeaturesSection />
         <AssetsSection />
         <SecuritySection />
         <DownloadSection />
      </main>
   );
}

export default index;