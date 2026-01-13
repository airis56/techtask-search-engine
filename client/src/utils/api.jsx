export const fetchGames = async (searchQuery) => {
    const cleanQuery = searchQuery?.trim();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const url = cleanQuery
        ? `${baseUrl}/list?search=${encodeURIComponent(cleanQuery)}`
        : `${baseUrl}/list`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            let errorMessage = 'Network response not ok';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch (e) {
                // fallback if the response is not JSON
            }
            throw new Error(errorMessage);
        }
        return response.json();
    } catch (error) {
        // "Failed to fetch" is the standard message for network/CORS errors in Chrome/Firefox
        // "NetworkError when attempting to fetch resource" is specific to Firefox
        if (
            (error.name === 'TypeError' && error.message === 'Failed to fetch') ||
            (error.name === 'TypeError' && error.message.includes('NetworkError'))
        ) {
            throw new Error('Unable to connect to the server. This might be a connection issue or a security restriction (CORS).');
        }
        throw error;
    }
};