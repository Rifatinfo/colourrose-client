import { BestSellersSection } from "@/components/modules/Home/BestSellersSection";
import { CategorySection } from "@/components/modules/Home/CategorySection";
import { CollectionSection } from "@/components/modules/Home/CollectionSection";
import { Hero } from "@/components/modules/Home/Hero";

const HomePage = async () => {

    const res = fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/best-selling`,
        { cache: "no-store" }
    )
    .then((res) => res.json());

    const { data: products } = await res;
    
    return (
        <div>
           <Hero />
           <CategorySection/>
           <BestSellersSection products={products} />
           <CollectionSection/>
        </div>
    );
};

export default HomePage;