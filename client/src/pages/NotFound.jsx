import { Link } from 'react-router-dom';
import { IoGameControllerOutline } from 'react-icons/io5';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative mb-8">
                <IoGameControllerOutline className="text-white/10 text-[12rem]" />
                <span className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white italic select-none">
                    404
                </span>
            </div>
            
            <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Level Not Found</h1>
            <p className="text-white/60 text-lg max-w-md mb-8">
                The page you're looking for has been moved, deleted, or never existed in this realm.
            </p>
            
            <Link 
                to="/list" 
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-3 font-bold uppercase tracking-widest transition-all transform hover:scale-105"
            >
                Back to Games
            </Link>
        </div>
    );
}
