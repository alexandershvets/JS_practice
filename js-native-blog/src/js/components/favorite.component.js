import { Component } from '../core/component';
import { apiService } from '../service/api.service';
import { renderPost } from '../templates/post.template';

export class FavoriteComponent extends Component {
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = renderList(favorites);

    this.$el.insertAdjacentHTML('afterbegin', html);
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

async function linkClickHandler(event) {
  event.preventDefault();

  const $el = event.target;

  if ($el && $el.classList.contains('js-link')) {
    const postId = $el.dataset.id;
    this.$el.innerHTML = '';
    this.loader.show();
    const postData = await apiService.fetchPostById(postId);
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', renderPost(postData, {widthButton: false}));
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
      <ul>
        ${list.map(item => `<li><a href="#" class="js-link" data-id="${item.id}">${item.title}</a></li>`).join(' ')}
      </ul>
    `;
  }

  return `<p class="center">Вы пока ничего не добавили</p>`;
}