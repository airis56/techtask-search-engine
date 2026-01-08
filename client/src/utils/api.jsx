const API_BASE_URL = 'http://localhost:5000';

export const fetchGames = async (searchQuery) => {
    const search = searchQuery ? `?search=${searchQuery}` : '';
    const url = `${API_BASE_URL}/list${search}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response not ok');
    }
    return response.json();
};