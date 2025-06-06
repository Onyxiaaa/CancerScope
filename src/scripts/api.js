// TODO: Silakan sesuaikan BASE URL dari endpoint Anda
const BASE_URL = 'http://localhost:8080';

const ENDPOINT = {
  predict: `${BASE_URL}/predict`,
  // New endpoint for fetching all predictions
  history: `${BASE_URL}/predictions`, 
};

class PredictAPI {
  static async predict(data) {
    const response = await fetch(ENDPOINT.predict, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    });

    const json = await response.json();
    return json;
  }

  // New method to fetch all predictions
  static async getHistory() {
    const response = await fetch(ENDPOINT.history);
    const json = await response.json();
    return json;
  }
}