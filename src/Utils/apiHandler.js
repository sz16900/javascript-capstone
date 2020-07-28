const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

//   I dont know where else to store it
const apiKey = 'Rvu659tXzZpvrPD1ApIN';

async function setScore(playerName = '', gameScore = 0) {
  const url = `${baseUrl}games/${apiKey}/scores/`;

  const dataToApi = {
    user: playerName,
    score: gameScore,
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
      body: JSON.stringify(dataToApi),
    });
    const data = await response.json();
  } catch (e) {
    console.log(e);
  }
}

const getScore = async () => {
  const response = await fetch(`${baseUrl}games/${apiKey}/scores/`, {
    mode: 'cors',
  });
  if (!response.ok) {
    throw new Error('Something went wrong with your query.');
  } else {
    const result = await response.json();
    return result;
  }
};

const api = {
  setScore,
  getScore,
};

export default api;
