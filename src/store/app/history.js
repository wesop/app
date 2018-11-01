import Vue from 'vue'
import { Route } from 'vue-router'

function logger(collection, current, stack) {
  console.debug(`[App][HistoryCollection] collection: %o`, collection);
  console.debug(`[App][HistoryCollection] current: %o`, current);
  console.debug(`[App][HistoryCollection] stack: %o`, stack);
};

export class History {
  constructor() {
    /** @type {Route} */
    this.route = null;

    /** @type {Vue} */
    this.component = null;

    this.props = {};
    this.data = {};
  }

  /**
   * @param {Vue} component
   */
  initialize({ route, component })  {
    this.route = route;
    this.component = component;

    this.data = this.component.$data;
    this.props = this.component.$props;
  }

  /**
   * @param {Vue} currentComponent
   */
  overwrite(currentComponent)  {
    if (this.data) {
      let dataKeys = Object.keys(this.data);

      dataKeys.forEach(key => {
        if (!key.match(/^\$/) && key !== 'state') currentComponent.$data[key] = this.data[key];
      });
    }

    if (this.props) {
      let propKeys = Object.keys(currentComponent.$props || {});

      if (propKeys.length)  {
        let redefineProps = {};

        propKeys.forEach(key => {
          if (!key.match(/^\$/) && key !== 'state') {
            let value = this.props[key];

            redefineProps[key] = { value };
          }
        });

        Object.defineProperties(currentComponent.$props, redefineProps);
      }
    }
  }
}

export class HistoryCollection {
  constructor() {
    /** @type {Map<string, History>} */
    this.collection = new Map;

    /** @type {History} */
    this.current;

    /** @type {string[]} */
    this._stack = [];
  }

  /**
   * @param {History} history
   */
  push(history)  {
    let name = `${history.route.name}_${history.component._uid}`;

    this.collection.set(name, history);
    this._stack.push(name);

    this.current = history;

    logger(this.collection, this.current, this._stack);
  }

  /**
   * @returns {History}
   */
  pop() {
    let name = this._stack.pop(), history;

    if(name)  {
      history = this.collection.get(name);
      this.collection.delete(name);
    }

    this.current = this.get(this.getLatestName());

    logger(this.collection, this.current, this._stack);

    return history;
  }

  /**
   * 히스토리 클리어
   */
  clear() {
    this.collection = new Map;
    this.current = null;
    this._stack = [];
  }

  /**
   * @returns {History}
   */
  get(name) {
    return this.collection.get(name);
  }

  getLatestName() {
    return this._stack[this._stack.length - 1];
  }
}
