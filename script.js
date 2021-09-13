let bookArray = [];

const book = {
  title: '',
  author: '',
};

function addBook(title, author) {
  let shouldAdd = true;
  if (title && author) {
    bookArray.forEach((book) => {
      if (book.title === title) {
        shouldAdd = false;
      }
    });

    if (shouldAdd) {
      book.title = title;
      book.author = author;
      bookArray.push(book);
    }
  }
}

function removeBook(title) {
  bookArray = bookArray.filter((book) => book.title !== title);
}

function saveToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(bookArray));
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const titleInput = document.getElementById('book_title');
  const authorInput = document.getElementById('book_author');
  addBook(titleInput.value, authorInput.value);
  saveToLocalStorage();
});

const tableList = document.getElementById('bookList');

bookArray.forEach((book) => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  td.innerHTML = `<span>${book.title}</span> by ${book.author}`;

  const removeButton = document.createElement('button');
  removeButton.id = 'removeButton';

  td.appendChild(removeButton);
  tr.appendChild(td);
  tableList.appendChild(tr);
});

const removeButtonArray = Array.from(document.querySelectorAll('#removeButton'));

removeButtonArray.forEach((removeButton) => {
  removeButton.addEventListener('click', (e) => {
    const clickedTd = e.target;
    console.log(clickedTd);
  });
});

window.onload = () => {
  if (localStorage.getItem('books') !== null) {
    bookArray = JSON.parse(localStorage.getItem('books'));
  }
};