// Módulo de cálculos financieros y de tiempo

export function calcularIngresoAnual(salarioMensual) {
  return salarioMensual * 12;
}

export function evaluarPerfil(semanasEstudio, nivelIngles) {
  const listo = semanasEstudio >= 8 && (nivelIngles === "B2" || nivelIngles === "C1");
  return {
    apto: listo,
    mensaje: listo 
      ? "¡Perfil óptimo para postular a ofertas internacionales en USD!" 
      : "Se recomienda reforzar el nivel de inglés o completar las 8 semanas de preparación."
  };
}

export function calcularHorasEstudio(horasDiarias) {
  const horasSemanales = horasDiarias * 5;
  const total8Semanas = horasSemanales * 8;
  return {
    semanales: horasSemanales,
    total: total8Semanas,
    ritmoCorrecto: total8Semanas >= 120
  };
}

// Conexión REAL a una API pública de cripto/divisas en internet
export async function obtenerPrecioBitcoinUSD() {
  console.log("\n[API REAL] Conectando con el servidor de CoinGecko en internet...");
  
  try {
    const respuesta = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const datos = await respuesta.json();
    return datos.bitcoin.usd;
  } catch (error) {
    console.log("Error al consultar la API en vivo, usando valor base fallback.");
    return 65000;
  }
}