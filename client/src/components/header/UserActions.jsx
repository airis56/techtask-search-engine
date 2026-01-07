import {IoHeartOutline, IoCartOutline, IoPersonOutline, IoCar} from "react-icons/io5";

export default function UserActions() {
    return (
        <div className="flex items-center gap-4">
            <button className="hover:text-white/80">
                <IoHeartOutline size={20} />
            </button>

            <button className="hover:text-white/80">
                <IoCartOutline size={20} />
            </button>

            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                <IoPersonOutline size={18} />
            </button>
        </div>
    );
}