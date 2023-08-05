
let cuotaCelda = document.getElementById("cuerpoTabla");
const indiceMP = 70

const data = JSON.parse(localStorage.getItem("data"))

document.getElementById("resultado").innerHTML = `Tu mejor opción es ${data.result}`;
document.getElementById("cuotasAjustadas").innerHTML = `$ ${data.sumatoriaCuotas}`;
document.getElementById("tasaRecargo").innerHTML = data.tasaRecargo + "%";
document.getElementById("cadaCuota").innerHTML = `$ ${data.montoCuota}`;
document.getElementById("inflacionMensual").innerHTML = data.inflacion + "%";
data.arrayCuotas.forEach((cuota, indice) => {
    const templateTable =`<tr>
                            <td>${indice+1}</td>
                            <td>${cuota}</td>
                         </tr>`
    cuotaCelda.innerHTML+=templateTable
});