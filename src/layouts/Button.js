class Button {
  constructor(args = {
    'click': null,
    'class': '',
    'color': '',
    'icon': '',
    'label': '',
    'visible': true,
    'to': '',
    'position': POSITION.LEFT,
  }) {
    this.click = args.click || (() => { });
    this.class = args.class || '';
    this.color = args.color || 'black';
    this.icon = args.icon || '';
    this.label = args.label || '';
    this.visible = args.visible || true;
    this.to = args.to || '';
    this.position = args.position || Button.POSITION.LEFT;
  }
}

Button.POSITION = {
  LEFT: 'left',
  RIGHT: 'right'
}

export default Button;
