import AppHeader from '../../layouts/AppHeader'
import AppFooter from '../../layouts/AppFooter'
import { User } from '../../models/user'
import CONSTANT from '../../models/constant'
import { HistoryCollection, History } from './history'

export default {
  setHeader(state, { visible, title, buttons, useBackButton, more }) {
    /** @type {AppHeader} */
    let header = state.header;

    header.visible = visible;
    header.title = title;
    header.buttons = buttons;
    header.useBackButton = useBackButton;
    header.more = more;

    console.debug(`[App][Header] visible: ${visible}, title: ${title}, buttons: ${JSON.stringify(buttons)}, useBackButton: ${useBackButton}, more: ${more}`);
  },

  setFooter(state, { visible, buttons }) {
    /** @type {AppFooter} */
    let footer = state.footer;

    footer.visible = visible;
    footer.buttons = buttons;

    console.debug(`[App][Footer] visible: ${visible}, buttons: ${JSON.stringify(buttons)}`);
  },

  /**
   * @param {User} user
   */
  setUser(state, user)  {
    state.user = user;
    localStorage.setItem(CONSTANT.USER_INFO, JSON.stringify(user));

    console.debug(`[App][User] user: ${JSON.stringify(user)}`);
  },

  pushHistory(state, { route, component }) {
    /** @type {HistoryCollection} */
    let histories = state.histories,
      history = new History;

    history.initialize({ route, component });

    histories.push(history);

    state.poppedHistory = null;

    console.debug(`[App][History][Push] history: %o`, history);
  },

  popHistory(state) {
    /** @type {HistoryCollection} */
    let histories = state.histories;

    /** @type {History} */
    let history = histories.pop();

    state.poppedHistory = history;

    console.debug(`[App][History][Pop] history: %o`, history);
  },

  clearHistory(state) {
    /** @type {HistoryCollection} */
    let histories = state.histories;

    histories.clear();

    console.debug(`[App][History][Clear] history clear!`);
  },

  overwriteHistoryData(state, component)  {
    /** @type {History} */
    let poppedHistory = state.poppedHistory;

    if (poppedHistory !== null && poppedHistory !== undefined)  {
      poppedHistory.overwrite(component);
      state.poppedHistory = null;
    }
  },

  setBackButtonHandler(state, handler) {
    state.backButton.handler = handler;

    console.debug(`[App][BackButtonHandler][set] ${handler}`);
  },

  /**
   * 백그라운드 프로세서 설정
   *
   * @param {any} state
   * @param {{ name: string, process: function, interval: number }} settedProcessor
   */
  setBackgroundProcessor(state, settedProcessor)  {
    if (state.processorList.has(settedProcessor.name)) {
      let processor = state.processorList.get(settedProcessor.name);

      clearInterval(processor.id);
    }

    state.processorList.set(settedProcessor.name, {
      id: setInterval(() => {
        settedProcessor.process();
      }, settedProcessor.interval)
    });
  },

  /**
   * 백그라운드 프로세서 해제
   *
   * @param {any} state
   * @param {string} processorName
   */
  removeBackgroundProcessor(state, processorName)  {
    if (state.processorList.has(processorName)) {
      let processor = state.processorList.get(processorName);

      clearInterval(processor.id);

      state.processorList.delete(processorName);
    }
  }
}

