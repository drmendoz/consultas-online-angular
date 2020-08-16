const manejarSteps = () => {
    let detalles = document.getElementById("btn_detalles")
    detalles.addEventListener("click", () => {
        let step2 = document.getElementById("steep-2")
        step2.setAttribute("class", step2.getAttribute("class") + " activate")
        let step1 = document.getElementById("steep-1")
        step1.classList.add("completed")
    })
    let infoPago = document.getElementById("btn_info")
    infoPago.addEventListener("click", () => {
        let step3 = document.getElementById("steep-3")
        step3.setAttribute("class", step3.getAttribute("class") + " activate")
        let step2 = document.getElementById("steep-2")
        step2.classList.add("completed")
    })
    let envio = document.getElementById("btn_envio")
    envio.addEventListener("click", () => {
        let step3 = document.getElementById("steep-3")
        step3.classList.add("completed")
    })

}

document.addEventListener("DOMContentLoaded", function() {
    manejarSteps()
});