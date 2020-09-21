import axios from 'axios'

let devMode = process.env.NODE_ENV === 'development';

//Event names:
export const EVENTS = {
  TOGGLE_DARK_THEME: 'TOGGLE_DARK_THEME',
  TRIGGER_RIGHT_DRAWER: 'TRIGGER_RIGHT_DRAWER',
  SET_LOADING: 'SET_LOADING',
  UPDATE_DATA: 'UPDATE_DATA',
  SELECT_MOVIE: 'SELECT_MOVIE',
  PLAY_MOVIE: 'PLAY_MOVIE',
  SHOW_POSTER: 'SHOW_POSTER'
}

export const state = () => ({
  movies: [],
  selectedMovie: undefined,
  isPlaying: false,
  isShowingPoster: false,
  appTitle: "A.P. Technical Test",
  rightDrawerIsOpen: false,
  menuItems: [
    { title: "Home", route: "/", icon: "mdi-home" },
    { title: "Video", route: "/video", icon: "mdi-video-outline" },
  ],
  loading: false,
  isDarkTheme: true
})

export const getters = {
  getAppTitle: (state) => state.title,
  getRightDrawer: (state) => state.rightDrawerIsOpen,
  getRightDrawerMenus: (state) => state.menuItems,
  getLoadingStatus: (state) => state.loading,
  isDarkThemeInUse: (state) => state.isDarkTheme,
  getPlayBtnSrc: (state) => {
    return state.isPlaying 
      ? "http://hybridtv.ss7.tv/techtest/assets/icons/btn-pause.png"
      : "http://hybridtv.ss7.tv/techtest/assets/icons/btn-play.png"
  }
}

export const mutations = {
  [EVENTS.TRIGGER_RIGHT_DRAWER]: (state, isOpen) => {
    state.rightDrawerIsOpen = isOpen;
    if (devMode) console.log("[TRIGGER_RIGHT_DRAWER] mutation: isOpen: " + state.rightDrawerIsOpen);
  },
  [EVENTS.TOGGLE_DARK_THEME]: (state) => {
    state.isDarkTheme = !state.isDarkTheme;
    if (devMode) console.log("[TOGGLE_DARK_THEME] mutation: darkTheme: " + state.isDarkTheme);
  },
  [EVENTS.SET_LOADING]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [EVENTS.UPDATE_DATA]: (state, payload) => {
    state.movies = payload.data;
  },
  [EVENTS.SELECT_MOVIE]: (state, index) => {
    if (index >= 0) state.selectedMovie = state.movies[index];  
  },
  [EVENTS.PLAY_MOVIE]: (state, mode) => {
    state.isPlaying = mode; 
  },
  [EVENTS.SHOW_POSTER]: (state, mode) => {
    state.isShowingPoster = mode; 
  },
}

export const actions = {
  toggleDarkTheme: (context) => {
    if (devMode) console.log("Action: store/toggleDarkTheme");
    context.commit(EVENTS.TOGGLE_DARK_THEME, null);
  },
  stopLoading: (context) => {
    if (devMode) console.log("Action: store/stopLoading");
    context.commit(EVENTS.SET_LOADING, false);
  },
  startLoading: (context) => {
    if (devMode) console.log("Action: store/startLoading");
    context.commit(EVENTS.SET_LOADING, true);
  },
  loadData: (context) => {
    if (devMode) console.log("Action: store/loadData");
    context.commit(EVENTS.SET_LOADING, true);
    axios
      .get('http://hybridtv.ss7.tv/techtest/movies.json')
      .then(function (response) {
        context.commit(EVENTS.UPDATE_DATA, response.data);
        console.log(response.data);
        context.dispatch("stopLoading");
      })
      .catch(err => console.error(err))
  },
  selectMovie: (context, index) => {
    if (devMode) console.log("Action: store/selectMovie");
    context.commit(EVENTS.SELECT_MOVIE, index);
  },
  playMovie: (context, mode) => {
    if (devMode) console.log("Action: store/playMovie"); 
    context.commit(EVENTS.PLAY_MOVIE, mode); 
  },
  showPoster: (context, mode) => {
    if (devMode) console.log("Action: store/showPoster"); 
    context.commit(EVENTS.SHOW_POSTER, mode); 
  },
  triggerRightDrawer: (context, isOpen) => {
    if (devMode) console.log("Action: store/triggerRightDrawer");
    context.commit(EVENTS.SET_LOADING, true);
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, isOpen)
  },
  openRightDrawer: (context) => {
    if (devMode) console.log("Action: store/openRightDrawer");
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, true)
  },
  closeRightDrawer: (context) => {
    if (devMode) console.log("Action: store/closeRightDrawer");
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, false)
  }
}