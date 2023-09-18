let navbar = document.querySelector('navbar');

document.querySelector('#menu').onclick = () =>{
    navbar.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}


$(document).ready(function(){
    $('.button').click(function(){
        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')
        
        if(filter == 'all'){
            $('.gallery .image').show(400);
        }
        else{
            $('.gallery .image').not('.' +filter).hide(200);
            $('.gallery .image').filter('.' +filter).show(200);
        }
    })

    $('.gallery').magnificPopup({
        delegate:'a',
        type:'image',
        gallery:{
            enabled:true,
        }
    })
})

//Scroll buttons services

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})


// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});


const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    //Records the initial cursor and scroll position of the caroussel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; //if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging")
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}
autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");

    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



// Buttons scrolling slider coments

let count = 1;
const maxCount = 4;

// Defina a função para avançar para a próxima imagem
function nextImage() {
    count++;
    if (count > maxCount) {
        count = 1;
    }
    const radioId = "radio" + count;
    document.getElementById(radioId).checked = true;
}

// Inicialize o intervalo para mudar de imagem a cada 5 segundos
const interval = setInterval(nextImage, 5000);

// Certifique-se de que o intervalo seja limpo quando necessário (por exemplo, ao parar a rotação)
function stopRotation() {
    clearInterval(interval);
}
;


