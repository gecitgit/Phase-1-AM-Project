document.addEventListener("DOMContentLoaded", () => {
    console.log("the DOM has loaded!");

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
        const list = document.getElementById("fetched-results")
        list.innerText = ""
    }
}