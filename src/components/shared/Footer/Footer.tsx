import WhiteLogo from "../Logo/WhiteLogo";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music,
} from "lucide-react";
import SocialIcons from "./SocialIcons";
const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 px-4 md:px-0">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    {/* <h3 className="text-lg font-bold mb-6 tracking-tight">
                        LET&rsquo;S CONNECT
                    </h3> */}
                    <div className="mb-6">
                       <WhiteLogo/>
                    </div>
                    <p className="text-gray-400 mb-6 max-w-sm">
                        Subscribe for exclusive offers and early access to new
                        collections.
                    </p>
                    <div className="flex gap-4 border-b border-gray-400 pb-2 max-w-md">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent w-full outline-none placeholder:text-gray-400 "
                        />
                        <button className="text-xs font-bold uppercase tracking-widest">
                            Submit
                        </button>
                    </div>
                    <div className="mt-6">
                        <SocialIcons/>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-bold mb-6 uppercase tracking-widest">
                        About Us
                    </h3>
                    <ul className="space-y-4  text-gray-400 ">
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Our Story
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Sustainability
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Our Team
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-bold mb-6 uppercase tracking-widest">
                        Customer Care
                    </h3>
                    <ul className="space-y-4 text-gray-400 ">
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Refund and Returns Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Shipping & Delivery
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Terms & Condition
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Replacement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline hover:underline-offset-4">
                                Shipping And Exchange
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className="mt-8 md:mt-16 pt-8 border-t border-black/10   flex justify-center text-gray-400  items-center">
                <p>© 2026 Colourrose, All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;