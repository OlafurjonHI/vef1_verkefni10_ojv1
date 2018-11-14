/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
	//clear();
    const game_Scores = window.localStorage.getItem(LOCALSTORAGE_KEY);
    
    if (game_Scores) {
      let parsed = JSON.parse(game_Scores);
  		return parsed;
    }
    return [];
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function save(name, points) {
	  let data = [{name,points}];
	  const game_Scores = localStorage.getItem(LOCALSTORAGE_KEY);
	  console.log("game_Scores" + game_Scores);
	  if(game_Scores){
	  	data = JSON.parse(addToJSON(game_Scores,JSON.stringify(data)));
	  	console.log(data);
	  }

	  localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(data));
}

function addToJSON(olddata,newdata){
  let oldstring = olddata.substring(0,olddata.length-1);
  let newstring = newdata.substring(1,newdata.length-1);
  let jsonfy = `${oldstring},${newstring}]`;
  console.log(jsonfy);
  return jsonfy;
}
/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}
