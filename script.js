
let inp = document.querySelector("input")
let p = document.querySelector("p")
let cnt = document.querySelector(".count")
let btn = document.querySelector("button")
let left = document.querySelector(".Lside span")
let right = document.querySelector(".Rside span")
let timer = document.querySelector(".timer span")
let wpmDis = document.querySelector(".dis-result")
let wpmRes = document.querySelector(".dis-result span")
let countRes = document.querySelector(".dis-result h5 span")
let c = 0; //for counting correct words.
let cChar = 0 //for counting correct alphabets used to check wpm.

const words = [
  "array", "function", "variables", "timeout", "clear",
  "computer", "javascript", "algorithm", "eventListener", "document",
  "object", "string", "number", "boolean", "undefined",
  "null", "symbol", "bigint", "promise", "async",
  "await", "callback", "closure", "prototype", "inheritance",
  "recursion", "iteration", "syntax", "compiler", "interpreter",
  "runtime", "debugger", "console", "terminal", "command",
  "browser", "server", "client", "network", "protocol",
  "request", "response", "endpoint", "database", "query",
  "schema", "index", "primary", "foreign", "table",
  "column", "record", "storage", "memory", "cache",
  "buffer", "stream", "socket", "thread", "process",
  "kernel", "hardware", "software", "firmware", "binary",
  "decimal", "hexadecimal", "boolean", "operator", "operand",
  "condition", "statement", "expression", "parameter", "argument",
  "return", "export", "import", "module", "package",
  "library", "framework", "component", "element", "attribute",
  "selector", "property", "stylesheet", "viewport", "responsive",
  "flexbox", "grid", "animation", "transition", "keyframe",
  "repository", "commit", "branch", "merge", "deploy"
];

let lastAppearWord = ""; //for makimg sure words doesnt same word doesnt appear consecutively.

function randomWords(){
  let appearWord;
  do{
    const randomIndex = Math.floor(Math.random()*words.length)
    appearWord = words[randomIndex]
  }while(appearWord === lastAppearWord && words.length > 1)
  lastAppearWord = appearWord
  p.textContent = appearWord
}

inp.addEventListener("change", function(vals){
    let newWord = vals.target.value
    let para = p.textContent
    
    if(!isRunning) return;
    if(newWord.trim() === para){
        c +=1;
        cChar += newWord.length
        cnt.textContent = `count: ${c}`
        right.insertAdjacentHTML("afterbegin",`<div>${newWord}</div>`)
    }
    inp.value = ""
    if(newWord!== para || newWord === ""){
        left.insertAdjacentHTML("afterend", `<div>${newWord}<div/>`)
    }
    randomWords();// new word appears right after every enter click.
})


let isRunning = false
//let isTimer = null
let realTime = null
let startDelay = null

function gameFunc() {
  btn.addEventListener("click", function () {
    if (!isRunning) {
      isRunning = true
      btn.textContent = "STARTING.."
      p.textContent = "Get Ready.."
      inp.disabled = false
      startDelay = setTimeout(function(){
        randomWords()
        inp.focus()
        //isTimer = setInterval(randomWords, 4000);
        btn.textContent = "STOP";
        const zeroPosition = performance.now();
        realTime = setInterval(function () {
        let clickedTime = Math.floor((performance.now() - zeroPosition) / 1000);
        let countT = clickedTime
        timer.textContent = `${countT}`;
        if (countT === 60){
          stopGame()
          p.textContent = "TIME'S UP!!!"
          p.style.color = "red"
          wpmDis.style.display = "initial"
          WPM()
        }
      },1000)
      
      }, 1000);
    } else {
      stopGame()
    }
  });
}
gameFunc()

function stopGame(){
  //clearInterval(isTimer)
  clearInterval(realTime)
  clearTimeout(startDelay)
  //isTimer = null
  btn.textContent = "START"
  isRunning = false
  timer.textContent = `0`
  inp.disabled = true

}

function WPM(){
  let r = Math.floor(cChar/5)
  wpmRes.textContent = r
  console.log(Math.floor(cChar/5))
  countRes.textContent = c
}

// setTimeout(gameFunc, 2000)
















