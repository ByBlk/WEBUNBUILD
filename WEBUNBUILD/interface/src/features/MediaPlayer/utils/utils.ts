
export const fetchVideoDetails = async (videoId: string) => {
    try {
        const response = await fetch(
            `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
        );
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
    }
};