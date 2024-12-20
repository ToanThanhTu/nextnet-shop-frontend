import CarouselDisplay from "@/app/components/index/carousel-display";
import Discover from "@/app/components/index/discover";
import Highlights from "@/app/components/index/highlights";
import MembershipAds from "@/app/components/index/membership-ads";

function Index() {
  return (
    <>
      <CarouselDisplay />
      <Highlights />
      <MembershipAds />
      <Discover />
    </>
  );
}

export default Index;
