const startbutton = document.querySelector("#start-btn");
startbutton.addEventListener("click", function () {
  if (startbutton.innerHTML === "START") {
    init();
  } else {
    location.reload();
    init();
   }
});

//levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

//change level
var currentlevel;
setInterval(() => {
  var easybtn=document.getElementById('easy');
var medbtn=document.getElementById('medium');
var hardbtn=document.getElementById('hard');

if(easybtn.checked==true)
{
currentlevel = levels.easy;
seconds.innerHTML = currentlevel;
}
else if(medbtn.checked==true)
{
currentlevel = levels.medium;
seconds.innerHTML = currentlevel;
}
else if(hardbtn.checked==true){
currentlevel = levels.hard;
seconds.innerHTML = currentlevel;
}
});

let time=levels.medium;
let score = 0;
let isplaying;

//DOM Elements
const wordinput = document.querySelector("#word-input");
const currentword = document.querySelector("#current-word");
const scoredisplay = document.querySelector("#score");
const timedisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");


const words = [      
  "people",             "clock",
  "handle",             "dance",
  "echo",               "crook",
  "try",                "practical",
  "test",               "learner",
  "smart",              "phone",
  "revolver",           "android",
  "siblings",           "vacuum",
  "stubborn",           "diary",
  "spoon",              "effete",
  "space",              "creudlity",
  "defination",         "argue",
  "master",             "scruple",
  "learner",            "mien",
  "joker",              "fulsome",
  "cocktail",           "fulminate",
  "namaste",            "command",
  "friends",            "timid",
  "life",               "slander",
  "sympton",            "morrow",
  "javascript",         "ablocate",
  "invest",             "aprication",
  "competitors",        "infucate",
  "magic",              "ambiguous",
  "nutrition",          "autotomy",
  "laughter",           "bleeding",
  "smile",              "chad",
  "permanent",          "dotish",
  "trial",              "erf",
  "instructions",       "fipple",
  "followers",          "paraph",
  "edition",            "peterman",
  "lover",              "thirstland",
  "strategy",           "wabbit"
];      

//game code begin
function init() {

  startbutton.innerHTML = "Restart";
  //show no. of seconds in UI
  seconds.innerHTML = currentlevel + 1 ;
  //load word from array
  showword(words);
  //matching function
  wordinput.addEventListener("input", startmatch);
  //countdown
  console.log(currentlevel);
  time = currentlevel;
  setInterval(countdown, 1000);
  //game status
  setInterval(checkstatus, 50);
}

//matching input word
function startmatch() {
  if (matchword()) {
    isplaying = true;
    time = currentlevel + 1;
    showword(words);
    wordinput.value = "";
    score++;
  }
  if (score === -1) {
    scoredisplay.innerHTML = 0;
  } else {
    scoredisplay.innerHTML = score;
  }
}

//match word to input
function matchword() {
  if (wordinput.value === reverse(currentword.innerHTML)) {
    message.innerHTML = "Correct";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}
function reverse(str){
  return str.split("").reverse().join("");
}
//pick & show random word
function showword(words) {
  const randindex = Math.floor(Math.random() * words.length);
  currentword.innerHTML = reverse(words[randindex]);
}

//timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isplaying = false;
  }
  timedisplay.innerHTML = time;
}

// check status
function checkstatus() {
  if (!isplaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}