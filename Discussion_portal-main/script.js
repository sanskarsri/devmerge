// fetch question inputs element with submit button
// create a fucntion to validate the question 
// finalize data structure to store question
   // structure
   /* var question = {
     title:"",
     description:"",
     answer: [{ name:"", text:"" }],
     isResolved:"",
     createdAt: // date and time
   } */

// create a function store in localstorage
    // get and push new question and then store

// create a function to print on screen




var subjectArea = document.getElementById("subjectArea");
var questionArea = document.getElementById("questionArea");
var submitBtn = document.getElementById("submitBtn");
var questionContainer = document.getElementById("questionContainer");
var showQueryContainer = document.getElementById("show_query");
var createQuestionContainer = document.getElementById("createQuestionContainer");
var nameArea = document.getElementById("res_name");
var commentArea = document.getElementById("comment");
var detailContainer = document.getElementById("detail");
var show_title = document.getElementById("show_title");
var show_desc = document.getElementById("show_desc");
var showResponseContainer = document.getElementById("show");
var search = document.getElementById("search");
var i=0;



var question = {
    title:"",
    description:"",
    // answer: [{ name:"", text:"" }],
    answer:[],
    isResolved:"",
    createdAt: "",
  };





var questions = getQuestions();
console.log(questions);


//Print all the todos initially stored in Local Storage
questions.forEach(function(question){
    if(question.isResolved===true)
      { i++;
        return; }
    printQuestion(question);
});


//When Submit button is clicked, add Question
submitBtn.addEventListener("click",function(event) {

    addQuestion( subjectArea.value, questionArea.value);
    
});



//ADD QUESTION Function
function addQuestion(subValue, questionValue){
    var isValidInput = CheckValidInput(subValue, questionValue);

    if(isValidInput){
        initObject(subValue, questionValue);
        printQuestion(question);
        saveQuestion(question);
        clearInput(subjectArea,questionArea);
    }
    else{
        console.log("Incorrect Input");
    }
    questions = getQuestions();
    console.log(questions);
}

var index=0;




//printQuestion
function printQuestion(query){

   

    var unitQuestionContainer = document.createElement("div");
    unitQuestionContainer.setAttribute("class","unitQuestionContainer");
    unitQuestionContainer.setAttribute("id","id"+i++);
    questionContainer.appendChild(unitQuestionContainer);

    var subNode = document.createElement("h2");
    subNode.innerText = query.title;
    unitQuestionContainer.appendChild(subNode);

    var textNode = document.createElement("p");
    textNode.innerText = query.description;
    unitQuestionContainer.appendChild(textNode);
    // var x=id;
    const selected=document.querySelector(".unitQuestionContainer#id"+(i-1));
    // console.log("selected",selected);
    // console.log("query",query);

    

    //Btn Listener Part
    selected.addEventListener("click", function(){
        

        
      //Change Layout
        showQueryContainer.style.display="block";
        createQuestionContainer.style.display="none";

        

        // console.log(selected);
        // console.log("query",query);
        index=parseInt(selected.getAttribute('id').replace("id", ""));
        
        showResponses(index);

        console.log(index);
        // console.log(clicked);

        show_title.innerHTML=questions[index].title;
        show_desc.innerHTML=questions[index].description;

      
            
            
        
//RESOLVE AND SUBMIT ANSWER BUTTON DECLARATION
        var submitAnswerBtn = document.getElementById("done");
        var resolveBtn = document.getElementById("resolve");
        

        submitAnswerBtn.setAttribute("value",questions[index].title); 
        console.log(submitAnswerBtn.value);
        console.log(index);
        
        resolveBtn.setAttribute("value",questions[index].title); 



        // submitAnswerBtn.setAttribute("value",value.title);
        submitAnswerBtn.addEventListener("click", function(){

            

            var nameVal=nameArea.value;
            var commentVal=commentArea.value;
            var isValidInput = CheckValidInput(nameVal, commentVal);
            if(isValidInput){
                console.log("Ok");
                
                
                console.log("questionsbefore",questions);
                console.log(selected);


                var x = {};
                x.name = nameVal;
                x.comment = commentVal;
              console.log(submitAnswerBtn.value);
                //To update the answer of particular question
                for(var j = 0; j< questions.length; j++) {
                    if(questions[j].title === submitAnswerBtn.value) {
                        
                        console.log(j);
                        questions[j].answer.push(x);
                       
                        var json = JSON.stringify(questions);
                        localStorage.setItem("questions",json);
                        
                        // show_response(q[i].sol);
                        nameArea.value= "";
                        commentArea.value = "";
                        break;
                    }
                }


                // questions[index].answer.push({name:nameVal,comment:commentVal});
                
                console.log("questionsafter",questions);
                showResponses(index);
                // printAnswers(value,nameVal,commentVal);
                // saveAnswer(value);
                // clearInput(nameArea,commentArea);
            }
        });

    resolveBtn.addEventListener("click", function(){
        for(let j = 0; j< questions.length; j++) {
            if(questions[j].title === resolveBtn.value) {  
                questions[j].isResolved = true;

                var resolvedElement=document.querySelector(".unitQuestionContainer#id"+(j));
                resolvedElement.parentNode.removeChild(resolvedElement);

                var json = JSON.stringify(questions);
                localStorage.setItem("questions",json);


                break;
            }
        }       
    });
   
   

    });

}







//Print_Answers
function showResponses(index){
    showResponseContainer.innerHTML="";
    questions[index].answer.forEach(function(answer){

        var unitResponse = document.createElement("div");
        unitResponse.setAttribute("class", "unitResponse");

        var nameText = document.createElement("h2");
        nameText.innerText = answer.name;

        var answerText = document.createElement("p");
        answerText.innerText = answer.comment;

        unitResponse.appendChild(nameText);
        unitResponse.appendChild(answerText);

        showResponseContainer.appendChild(unitResponse);



});

}





//SAve Question
function saveQuestion(question){
var questions = getQuestions();
questions.push(question);

questions = JSON.stringify(questions);
localStorage.setItem("questions",questions)

}





//INitialize Values in Object 
function initObject(subValue, quesionValue){
    question.title = subValue;
    question.description= quesionValue;
    question.isResolved= false;
    question.answer= [];
    question.createdAt=new Date().toUTCString();
}








//Check Validity
function CheckValidInput(subValue, quesionValueue) {
    if(subValue!="" && quesionValueue!=""){
        return true;
    }
}


//clearInput
function clearInput(sub, ques) {
    sub.value="";
    ques.value="";
}


//Get Question from Local Storage
function getQuestions(){

    var questions = localStorage.getItem("questions");

    if(questions)
    {
        
        return JSON.parse(questions);
    }

    return [];
}




//Search Valuew
function searchValues() {
    console.log("OHOO");
    var input, filter, el, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
   
    el = questionContainer.getElementsByClassName("unitQuestionContainer");
    for (i = 0; i < el.length; i++) {
        a = el[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            el[i].style.display = "";
        } else {
            el[i].style.display = "none";
        }
    }
}


//Search Event addEventListener
search.addEventListener("keyup", function() {
    // console.log("OHOO");
    var search, filter, el, a, i, txtValue;
    search = document.getElementById("search");
    filter = search.value.toUpperCase();
//    console.log(filter);
    el = questionContainer.getElementsByClassName("unitQuestionContainer");
    for (i = 0; i < el.length; i++) {
        a = el[i].getElementsByTagName("h2")[0];
        // console.log(a.innerText);
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            el[i].style.display = "";
        } else {
            el[i].style.display = "none";
        }
    }
});