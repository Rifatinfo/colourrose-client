import Footer from "@/components/shared/Footer/Footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>  
            {children}
            <Footer/>
        </>
    );
};

export default ShopLayout;