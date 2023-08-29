const YoutubeMusicApi = require('youtube-music-api'),
    youtube_music_api = new YoutubeMusicApi(),
    levenshtein = require('fast-levenshtein');

function compare(str, arr) {                        // get relevant element from Array
    return arr.sort((a, b) => levenshtein.get(str, a) - levenshtein.get(str, b))[0];
}

async function getArtistByName(name) {
    try {
        const result = await youtube_music_api.search(name);
        const filteredContent = result['content'].filter(item => item.type === 'artist');
        const comparedResult = compare(name, filteredContent);
        return comparedResult;
    } catch (error) {
        console.error("An error occurred:", error);
        return [];       // empty array
    }
}

async function getTrackByName(name) {
    try {
        const result = await youtube_music_api.search(name);
        const filteredContent = result['content'].filter(item => item.type === 'song');
        const comparedResult = compare(name, filteredContent);
        return comparedResult;
    } catch (error) {
        console.error("An error occurred:", error);
        return [];       // empty array
    }
}

module.exports = {
    getArtistByName, getTrackByName,
    youtube_music_api
};
