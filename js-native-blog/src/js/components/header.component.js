import { Component } from '../core/component';

// Header компонент
export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    if (localStorage.getItem('visited')) {
      this.hide();
    }
    
    const btn = this.$el.querySelector('.js-header-start');

    btn.addEventListener('click', buttonHandler.bind(this));
  }
}

// Обработчик кнопки "Приступить"
function buttonHandler() {
  localStorage.setItem('visited', JSON.stringify(true));
  this.hide();
}