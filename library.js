let tableElem = document.querySelector('#display-table');

let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  //read should be a boolean
  this.read = read ? 'read' : 'not read';
}

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
  render(bookObj);
  console.log(`Push of ${bookObj.name} completed`);
}

function render(book){
  let content = document.createElement('tr');
  let bookArrayConversion = Object.values(book);
  for (let i = 0; i < bookArrayConversion.length; i++){
    let cell = document.createElement("td");
    var cellText = document.createTextNode(`${bookArrayConversion[i]}`);
    cell.appendChild(cellText);
    content.appendChild(cell);
  }
  tableElem.appendChild(content);
}

let Hobbit = new Book('The Hobbit','Tolkien', 100, false);

addBookToLibrary(Hobbit);

document.querySelector('.close').addEventListener('click', function(){
  document.querySelector('.bg-modal').style.display = 'none';
});

document.querySelector('.open').addEventListener('click', function(){
  document.querySelector('.bg-modal').style.display = 'flex';
});