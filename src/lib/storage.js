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
function addToJSON(olddata, newdata) {
  const oldstring = olddata.substring(0, olddata.length - 1);
  const newstring = newdata.substring(1, newdata.length - 1);
  const jsonfy = `${oldstring},${newstring}]`;
  return jsonfy;
}

export function load() {
  const gameScores = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (gameScores) {
    const parsed = JSON.parse(gameScores);
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
  let data = [{ name, points }];
  const gameScores = localStorage.getItem(LOCALSTORAGE_KEY);
  if (gameScores) {
    data = JSON.parse(addToJSON(gameScores, JSON.stringify(data)));
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}


/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  // todo útfæra
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}
