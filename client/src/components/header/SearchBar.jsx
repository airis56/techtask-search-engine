import {IoSearchOutline} from "react-icons/io5";

export default function SearchBar() {
    return (
        <div className="relative flex-[0_1_550px] min-w-50">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IoSearchOutline size={22} className="text-white"/>
            </div>

            <input
                type="text"
                placeholder="Ieškoti žaidimų, papildymų ir daugiau..."
                className="w-full border border-white h-14 py-3 pl-10 pr-4 font-metropolis font-bold text-[1.3rem] placeholder:text-white/60 focus:outline-none"
            />
        </div>
    );
}