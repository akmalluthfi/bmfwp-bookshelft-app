const bookshelf = [];

function render() {
  // get unfinished book and finished book container
  const unfinished = document.getElementById('unfinished-books');
  const finished = document.getElementById('finished-books');

  unfinished.innerHTML = '';
  finished.innerHTML = '';

  let countUnfinished = 0;
  let countFinished = 0;
  bookshelf.forEach((book) => {
    const bookCard = createCard(book);
    if (book.isComplete) {
      countFinished++;
      finished.append(bookCard);
    } else {
      countUnfinished++;
      unfinished.append(bookCard);
    }
  });

  if (countFinished === 0) {
    const emptyMessage = document.createElement('h3');
    emptyMessage.innerText = 'Empty Books';
    emptyMessage.classList.add('text-center', 'text-muted', 'py-3');
    finished.append(emptyMessage);
  }

  if (countUnfinished === 0) {
    const emptyMessage = document.createElement('h3');
    emptyMessage.innerText = 'Empty Books';
    emptyMessage.classList.add('text-center', 'text-muted', 'py-3');
    unfinished.append(emptyMessage);
  }

  // berikan event untuk card
  // const buttonsDelete = document.querySelectorAll('.btnDelete');
  const buttonsDelete = document.getElementsByClassName('btnDelete');
  console.log(buttonsDelete);
}

function createCard(book) {
  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = book.title;

  const cardSubtitle = document.createElement('h6');
  cardSubtitle.classList.add('card-subtitle', 'mb-3', 'text-muted');
  cardSubtitle.innerText = `${book.author}, ${book.year}`;

  const menu = createMenuCard(book.isComplete);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.append(cardTitle, cardSubtitle, menu);

  const card = document.createElement('div');
  card.classList.add('card', 'mb-3', 'shadow-sm');
  card.append(cardBody);
  return card;
}

function createMenuCard(isComplete) {
  // icon Delete
  const iconDelete = document.createElement('i');
  iconDelete.setAttribute('role', 'button');
  iconDelete.dataset.bsToggle = 'modal';
  iconDelete.dataset.bsTarget = '#modalConfirmDelete';
  iconDelete.classList.add(
    'bi',
    'bi-trash',
    'text-danger',
    'fs-5',
    'btnDelete'
  );
  const iconDeleteWrapper = document.createElement('div');
  iconDeleteWrapper.classList.add('col-auto');
  iconDeleteWrapper.append(iconDelete);

  // icon Edit
  const iconEdit = document.createElement('i');
  iconEdit.setAttribute('role', 'button');
  iconEdit.dataset.bsToggle = 'modal';
  iconEdit.dataset.bsTarget = '#modalEditBook';
  iconEdit.classList.add(
    'bi',
    'bi-pencil-square',
    'text-success',
    'fs-5',
    'btnEdit'
  );
  const iconEditWrapper = document.createElement('div');
  iconEditWrapper.classList.add('col-auto');
  iconEditWrapper.append(iconEdit);

  // button mark as aleard read
  const buttonMark = document.createElement('button');
  buttonMark.setAttribute('type', 'button');
  buttonMark.classList.add('btn', 'btn-sm', 'btn-indigo-500');

  if (isComplete) {
    buttonMark.classList.add('btn-unread');
    buttonMark.innerText = 'Mark as unread';
  } else {
    buttonMark.classList.add('btn-read');
    buttonMark.innerText = 'Mark as read';
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('col');
  btnWrapper.append(buttonMark);

  const menu = document.createElement('div');
  menu.classList.add('row', 'align-items-center');
  menu.append(btnWrapper, iconEditWrapper, iconDeleteWrapper);

  return menu;
}

function showToast(title, message) {
  const toastEl = document.getElementById('liveToast');
  toastEl.querySelector('.toast-header > strong').innerText = title;
  toastEl.querySelector('.toast-body').innerText = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function isStorangeExists() {
  if (typeof Storage !== undefined) return true;
  showToast('Warning', 'Your Browser not supported Local Storage');
  return false;
}

function storeData() {
  if (isStorangeExists()) {
    const sBookshelf = JSON.stringify(bookshelf);
    localStorage.setItem('bookshelf', sBookshelf);
  }
}

function loadDataFromStorage() {
  const data = JSON.parse(localStorage.getItem('bookshelf'));
  if (data !== null) {
    for (const book of data) {
      bookshelf.push(book);
    }
  }
}

// Main function
document.addEventListener('DOMContentLoaded', () => {
  // cari form tambah book di modal
  const formAdd = document.querySelector('form#addBook');
  formAdd.addEventListener('submit', function (e) {
    e.preventDefault();
    const id = +new Date();
    const title = this.querySelector('#title').value;
    const author = this.querySelector('#author').value;
    const year = this.querySelector('#year').value;
    const isComplete = false;
    // hide modal
    this.querySelector('button.btn-close').click();
    // reset form
    this.reset();
    bookshelf.unshift({ id, title, author, year, isComplete });
    render();
    storeData();
    showToast('Success', 'success add new book');
  });
  // cari form edit book
  // beri event ketika disubmit
  // ambil data-id pada form
  // edit data
  // set localstorage
  // render
  // toast
  // ----
  // cari tombol delete dimodal
  // ketika ditekan delete
  // ambil id pada tombol
  // delete data berdasarkan id
  // ----
  if (isStorangeExists()) {
    loadDataFromStorage();
    render();
  }
  // cek apakah localStorage dengan nama bookshelf
  // jika ada push tiap tiap bookshelft ke dalam variable bookshelf
  // jika tidak ada buat localStorange dengan value array kosong
  // jika sudah render
});
