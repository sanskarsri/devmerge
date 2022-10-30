
// This function plays the sound  
function performAction(buttonInnerHTML) {
    switch (buttonInnerHTML) {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
        case "k":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        default:
            console.log(buttonInnerHTML);
    }
}


// this perfoms the function on mouse click
let sz = document.querySelectorAll(".drum").length;
for (let i = 0; i < sz; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        this.style.color = "white";
        performAction(this.innerHTML);
        // console.log(this);

        addAnimation(this.innerHTML);
    });

}

// this function detects the keypress
document.addEventListener("keypress", function (event) {
    performAction(event.key);
    addAnimation(event.key);
})

function addAnimation(key)
{
    var activeButton = document.querySelector("." + key);

    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed") ;
    }, 100);

}
