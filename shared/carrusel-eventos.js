// Carrusel de eventos (compartido por las páginas recoloreadas): muestra un evento a la vez.
// Se cambia con las flechas, con las teclas ← → (con el foco dentro del carrusel) o deslizando el dedo en celular.
// Funciona con cualquier número de eventos y con varios carruseles en la misma página.
document.querySelectorAll('.carrusel-eventos').forEach((carrusel) => {
  const pista = carrusel.querySelector('.carrusel-eventos__pista');
  const diapositivas = Array.from(pista.querySelectorAll('.carrusel-eventos__diapositiva'));
  const estado = carrusel.querySelector('.carrusel-eventos__estado');
  const etiqueta = carrusel.dataset.etiqueta || 'Evento'; // texto del anuncio: "Evento 1 de 3", "Página 1 de 2"…
  let actual = 0;
  // con una sola diapositiva no hay a dónde desplazarse: se ocultan las flechas
  carrusel.querySelectorAll('.carrusel-eventos__flecha').forEach((flecha) => { flecha.hidden = diapositivas.length < 2; });

  function mostrar(indice) {
    actual = (indice + diapositivas.length) % diapositivas.length; // da la vuelta al llegar al final
    pista.style.setProperty('--carrusel-indice', actual);
    diapositivas.forEach((diapositiva, i) => {
      const visible = i === actual;
      diapositiva.inert = !visible; // los enlaces del evento oculto no reciben el foco
      diapositiva.setAttribute('aria-hidden', String(!visible));
    });
    estado.textContent = etiqueta + ' ' + (actual + 1) + ' de ' + diapositivas.length;
  }

  carrusel.querySelector('.carrusel-eventos__flecha-anterior').addEventListener('click', () => mostrar(actual - 1));
  carrusel.querySelector('.carrusel-eventos__flecha-siguiente').addEventListener('click', () => mostrar(actual + 1));

  carrusel.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') mostrar(actual - 1);
    else if (evento.key === 'ArrowRight') mostrar(actual + 1);
    else return;
    evento.preventDefault();
  });

  // Deslizar con el dedo (pantallas táctiles)
  let inicioX = null;
  pista.addEventListener('pointerdown', (evento) => { if (evento.pointerType !== 'mouse') inicioX = evento.clientX; });
  pista.addEventListener('pointerup', (evento) => {
    if (inicioX === null) return;
    const recorrido = evento.clientX - inicioX;
    inicioX = null;
    if (Math.abs(recorrido) > 50) mostrar(actual + (recorrido < 0 ? 1 : -1));
  });
  pista.addEventListener('pointercancel', () => { inicioX = null; });

  mostrar(0);
});
