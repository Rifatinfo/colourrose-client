
const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-black/90">
            <div className="flex space-x-2">
                <span className="w-4 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-4 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-4 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-bounce delay-300"></span>
            </div>
        </div>
    );
};

export default Loading;