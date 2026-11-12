import { calcularHorasEstudio, obtenerPrecioBitcoinUSD } from './calculadora.js';

const cryptoStatus = document.getElementById('crypto-status');
const studyForm = document.getElementById('study-form');
const hoursInput = document.getElementById('hours');
const resultsBox = document.getElementById('results');
const weeklyHoursEl = document.getElementById('weekly-hours');
const totalHoursEl = document.getElementById('total-hours');
const evaluationTag = document.getElementById('evaluation-tag');

// 1. Obtener y mostrar datos en tiempo real de la API
async function cargarDatosCrypto() {
  const precioBTC = await obtenerPrecioBitcoinUSD();
  const metaMensualUSD = 4000;
  const equivalenciaBTC = (metaMensualUSD / precioBTC).toFixed(4);

  cryptoStatus.innerHTML = `
    <strong>1 BTC:</strong> $${precioBTC.toLocaleString()} USD <br>
    <small style="color: #94a3b8">Meta ($4,000 USD/mes) = ${equivalenciaBTC} BTC</small>
  `;
}

// 2. Manejar el evento del formulario interactivo
studyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const horas = Number(hoursInput.value);
  const reporte = calcularHorasEstudio(horas);

  weeklyHoursEl.textContent = reporte.semanales;
  totalHoursEl.textContent = reporte.total;

  if (reporte.ritmoCorrecto) {
    evaluationTag.textContent = "¡Ritmo excelente para conseguir trabajo rápido!";
    evaluationTag.className = "badge success";
  } else {
    evaluationTag.textContent = "Te recomendamos subir a 3-4 horas diarias.";
    evaluationTag.className = "badge warning";
  }

  resultsBox.classList.remove('hidden');
});

// Inicializar la app
cargarDatosCrypto();