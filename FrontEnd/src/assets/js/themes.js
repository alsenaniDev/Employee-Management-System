function toggleTheme(isDarkTheme) {
  isDarkTheme = !isDarkTheme;
  let theme = localStorage.getItem("theme");
  let root = document.querySelector(":root");

  if (isDarkTheme) {
    root.style.setProperty("--navColor", "#3a3a3a");
    root.style.setProperty("--textColor", "#fff");
    root.style.setProperty("--textHover", "#dbdfff");
    root.style.setProperty("--colorForMainPart", "#4c4c4c");
    root.style.setProperty("--cardColor", "#262626");
    root.style.setProperty("--btnPrimary", "#FFFFFF");
    root.style.setProperty("--BarColor", "#FFFFFF");
  } else {
    root.style.setProperty("--navColor", "#fff");
    root.style.setProperty("--textColor", "#012970");
    root.style.setProperty("--textHover", "#4154f1");
    root.style.setProperty("--colorForMainPart", "#f6f9ff");
    root.style.setProperty("--cardColor", "#FFFFFF");
    root.style.setProperty("--btnPrimary", "#0d6efd");
    root.style.setProperty("--BarColor", "#012970");
  }
}

function firstCheck() {
  let theme = localStorage.getItem("theme");
  let root = document.querySelector(":root");

  if (theme === "dark") {
    root.style.setProperty("--navColor", "#3a3a3a");
    root.style.setProperty("--textColor", "#fff");
    root.style.setProperty("--textHover", "#dbdfff");
    root.style.setProperty("--colorForMainPart", "#4c4c4c");
    root.style.setProperty("--cardColor", "#262626");
    root.style.setProperty("--btnPrimary", "#FFFFFF");
    root.style.setProperty("--BarColor", "#FFFFFF");
  } else {
    root.style.setProperty("--navColor", "#fff");
    root.style.setProperty("--textColor", "#012970");
    root.style.setProperty("--textHover", "#4154f1");
    root.style.setProperty("--colorForMainPart", "#f6f9ff");
    root.style.setProperty("--cardColor", "#FFFFFF");
    root.style.setProperty("--btnPrimary", "#0d6efd");
    root.style.setProperty("--BarColor", "#012970");
  }
}

window.onload = firstCheck();
