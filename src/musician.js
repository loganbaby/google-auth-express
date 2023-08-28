const YoutubeMusicApi = require('youtube-music-api'),
    youtube_music_api = new YoutubeMusicApi();

async function getArtistByName(name) {
    try {
        const result = await youtube_music_api.search(name);
        const filteredContent = result['content'].filter(item => item.type === 'artist');
        return filteredContent;
    } catch (error) {
        console.error("An error occurred:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}    

module.exports = {
    getArtistByName,
    youtube_music_api
};
