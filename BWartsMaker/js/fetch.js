//Adição de header e footer nas páginas
fetch("header.html")
.then(response => response.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});

fetch("footer.html")
.then(response => response.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});