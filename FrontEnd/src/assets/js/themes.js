function toggleTheme(isDarkTheme) {
  isDarkTheme = !isDarkTheme;
  let theme = localStorage.getItem("theme");
  let root = document.querySelector(":root");

  if (isDarkTheme) {
    root.style.setProperty('--primaryColor', '#3a3a3a');
    root.style.setProperty('--textColor', '#fff');
    root.style.setProperty('--textHover', '#dbdfff');
    root.style.setProperty('--secondaryColor', '#4c4c4c');
  } else {
    root.style.setProperty('--primaryColor', '#fff');
    root.style.setProperty('--textColor', '#012970');
    root.style.setProperty('--textHover', '#4154f1');
    root.style.setProperty('--secondaryColor', '#f6f9ff');
  }
}

function firstCheck() {
  let theme = localStorage.getItem("theme");
  let root = document.querySelector(":root");
  if (theme === 'dark') {
    root.style.setProperty('--primaryColor', '#3a3a3a');
    root.style.setProperty('--textColor', '#fff');
    root.style.setProperty('--textHover', '#dbdfff');
    root.style.setProperty('--secondaryColor', '#4c4c4c');
  } else {
    root.style.setProperty('--primaryColor', '#fff');
    root.style.setProperty('--textColor', '#012970');
    root.style.setProperty('--textHover', '#4154f1');
    root.style.setProperty('--secondaryColor', '#f6f9ff');
  }
}

window.onload = firstCheck();
