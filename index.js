document.addEventListener("DOMContentLoaded", () => {
    console.log("the DOM has loaded!");

    const formSearch = document.getElementById("search-bar")
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        resetAnimeList()
        console.log("this is event: ", event.target[0].value)
        fetch(`https://api.jikan.moe/v4/manga?order_by=popularity&sfw=true&q=${event.target[0].value}`)
            .then(response => response.json())
            .then(response => {                      
                const animeDataList = response.data.map(item =>{
                    return {
                        title: item.title,
                        picture: item.images.jpg.image_url,
                        author: item.authors[0]?.name || "The author was not listed.",
                        blurb: item?.synopsis || "No synopsis provided.",
                        score: item?.score || "No score was found.",
                        status: item?.status || "Status unclear.",
                        link: item.url
                        //optional chaining + logical OR to allow for incomplete API data   
                        }
                    }
                    )
            console.log("this is the animedatalist: ", animeDataList)
            if (animeDataList.length < 1) {
                console.log("This array is empty. No results found")
                alert("Sorry, no results were found. Try something else!")
            }
            
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
                        window.open(item.link, '_blank')
                        }
                    )

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
                summary.innerHTML = "<strong>Summary: </strong>"+item.blurb
                
                //this adds a new P tag containing the author's information
                const author = document.createElement("p")
                animeDetails.appendChild(author)
                author.innerHTML = "<strong>Author: </strong>"+item.author

                //this adds a new P tag containing the manga's rating
                const score = document.createElement("p")
                animeDetails.appendChild(score)
                score.innerHTML = "<strong>Average Rating: </strong>" + item.score

                //this adds a new P tag containing the manga's publishing status
                const status = document.createElement("p")
                animeDetails.appendChild(status)
                status.innerHTML = "<strong>Current Status: </strong>" + item.status

                return animeContainer
            }
            )

            //adds the div from above to the dom
            const animeHolder = document.getElementById("animeHolder")
            animeDivList.forEach(element =>{
                animeHolder.appendChild(element)
                }
            )

            
            
            }
            

            )
        .catch(error => {
            console.log("ERROR")
        })
        formSearch.reset()

        }
        )
    
    
    //this will reset the page
    let resetButton = document.getElementById("reset-button")
    resetButton.addEventListener("click", (e) => {
        console.log("the reset button is being clicked!")
        resetChecker()
        }
    )

    let redoButton = document.getElementById("reset-button")
    redoButton.addEventListener("pointerenter", event => {
        console.log("the reset button has been entered")
        event.target.style.backgroundColor = "#cc59d4";
        event.target.style.fontWeight = "bold";
    })
    redoButton.addEventListener("pointerleave", event => {
        console.log("the reset button has been left")
        event.target.style.backgroundColor = "#33A62B";
        event.target.style.fontWeight = "normal"
    })


    }
)

function resetAnimeList(){
    animeHolder.innerHTML = ""
}






//this function runs when START OVER is clicked
//It prompts the user to confirm if they want to reset the page 
function resetChecker(){
    const resetResult = confirm("Press OK to reset the page \nPress Cancel to keep looking at the current animanga")
    if (resetResult === true){
        const list = document.getElementById("animeHolder")
        list.innerText = ""
    }
}

