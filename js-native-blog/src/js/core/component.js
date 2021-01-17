// Реализуем класс, от которого можно будет наследоваться,
// и который будет предоставлять возможности для будущих компонентов

export class Component {
  constructor(id) {
    this.$el = document.getElementById(id);

    this.init();
  }

  init() {}
  
  onShow() {}
  
  onHide() {}

  hide() {
    this.$el.classList.add('hide');
    this.onHide();
  }

  show() {
    this.$el.classList.remove('hide');
    this.onShow();
  }
}