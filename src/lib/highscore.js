// todo vísa í rétta hluti með import
import { load as getData } from './storage'; /*eslint-disable-line*/
import { clear as deleteData } from './storage'; /*eslint-disable-line*/

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
  let number = Math.round(((((correct / total - 1) ** 2) + correct) * total - 1) / time) * 100;
  if (isNaN(number) || number < 0) { /*eslint-disable-line*/
    number = 0;
  }
  return number;
}

function sortByScore(data) {
  for (let i = 0; i < data.length; i += 1) {
    for (let k = data.length - 1; k > 0; k -= 1) {
      if (data[k - 1].points < data[k].points) {
        const temp = data[k - 1];
        data[k - 1] = data[k]; /*eslint-disable-line*/
        data[k] = temp; /*eslint-disable-line*/
      }
    }
  }
  return data;
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
    data = sortByScore(data);
    if (data.length !== 0) {
      while (this.scores.firstChild) {
        this.scores.removeChild(this.scores.firstChild);
      }
      this.button.classList.remove('highscore__button--hidden');
      data = Object.values(data);
      const ol = document.createElement('ol');
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('highscore__number');
        span.appendChild(document.createTextNode(`${data[i].points} stig `));
        const namespan = document.createElement('span');
        namespan.appendChild(document.createTextNode(`${data[i].name}`));
        namespan.classList.add('highscore__name');
        li.appendChild(span);
        li.appendChild(namespan);
        ol.appendChild(li);
      }
      this.scores.appendChild(ol);
    } else {
      this.button.classList.add('highscore__button--hidden');
    }
  }
  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */

  clear() {
    deleteData();
    while (this.scores.firstChild) {
      this.scores.removeChild(this.scores.firstChild);
    }
    this.button.classList.add('highscore__button--hidden');
    const text = 'Engin stig skráð';
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(text));
    this.scores.appendChild(p);
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore() {
    this.load();
  }
}
