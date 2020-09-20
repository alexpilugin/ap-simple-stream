let devMode = process.env.NODE_ENV === 'development';

//Event names:
export const EVENTS = {
  TOGGLE_DARK_THEME: 'TOGGLE_DARK_THEME',
  TRIGGER_RIGHT_DRAWER: 'TRIGGER_RIGHT_DRAWER',
  SET_LOADING: 'SET_LOADING'
}

export const state = () => ({
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
  isDarkThemeInUse: (state) => state.isDarkTheme 
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
  }
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
  triggerRightDrawer: (context, isOpen) => {
    if(devMode) console.log("Action: store/triggerRightDrawer");
    context.commit(EVENTS.SET_LOADING, true);
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, isOpen )
  },
  openRightDrawer: (context) => {
    if(devMode) console.log("Action: store/openRightDrawer");
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, true )
  },
  closeRightDrawer: (context) => {
    if(devMode) console.log("Action: store/closeRightDrawer");
    context.commit(EVENTS.TRIGGER_RIGHT_DRAWER, false )
  },
}