// Catch elements
const historyContainer = document.getElementById('historyContainer');
const predictionsTableBody = document.querySelector('#predictionsTable tbody');
const historyLoading = document.getElementById('historyLoading');
const historyError = document.getElementById('historyError');
const noPredictionsMessage = document.getElementById('noPredictionsMessage');

document.addEventListener('DOMContentLoaded', fetchPredictionHistory);

async function fetchPredictionHistory() {
  try {
    showElement(historyLoading);
    hideElement(historyError);
    hideElement(predictionsTableBody.parentElement); // Sembunyikan tabel awalnya
    hideElement(noPredictionsMessage);

    const response = await PredictAPI.getHistory();
    console.log('API Response:', response); // Debugging: periksa konsol untuk melihat respons

    // KARENA RESPONNYA LANGSUNG ARRAY, kita sesuaikan kondisi di bawah ini
    if (response && Array.isArray(response) && response.length > 0) {
      displayPredictionHistory(response); // Langsung kirim array respons ke fungsi display
      showElement(predictionsTableBody.parentElement); // Tampilkan tabel
    } else {
      showElement(noPredictionsMessage); // Tampilkan pesan jika tidak ada prediksi
    }
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    historyError.textContent = 'Failed to load prediction history. Please try again later.';
    showElement(historyError);
  } finally {
    hideElement(historyLoading);
  }
}

function displayPredictionHistory(predictions) {
  predictionsTableBody.innerHTML = ''; // Hapus baris yang ada

  predictions.forEach(prediction => {
    const row = document.createElement('tr');
    // Perhatikan penyesuaian nama properti sesuai contoh respons API Anda
    row.innerHTML = `
      <td>${new Date(prediction.createdAt).toLocaleString()}</td>
      <td>${prediction.id || 'N/A'}</td> <td>${prediction.result}</td>
      <td>${prediction.explanation}</td>
      <td>${prediction.suggestion}</td>
    `;
    predictionsTableBody.appendChild(row);
  });
}

function displayPredictionHistory(predictions) {
  predictionsTableBody.innerHTML = '';

  predictions.forEach(prediction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td data-label="Date">${new Date(prediction.createdAt).toLocaleString()}</td>
      <td data-label="Image ID">${prediction.id || 'N/A'}</td>
      <td data-label="Result">${prediction.result}</td>
      <td data-label="Explanation">${prediction.explanation}</td>
      <td data-label="Suggestion">${prediction.suggestion}</td>
    `;
    predictionsTableBody.appendChild(row);
  });
}