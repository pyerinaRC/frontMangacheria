const isMobile = window.innerWidth <= 768;
        const container = document.querySelector('.comic-container');
        const loader = document.getElementById('comic-loader');

        document.querySelectorAll('.comic-page').forEach(p => p.remove());

        const imageSources = [
            '../img/comic-1.png',
            '../img/comic-2.png',
            '../img/comic-3.png',
            '../img/comic-4.png',
            '../img/comic-5.png',
            '../img/comic-6.png'
        ];

        let pageElements = [];
        let loadedImages = 0;

        function imageLoaded() {
            loadedImages++;
            if (loadedImages === imageSources.length) {
                loader.style.display = 'none';
                showPage(currentPage);
            }
        }

        function createImage(src) {
            const img = new Image();
            img.src = src;
            img.className = 'comic-imgs';
            img.onload = imageLoaded;
            return img;
        }

        if (isMobile) {
            imageSources.forEach((src, i) => {
                const page = document.createElement('div');
                page.className = 'comic-page';
                page.id = `page-${i}`;
                const img = createImage(src);
                page.appendChild(img);
                container.insertBefore(page, document.getElementById('btn-next'));
                pageElements.push(page);
            });
        } else {
            for (let i = 0; i < imageSources.length; i += 2) {
                const page = document.createElement('div');
                page.className = 'comic-page';
                page.id = `page-${i / 2}`;
                const img1 = createImage(imageSources[i]);
                page.appendChild(img1);
                if (imageSources[i + 1]) {
                    const img2 = createImage(imageSources[i + 1]);
                    img2.classList.add('img-right');
                    page.appendChild(img2);
                }
                container.insertBefore(page, document.getElementById('btn-next'));
                pageElements.push(page);
            }
        }

        let currentPage = 0;
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');

        function updateButtons() {
            btnPrev.style.display = currentPage === 0 ? 'none' : 'block';
            btnNext.style.display = currentPage === pageElements.length - 1 ? 'none' : 'block';
        }

        function showPage(index) {
            pageElements.forEach((page, i) => {
                page.classList.toggle('active', i === index);
            });
            updateButtons();
        }

        btnNext.onclick = () => {
            if (currentPage < pageElements.length - 1) {
                currentPage++;
                showPage(currentPage);
            }
        };

        btnPrev.onclick = () => {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        };