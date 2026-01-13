import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGames } from '../utils/api';
import ErrorMessage from "../components/ErrorMessage.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";

export default function SearchResults () {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGames = useCallback(async (isCancelled = { current: false }) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchGames(query);
            if (!isCancelled.current) {
                setResults(data);
            }
        } catch (err) {
            if (!isCancelled.current) {
                setError(err.message);
            }
        } finally {
            if (!isCancelled.current) {
                setLoading(false);
            }
        }
    }, [query]);

    useEffect(() => {
        const cancellation = { current: false };
        getGames(cancellation);
        return () => {
            cancellation.current = true;
        };
    }, [getGames]);

    const handleRetry = () => getGames();

    if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

    if (!loading && results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-20 text-center">
                <div className="bg-white/10 rounded-full p-8 mb-6 border border-white/5">
                    <img src="/logo.svg" alt="No results" className="w-16 h-16 opacity-30 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black mb-3 uppercase italic tracking-tighter">No results found</h2>
                <p className="text-white/50 max-w-md text-lg">
                    We couldn't find any games matching <span className="text-white font-bold italic">"{query}"</span>.
                    <br/>
                    Try checking for typos or use more general terms.
                </p>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-300 px-4">
                <h2 className="text-white text-[1rem] mb-6">
                    {loading ? (
                        <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
                    ) : (
                        <>Results found: <span className="font-bold">{results.length}</span></>
                    )}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : (
                        results.map(item => (
                            <ProductCard key={item.productId} item={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
