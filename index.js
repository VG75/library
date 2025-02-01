const showDialogBtn = document.querySelector(".add-book-btn button");
const closeDialogBtn = document.querySelector("#close-dialog"); // Use correct button
const dialog = document.querySelector("dialog");
const form = document.querySelector(".add-book-form");
const bookShelf = document.querySelector(".book-shelf");
const deleteBook = document.querySelectorAll(".bi-x-circle");


const newTitle = document.querySelector("#titel"); // You had a typo: "titel" instead of "title"
const newAuthor = document.querySelector("#author");
const newPage = document.querySelector("#no-pages"); 
const readStatus = document.querySelectorAll("#read-status")
let library = [
    {title: "Harry Potter 1", author: "JK Rowling", pages: 297, read: false},
    {title: "Harry Potter 2", author: "JK Rowling", pages: 296, read: false},
    {title: "Harry Potter 3", author: "JK Rowling", pages: 298, read: false},
    {title: "Harry Potter 4", author: "JK Rowling", pages: 299, read: false}
]



showDialogBtn.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("close", addBooksToShelf)
  
  // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
closeDialogBtn.addEventListener("click", (event) => {
    if (!form.checkValidity()) {
        return;
    }
    event.preventDefault(); 
    let newBook = new Book(newTitle.value, newAuthor.value, newPage.value, readStatus.checked);
    library.push(newBook);
    
   dialog.close(); 
});

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

deleteBook.forEach(book => {
    book.addEventListener("click", (e) => {
        let index = parseInt(e.target.closest(".book-card").dataset.index, 10);
        library.splice(index, 1);
        addBooksToShelf();
    });
});



function addBooksToShelf() {
    bookShelf.innerHTML = ""; // Clear previous books to prevent duplication

    for (let i = 0; i < library.length; i++) {
        let book = library[i];
        const curBook = `<div class="book-card" data-index=${i}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                <div class="book-card-flex">
                    <div class="title-text">
                        <h3 class="book-name">${book.title}</h3>
                        <p class="author-name">By ${book.author}</p>
                    </div>
                    <div class="book-prop">
                        <p class="pages">Pages: ${book.pages}</p>
                        <div>
                            <label for="read-${i}">Read</label>
                            <input type="checkbox" id="read-${i}" ${book.read ? "checked" : ""}>
                        </div>
                    </div>
                </div>
            </div>`;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = curBook;
        tempDiv.firstElementChild.addEventListener("click", (e) => {
            let index = parseInt(e.target.closest(".book-card").dataset.index, 10);
            library.splice(index, 1);
            addBooksToShelf();
        });
        bookShelf.appendChild(tempDiv);

    }
}

