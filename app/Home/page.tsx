
import { FilterBar } from "@/components/common/FilterBar";
import { SeasonalHome } from "@/components/Home/SeasonalHome";
import { Top100Home } from "@/components/Home/Top100Home";
import { TrendingHome } from "@/components/Home/TrendingHome";


export default function HomePage() {
  return (
    <div className="container mx-auto px-4 mt-16">
      <FilterBar title={""} />
      <TrendingHome displayCount={6} />
      <SeasonalHome displayCount={6} />
      <Top100Home displayCount={10} />
    </div>
  );
}