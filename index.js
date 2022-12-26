document.addEventListener("DOMContentLoaded", () => {
    console.log("the DOM has loaded!");

    const formSearch = document.getElementById("search-bar")
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("this is event: ", event.target[0].value)
        fetch(`https://api.jikan.moe/v4/manga?letter=${event.target[0].value}&sfw&order_by=popularity`)
        .then(response => response.json())
        .then(response => {
            const animeList = document.querySelector("#anime-list")
            const infoList = document.getElementById("fetched-results")
                        
            const animeDataList = response.data.map(item =>{
                return {
                title: item.title,
                picture: item.images.jpg.image_url,
                author: item.authors[0].name,
                blurb: item.synopsis,
                score: item.score
            }
            }
            )
            
            //creates the divs for each answr
            const animeDivList = animeDataList.map(item =>{
                const animeContainer = document.createElement("div");
                animeContainer.classList.add("container")
                
                const animePictureDiv = document.createElement("div");
                animeContainer.appendChild(animePictureDiv)
                const img = document.createElement("img")
                animePictureDiv.appendChild(img)
                img.src = item.picture

                const animeDetails = document.createElement("div");
                animeContainer.appendChild(animeDetails)
                animeDetails.classList.add("animeDetails")
                const title = document.createElement("h2")
                animeDetails.appendChild(title)
                title.innerText = item.title

                

                return animeContainer
            }
            )

            //adds the div from above to the dom
            const animeHolder = document.getElementById("animeHolder")
            animeDivList.forEach(element =>{
                animeHolder.appendChild(element)
            })

            
            
            }
            

            )

            
        })
    
    formSearch.reset()

    
    //include an event listener for mouseover on pics
    
    
    //this will reset the page
    let resetButton = document.getElementById("reset-button")
    resetButton.addEventListener("click", (e) => {
        console.log("the reset button is being clicked!")
        resetChecker()
    })




})






//this function runs when START OVER is clicked
//It prompts the user to confirm if they want to reset the page 
function resetChecker(){
    const resetResult = confirm("Press OK to reset the page \nPress Cancel to keep looking at the current animanga")
    if (resetResult === true){
        const list = document.getElementById("animeHolder")
        list.innerText = ""
    }
}

