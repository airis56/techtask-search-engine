import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGames } from '../utils/api';
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";

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
    if (loading) return <Loading message={query ? `Ieškoma "${query}"...` : 'Ieškoma...'} />;
    if (error) return <ErrorMessage message={error} onRetry={getGames} />;

    return (
        <div className="flex justify-center w-full py-8">
            <div className="w-full max-w-300 px-4">
                <h2 className="text-white text-[1.4rem] mb-6">
                    Rezultatai: <span className="font-bold">{results.length}</span>
                </h2>

                {/* need to create i think a product card component and use here to display the games*/}
            </div>
        </div>
    );
};