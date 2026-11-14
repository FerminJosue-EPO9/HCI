
    function toggleSensitiveMedia() {
      const img = document.getElementById('rescue-image-before');
      const overlay = document.getElementById('rescue-overlay');
      if (img && overlay) {
        if (img.classList.contains('blur-md')) {
          img.classList.remove('blur-md');
          overlay.classList.add('hidden');
        }
      }
    }
