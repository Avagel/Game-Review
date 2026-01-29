

let slider = document.querySelector(".page1 .slider");
let page1 = document.querySelector(".page1");
let content = document.getElementsByTagName("strong");
let gameData = JSON.parse(localStorage.getItem("data"));




//name of games in slider
let nameArr = ["Assassins Creed", "Apex Legends", "Forza", "Tekken"];

//set default image to tekken
page1.style.backgroundImage = `url('../media/game images/${nameArr[3]}/Big.jpg')`;

//set card image
for (let i = 0; i < slider.children.length; i++) {
  slider.children.item(i).style.backgroundImage = `url('../media/game images/${nameArr[i]}/Big.jpg')`;
}

//collect only the needed gameData
let games = [];

gameData.forEach(element => {
  games.push([element.name,element.genre,element.description,element.rating,element.comments])
});


//function to move the cards and change elements
let i = 3;
function move() {
  let firstElement = slider.firstElementChild;
  firstElement.style.width = "0";
  firstElement.style.margin = "0";

  // moveanimation
  setTimeout(() => {
    let first = slider.removeChild(firstElement);
    slider.appendChild(first);

    setTimeout(() => {
      slider.lastElementChild.style.width = "200px";
    }, 10);
    firstElement.style.margin = "0 10px";
  }, 2000);
  
  
  //change background image and text
  i++;
  if (i > 3) i = 0;

  page1.style.backgroundImage = `url('../media/game images/${nameArr[i]}/Big.jpg')`;
  let name = nameArr[i]
  content[0].innerHTML = name;
  
  changeData(gameData)
  
  
  function changeData(data){
    
    games.forEach(arr => {
      if(arr[0] == name){
        let desc = document.getElementById("homeDesc");
        desc.textContent = arr[2]
      }
      
    });
    
    
    //connect button to overview page
    let button = document.getElementById("button")
    
    button.addEventListener('click', () => {
      let elem;
      
      games.forEach(arr => {
        if(arr[0] == nameArr[i]){
          elem = arr;
        }
        
      })
      
      localStorage.setItem('selectedGame', JSON.stringify(elem));
      window.location.href = 'overview.html';
    });
    
    setTimeout(move, 3000);
}

}
setTimeout(move, 3000);

//adding news
let newsContainer = document.querySelector(".news");
let newsData = JSON.parse(localStorage.getItem("news"));
let newsName = document.querySelectorAll(".news-card img");
let newsContent = document.querySelectorAll(".news-card .news-content");

for(let i = 0; i<newsContainer.children.length; i++){
  let element = newsData[i]
  console.log(newsData[i].name)
  newsName[i].src = `../media/game images/${element.name}/Big.jpg`;

  newsContent[i].textContent = element.content

  newsContainer.children.item(i).addEventListener('click',()=>{
    console.log("iruo")
    localStorage.setItem("selectedNews",JSON.stringify([element.name,element.heading,element.content]))
    window.location.href = "newsoverview.html"

})


}









//--------------Page 2------------------//
let slider2 = document.querySelector(".page2 .slider")
let cardContent = document.querySelectorAll(".page2 .slider .card-content")


//name of games in slider
let slider2nameArr = ["Assassins Creed", "Apex Legends", "Forza", "Tekken","Halo","EA FC"];
console.log(slider2.children.length)


//set card image
for (let i = 0; i <  slider2.children.length; i++) {
  console.log(i)
  
  cardContent[i].textContent = slider2nameArr[i]

  //implement click on card
  slider2.children.item(i).addEventListener("click",()=>{

    games.forEach(arr=>{
      if(arr[0] == cardContent[i].textContent){
        localStorage.setItem("selectedGame",JSON.stringify(arr))
        window.location.href = "overview.html"

      }
        
        // console.log("iruo")

    })
    console.log(cardContent[i].textContent)

  })
  slider2.children.item(i).style.backgroundImage = `url('../media/game images/${slider2nameArr[i]}/Big.jpg')`;
  
}




//page slider
function move2(){
  let firstElement = slider2.firstElementChild;
  // moveanimation
  firstElement.style.width = "0";
  // firstElement.style.width = "0";
  firstElement.style.margin = "0";  


  setTimeout(() => {
    let first = slider2.removeChild(firstElement);
    slider2.appendChild(first);
    
    
    for(let i= 0;i<slider2.children.length;i++ ){

      if(i != 3){
        slider2.children.item(i).classList.remove("active")
      }
      slider2.children.item(3).classList.add("active")
      slider2.children.item(3).style.width = "200px"
    }
    
    setTimeout(() => {
      slider2.lastElementChild.style.width = "200px ";
    }, 100);

    firstElement.style.margin = "0 10px";
  }, 2000);
  
  
  setTimeout(move2,2000)
}
setTimeout(move2,2000)