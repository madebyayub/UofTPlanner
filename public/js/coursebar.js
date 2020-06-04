var sidebar = document.getElementById("coursebar");
var showBtn = document.querySelector(".show-coursebar");
var closeBtn = document.querySelector(".hide-coursebar");

showBtn.addEventListener("click", function () {
  sidebar.classList.add("toggled");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("toggled");
});
