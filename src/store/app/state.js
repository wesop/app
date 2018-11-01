import AppHeader from '../../layouts/AppHeader'
import AppFooter from '../../layouts/AppFooter'
import { User } from '../../models/user'
import CONSTANT from '../../models/constant'
import { HistoryCollection, History } from './history'
import service from '../../services'

/** @type {User} */
const storedUser = JSON.parse(localStorage.getItem(CONSTANT.USER_INFO));

export default {
  header: new AppHeader,
  footer: new AppFooter,
  user: storedUser || null,

  /** @type {HistoryCollection} */
  histories: new HistoryCollection,

  /** @type {History} */
  poppedHistory: null,

  backButton: {
    handler: function()  {},
    active()  {
      this.handler();
    }
  },

  /** @type {Map<string, { id: number }>} */
  processorList: new Map,

  service
}
