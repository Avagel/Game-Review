
//what happens after the document is loaded
document.addEventListener('DOMContentLoaded', () => {

    //get the selected game values
    const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));
    const gameData = JSON.parse(localStorage.getItem("data"))


    
    if (selectedGame) {
        //set the values on the overview page
        let gameName = document.querySelector('.game-name');
        gameName.textContent = selectedGame[0];
        
        document.querySelector('.desc-text').textContent = selectedGame[2]; 

        let gameGenre = document.querySelector('.game-genre');
        gameGenre.textContent = selectedGame[1]; 


        let backgroundImage = `url("../media/game images/${selectedGame[0]}/Big.jpg")`; 

        document.querySelector('.blur').style.backgroundImage = backgroundImage;

        
        document.querySelector('.image').style.backgroundImage = backgroundImage;
        loadComments();


        //loading comments
        function loadComments(){
            let comment = selectedGame[4]
            let comments  = document.querySelector(".comments ul");
    
            comment.forEach(arr => {
                let header  = document.createElement('header');
                let content = document.createElement('div')
                let commentName  = document.createElement('h3');
                let commentTime  = document.createElement('h3');
                let commentCont = document.createElement('div');
                let commentlist = document.createElement('li');

                commentName.classList.add("comment-name")
                commentName.textContent = "Akanume"
                commentTime.textContent = "4hours ago"
                commentCont.classList.add("comment")
                commentlist.classList.add("list")
                
                content.classList.add("content");
                content.textContent = arr[0];
                
                header.appendChild(commentName)
                header.appendChild(commentTime)
                commentCont.appendChild(header)
                commentCont.appendChild(content)

                commentlist.appendChild(commentCont)
                comments.appendChild(commentlist)
                
            });

        }
       
        
        // //image Slider
        // let big = document.getElementById("main-image")
        // let mini = document.querySelector(".gameImages")
        
        // let inter  = setTimeout(slider,2000)
        // let j = 1;
        // function slider(){   
            
        //     mini.children.item(j-1).classList.remove("active");
        //     if(j>4)
        //         j=0
            
        //     let active = mini.children.item(j);
        //     active.classList.add("active")
        //     j++
        //     // setTimeout(slider,2000)
        //     let me = setTimeout(slider,3000)
                
            
        // }    

        //Adding your start rating
        let stars = document.querySelector(".stars")
        let addStar = document.querySelector(".add-rating .stars")
        
        
        for(let i = 0; i< stars.children.length;i++){
            stars.children.item(i).classList.add("checked")
            
        }
        
        
        for(let i = 0; i< addStar.children.length;i++){
            let child = addStar.children.item(i);
            
            child.addEventListener('click',()=>{
                if( child.className !== "checked")
                    child.classList.add("checked")  
                
            }) 
        
        }


        //adding similar games

        let similarContainer = document.querySelector(".similar");
        
        let similar = JSON.parse(localStorage.getItem("allGames"));
        console.log(similar)
        
        similar.forEach(element=>{
            // console.log(element)
            if(element.genre == gameGenre.textContent)
                if(element.name !== gameName.textContent){

                    let similarImage = document.createElement('div');
                    let imageName = document.createElement('h3');
                    imageName.textContent = element.name;

                    
                    
                    imageName.classList.add("event-name");
                    similarImage.classList.add("image");
                    let fade = document.createElement("div")
                    fade.classList.add("fade");

                    similarImage.appendChild(fade)

                    similarImage.appendChild(document.createElement('header').appendChild(imageName))

                    similarImage.style.backgroundImage =  `url("../media/game images/${element.name}/Big.jpg")`;

                    similarImage.addEventListener("click",()=>{
                        localStorage.setItem('selectedGame', JSON.stringify([element.name,element.genre,element.description,element.rating,element.comments]));
                        window.location.href = 'overview.html';

                    })
                    
                    similarContainer.append(similarImage);



                }
        })



 //adding news
let newsContainer = document.querySelector(".news");
let newsData = JSON.parse(localStorage.getItem("news"));
let newsName = document.querySelectorAll(".news-card .event-name");
let newsContent = document.querySelectorAll(".news-card .news-content");

for(let i = 0; i<newsContainer.children.length; i++){
  let element = newsData[i]
  console.log(newsData[i].name)
  newsName[i].textContent = element.name;

  newsContent[i].textContent = element.content

  newsContainer.children.item(i).addEventListener('click',()=>{
    console.log("iruo")
    localStorage.setItem("selectedNews",JSON.stringify([element.name,element.heading,element.content]))
    window.location.href = "newsoverview.html"

})


}  
    
    }
});
