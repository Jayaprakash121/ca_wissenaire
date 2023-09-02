let items = document.querySelectorAll(".slider .item");
let names = document.querySelectorAll(".slider .item .item-name");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

let active = 3;
function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = "none";
    items[active].style.opacity = 1;

    for (var i = 0; i < items.length; i++) {
        if (i == active)
            continue;
        stt = i - active;
        if (i > active) {
            items[i].style.transform = `translateX(${150 * stt}px) scale(${1 - 0.2 * stt
                }) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = `blur(5px)`;
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = stt > 0 ? stt : -stt;
        if (i < active) {
            items[i].style.transform = `translateX(${-150 * stt}px) scale(${1 - 0.2 * stt
                }) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = `blur(5px)`;
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

    }
    if (active == 0) {
        items[items.length - 1].style.transform = `translateX(-150px) scale(0.8
            ) perspective(16px) rotateY(1deg)`;
        items[items.length - 1].style.zIndex = -1;
        items[items.length - 1].style.opacity = 0.6;
        items[items.length - 2].style.transform = `translateX(-300px) scale(0.6
            ) perspective(16px) rotateY(1deg)`;
        items[items.length - 2].style.zIndex = -2;
        items[items.length - 2].style.opacity = 0.6;
    }
    if (active == 1) {
        items[items.length - 1].style.transform = `translateX(-300px) scale(0.6
            ) perspective(16px) rotateY(1deg)`;
        items[items.length - 1].style.zIndex = -1;
        items[items.length - 1].style.opacity = 0.6;
    }
    if (active == items.length - 1) {
        items[0].style.transform = `translateX(150px) scale(0.8
            ) perspective(16px) rotateY(-1deg)`;
        items[0].style.zIndex = -1;
        items[0].style.opacity = 0.6;
        items[1].style.transform = `translateX(300px) scale(0.6
            ) perspective(16px) rotateY(-1deg)`;
        items[1].style.zIndex = -2;
        items[1].style.opacity = 0.6;
    }
    if (active == items.length - 2) {
        items[0].style.transform = `translateX(300px) scale(0.6
            ) perspective(16px) rotateY(-1deg)`;
        items[0].style.zIndex = -1;
        items[0].style.opacity = 0.6;
    }
}
loadShow();
next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
};
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
};

setInterval(() => {
    active = active + 1 < items.length ? active + 1 : 0;
    loadShow();
}, 2000);

let navs = document.getElementsByClassName("navs");
let cel = document.getElementById("navitems");
let menu = document.getElementById('menu')


menu.onclick = function () {
    if (menu.classList.contains("bars")) {
        cel.classList.add('appear')
        cel.classList.remove('disappear')
        setTimeout(() => {
            menu.classList.remove("bars");
            menu.classList.add("xmark");
            menu.classList.remove("zero");
        }, 100);
    } else {
        cel.classList.add('disappear')
        setTimeout(() => {
            menu.classList.remove("xmark");
            menu.classList.add("bars");
            menu.classList.remove("zero");
            cel.classList.remove('appear')
        }, 100);
    }
};



for (var j = 0; j < navs.length; j++) {
    navs[j].onclick = () => {
        cel.classList.add('disappear')
        menu.classList.add("zero");
        setTimeout(() => {
            menu.classList.remove("xmark");
            menu.classList.add("bars");
            menu.classList.remove("zero");
        }, 100);
        cel.classList.add("remove");
        setTimeout(() => {
            cel.classList.remove("show");
            cel.classList.remove("remove");
            cel.classList.remove('appear')
        }, 300);
    };
}

let c = document.getElementsByClassName('card')
let Y = window.innerHeight;
window.addEventListener('scroll', () => {
    cel.classList.add('disappear')
    menu.classList.add("zero");
    setTimeout(() => {
        menu.classList.remove("xmark");
        menu.classList.add("bars");
        menu.classList.remove("zero");
    }, 100);
        var k = c[0].getBoundingClientRect().top
        if (k <= -150)
            c[0].classList.remove('rotate')
        else if (k <= (10 * Y / 18))
            c[0].classList.add('rotate')
        else if (k >= (3 * Y / 5))
            c[0].classList.remove('rotate')
})


