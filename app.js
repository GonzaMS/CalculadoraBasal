document.addEventListener("DOMContentLoaded", function () {
  const peso = document.querySelector("#peso");
  const btnCalcular = document.querySelector("#calcular");
  const error = document.querySelector("#error");
  const metodo = document.querySelector("#metodo");
  const multiplicador = document.querySelector("#seleccionarMultiplicador");
  const diario = document.querySelector("#diario");
  const flu = document.querySelector("#flu");
  const man = document.querySelector("#man");

  //Llamamos a la funcion cargarDosis
  cargarDosis();

  //Funcion para cargar las dosis
  function cargarDosis() {
    btnCalcular.addEventListener("click", calcular);
  }

  function calcular() {
    //Obtenemos el valor del peso ingresado
    const pesoInsertado = parseFloat(peso.value);
    const multiplicadorElejido = multiplicador.value;

    //Verificamos si el pesoInsertado no tiene valor
    if (isNaN(pesoInsertado) || pesoInsertado === 0) {
      flu.innerHTML = "";
      man.innerHTML = "";
      metodo.innerHTML = "";
      diario.innterHTML ="";
      error.style.display = "block";
      return;
    } else {
      error.style.display = "none";
    }

    //Verificamos si el pesoInsertado es mayor a 30
    if (pesoInsertado > 0 && pesoInsertado < 30) {
      calculoHollidaySegar(pesoInsertado);
    } else {
      calculoHidratacionBasal(pesoInsertado, multiplicadorElejido);
    }
  }

  //Funcion para calcular la dosis segun la formula de Holliday-Segar
  function calculoHollidaySegar(peso) {
    //Variables para calcular la dosis
    let fluidoRequerido = 0;
    let flujoHorario = 0;
    let flujoMantenimiento = 0;

    //Verificamos el peso para calcular la dosis
    if (peso <= 10) {
      fluidoRequerido += peso * 100;
      flujoHorario = Math.round(fluidoRequerido / 24);
      flujoMantenimiento = Math.round(flujoHorario * 1.5);
    } else if (peso > 10 && peso <= 20) {
      fluidoRequerido += 1000 + (peso - 10) * 50;
      flujoHorario = Math.round(fluidoRequerido / 24);
      flujoMantenimiento = Math.round(flujoHorario * 1.5);
    } else {
      fluidoRequerido += 1500 + (peso - 20) * 20;
      flujoHorario = Math.round(fluidoRequerido / 24);
      flujoMantenimiento = Math.round(flujoHorario * 1.5);
    }

    //Mostramos el resultado en los parrafos
    diario.innerHTML = `<p> ${fluidoRequerido} cc Volumen diario</p>`;
    flu.innerHTML = `<p> ${flujoHorario} cc/hr</p>`;
    man.innerHTML = `<p> m+m/2 ${flujoMantenimiento} cc/hr</p>`;
    metodo.innerHTML = `<p> Metodo Holliday-Segar</p>`;
  }

  //Funcion para calcular la dosis segun la formula de Superficie Corporal
  function calculoHidratacionBasal(peso, multiplicador) {
    //Variables para calcular la dosis
    let fluidoRequerido = 0;
    let flujoHorario = 0;
    let flujoMantenimiento = 0;

    //Calculamos la dosis
    fluidoRequerido = Math.floor(
      ((peso * 4 + 7) / (parseInt(peso) + 90)) * multiplicador
    );
    flujoHorario = Math.round(fluidoRequerido / 24);
    flujoMantenimiento = Math.round(flujoHorario * 1.5);

    //Mostramos el resultado en el parrafo
    diario.innerHTML = `<p> ${fluidoRequerido} cc Volumen diario</p>`;
    flu.innerHTML = `<p> ${flujoHorario} cc/hr</p>`;
    man.innerHTML = `<p> m+m/2 ${flujoMantenimiento} cc/hr</p>`;
    metodo.innerHTML = `<p>Metodo superficie corporal</p>`;
  }
});
