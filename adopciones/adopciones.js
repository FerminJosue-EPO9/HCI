
    (function initAdoptionApp() {
      const activeFilters = {
        species: 'all',
        size: 'all',
        age: 'all',
        compat: []
      };

      const filterButtons = document.querySelectorAll('.filter-btn');
      const compatButtons = document.querySelectorAll('.compat-btn');
      const resetBtn = document.getElementById('reset-filters-btn');
      const cards = document.querySelectorAll('.pet-card');
      const counter = document.getElementById('pet-count-indicator');

      function applyFilters() {
        let visibleCount = 0;

        cards.forEach(card => {
          const cardSpecies = card.getAttribute('data-species');
          const cardSize = card.getAttribute('data-size');
          const cardAge = card.getAttribute('data-age');
          const cardCompat = (card.getAttribute('data-compat') || '').split(',');

          const matchSpecies = activeFilters.species === 'all' || activeFilters.species === cardSpecies;
          const matchSize = activeFilters.size === 'all' || activeFilters.size === cardSize;
          const matchAge = activeFilters.age === 'all' || activeFilters.age === cardAge;
          
          let matchCompat = true;
          if (activeFilters.compat.length > 0) {
            matchCompat = activeFilters.compat.every(c => cardCompat.includes(c));
          }

          if (matchSpecies && matchSize && matchAge && matchCompat) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (counter) {
          counter.textContent = visibleCount === 1 
            ? 'Mostrando 1 peludo listo para adopción'
            : `Mostrando ${visibleCount} peludos listos para adopción`;
        }
      }

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const group = btn.getAttribute('data-filter');
          const val = btn.getAttribute('data-val');

          // Deselect sisters in same group
          document.querySelectorAll(`[data-filter="${group}"]`).forEach(b => {
            b.classList.remove('active');
          });

          btn.classList.add('active');

          activeFilters[group] = val;
          applyFilters();
        });
      });

      compatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-val');
          const idx = activeFilters.compat.indexOf(val);

          if (idx > -1) {
            activeFilters.compat.splice(idx, 1);
            btn.classList.remove('active');
          } else {
            activeFilters.compat.push(val);
            btn.classList.add('active');
          }
          applyFilters();
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeFilters.species = 'all';
          activeFilters.size = 'all';
          activeFilters.age = 'all';
          activeFilters.compat = [];

          document.querySelectorAll('[data-filter]').forEach(b => {
            if (b.getAttribute('data-val') === 'all') {
              b.classList.add('active');
            } else {
              b.classList.remove('active');
            }
          });

          compatButtons.forEach(b => {
            b.classList.remove('active');
          });

          applyFilters();
        });
      }

      // Adoption Dialog
      window.openAdoptionModal = function(name, details, sex) {
        const dialog = document.getElementById('adoptionModal');
        const title = document.getElementById('modalPetName');
        const subtitle = document.getElementById('modalPetDetails');
        if (title) title.textContent = `Adoptar a ${name}`;
        if (subtitle) subtitle.textContent = `${details} · ${sex}`;
        if (dialog) dialog.showModal();
      };

      window.closeAdoptionModal = function() {
        const dialog = document.getElementById('adoptionModal');
        if (dialog) dialog.close();
      };

      window.handleAdoptionSubmit = function(e) {
        e.preventDefault();
        alert('¡Muchas gracias por postularte! Tu solicitud ha sido registrada en el sistema de Patitas Suaves Xalapa. Nos pondremos en contacto contigo pronto vía WhatsApp.');
        closeAdoptionModal();
        e.target.reset();
      };
    })();
  