import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const navigate = useNavigate();

    // Keep input in sync with URL (e.g., if the user clicks back/forward)
    useEffect(() => {
        setQuery(searchParams.get('search') || '');
    }, [searchParams]);

    useEffect(() => {
        // Don't trigger search-as-you-type if the query hasn't changed from the URL's search param
        const urlQuery = searchParams.get('search') || '';
        if (query === urlQuery) return;

        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                navigate(`/list?search=${encodeURIComponent(query)}`, { replace: true });
            } else if (query === '') {
                navigate('/list', { replace: true });
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [query, navigate, searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/list?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex-[0_1_550px] min-w-50">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IoSearchOutline size={22} className="text-white"/>
            </div>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for games..."
                className="w-full border border-white h-14 py-3 pl-10 pr-4 font-metropolis font-bold text-[1.3rem] placeholder:text-white/60 focus:outline-none bg-transparent"
            />
        </form>
    );
}