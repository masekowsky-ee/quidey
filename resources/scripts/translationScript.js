const translations = {
    de: {

    },
    en: {

    }
};

function setLanguage(lang) {
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = translations[lang][key];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "de";
    setLanguage(lang);
})