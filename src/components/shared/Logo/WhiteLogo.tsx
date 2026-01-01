"use client";

import Image from "next/image";
import Link from "next/link";

const WhiteLogo = () => {
   return (
        <Link href="/">
            <Image  src="/assets/Logo_White.png" width={200} height={120} alt=''></Image>
        </Link>
    );
};

export default WhiteLogo;