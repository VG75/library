const showDialogBtn = document.querySelector(".add-book-btn");
const closeDialogBtn = document.querySelector("dialog button");
const dialog = document.querySelector("dialog");

showDialogBtn.addEventListener("click", (e) => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
    dialog.close();
})