import Button from './Button'

class AppHeader {
  constructor() {
    this.visible = true;
    this.title = '';
    this.useBackButton = false;
    this.more = {
      use: false,
      buttons: []
    };

    /** @type {Button[]} */
    this.buttons = [];
  }
}

export default AppHeader
