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
        enter_sub: "Fach eingeben...",
        val_physics: "Physik",
        val_maths: "Mathematik",
        val_english: "Englisch",
        val_latin: "Latein",
        val_french: "Französisch",
        val_german: "Deutsch",
        val_chemistry: "Chemie",
        val_biology: "Biologie",
        val_history: "Geschichte",
        val_geography: "Geografie",
        val_computer: "Informatik",
        add_subject: "Fach hinzufügen",

        add_date: "Füge das Datum hinzu!",
        date_when_h3: "Wann möchtest du fertig sein mit:",

        know_already: "Wie gut kennst du dich bereits aus?",

        how_often: "Wie oft kannst du lernen?",

        //nav
        back_button: "Zurück",
        continue_button: "Weiter",
        leave_button: "Verlassen",

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
        enter_sub: "Enter subject...",
        val_physics: "Physics",
        val_maths: "Maths",
        val_english: "English",
        val_latin: "Latin",
        val_french: "French",
        val_german: "German",
        val_chemistry: "Chemistry",
        val_biology: "Biology",
        val_history: "History",
        val_geography: "Geography",
        val_computer: "Computer Science",
        add_subject: "Add Subject",

        add_date: "Add a due date!",
        date_when_h3: "When do you want to finish:",

        know_already: "How much do you already know?",

        how_often: "How often can you study?",

        //nav
        back_button: "Back",
        continue_button: "Continue",
        leave_button: "Leave",

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
    //text content
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const text = translations[lang]?.[key];

        if (!text) {
            console.warn("Missing translation:", key);
        }

        console.log("LANG:", lang, "KEY:", key, "TEXT:", text);

        el.textContent = text || key;
    });

    //placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
        const key = el.dataset.i18nPlaceholder;
        const text = translations[lang]?.[key];

        if (!text) {
            console.warn("Missing translation:", key);
        }

        console.log("LANG:", lang, "KEY:", key, "TEXT:", text);

        el.placeholder = text || key;
    });

    //value
    document.querySelectorAll("[data-i18n-value]").forEach(el=>{
        const key = el.dataset.i18nValue;
        const text = translations[lang]?.[key];

        if (!text) {
            console.warn("Missing translation:", key);
        }

        console.log("LANG:", lang, "KEY:", key, "TEXT:", text);

        el.value = text || key;
    });

    //Title (tooltip etc)
    document.querySelectorAll("[data-i18n-title]").forEach(el=>{
        const key = el.dataset.i18nTitle;
        const text = translations[lang]?.[key];

        if (!text) {
            console.warn("Missing translation:", key);
        }

        console.log("LANG:", lang, "KEY:", key, "TEXT:", text);

        el.title = text || key;
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