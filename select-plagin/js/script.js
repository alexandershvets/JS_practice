'use script';

// Dropdown <= instance

class Dropdown {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.items = options.items;

    this.$el.querySelector('.dropdown__label').textContent = this.items[0].label;

    this.$el.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.matches('.dropdown__label')) {
        (this.$el.classList.contains('open')) ? this.close() : this.open();
      } else if (target && target.tagName.toLowerCase() == 'li') {
        this.select(target.dataset.id);
      }
    });

    const itemsHTML = this.items.map(item => {
      return `<li data-id="${item.id}">${item.label}</li>`;
    }).join('');

    this.$el.querySelector('.dropdown__menu').insertAdjacentHTML('afterbegin', itemsHTML);
  }

  select(id) {
    const item = this.items.find(item => item.id == id);
    this.$el.querySelector('.dropdown__label').textContent = item.label;
    this.close();
  }

  open() {
    this.$el.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
  }
}


const dropdown = new Dropdown('#dropdown', {
  items: [
    {label: 'Москва', id: 'msk'},
    {label: 'Санкт-Петербург', id: 'spb'},
    {label: 'Новосибирск', id: 'nsk'},
    {label: 'Краснодар', id: 'krdr'},
    {label: 'Ростов', id: 'rstv'}
  ]
});

