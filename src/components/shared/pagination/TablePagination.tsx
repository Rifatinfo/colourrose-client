"use client";
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
}

const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const navigateToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4 mt-4">
            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToPage(currentPage - 1)}
                    disabled={currentPage <= 1 || isPending}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>

                <div className="flex flex-wrap items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                        let pageNumber;

                        if (totalPages <= 5) {
                            pageNumber = index + 1;
                        } else if (currentPage <= 3) {
                            pageNumber = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + index;
                        } else {
                            pageNumber = currentPage - 2 + index;
                        }

                        return (
                            <Button
                                key={pageNumber}
                                variant={pageNumber === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => navigateToPage(pageNumber)}
                                disabled={isPending}
                                className="w-10 cursor-pointer"
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isPending}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            {/* Page info */}
            <span className="text-sm text-muted-foreground mt-2 md:mt-0 md:ml-2">
                Page {currentPage} of {totalPages}
            </span>
        </div>

    );
};


export default TablePagination;