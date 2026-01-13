export const fetchGames = async (searchQuery) => {
    const cleanQuery = searchQuery?.trim();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const url = cleanQuery
        ? `${baseUrl}/list?search=${encodeURIComponent(cleanQuery)}`
        : `${baseUrl}/list`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response not ok');
    }
    return response.json();
};