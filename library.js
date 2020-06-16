let tableElem = document.querySelector('#display-table');
const bookInput = document.getElementById('book');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const form = document.getElementById('form');
const submitButton = document.getElementById('submit-button');
// const statusInput = document.querySelector('input[name="has-read"]:checked').value;


let myLibrary = [];

let localStorageKeys = Object.keys(localStorage);

// book constructor
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  //read should be a boolean ? maybe
  this.read = read ? 'read' : 'not read';
}
// function which appends the book to the table)
function render(book){

  let content = document.createElement('tr');
  let bookArrayConversion = Object.values(book);

  for (let i = 0; i < bookArrayConversion.length; i++){
    let cell = document.createElement("td");
    var cellText = document.createTextNode(`${bookArrayConversion[i]}`);
    cell.appendChild(cellText);
    content.appendChild(cell);
  }
  //adds the delete button to each rendered item

  let delElem = document.createElement('td')
  let delButton = document.createTextNode('X');
  delElem.className = book.name;
  delElem.setAttribute('id', 'delete');

  delElem.appendChild(delButton);
  content.appendChild(delElem);
  tableElem.appendChild(content);
}

//adds a given book to the library and renders it
function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
  render(bookObj);
  console.log(`Push of ${bookObj.name} completed`);
}

//hides the mdoal when the "close" button is clicked
document.querySelector('.close').addEventListener('click', function(){
  document.querySelector('.bg-modal').style.display = 'none';
});

//reveals the modal when the '+' button is clicked
document.querySelector('.open').addEventListener('click', function(){
  document.querySelector('.bg-modal').style.display = 'flex';
});

//renders all keys stored in the local storage
//first it converts them from string to an object
for (let i = 0; i < localStorageKeys.length; i++){
  render(JSON.parse(localStorage.getItem(localStorageKeys[i])));
}

//selects all buttons with the #delete id and attaches an event listener to each
//as the delete buttons are generated with the class name of the localStorage key
//once the key is entered a given key with a given classname is removed from localstorage
const deleteButtons = document.querySelectorAll('#delete');
deleteButtons.forEach((button) => {
  button.addEventListener('click', (e) =>{
    localStorage.removeItem(button.className);
    location.reload();
  })
})

form.addEventListener('submit', (e) => {
  let newBook = new Book(bookInput.value, authorInput.value, pagesInput.value, document.querySelector('input[name="has-read"]:checked').value)
  let newBook_serialized = JSON.stringify(newBook);
  localStorage.setItem(bookInput.value, newBook_serialized);

});