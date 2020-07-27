const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

//   I dont know where else to store it
const apiKey = 'Rvu659tXzZpvrPD1ApIN';

// function storeGameId() {
//   this.sys.game.globals.gameID = apiKey;
// }

// async function registerGame() {
//   try {
//     const response = await fetch(`${baseUrl}games/`, {
//       method: 'POST',
//       mode: 'cors',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: 'StarShip Shooting Game',
//       }),
//     });
//     const data = await response.json();
//     return Promise.resolve(gameID(data));
//   } catch (e) {
//     console.log(e);
//   }
// }

async function setScore(scoreValue = 0) {
  const url = `${baseUrl}games/${apiKey}/scores/`;

  const scoreSet = {
    user: 'Seth Zea',
    score: scoreValue,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify(scoreSet),
    });
    const data = await response.json();
    console.log(data.result);
  } catch (e) {
    console.log(e);
  }
}

async function getScore() {
  const response = await fetch(`${baseUrl}games/${apiKey}/scores/`);
  const result = await response.json();
  return result;
}

const api = {
  setScore,
  getScore,
};

export default api;
