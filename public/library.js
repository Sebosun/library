let tableElem = document.querySelector("#display-table");
const bookInput = document.getElementById("book");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const form = document.getElementById("form");
const submitButton = document.getElementById("submit-button");
// const statusInput = document.querySelector('input[name="has-read"]:checked').value;

function saveBook(book) {
  return firebase
    .firestore()
    .collection("books")
    .add({
      name: book.name,
      author: book.author,
      pages: book.pages,
      read: book.read,
    })
    .catch(function (error) {
      console.error("Error writing messages to firebase", error);
    });
}

function loadBooks() {
  var query = firebase.firestore().collection("books");
  // autyzm ja jebie
  query.get().then(function (querySnapshot) {
    if (!querySnapshot.empty) {
      // console.log(querySnapshot.docs[0].data());
      querySnapshot.docs.map(function (documentSnapshot) {
        let book = documentSnapshot.data();
        render(
          {
            book: book.name,
            author: book.author,
            pages: book.pages,
            read: book.read,
          },
          documentSnapshot
        );
      });
    } else {
      console.log("No document found");
    }
  });
}
// let localStorageKeys = Object.keys(localStorage);

// book constructor
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read === "read" ? true : false;
}

function changeReadStatus(readStatus, data) {
  firebase
    .firestore()
    .collection("books")
    .doc(data.id)
    .update({
      read: readStatus ? false : true,
    })
    .then(() => {
      location.reload();
    });
}

function deleteBook(data) {
  return firebase.firestore().collection("books").doc(data.id).delete();
}

// function which appends the book to the table)
function render(book, data) {
  let content = document.createElement("tr");
  let bookArrayConversion = Object.values(book);

  for (let i = 0; i < bookArrayConversion.length; i++) {
    let cell = document.createElement("td");
    var cellText = document.createTextNode(`${bookArrayConversion[i]}`);
    //sets it so that later we are able to know which read button comes from which
    //object
    if (bookArrayConversion[i] === false || bookArrayConversion[i] === true) {
      cell.className = book.name;
      cell.setAttribute("id", "read");
      cell.addEventListener("click", (e) => {
        changeReadStatus(book.read, data);
      });
    }
    cell.appendChild(cellText);
    content.appendChild(cell);
  }
  //adds the delete button to each rendered item

  let delElem = document.createElement("td");
  let delButton = document.createTextNode("X");
  delElem.className = book.name;
  delElem.setAttribute("id", "delete");

  delElem.addEventListener("click", (e) => {
    deleteBook(data).then(function () {
      location.reload();
    });
  });
  delElem.appendChild(delButton);
  content.appendChild(delElem);
  tableElem.appendChild(content);
}

//adds a given book to the library and renders it
// function addBookToLibrary(bookObj) { myLibrary.push(bookObj); render(bookObj);
//   console.log(`Push of ${bookObj.name} completed`);
// }

//hides the mdoal when the "close" button is clicked
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

//reveals the modal when the '+' button is clicked
document.querySelector(".open").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});

//renders all keys stored in the local storage
//first it converts them from string to an object
// for (let i = 0; i < localStorageKeys.length; i++) {
//   render(JSON.parse(localStorage.getItem(localStorageKeys[i])));
// }

//selects all buttons with the #delete id and attaches an event listener to each
//as the delete buttons are generated with the class name of the localStorage key
//once the key is entered a given key with a given classname is removed from localstorage
const deleteButtons = document.querySelectorAll("#delete");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    localStorage.removeItem(button.className);
    location.reload();
  });
});

//works similarly to delete button, finds read buttons with #read id
// adds event listener to each, once pressed based on the class searched for the key
// in the localStorage, parses it via JSON, changes the read property and replaces localstorage;
// const readButtons = document.querySelectorAll("#read");
// readButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     let tempBook = JSON.parse(localStorage[button.className]);
//     if (tempBook.read === "read") {
//       tempBook.read = "not read";
//     } else {
//       tempBook.read = "read";
//     }
//     localStorage.setItem(button.className, JSON.stringify(tempBook));
//     // location.reload();
//   });
// });

//once the 'submit' button is pressed, adds the book to localStorage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new Book(
    bookInput.value,
    authorInput.value,
    pagesInput.value,
    document.querySelector('input[name="has-read"]:checked').value
  );

  saveBook(newBook).then(function () {
    location.reload();
  });
  // let newBook_serialized = JSON.stringify(newBook);
  // localStorage.setItem(bookInput.value, newBook_serialized);
});

loadBooks();
