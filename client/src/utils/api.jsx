const API_BASE_URL = 'http://localhost:5000';

export const fetchGames = async (searchQuery) => {
    const cleanQuery = searchQuery?.trim();
    const url = cleanQuery
        ? `${API_BASE_URL}/list?search=${encodeURIComponent(cleanQuery)}`
        : `${API_BASE_URL}/list`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response not ok');
    }
    return response.json();
};