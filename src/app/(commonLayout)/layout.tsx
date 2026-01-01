import { Navbar } from "@/components/shared/Navbar/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>  
            <Navbar />
            {children}
        </>
    );
};

export default CommonLayout;