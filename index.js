document.addEventListener("DOMContentLoaded", () => {
    console.log("the DOM has loaded!");

    // let animangaNameEntered = document.querySelector("#search-bar")
    
    // //this version logs every key stroke
    // // animangaNameEntered.addEventListener("keyup", (e) => {
    // //     const searchedString = e.target.value.toLowerCase();
    // //     console.log(searchedString)

    // //     fetch(`https://api.jikan.moe/v4/manga?letter=${searchedString}&sfw`)
    // //     console.log("this is what's being entered as letter search: ", searchedString)
    // //     //this is broken
    // //     .then(response => response.json())
    // //     .then(data => console.log(data))
    // //     .catch(err => {
    // //         console.log(err);
    // //     })

    // // })
    const formSearch = document.getElementById("search-bar")
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("this is event: ", event.target[0].value)
        fetch(`https://api.jikan.moe/v4/manga?letter=${event.target[0].value}&sfw&order_by=popularity`)
        .then(response => response.json())
        .then(response => {
            const animeList = document.querySelector("#anime-list")
            const infoList = document.getElementById("fetched-results")
            animeList.innerHTML = ""
            infoList.innerHTML = ""
            response.data.map(item => {
                const li = document.createElement("li")
                const h2 = document.createElement("h2")
                h2.textContent = item.title
                console.log("this is the title: ", item.title)

                // h2.addEventListener("click", e => showAnimeInfo(item.title_english, e))
                const img = document.createElement("img")
                img.src = item.images.jpg.image_url
                console.log("this is the img url: ", item.images.jpg.image_url)

                const animeList = document.querySelector("#anime-list")
                li.append(h2, img)
                animeList.append(li)

                const author = item.authors[0].name;
                const synopsis = item.synopsis;
                const score = item.score;
                infoList.append("Author: ", author," ","Synopsis: ", synopsis, "Score: ", score)

                // const infoList = document.getElementById("fetched-results")
                // const author = item.authors[0].name;
                // const synopsis = item.synopsis;
                // const score = item.score;
                // console.log("this is the author: ", author)
                // console.log("this is the synopsis: ", synopsis)
                // console.log("this is the score: ", item.score)
                // li.append("Author: ", author," ","Synopsis: ", synopsis, "Score: ", score)
                // infoList.append(li)

            }
            

            )

            // console.log("this is response: ", response)
            // console.log("this is the title: ", response.data[0].title_english)
            // console.log('this is the synopsis: ', response.data[0].synopsis)
            // console.log('this is the rating: ', response.data[0].score)
            // console.log('this is the author: ', response.data[0].authors[0].name)
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

// function showAnimeInfo(name, e) {
//     const infoList = document.getElementById("fetched-results")
//     infoList.innerHTML = ""
//     e.preventDefault()
//     fetch(`https://api.jikan.moe/v4/manga?letter=${name}`)
//     .then(response => response.json())
//     console.log("this is response: ", response)
//     .then(response => response.map(details => {
//         const li = document.createElement("li")
//         const h1 = document.createElement("h1")
//         h1.textContent = details.title
//         console.log("this is title in showAnimeInfo: ", details.title)
//         const animeList = document.getElementById("fetched-results")
//         li.append(h1)
//         animeList.append(li)
//     }))
    
// }
// })




//this function runs when START OVER is clicked
//It prompts the user to confirm if they want to reset the page 
function resetChecker(){
    const resetResult = confirm("Press OK to reset the page \nPress Cancel to keep looking at the current animanga")
    if (resetResult === true){
        const list = document.getElementById("fetched-results")
        list.innerText = ""
    }
}

})