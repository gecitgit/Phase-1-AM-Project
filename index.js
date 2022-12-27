document.addEventListener("DOMContentLoaded", () => {
    console.log("the DOM has loaded!");

    const formSearch = document.getElementById("search-bar")
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("this is event: ", event.target[0].value)
        fetch(`https://api.jikan.moe/v4/manga?letter=${event.target[0].value}&order_by=popularity`)
        .then(response => response.json())
        .then(response => {
            // const animeList = document.querySelector("#anime-list")
            // const infoList = document.getElementById("fetched-results")
                        
            const animeDataList = response.data.map(item =>{
                return {
                title: item.title,
                picture: item.images.jpg.image_url,
                author: item.authors[0].name,
                blurb: item.synopsis,
                score: item.score,
                status: item.status,
                link: item.url
                
            }
            }
            )
            console.log("this is the animedatalist: ", animeDataList)
            
            //creates the divs for each answr
            const animeDivList = animeDataList.map(item =>{
                //creates the actual div that will hold each result + labels
                const animeContainer = document.createElement("div");
                animeContainer.classList.add("container")
                
                //creates a picture div inside of the container div and adds the picture
                const animePictureDiv = document.createElement("div");
                animePictureDiv.classList.add("animeMediaHolder")
                animeContainer.appendChild(animePictureDiv)
                const img = document.createElement("img")
                img.classList.add("animeCover")
                animePictureDiv.appendChild(img)
                img.src = item.picture

                //this creates a button under the anime cover and links to the MAL page
                const malLink = document.createElement("button");
                animePictureDiv.appendChild(malLink)
                malLink.innerText = "Visit the MyAnimeList page!"
                malLink.classList.add("animeLink")
                malLink.addEventListener("click", (e) =>{
                    console.log("read more button was clicked")
                    window.open(item.link, '_blank')
                })

                //creates a blank div to make flexbox play fair and create a vertical gap between the manga pic and details
                const animeSpacer = document.createElement("div");
                animeContainer.appendChild(animeSpacer)
                animeSpacer.classList.add("animeSpacer")
                const blankSpace = document.createElement("p")
                animeSpacer.appendChild(blankSpace)
                blankSpace.innerText = ""   

                //creates the animeDetails div which will hold all of the info pulled during the fetch request that was stored to animeDataList
                const animeDetails = document.createElement("div");
                animeContainer.appendChild(animeDetails)
                animeDetails.classList.add("animeDetails")

                //this adds a h2 tag which contains the manga's title
                const title = document.createElement("h2")
                animeDetails.appendChild(title)
                title.innerText = item.title

                //this adds a new P tag containing the manga's summary
                const summary = document.createElement("p")
                animeDetails.appendChild(summary)
                summary.innerText = "<strong>Summary: </strong>"+item.blurb
                
                //this adds a new P tag containing the author's information
                const author = document.createElement("p")
                animeDetails.appendChild(author)
                author.innerText = "Author: "+item.author

                //this adds a new P tag containing the manga's rating
                const score = document.createElement("p")
                animeDetails.appendChild(score)
                score.innerText = "Average Rating: " + item.score

                //this adds a new P tag containing the manga's publishing status
                const status = document.createElement("p")
                animeDetails.appendChild(status)
                status.innerText = "Current Status: " + item.status
                

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
        // .catch(error => console.log("ERROR"))

            
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

