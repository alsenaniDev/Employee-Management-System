function toggleTheme(theme) {
  let root = document.querySelector(":root");
  let sun = document.getElementById("sun");
  let moon = document.getElementById("moon");

  if (theme === "dark") {
    root.setAttribute("theme", "dark");
    sun.style.display = "";
    moon.style.display = "none";
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("theme", "light");
    sun.style.display = "none";
    moon.style.display = "";
    localStorage.setItem("theme", "light");
  }
}

document.addEventListener("readystatechange", function () {
  toggleTheme(localStorage.getItem("theme"))
});
