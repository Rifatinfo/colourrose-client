"use client";

import Link from "next/link";

interface Props {
    productId: string;
}

export default function SelectOptionsButton({ productId }: Props) {

    return (
        <Link href={`/product/${productId}`}>
            <button
                className="cursor-pointer w-full bg-black py-3 text-xs tracking-widest text-white hover:bg-gray-800 transition-colors"
            >
                SELECT OPTIONS
            </button>
        </Link>
    );
}
