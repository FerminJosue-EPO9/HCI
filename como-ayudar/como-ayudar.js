
  function selectDonation(amount, description) {
    // Update active state in buttons
    const buttons = document.querySelectorAll('#donation-amount-group button');
    buttons.forEach(btn => {
      btn.classList.remove('seleccionado');
    });

    event.currentTarget.classList.add('seleccionado');

    // Update impact text
    const textTarget = document.getElementById('impact-text');
    if (textTarget) {
      textTarget.textContent = description;
    }
  }

  function copyClabe() {
    const clabe = "012840015894129482";
    navigator.clipboard.writeText(clabe).then(() => {
      const copyTextEl = document.getElementById('copy-text');
      if (copyTextEl) {
        copyTextEl.textContent = '¡Copiado!';
        setTimeout(() => {
          copyTextEl.textContent = 'Copiar';
        }, 2500);
      }
    });
  }

  function handleVolunteerSubmit(e) {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.classList.remove('oculto');
      const name = document.getElementById('vol-name').value;
      feedback.textContent = `¡Muchísimas gracias, ${name}! Tu solicitud de voluntariado ha sido registrada. Te escribiremos a WhatsApp pronto.`;
      document.getElementById('volunteer-form').reset();
    }
  }
