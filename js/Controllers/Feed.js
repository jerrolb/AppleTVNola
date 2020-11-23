import {SCREEN, URL} from '../Constants';
import store from '../redux/store/index';
import {
  setPlaylists,
  setInfo,
  setNextUrl,
  setIsFeedReady,
  setScreen,
} from '../redux/actions/actions';

const initFeed = (feed) => {
  const httpsToHttp = (url) => url.replace('https://', 'http://');
  const videoLength = feed.shortFormVideos.length;
  const playlists = [];
  let itemIds = [];
  let playlist;
  let video;

  feed.categories.forEach((category, index) => {
    playlist = playlists[index] = {};
    playlist.title = category.name;
    playlist.videos = [];

    feed.playlists.some((feedPlaylist) => {
      if (feedPlaylist.name === category.playlistName) {
        itemIds = feedPlaylist.itemIds;
      }
    });

    itemIds.forEach((id) => {
      for (let i = 0; i < videoLength; ++i) {
        video = feed.shortFormVideos[i];
        if (id === video.id) {
          playlist.videos.push({
            playlistTitle: category.name,
            title: video.title,
            description: video.shortDescription,
            thumbnail: `thumbnails/${video.id}thumbnail.jpg`,
            url: httpsToHttp(video.content.videos[0].url),
          });
          break;
        }
      }
    });
  });

  if (hasHttpsCalls(playlists)) {
    console.error(
      '[App.js][initFeed] There are HTTPS calls in the feed! Change them to HTTP (see beginning of function)',
    );
  } else {
    const currVideo = playlists[0].videos[0];
    store.dispatch(setPlaylists(playlists));
    store.dispatch(
      setInfo({
        title: currVideo.title,
        description: currVideo.description,
        thumbnail: currVideo.thumbnail,
      }),
    );
    store.dispatch(setNextUrl(currVideo.url));
    store.dispatch(setIsFeedReady(true));
  }
};

const hasHttpsCalls = (playlists) => {
  return JSON.stringify(playlists).includes('https://');
};

const get = () => {
  const headers = {
    cache: 'no-cache',
  };
  fetch(URL.FEED, headers)
    .then((res) => res.json())
    .then((feed) => initFeed(feed))
    .catch(() => store.dispatch(setScreen(SCREEN.ERROR)));
};

export {get};
