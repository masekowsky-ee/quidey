
const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme)
};

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "default";
    setTheme(theme);
})