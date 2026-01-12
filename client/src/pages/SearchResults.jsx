import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGames } from '../utils/api';
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function SearchResults () {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGames = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchGames(query);
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGames();
    }, [query]);

    // Clean conditional rendering
    if (loading) return <Loading message={query ? `Searching for "${query}"...` : 'Searching...'} />;
    if (error) return <ErrorMessage message={error} onRetry={getGames} />;

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-300 px-4">
                <h2 className="text-white text-[1rem] mb-6">
                    Results found: <span className="font-bold">{results.length}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(item => (
                        <ProductCard key={item.productId} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
