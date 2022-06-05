function csvToArray(str, delimiter = ";") {
    
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
   
    const headers = str.slice(0, str.indexOf("\r")).split(delimiter);

    
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\r\n");
    
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
}
let questions;
let id=0;
function addFormListner(){
    const myForm = document.getElementById("myForm");
    const csvFile = document.getElementById("csvFile");

    myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        let result = csvToArray(text);
        myForm.remove();
        console.log(result);
        questions=result;
        displayQuestion(questions[0]);    
    };

    reader.readAsText(input);
    });
}



const questionElement = document.getElementById("question");
const a1Element = document.getElementById("a1");
const a2Element = document.getElementById("a2");
const a3Element = document.getElementById("a3");
const a4Element = document.getElementById("a4"); 
const nextElement = document.getElementById("next"); 
function displayQuestion(question){
    
    questionElement.innerHTML=question['Text'];
    a1Element.innerHTML=question['a1'];
    a1Element.className="option";
    a2Element.innerHTML=question['a2'];
    a2Element.className="option";
    a3Element.innerHTML=question['a3'];
    a3Element.className="option";
    a4Element.innerHTML=question['a4'];
    a4Element.className="option";
}

function clickAnswerEventFunc(e){
    e.preventDefault();
    let ans=e.target.id;
    console.log(ans);
    if (ans==questions[id]['Answer']) {
        console.log("Yes");
    }else{
        console.log("Nope");
        e.target.className="false";
    }
    document.getElementById(questions[id]['Answer']).className="correct";
    
    //id++;
    //displayQuestion(questions[id]);
}
function addAnswerListners(){
   
    
      
    
    a1Element.addEventListener("click",clickAnswerEventFunc);    
    a2Element.addEventListener("click",clickAnswerEventFunc);    
    a3Element.addEventListener("click",clickAnswerEventFunc);    
    a4Element.addEventListener("click",clickAnswerEventFunc);
    nextElement.addEventListener("click",()=>{
        if (id<questions.length-1) {
            id++;
            displayQuestion(questions[id]);
        }
        
    })
}
addFormListner();
addAnswerListners();
