const loadPsicologos = () => {
        fetch("data/psicologos.json")
            .then((resultado) => resultado.json())
            .then((array) => {
                    const psicologos = document.getElementById("psicologos");
                    let cont = 0;
                    for (let obj of array) {
                        const template = `<div class="strip_list wow fadeIn psicologo">
            <a href="#0" class="wish_bt"></a>
            <figure>
              <a href="detail-page-2.html">
                <img src=${obj.imagen}" alt=""/>
              </a>
            </figure>
        <small>${obj.especialidad}</small>
            <h3 class="nombrePsicologo">${obj.nombre}</h3>
            <p>
              ${obj.descripcion}
            </p>
            <span class="rating">
              <i class="icon_star voted"></i>
              <i class="icon_star voted"></i>
              <i class="icon_star voted"></i>
              <i class="icon_star"></i>
              <i class="icon_star"></i> <small>(${obj.reviews})</small>
            </span>
            <a
              href="badges.html"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Badge Level"
              class="badge_list_1"
            >
              <img src="img/badges/badge_1.svg" width="15" height="15" alt="" />
            </a>
            <ul>
              <li>
                <a
                  href="#0"
                  onclick="onHtmlClick('Piscólogos', 0)"
                  class="btn_listing"
                >
                  Ver en el mapa
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53642.158314568944!2d-79.9372139491017!3d-2.1623513053034555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x674a1c7815b63297!2sCiap%20Centro%20Integral%20De%20Atenci%C3%B3n%20Psicol%C3%B3gica!5e0!3m2!1ses-419!2sec!4v1595607537226!5m2!1ses-419!2sec"
                  target="_blank"
                >
                  Directions
                </a>
              </li>
              <li>
                <a href="detail-page-2.html" ${
                  cont === 0
                    ? `data-step="3"
                data-intro="Da click para agendar tu cita"`
                    : ""
                }>Agenda ahora</a>
              </li>
            </ul>
          </div>`;
        cont++;
        psicologos.innerHTML += template;
      }
    })
    .then(() => {
      introJs().start();
    })
    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
};

const filterResults = () => {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const textSearch = document.getElementById("textSearch").value;

    const resultados = document.getElementsByClassName("psicologo");

    for (let r of resultados) {
      const psicologo = r.getElementsByClassName("nombrePsicologo")[0];
      r.setAttribute("class", r.getAttribute("class") + " d-none");
      if (psicologo.textContent.toUpperCase().includes(textSearch.toUpperCase())) {
        r.classList.remove("d-none");
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  loadPsicologos();
  filterResults();
});