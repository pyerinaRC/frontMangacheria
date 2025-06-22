
  document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los iframes de Vimeo dentro del acordeón
    const iframes = document.querySelectorAll('#accordionFlushExample iframe');

    // Crea un mapa para almacenar los reproductores Vimeo
    const players = new Map();

    iframes.forEach((iframe, index) => {
      const player = new Vimeo.Player(iframe);
      players.set(iframe, player);
    });

    // Escucha eventos de colapso en todos los ítems
    const collapseElements = document.querySelectorAll('.accordion-collapse');

    collapseElements.forEach(collapseEl => {
      collapseEl.addEventListener('hide.bs.collapse', () => {
        const iframe = collapseEl.querySelector('iframe');
        if (iframe && players.has(iframe)) {
          players.get(iframe).pause().catch(error => {
            console.warn("No se pudo pausar el video:", error);
          });
        }
      });
    });
  });
