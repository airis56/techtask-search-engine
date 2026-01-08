import { BiErrorCircle } from "react-icons/bi";

export default function ErrorMessage ({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 w-full text-center">
            <BiErrorCircle className="text-red-500 text-[5rem] mb-4" />
            <h3 className="text-white text-[1.6rem] font-bold mb-2">Kažkas atsitiko!</h3>
            <p className="text-white/60 text-[1.2rem] max-w-[400px] mb-6">
                {message || "Įvyko klaida įkeliant turinį. Prašome pabandyti dar kartą vėliau."}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-[#5a10b1] hover:bg-[#4a0d91] text-white px-8 py-3 rounded-sm font-bold transition-colors text-[1.2rem]"
                >
                    Mėginti dar kartą
                </button>
            )}
        </div>
    );
};