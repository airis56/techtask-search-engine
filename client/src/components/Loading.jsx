import { ImSpinner2 } from "react-icons/im";

export default function Loading ({ message = "Kraunama..." })  {
    return (
        <div className="flex flex-col items-center justify-center py-20 w-full">
            <ImSpinner2 className="text-[#00ffcc] text-[4rem] animate-spin mb-4" />
            <p className="text-white/70 text-[1.6rem] font-medium animate-pulse">
                {message}
            </p>
        </div>
    );
};