class AwesomeBooks {
  constructor() {
    this.bookArray = [];
  }

  addBook(booktitle, bookauthor) {
    const book = {
      title: booktitle,
      author: bookauthor,
    };

    let shouldAdd = true;
    if (booktitle && bookauthor) {
      this.bookArray.forEach((book) => {
        if (book.title === booktitle) {
          shouldAdd = false;
        }
      });

      if (shouldAdd) {
        this.bookArray.push(book);
      }
    }
  }

  removeBook(title) {
    this.bookArray = this.bookArray.filter((book) => book.title !== title);
  }

  saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.bookArray));
  }

  populateTable() {
    const tableList = document.getElementById('bookList');

    this.bookArray.forEach((book) => {
      const tr = document.createElement('tr');
      tr.className = 'table-row';
      const td = document.createElement('td');
      td.className = 'table-entry';

      td.innerHTML = `<div><span>"${book.title}"</span> by ${book.author} </div>`;

      const removeButton = document.createElement('button');
      removeButton.className = 'removeButton';
      removeButton.type = 'button';
      removeButton.innerHTML = 'Remove';

      removeButton.addEventListener('click', (e) => {
        const title = e.target.parentNode.firstChild.firstChild.textContent;
        this.removeBook(title);
        this.saveToLocalStorage();
        window.location.reload();
      });

      td.appendChild(removeButton);
      tr.appendChild(td);
      tableList.appendChild(tr);
      tableList.style.border = '1px solid #789';
    });
  }

  handleSubmit() {
    const form = document.getElementById('form');

    form.addEventListener('submit', () => {
      const titleInput = document.getElementById('book_title');
      const authorInput = document.getElementById('book_author');
      this.addBook(titleInput.value, authorInput.value);
      this.saveToLocalStorage();
    });
  }

  setDateStamp() {
    const DateTime = luxon.DateTime; /* eslint-disable-line no-undef, prefer-destructuring */
    this.timeP = document.querySelector('.current-time');
    this.timeP.innerHTML = DateTime.now().toFormat('FF'); /* eslint-disable-line no-undef */
  }

  handleMenuList() {
    this.menuList = Array.from(document.querySelectorAll('.menu-item'));
    const listSection = document.querySelector('.List-section');
    const addSection = document.querySelector('.Add-section');
    const contactSection = document.querySelector('.Contact-section');

    this.menuList.forEach((menuItem) => {
      menuItem.addEventListener('click', () => {
        switch (menuItem.classList[1]) {
          case 'one':
            listSection.style.display = 'flex';
            addSection.style.display = 'none';
            contactSection.style.display = 'none';
            break;
          case 'two':
            listSection.style.display = 'none';
            addSection.style.display = 'flex';
            contactSection.style.display = 'none';
            break;
          case 'three':
            listSection.style.display = 'none';
            addSection.style.display = 'none';
            contactSection.style.display = 'flex';
            break;
          default:
            break;
        }
      });
    });
  }

  reloadPage() {
    window.onload = () => {
      if (localStorage.getItem('books') !== null) {
        this.bookArray = JSON.parse(localStorage.getItem('books'));
        this.populateTable();
      }
    };
  }
}

const books = new AwesomeBooks();

books.handleSubmit();
books.handleMenuList();
books.setDateStamp();
books.reloadPage();