import HomeLibraryProvider from "@/components/home/HomeLibraryProvider";
import HeroSlider from "@/components/home/HeroSlider";
import LibraryHighlights from "@/components/home/LibraryHighlights";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";
import CommunityShelf from "@/components/home/CommunityShelf";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import AvailableBooks from "@/components/home/AvailableBooks";
import StorySpotlights from "@/components/home/StorySpotlights";
import PicksForYou from "@/components/home/PicksForYou";
import FeaturedAuthors from "@/components/home/FeaturedAuthors";
import ReadingRituals from "@/components/home/ReadingRituals";
import HowItWorks from "@/components/home/HowItWorks";
import ReadingJournal from "@/components/home/ReadingJournal";

export default function HomePage() {
  return (
    <HomeLibraryProvider>
      <HeroSlider />
      <LibraryHighlights />
      <NewArrivals />
      <TopCategories />
      <CommunityShelf />
      <FeaturedCollection />
      <AvailableBooks />
      <StorySpotlights />
      <PicksForYou />
      <div id="featured-authors">
        <FeaturedAuthors />
      </div>
      <ReadingRituals />
      <HowItWorks />
      <ReadingJournal />
    </HomeLibraryProvider>
  );
}
