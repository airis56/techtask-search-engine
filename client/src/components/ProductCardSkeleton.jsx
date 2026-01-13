export default function ProductCardSkeleton() {
    return (
        <div className="bg-[#1a0640] border border-transparent overflow-hidden flex flex-col h-full shadow-sm animate-pulse">
            <div className="aspect-3/4 bg-white/5" />
            <div className="p-4 flex flex-col grow space-y-4">
                <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                </div>
                <div className="h-3 bg-white/5 rounded w-1/3 mb-4" />
                
                <div className="space-y-2 pt-2">
                    <div className="h-3 bg-white/5 rounded w-1/4" />
                    <div className="h-8 bg-white/10 rounded w-1/2" />
                </div>

                <div className="flex items-center gap-2 mt-auto">
                    <div className="w-5 h-5 bg-white/5 rounded-full" />
                    <div className="h-3 bg-white/5 rounded w-8" />
                </div>
            </div>
        </div>
    );
}
