const openMenu = () => {
    document.getElementById('menu').classList.add('open');
}

const closeMenu = () => {
    document.getElementById('menu').classList.remove('open');
}

//open menu
document.getElementById("menuIconImg").addEventListener("click", openMenu);
//close menu
['menuHeadH1', 'menuHeadImg'].forEach(id => {
    document.getElementById(id).addEventListener('click', closeMenu);
});
