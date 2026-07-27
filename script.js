const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("gallery");

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", function () {

    const files = this.files;

    for (let file of files) {

        const url = URL.createObjectURL(file);

        const card = document.createElement("div");
        card.className = "card";

        let media;

        if (file.type.startsWith("image")) {

            media = document.createElement("img");
            media.src = url;

        } else if (file.type.startsWith("video")) {

            media = document.createElement("video");
            media.src = url;
            media.controls = true;
            media.muted = true;
        }

        const heart = document.createElement("i");
        heart.className = "fa-regular fa-heart";

        card.appendChild(media);
        card.appendChild(heart);

        gallery.appendChild(card);

        card.addEventListener("click", () => {
            openMedia(card);
        });

    }

    fileInput.value = "";
});


// ================================
// SELECT MODAL ELEMENTS
// ================================

const modalImage = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");


// ================================
// OPEN MODAL
// ================================

function openMedia(card){

currentCard = card;

currentIndex =
Array.from(cards).indexOf(card);

const media =
card.querySelector("img,video");

const src = media.src;

modal.style.display = "flex";

if(media.tagName==="IMG"){

modalVideo.style.display="none";
modalVideo.pause();

modalImage.style.display="block";
modalImage.src=src;

}else{

modalImage.style.display="none";

modalVideo.style.display="block";

modalVideo.src=src;

modalVideo.play();

}

}


// ================================
// CLICK CARD
// ================================

cards.forEach(card=>{

card.addEventListener("click",()=>{

openMedia(card);

});

});


// ================================
// CLOSE MODAL
// ================================

closeBtn.onclick=()=>{

modal.style.display="none";

modalVideo.pause();

};


// ================================
// CLICK OUTSIDE
// ================================

modal.onclick=e=>{

if(e.target===modal){

modal.style.display="none";

modalVideo.pause();

}

};


// ================================
// UPLOAD BUTTON
// ================================

uploadBtn.addEventListener("click",()=>{

fileInput.click();

});


// ================================
// UPLOAD FILE
// ================================

fileInput.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const url=URL.createObjectURL(file);

replaceMedia(url,file.type);

});


// ================================
// REPLACE MEDIA
// ================================

function replaceMedia(url,type){

if(!currentCard){

alert("Click any gallery image first.");

return;

}

const old=currentCard.querySelector("img,video");

old.remove();

let media;

if(type.startsWith("image")){

media=document.createElement("img");

media.src=url;

}

else{

media=document.createElement("video");

media.src=url;

media.controls=false;

media.muted=true;

}

currentCard.prepend(media);

media.addEventListener("click",()=>{

openMedia(currentCard);

});

alert("Media Updated Successfully!");

}


// ================================
// PREVIOUS IMAGE
// ================================

function previousMedia(){

currentIndex--;

if(currentIndex<0)

currentIndex=cards.length-1;

openMedia(cards[currentIndex]);

}


// ================================
// NEXT IMAGE
// ================================

function nextMedia(){

currentIndex++;

if(currentIndex>=cards.length)

currentIndex=0;

openMedia(cards[currentIndex]);

}

prevBtn.onclick=previousMedia;

nextBtn.onclick=nextMedia;
let selectedImage = null;

document.querySelectorAll(".gallery img").forEach(img=>{

img.addEventListener("click",()=>{

document.querySelectorAll(".gallery img").forEach(i=>{

i.classList.remove("selected");

});

img.classList.add("selected");

selectedImage = img;

});

});

const sliders={

brightness,
contrast,
saturation,
blur,
grayscale,
sepia,
hue,
invert

};

Object.values(sliders).forEach(slider=>{

slider.addEventListener("input",applyFilters);

});

function applyFilters(){

if(!selectedImage) return;

selectedImage.style.filter=`

brightness(${brightness.value}%)

contrast(${contrast.value}%)

saturate(${saturation.value}%)

blur(${blur.value}px)

grayscale(${grayscale.value}%)

sepia(${sepia.value}%)

hue-rotate(${hue.value}deg)

invert(${invert.value}%)

`;

}

resetFilters.onclick=()=>{

brightness.value=100;
contrast.value=100;
saturation.value=100;
blur.value=0;
grayscale.value=0;
sepia.value=0;
hue.value=0;
invert.value=0;

applyFilters();

};

const preview = document.getElementById("previewImage");

let selectedCard = null;

// Event delegation so uploaded images work too
document.getElementById("gallery").addEventListener("click", function(e){

    const img = e.target.closest(".card img");

    if(!img) return;

    document.querySelectorAll(".card").forEach(card=>{

        card.classList.remove("selected");

    });

    selectedCard = img.closest(".card");

    selectedCard.classList.add("selected");

    preview.src = img.src;

    applyFilters();

});

function applyFilters(){

preview.style.filter=`

brightness(${brightness.value}%)

contrast(${contrast.value}%)

saturate(${saturation.value}%)

blur(${blur.value}px)

grayscale(${grayscale.value}%)

`;

}

document.querySelectorAll(".controls input").forEach(slider=>{

slider.addEventListener("input",applyFilters);

});

saveBtn.onclick=function(){

if(!selectedCard) return;

const img=selectedCard.querySelector("img");

img.style.filter=preview.style.filter;

alert("Changes Saved!");

}