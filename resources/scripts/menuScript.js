const menuHTML = document.getElementById('menuHTML');

const openMenu = () => {
    document.getElementById('menuHTML').classList.add('open');
};

const closeMenu = () => {
    document.getElementById('menuHTML').classList.remove('open');
};

// Menü laden
document.addEventListener("DOMContentLoaded", () => {
    fetch("./resources/html/menu.html")
        .then(res => res.text())
        .then(html => {
            console.log("MENU HTML:", html);
            if (!document.getElementById('menuHTML')) {
                document.body.insertAdjacentHTML("afterbegin", html);
                initMenuEvents(); // 👉 erst jetzt!
            }
        });
});

function initMenuEvents() {
    //const menuIcon = document.getElementById("menuIconImg");
    //if (menuIcon) menuIcon.addEventListener("click", openMenu);

    ["menuHeadH1", "menuHeadImg"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", closeMenu);
    });
}

const menuIcon = document.getElementById("menuIconImg");
if (menuIcon) menuIcon.addEventListener("click", openMenu);