import { IoSearchOutline, IoTimeOutline, IoCloseOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const [recentSearches, setRecentSearches] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    // Load recent searches on mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(saved);
    }, []);

    // Keep input in sync with URL
    useEffect(() => {
        setQuery(searchParams.get('search') || '');
    }, [searchParams]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced navigation (search-as-you-type)
    useEffect(() => {
        const urlQuery = searchParams.get('search') || '';
        if (query === urlQuery) return;

        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                navigate(`/list?search=${encodeURIComponent(query)}`, { replace: true });
            } else if (query === '') {
                navigate('/list', { replace: true });
            }
        }, 500); // 500ms debounce for navigation

        return () => clearTimeout(timeoutId);
    }, [query, navigate, searchParams]);


    const saveSearch = (term) => {
        if (!term || !term.trim()) return;
        const termToSave = term.trim();
        
        setRecentSearches(prev => {
            const updated = [termToSave, ...prev.filter(s => s !== termToSave)].slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    };

    const removeRecentSearch = (e, term) => {
        e.stopPropagation();
        setRecentSearches(prev => {
            const updated = prev.filter(s => s !== term);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/list?search=${encodeURIComponent(query)}`);
            saveSearch(query);
            setIsFocused(false);
        }
    };

    const handleSuggestionClick = (term) => {
        setQuery(term);
        navigate(`/list?search=${encodeURIComponent(term)}`);
        saveSearch(term);
        setIsFocused(false);
    };

    return (
        <div ref={wrapperRef} className="relative flex-[0_1_550px] min-w-50">
            <form onSubmit={handleSubmit} className="relative z-50">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <IoSearchOutline size={22} className="text-white"/>
                </div>

                <input
                    type="text"
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for games..."
                    className="w-full border border-white h-14 py-3 pl-10 pr-4 font-metropolis font-bold text-[1.3rem] placeholder:text-white/60 focus:outline-none bg-transparent"
                />
            </form>

            {/* Dropdown */}
            {isFocused && recentSearches.length > 0 && query.trim() === '' && (
                <div className="absolute top-full left-0 w-full mt-1 bg-[#2a0c5e] border border-white/20 shadow-2xl z-40 overflow-hidden">
                    {/* Recent Searches */}
                    <div className="py-2">
                        <h4 className="px-4 py-1 text-[0.7rem] font-bold text-white/40 uppercase tracking-wider">Recent Searches</h4>
                        {recentSearches.map((term) => (
                            <div
                                key={term}
                                onClick={() => handleSuggestionClick(term)}
                                className="group w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"
                            >
                                <IoTimeOutline size={18} className="text-white/40 group-hover:text-white transition-colors" />
                                <span className="flex-grow font-bold text-[1rem]">{term}</span>
                                <button
                                    onClick={(e) => removeRecentSearch(e, term)}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <IoCloseOutline size={18} className="text-white/40 hover:text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}