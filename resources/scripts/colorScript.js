const lightRadio = document.getElementById('light');
const darkRadio = document.getElementById('dark');

const setTheme = (theme) => {
    localStorage.setItem("theme", theme)
};