const tcg_button = document.getElementById("tcg");
const tabletop_button = document.getElementById("tabletop");
const books_button = document.getElementById("books");
const manga_button = document.getElementById("manga");

tcg_button.addEventListener("click", load_tcg);
tabletop_button.addEventListener("click", load_tabletop);
books_button.addEventListener("click", load_books);
manga_button.addEventListener("click", load_manga);

function load_tcg() {
  location.href = "/tcg";
}

function load_tabletop() {
  location.href = "/tabletop";
}

function load_books() {
  location.href = "/books";
}

function load_manga() {
  location.href = "/manga";
}
