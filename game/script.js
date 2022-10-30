//generating random number for dice 1
let num1 = Math.floor(1+ Math.random() *6);
let str1 = "images/dice"+num1+".png";
document.querySelector(".img1").setAttribute("src",str1);


//Gen erating random number for 2nd dice 
let num2 = Math.floor(1+ Math.random()*6);
let str2 = "images/dice" + num2 + ".png";
document.querySelector(".img2").setAttribute("src",str2);

if(num1>num2)
updateStr = "🚩Player 1 wins! ";

else if(num1<num2)
updateStr = "Player 2 wins!🚩 ";

else
updateStr="Draw!"
document.querySelector("h1").innerHTML = updateStr;
