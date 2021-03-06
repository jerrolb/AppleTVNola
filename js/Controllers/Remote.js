import {TVEventHandler} from 'react-native';
import store from '../redux/store/index';
import {REMOTE, SCREEN} from '../Constants';
import * as Player from './Player';
import {debugCounter} from './Debug';

const tvEventHandler = new TVEventHandler();
const enable = () => {
  tvEventHandler.enable(tvEventHandler, (_, evt) => {
    const state = store.getState();
    const btn = evt && evt.eventType;
    if (btn) {
      switch (state.screen) {
        case SCREEN.SPLASH:
          break;
        case SCREEN.SEARCH:
        case SCREEN.SERMONS:
        case SCREEN.WATCHLIVE:
          if (state.player.visible && btn === REMOTE.MENU) {
            Player.minimize();
            break;
          }
          if (
            state.screen === SCREEN.SEARCH &&
            btn === REMOTE.SELECT &&
            state.isHeaderFocused
          ) {
            debugCounter();
            break;
          }
        default:
          break;
      }
    }
  });
};

const disable = () => tvEventHandler.disable();

export {disable, enable};
