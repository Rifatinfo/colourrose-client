import { BestSellersSection } from "@/components/modules/Home/BestSellersSection";
import { CategorySection } from "@/components/modules/Home/CategorySection";
import { CollectionSection } from "@/components/modules/Home/CollectionSection";
import { Hero } from "@/components/modules/Home/Hero";

const HomePage = () => {
    return (
        <div>
           <Hero />
           {/* <BestSellersSection/> */}
           <CategorySection/>
           <CollectionSection/>
        </div>
    );
};

export default HomePage;