

const SkeletonMapRoute = () => {
    return (
        <div className="relative w-full h-[500px] mt-5 bg-gray-200 rounded-md overflow-hidden">
            {/* Simulate roads */}
            <div className="absolute inset-0 bg-gray-300"></div>

            {/* Vertical streets */}
            <div className="absolute top-0 left-1/4 h-full w-[2px] bg-gray-400"></div>
            <div className="absolute top-0 left-2/4 h-full w-[2px] bg-gray-400"></div>
            <div className="absolute top-0 left-3/4 h-full w-[2px] bg-gray-400"></div>

            {/* Horizontal streets */}
            <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gray-400"></div>
            <div className="absolute top-2/4 left-0 w-full h-[2px] bg-gray-400"></div>
            <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gray-400"></div>

            {/* Route line */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-[2px]  rounded-full animate-pulse"></div>

            {/* Store marker */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-black rounded-full border-2 border-white shadow-md animate-pulse"></div>

            {/* Delivery marker */}
            <div className="absolute top-3/4 left-3/4 w-6 h-6 bg-black rounded-full border-2 border-white shadow-md animate-pulse"></div>
        </div>
    );
};

export default SkeletonMapRoute;