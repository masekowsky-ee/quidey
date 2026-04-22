const translations = {
    de: {
        //menu page
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

        //index page
        index_letsGo: "Lass uns deinen Lernplan Generieren",

        //q page
        q_welcome_h1: "Willkommen bei Learney",
        q_introText: "Learney gibt dir einen klaren Pfad: Schritt für Schritt, Ziel für Ziel. Du weißt immer, wo du stehst und was als Nächstes kommt. Kein Raten. Kein Verlaufen. Nur Fortschritt.",
        q_motto_h2: "Lernen ist kein Chaos - es ist ein Weg.",
        q_ready: "Bereit, loszulegen?",

        sub_letsGo: "Lass uns loslegen!",
        sub_studyFor: "Was möchtest du lernen?",
        sub_physics: "Physik",
        sub_maths: "Mathematik",
        sub_english: "Englisch",
        sub_latin: "Latein",
        sub_french: "Französisch",
        sub_german: "Deutsch",
        sub_chemistry: "Chemie",
        sub_biology: "Biologie",
        sub_history: "Geschichte",
        sub_geography: "Geografie",
        sub_computer: "Informatik",

    },
    en: {
        //menu page
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

        //index page
        index_letsGo: "Let's build your study schedule",

        //q page
        q_welcome_h1: "Welcome to Learney",
        q_introText: "Learney gives you a clear path: step by step, goal by goal. You always know where you stand and what comes next. No guessing. No getting lost. Just progress.",
        q_motto_h2: "Learning isn't chaos — it's a path.",
        q_ready: "Ready to start?",
    
        sub_letsGo: "Let's begin!",
        sub_studyFor: "What are you studying for?",
        sub_physics: "Physics",
        sub_maths: "Maths",
        sub_english: "English",
        sub_latin: "Latin",
        sub_french: "French",
        sub_german: "German",
        sub_chemistry: "Chemistry",
        sub_biology: "Biology",
        sub_history: "History",
        sub_geography: "Geography",
        sub_computer: "Computer Science",
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