// Toggle de la comunidad: { Cartelera de Eventos | Mascotas Buscadas | Difusión }
// Cada pestaña muestra su sección debajo del toggle y oculta las otras dos.
// También funciona con enlaces a #cartelera, #extraviados o #historias
// (por ejemplo, los botones de la portada o un enlace desde otra página: comunidad.html#extraviados).
(function () {
  const pestanas = Array.from(document.querySelectorAll('.navegacion-comunidad [role="tab"]'));
  const paneles = pestanas.map((pestana) => document.getElementById(pestana.dataset.pestana));
  const toggle = document.querySelector('.navegacion-comunidad');
  const encabezado = document.querySelector('.encabezado');

  // Muestra el panel con ese id; devuelve false si el id no es de ninguna pestaña
  function mostrarPanel(id) {
    const elegido = pestanas.findIndex((pestana) => pestana.dataset.pestana === id);
    if (elegido === -1) return false;
    pestanas.forEach((pestana, i) => {
      const activa = i === elegido;
      pestana.className = activa ? 'navegacion-comunidad__pestana-activa' : 'navegacion-comunidad__pestana';
      pestana.setAttribute('aria-selected', String(activa));
      pestana.tabIndex = activa ? 0 : -1;
      paneles[i].hidden = !activa;
    });
    return true;
  }

  // Guarda la pestaña en la dirección (#id) para que al recargar o compartir el enlace se abra la misma
  function recordarEnDireccion(id) {
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* sin historial disponible */ }
  }

  // Baja hasta el toggle dejando espacio para el encabezado fijo
  function irAlToggle() {
    const alto = encabezado ? encabezado.offsetHeight : 0;
    const destino = toggle.getBoundingClientRect().top + window.scrollY - alto - 16;
    window.scrollTo({ top: Math.max(0, destino), behavior: 'smooth' });
  }

  pestanas.forEach((pestana, i) => {
    pestana.addEventListener('click', () => {
      mostrarPanel(pestana.dataset.pestana);
      recordarEnDireccion(pestana.dataset.pestana);
    });
    // Teclado: flechas izquierda/derecha, Inicio y Fin cambian de pestaña
    pestana.addEventListener('keydown', (evento) => {
      const total = pestanas.length;
      const destino = { ArrowRight: (i + 1) % total, ArrowLeft: (i - 1 + total) % total, Home: 0, End: total - 1 }[evento.key];
      if (destino === undefined) return;
      evento.preventDefault();
      const id = pestanas[destino].dataset.pestana;
      mostrarPanel(id);
      recordarEnDireccion(id);
      pestanas[destino].focus();
    });
  });

  // Enlaces internos a un panel (#cartelera, #extraviados, #historias)
  document.addEventListener('click', (evento) => {
    const enlace = evento.target.closest('a[href^="#"]');
    if (!enlace) return;
    const id = enlace.getAttribute('href').slice(1);
    if (!mostrarPanel(id)) return;
    evento.preventDefault();
    recordarEnDireccion(id);
    irAlToggle();
  });

  // Al abrir la página con #id en la dirección, o si el #id cambia
  function desdeDireccion() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (mostrarPanel(id)) irAlToggle();
  }
  window.addEventListener('hashchange', desdeDireccion);
  if (location.hash) window.addEventListener('load', desdeDireccion);
  mostrarPanel(decodeURIComponent(location.hash.slice(1)));
})();

// Mascotas buscadas: acomoda las fichas en páginas de 12 (3 columnas × 4 filas).
// Cada página es una diapositiva del carrusel; las flechas (carrusel-eventos.js) pasan de una a otra.
(function () {
  const lista = document.querySelector('.extraviados__cuadricula[data-por-pagina]');
  if (!lista) return;
  const porPagina = Number(lista.dataset.porPagina) || 12;
  const fichas = Array.from(lista.querySelectorAll(':scope > .extraviados__tarjeta'));
  const total = Math.max(1, Math.ceil(fichas.length / porPagina));
  const pista = lista.parentElement;
  for (let i = 0; i < total; i++) {
    const pagina = document.createElement('div');
    pagina.className = 'carrusel-eventos__diapositiva';
    pagina.setAttribute('role', 'group');
    pagina.setAttribute('aria-roledescription', 'diapositiva');
    pagina.setAttribute('aria-label', 'Página ' + (i + 1) + ' de ' + total);
    const cuadricula = document.createElement('div');
    cuadricula.className = 'extraviados__cuadricula';
    fichas.slice(i * porPagina, (i + 1) * porPagina).forEach((ficha) => cuadricula.appendChild(ficha));
    pagina.appendChild(cuadricula);
    pista.appendChild(pagina);
  }
  lista.remove();
})();
