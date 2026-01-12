
import HomeSlider from "../components/HomeSlider";
import CircleBoxes from "../components/Boxwatch";
import TwoImageSection from "../components/TwoImageSection";
import RecommendedSlider from "../components/RecommendedSlider";
import TwoImageTow from "../components/Towimgtow";
import FeaturedCollections from "../components/FeaturedCollections";
import Watchfeature from "../components/watchfeatured";
import CTASection from "../components/CTA";
import Collection from "../components/Collection";
import Connected from "../components/Connected";


export default function Home() {
  return (
    <>
      
      {/* Slider */}
      <HomeSlider />
      <Connected />
      <CircleBoxes />
      <TwoImageSection />
      <RecommendedSlider />
      <TwoImageTow />
      <FeaturedCollections/>
      <Watchfeature />
      <Collection / >
      {/* <CTASection /> */}
      
     

     
    </>
  );
}
