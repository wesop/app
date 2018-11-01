class SwalButton {
  /**
   * @param {SwalButton} props
   */
  constructor(props = {}) {
    /** @type {boolean} */
    this.visible = props.visible;

    /** @type {string} */
    this.text = props.text;

    /** @type {any} */
    this.value = props.value;

    /** @type {string | string[]} */
    this.className = props.className;

    /** @type {boolean} */
    this.closeModal = props.closeModal;
  }
}

export default SwalButton;
