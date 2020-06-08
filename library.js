let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  //read will be a boolean
  this.read = this.read ? 'read' : 'not read';
  // the constructor...
}

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
  console.log(`Push of ${bookObj.name} completed`);
  // do stuff here
}

let Hobbit = new Book('The Hobbit','Tolkien', 100, false);

addBookToLibrary(Hobbit);