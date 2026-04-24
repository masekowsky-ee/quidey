const lightRadio = document.getElementById('light');
const darkRadio = document.getElementById('dark');
const mosaikRadio = document.getElementById('mosaik');

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme)
};

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "dark";
    setTheme(theme);
})