const isMobile = window.innerWidth <= 768;
const container = document.querySelector('.comic-container');

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

if (isMobile) {
    imageSources.forEach((src, i) => {
        const page = document.createElement('div');
        page.className = 'comic-page';
        page.id = `page-${i}`;
        page.innerHTML = `<img src="${src}" class="comic-imgs">`;
        container.insertBefore(page, document.getElementById('btn-next'));
        pageElements.push(page);
    });
} else {
    for (let i = 0; i < imageSources.length; i += 2) {
        const page = document.createElement('div');
        page.className = 'comic-page';
        page.id = `page-${i / 2}`;
        page.innerHTML = `
            <img src="${imageSources[i]}" class="comic-imgs img-left">
            ${imageSources[i + 1] ? `<img src="${imageSources[i + 1]}" class="comic-imgs img-right">` : ''}
        `;
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

showPage(currentPage);
