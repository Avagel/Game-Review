let data = JSON.parse(localStorage.getItem("data"))

exp(data)


function exp(data){
    
    let games = [];
    data.forEach(element => {
        games.push([element.name,element.genre,element.description,element.rating,element.comments])

    });
    
    localStorage.setItem("allGames", JSON.stringify(data))

    run("All");
    

    
    const genres = ["Shooter", "Survival", "RPG", "Adventure", "Sports", "Fighting"];
    
    // Function to create and append genre groups
    let genreBar = document.querySelector(".genre-bar");
        
    for( let i =0 ;i < genreBar.children.length;i++){
        let child = genreBar.children.item(i);
    
        child.addEventListener('click',()=> {
            setCurrent(child,getSelected())
            addGroup(child.textContent)
        })
    }
    
    function setCurrent(child,current){
        current.classList.remove("selected");   
        child.classList.add("selected");
    }
    
    function getSelected(){
        for( let i =0 ;i < genreBar.children.length;i++){
            let selected = genreBar.children.item(i);
            if(selected.className == "selected")
                return selected
        }
    }
    
    function removegroup(){
        const group = document.querySelector(".group");
        group.remove()
        console.log("removed")
    }

    let currentGenre = "All";

    function addGroup(genre){
        console.log(genre)
        if(currentGenre == genre)
            return;
        currentGenre = genre;
        run(genre)
    }
    
    function run(genre){
        removegroup()
        const page = document.querySelector(".page")
        let group = document.createElement("div");
        group.classList.add("group")
        page.appendChild(group);

        switch(genre){
            case "All":
                games.forEach(elem => {
                    const card = document.createElement('div')
                    const fade = document.createElement('div')
                    const gameName = document.createElement('h3')
                    gameName.classList.add("game-name")
                    gameName.textContent = elem[0];

                    fade.classList.add("fade")
                    card.classList.add("card")

                    card.append(fade)
                    card.append(gameName)
                    card.style.backgroundImage = `url('../media/game images/${elem[0]}/card.jpg')`
                    
                    // Add click event to card
                    card.addEventListener('click', () => {
                        localStorage.setItem('selectedGame', JSON.stringify(elem));
                        window.location.href = 'overview.html';
                    });

                    group.appendChild(card);
                });
                break;
            default:
                games.forEach(elem => {
                    const card = document.createElement('div')
                    const fade = document.createElement('div')
                    const gameName = document.createElement('h3')
                    gameName.classList.add("game-name")
                    gameName.textContent = elem[0];

                    fade.classList.add("fade")
                    card.classList.add("card")

                    card.append(fade)
                    card.append(gameName)
                    card.style.backgroundImage = `url('../media/game images/${elem[0]}/card.jpg')`
                    
                    // Add click event to card
                    card.addEventListener('click', () => {
                        localStorage.setItem('selectedGame', JSON.stringify(elem));
                        window.location.href = 'overview.html';
                    });

                    if (elem[1] == genre) {
                        group.appendChild(card);
                    }
                });
        }
    }
}
