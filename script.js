class AwesomeBooks {
  constructor() {
    this.bookArray = [],
    this.book = {
      title: '',
      author: '',
    }
  }

  addBook(title, author) {
    let shouldAdd = true;
    if (title && author) {
      this.bookArray.forEach((book) => {
        if (book.title === title) {
          shouldAdd = false;
        }
      });
  
      if (shouldAdd) {
        this.book.title = title;
        this.book.author = author;
        this.bookArray.push(this.book);
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
      const td = document.createElement('td');
  
      td.innerHTML = `<span>${this.book.title}</span> by ${this.book.author}`;
  
      const removeButton = document.createElement('button');
      removeButton.className = 'removeButton';
      removeButton.type = 'button';
      removeButton.innerHTML = 'Remove';
  
      removeButton.addEventListener('click', (e) => {
        const title = e.target.parentNode.firstChild.textContent;
        this.removeBook(title);
        this.saveToLocalStorage();
        window.location.reload();
      });
  
      td.appendChild(removeButton);
      tr.appendChild(td);
      tableList.appendChild(tr);
    });
  }

  handleSubmit() {
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('book_title');
      const authorInput = document.getElementById('book_author');
      this.addBook(titleInput.value, authorInput.value);
      this.saveToLocalStorage();
      this.populateTable();
      titleInput.value = '';
      authorInput.value = '';
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

let books = new AwesomeBooks();

books.handleSubmit();
books.reloadPage();