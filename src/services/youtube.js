import $ from 'jquery';
import logger from '../common/logger';
class youtube {
    static getVideoIdForTerm(term) {
        return $.get('https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet',
            chart: 'mostPopular',
            key: 'AIzaSyBsCL-zrXWd9S2FKRSDVfz7dOo783LQkLk',
            q: term
        })
            .then(response => this.mapVideo(response.items[0]));
    }

    static mapVideo(video){
        return {
            id : video.id.videoId,
            title: video.snippet.title
        }
    }
}

export default youtube;