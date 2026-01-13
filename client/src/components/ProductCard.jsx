import PlusBadge from "./PlusIcon.jsx";
import PlatformIcon from "./platforms/PlatformIcon.jsx";
import { IoHeartOutline, IoInformationCircleOutline } from "react-icons/io5";

const random = Math.floor(Math.random() * 1000) + 1;

function calculateDiscount(originalPrice, currentPrice) {
    return ((originalPrice - currentPrice) / originalPrice) * 100;
}

export default function ProductCard({ item }) {
    const hasDiscount = item.originalPrice !== item.currentPrice;

    return (
        <div className={`group bg-[#1a0640] border ${item.cashbackAmount > 0 ? 'border-[#00ffcc]' : 'border-transparent'} overflow-hidden text-white flex flex-col h-full shadow-sm relative`}>
            <div className="relative aspect-3/4 shrink-0">
                <img src={item.baseImage} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col grow transition-transform duration-300 ease-in-out group-hover:-translate-y-24 bg-[#1a0640] relative">
                <div className="absolute bottom-full left-0 w-full">
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
                    <h3 className="font-metropolis font-extrabold text-[0.95rem] leading-tight mb-1 line-clamp-2 ">
                        {item.title}
                    </h3>

                    <p className="+ text-[#00ffcc] text-[0.9rem] font-semibold uppercase mb-3 tracking-wide">
                        {item.region}
                    </p>

                    { /* Pricing */}
                    <div className="space-y-1 min-h-20">
                        <p className="font-metropolis font-semibold text-white/60 text-[0.75rem] mb-1 h-4.5">
                            {hasDiscount ? (
                                <>
                                    From
                                    <span className="line-through ml-1">€{item.originalPrice}</span>
                                    <span className="ml-1 text-[0.8rem] font-bold text-green-400">
                                        {/* dont divide by 0 */}
                                        -{item.originalPrice > 0
                                            ? calculateDiscount(item.originalPrice, item.currentPrice).toFixed(0)
                                            : ''}
                                        %
                                    </span>
                                </>
                            ) : (
                                <span className="invisible">placeholder</span>
                            )}
                        </p>

                        <div className="flex items-center gap-1.5">
                            <p className="font-metropolis font-semibold leading-5 text-2xl">
                                €{item.currentPrice}
                            </p>
                            <div className="relative group/info">
                                <IoInformationCircleOutline className="text-white/40 hover:text-white cursor-help transition-colors" size={16} />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/4 mb-2 w-52 p-3 bg-gray-600 border border-white/10 shadow-2xl text-[0.9rem] font-medium opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-9999">
                                    {hasDiscount && (
                                        <p className="mb-2">
                                            Strike-through price is the recommended retail price, not a reduction of price.
                                        </p>
                                    )}
                                    <p>
                                        Price is not final. Service fee applies at checkout.
                                    </p>
                                </div>
                            </div>
                        </div>

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

                    {/* Revealable Buttons */}
                    <div className="absolute top-full left-0 w-full p-4 pt-0 space-y-2 bg-[#1a0640]">
                        <button className="w-full py-2 bg-yellow-300 text-black font-bold text-[0.9rem] tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors">
                            Add to cart
                        </button>
                        <button className="w-full py-2 bg-white/10 text-white font-bold text-[0.9rem] tracking-wider cursor-pointer hover:bg-white/20 transition-colors border border-white/20">
                            Explore options
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}