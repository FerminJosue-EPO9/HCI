/* ==========================================================
   Menú del encabezado en celulares y tabletas (< 1280px)
   El botón .encabezado__menu-boton abre y cierra la navegación
   (.encabezado__navegacion) agregándole la clase de estado "active".
   Se cierra al elegir un enlace o "Ingresar", al tocar fuera, con Escape y al
   ensanchar la ventana hasta el tamaño de escritorio.
   ========================================================== */

(function () {
  const boton = document.querySelector('.encabezado__menu-boton');
  const menu = document.querySelector('.encabezado__navegacion');
  if (!boton || !menu) return;

  const icono = boton.querySelector('.encabezado__menu-icono');
  const escritorio = window.matchMedia('(min-width: 1280px)');

  function abrir(abierto) {
    menu.classList.toggle('active', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    if (icono) icono.textContent = abierto ? 'close' : 'menu';
  }

  boton.addEventListener('click', function () {
    abrir(!menu.classList.contains('active'));
  });

  menu.addEventListener('click', function (evento) {
    if (evento.target.closest('a, button')) abrir(false);
  });

  document.addEventListener('click', function (evento) {
    if (!menu.classList.contains('active')) return;
    if (!menu.contains(evento.target) && !boton.contains(evento.target)) abrir(false);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('active')) {
      abrir(false);
      boton.focus();
    }
  });

  escritorio.addEventListener('change', function (consulta) {
    if (consulta.matches) abrir(false);
  });
})();
