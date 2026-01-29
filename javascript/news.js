let news = JSON.parse(localStorage.getItem("news"));
console.log(news)

let newsContainer = document.querySelector(".cards");
let newsHeader = document.querySelectorAll(".cards .event-content");
let newsImg = document.querySelectorAll(".cards img");


let topContainer = document.querySelector(".topContainer");
let topHeader = document.querySelectorAll(".topContainer .event-content");
let topImg = document.querySelectorAll(".topContainer img");


for(let i = 0; i< newsContainer.children.length;i++){
    // console.log(newsContainer.children.item(i).textContent)
    let element = news[i]
    newsHeader[i].textContent = element.heading;
    console.log(newsImg[i].src);
    newsImg[i].src = `../media/game images/${element.name}/Big.jpg`;
    newsContainer.children.item(i).addEventListener('click',()=>{
        localStorage.setItem("selectedNews",JSON.stringify([element.name,element.heading,element.content]))
        window.location.href = "newsoverview.html"

    })


}
for(let i = 0; i< topContainer.children.length;i++){
    // console.log(newsContainer.children.item(i).textContent)
    let element = news[i]  
    console.log(i)

    topHeader[i].textContent = element.heading;

    console.log(newsImg[i].src);
    topImg[i].src = `../media/game images/${element.name}/Big.jpg`;

    topContainer.children.item(i).addEventListener('click',()=>{
        console.log("iruo")
        localStorage.setItem("selectedNews",JSON.stringify([element.name,element.heading,element.content]))
        window.location.href = "newsoverview.html"

    })


}