const form = document.getElementById("form");
const submit = document.getElementById("submit");
let resultado;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let precioContado = parseInt(
      document.getElementById("precioContado").value
    );
    let precioCuotas = parseInt(
      document.getElementById("precioCuotas").value
    );

    if (!precioContado || !precioCuotas || precioCuotas < 0 || precioContado < 0) {
      alert(
        "Por favor ingrese valores válidos para el precio de contado y el precio en cuotas"
      );
      return;
    }

    if (precioCuotas < precioContado) {
      alert("El valor de cuotas no puede ser menor que el de contado.");
      return;
    }

    resultado = valorPresente();

    if (resultado.resultado < precioContado) {
      document.getElementById("resultado").innerHTML =
        "Tu mejor opcion es comprar en cuotas";
    } else {
      document.getElementById("resultado").innerHTML =
        "Tu mejor opcion es comprar de contado";
    }

    const result = resultado.resultado < precioContado ? "comprar en cuotas" : "comprar de contado";
    const sumatoriaCuotas = resultado.resultado
    let tasaRecargo = (((precioCuotas/precioContado)-1)*100).toFixed(1);
    let cuotas = parseInt(document.getElementById("cuotas").value);
    let montoCuota = (precioCuotas/cuotas).toFixed(0);
    let inflacion = document.getElementById("inflacion").value;
    const data= {
      result,
      sumatoriaCuotas,
      tasaRecargo,
      montoCuota, 
      inflacion,
      arrayCuotas:resultado.arrayCuotas, 
      valorFuturo
    }
    console.log(data)
    localStorage.setItem("data", JSON.stringify(data))

    window.location.href = "results.html"
});


}

function valorPresente() {
  let precioCuotas = parseInt(document.getElementById("precioCuotas").value);
  let inflacion = document.getElementById("inflacion").value;
  let cuotas = document.getElementById("cuotas").value;
  let precioEnCuotas = precioCuotas / cuotas;
  let tasaInteres = document.getElementById("tasaInteres").value;
  let precioContado = parseInt(document.getElementById("precioContado").value);


  let denominador1 = Math.pow(1 + inflacion / 100, cuotas);
  let denominador2 = 1 / denominador1;
  let valorFuturo = 0
  let resultado = precioEnCuotas / (1 + inflacion / 100);
  const arrayCuotas = [resultado.toFixed(2)]
  for (let i = 1; i < cuotas; i++) {
    console.log(`ciclo ${i}`);
    console.log(`resultado: ${resultado}`);
    const valorCuota = precioEnCuotas / Math.pow(1 + inflacion / 100, i + 1);
    arrayCuotas.push(valorCuota.toFixed(2))
    resultado += valorCuota
    valorFuturo = precioContado * Math.pow(1 + tasaInteres / 100, i + 1);
    console.log(`El valor futuro en el período ${i + 1} es: ${valorFuturo.toFixed(2)}`);

  }


  resultado = resultado.toFixed(0);
  valorFuturo = valorFuturo.toFixed(2)
  console.log("el resultado final es " + resultado + " y el valor futuro es " + valorFuturo);
  return {
    resultado, arrayCuotas, valorFuturo
  };


}




