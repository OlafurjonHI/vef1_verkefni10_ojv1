// todo vísa í rétta hluti með import
import question from './question';
import Highscore from './highscore';
import {score as calcPoints} from './highscore';
import {save as saveData} from './storage.js';
// allar breytur hér eru aðeins sýnilegar innan þessa módúl
let startButton = document.querySelector('.start'); // takki sem byrjar leik
let problem = document.querySelector('.problem'); // element sem heldur utan um verkefni, sjá index.html
let result = document.querySelector('.result'); // element sem heldur utan um niðurstöðu, sjá index.html
let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna
let timer = document.querySelector('.problem__timer');
let problemform = document.querySelector('.problem__answer');
let problemInput = document.querySelector('.problem__input');
let textcontent = document.querySelector('.result__text');
let nameInput = document.querySelector('.result__input');
let resultForm = document.querySelector('.result__form');
let points;
const hs = new Highscore();
/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */

 function nullStillaLeik(){
  total = 0;
  correct = 0;
  points = 0;
  nameInput.value = "";
 }


function finish() {
  while(textcontent.firstChild){
    textcontent.removeChild(textcontent.firstChild);
  }
  points = calcPoints(total,correct,playTime);
  let pre = document.createElement("span");
  const text = `Þú svaraðir ${correct} rétt af ${total-1} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;
  pre.appendChild(document.createTextNode(text));
  textcontent.appendChild(pre);
  problem.classList.add('problem--hidden');
  result.classList.remove('result--hidden');
  // todo útfæra
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  // todo uppfæra tíma á síðu
  
  if(timer.firstChild) {
    timer.removeChild(timer.firstChild);
  }
  timer.appendChild(document.createTextNode(current));
  setTimeout(() => {
    if (current <= 1) {
      timer.removeChild(timer.firstChild);
      return finish();
    }
    return tick(current-1);
  },1000);
 
}


/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  let prob__question = problem.querySelector('.problem__question');
  currentProblem = new question();
  total++;
  console.log(currentProblem);
  if(prob__question.firstChild){
    prob__question.removeChild(prob__question.firstChild);
  }
  let span = document.createElement('span');
  span.appendChild(document.createTextNode(currentProblem.problem))
  prob__question.appendChild(span);

  // todo útfæra
}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  nullStillaLeik();
 tick(playTime);
 showQuestion();
  problem.classList.remove('problem--hidden');
  startButton.classList.add('button--hidden');
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();
  if(problemInput.value.trim() !== ""){
    if(parseInt(problemInput.value) === currentProblem.answer){
      correct++;
    }
    // todo útfæra
    showQuestion();
    problemInput.value = "";
    }
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();
  let name = nameInput.value;
  if(name.trim() !== ""){
    saveData(name,points); 
    hs.load();
  }
  nameInput.value = "";
  problemInput.value = "";
  
  // todo útfæra

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;
  startButton = document.querySelector('.start');
  startButton.addEventListener('click', start);
  problemform.addEventListener('submit',onSubmit);
  resultForm.addEventListener('submit',onSubmitScore);
  // todo útfæra
}
