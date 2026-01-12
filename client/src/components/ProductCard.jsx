import PlusBadge from "./PlusIcon.jsx";
import PlatformIcon from "./platforms/PlatformIcon.jsx";
import { IoHeartOutline } from "react-icons/io5";

const random = Math.floor(Math.random() * 1000) + 1;

function calculateDiscount(originalPrice, currentPrice) {
    return ((originalPrice - currentPrice) / originalPrice) * 100;
}

export default function ProductCard({ item }) {
    const hasDiscount = item.originalPrice !== item.currentPrice;

    return (
        <div className="bg-[#1a0640] border border-[#00ffcc] overflow-hidden text-white flex flex-col h-full shadow-sm">
            <div className="relative aspect-3/4">
                <img src={item.baseImage} alt={item.title} className="w-full h-full object-cover" />

                {item.cashbackAmount > 0 && <div
                    className="absolute bottom-8 left-0 bg-[#00ffcc] text-black text-[0.8rem] font-bold px-2 py-1 flex items-center gap-1">
                    <PlusBadge size={18}/> CASHBACK
                </div>}

                <div className="absolute w-full flex items-center justify-center gap-2 bottom-0 bg-black/55 backdrop-blur-xs text-white text-[0.7rem] font-bold py-1">
                    <PlatformIcon platform={item.platform} size={14} />
                    {item.platform}
                </div>
            </div>

            <div className="p-4 flex flex-col grow">
                <h3 className="font-metropolis font-extrabold + text-[0.95rem] leading-tight mb-1 line-clamp-2 ">
                    {item.title}
                </h3>

                <p className="+ text-[#00ffcc] text-[0.9rem] font-semibold uppercase mb-3 tracking-wide">
                    {item.region}
                </p>

                { /* Pricing */}
                <div className="space-y-1 min-h-20">
                    <p className="font-metropolis font-semibold text-white/60 text-[0.75rem] mb-1 h-[18px]">
                        {hasDiscount ? (
                            <>
                                From
                                <span className="line-through ml-1">€{item.originalPrice}</span>
                                <span className="ml-1 text-[0.8rem] font-bold text-green-400">
                                    -{calculateDiscount(item.originalPrice, item.currentPrice).toFixed(2)}%
                                </span>
                            </>
                        ) : (
                            <span className="invisible">placeholder</span>
                        )}
                    </p>

                    <p className="font-metropolis font-semibold leading-5 text-2xl">
                        €{item.currentPrice}
                    </p>

                    {item.cashbackAmount > 0 && (
                        <div className="flex items-center gap-1 text-green-400 text-xs font-metropolis font-semibold leading-7">
                            Cashback: €{item.cashbackAmount}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                    <IoHeartOutline size={18} />
                    <span className="font-bold">{random}</span>
                </div>
            </div>
        </div>
    );
}
