const translations = {
    de: {
        menu_title: "Menü",
        menu_feedback_li: "Feedback",
        menu_about_li: "Über Learney",
        menu_toPlan_li: "Dein Plan",
        menu_newPlan_li: "Neuer Plan",
        menu_settings_li: "Einstellungen",
        settings_h1: "Einstellungen",
        language_h2: "Sprache:",
        german: "Deutsch",
        english: "Englisch",
    },
    en: {
        menu_title: "Menu",
        menu_feedback_li: "Feedback",
        menu_about_li: "About Learney",
        menu_toPlan_li: "Your Plan",
        menu_newPlan_li: "New Plan",
        menu_settings_li: "Settings",
        settings_h1: "Settings",
        language_h2: "Language:",
        german: "German",
        english: "English",
    }
};

//  NEU: Sprache normalisieren
function normalizeLang(lang) {
    console.log(lang);
    if (!lang) return "en";

    if (lang.startsWith("de")){ 
        return "de";
    }else if (lang.startsWith("en")){ 
        return "en";
    } else {
        return "en";     //if no match default to english
    }


    return "en";
}

function setLanguage(lang) {
    lang = normalizeLang(lang); // HIER FIX

    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const text = translations[lang]?.[key];

        if (!text) {
            console.warn("Missing translation:", key);
        }

        console.log("LANG:", lang, "KEY:", key, "TEXT:", text);

        el.textContent = text || key;
    });
}

function applyTranslations() {
    let lang = localStorage.getItem("lang");

    if (!lang) {
        lang = navigator.language; // z.B. "en-US"
    }

    setLanguage(lang);
}

document.addEventListener("DOMContentLoaded", applyTranslations);