// todo vísa í rétta hluti með import
import {load as getData} from './storage.js';
import {clear as deleteData} from './storage.js';

/**
 * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
 * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
 * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
 *
 * @param {number} total Heildarfjöldi spurninga
 * @param {number} correct Fjöldi svarað rétt
 * @param {number} time Tími sem spurningum var svarað á í sekúndum
 *
 * @returns {number} Stig fyrir svör
 */
export function score(total, correct, time) {
  // todo útfæra
  total = total-1;
  let number = Math.round(((Math.pow((correct / total),2) + correct) * total) / time)*100;
  if(isNaN(number)){
    number = 0;
  }
  return number;
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');

    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    // todo útfæra

    let data = getData();
    console.log(data);
    if(data.length !== 0){
      while(this.scores.firstChild){
      this.scores.removeChild(this.scores.firstChild);
      }
      this.button.classList.remove('highscore__button--hidden');
      data = Object.values(data);
      let ol = document.createElement('ol');
      for(let i = 0; i < data.length; i++) {
        let li = document.createElement('li')
        let span = document.createElement('span');
        span.classList.add('highscore__number');
        span.appendChild(document.createTextNode(`${data[i].points} stig `));
        let namespan = document.createElement('span');
        namespan.appendChild(document.createTextNode(`${data[i].name}`));
        namespan.classList.add('highscore__name');
        li.appendChild(span);
        li.appendChild(namespan);
        ol.appendChild(li);
      }
    this.scores.appendChild(ol);

    console.log(data.length);      
    }
    else{
      this.button.classList.add('highscore__button--hidden');
    }


}

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    deleteData();
    while(this.scores.firstChild){
      this.scores.removeChild(this.scores.firstChild);
    }
    this.button.classList.add('highscore__button--hidden');
    let text = 'Engin stig skráð';
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(text));
    this.scores.appendChild(p);
    }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    //this.load();

  }
}
