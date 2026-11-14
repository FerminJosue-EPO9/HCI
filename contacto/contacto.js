
    function handleFormSubmit() {
      const btn = document.getElementById('submitBtn');
      const successMsg = document.getElementById('formSuccessMessage');
      const form = document.getElementById('contactForm');
      
      btn.innerHTML = '<span class="material-symbols-outlined formulario-contacto__icono-cargando">progress_activity</span> Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<span>Mensaje enviado con éxito</span> <span class="material-symbols-outlined formulario-contacto__icono-4">check</span>';
        btn.classList.add('enviado');
        successMsg.classList.remove('oculto');
        form.reset();

        setTimeout(() => {
          btn.innerHTML = '<span>Enviar otro mensaje</span> <span class="material-symbols-outlined formulario-contacto__icono-4">send</span>';
          btn.classList.remove('enviado');
          btn.disabled = false;
        }, 5000);
      }, 900);
    }
  