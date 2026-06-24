const mastersData = {
    1: {
        name: "Иван Петров",
        craft: "Печатное дело",
        tags: ["печатное дело"],
        description: "Мастер ручного набора шрифтов, работает с типографией с 1985 года. Сохраняет технологии старых печатных машин.",
        image: "aim/image5.jpg",
        year: "1958"
    },
    2: {
        name: "Елена Соколова",
        craft: "Оптика",
        tags: ["оптика"],
        description: "Шлифует линзы для медицинских приборов вручную. Единственный мастер в регионе, владеющий этой техникой.",
        image: "aim/image6.jpg",
        year: "1963"
    },
    3: {
        name: "Михаил Волков",
        craft: "Текстиль",
        tags: ["текстиль"],
        description: "Ткацкое ремесло на ручных станках. Восстанавливает исторические узоры народов Севера.",
        image: "aim/image7.jpg",
        year: "1971"
    },
    4: {
        name: "Андрей Новиков",
        craft: "Часовое дело",
        tags: ["часовое дело"],
        description: "Ремонтирует механические часы XIX-XX веков. Знает устройство более 200 механизмов.",
        image: "aim/image8.jpg",
        year: "1965"
    },
    5: {
        name: "Мария Федорова",
        craft: "Печатное дело",
        tags: ["печатное дело"],
        description: "Иллюстратор и печатник, работает с линогравюрой и офортом. Проводит мастер-классы по ручной печати.",
        image: "aim/image9.jpg",
        year: "1980"
    },
    6: {
        name: "Сергей Морозов",
        craft: "Оптика",
        tags: ["оптика"],
        description: "Создает объективы для кинокамер. Его линзы использовались на съемках известных российских фильмов.",
        image: "aim/image10.jpg",
        year: "1968"
    }
};

let isModalOpen = false;

const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function openModal(id) {
    const master = mastersData[id];
    if (!master) return;

    modalContent.innerHTML = `
        <button class="modal-close">✕</button>
        <div class="modal-image">
            <img src="${master.image}" alt="${master.name}">
        </div>
        <div class="modal-info">
            <h2>${master.name}</h2>
            <p class="modal-craft">${master.craft}</p>
            <p class="modal-year">Год рождения: ${master.year}</p>
            <p class="modal-description">${master.description}</p>
            <div class="modal-tags">
                ${master.tags.map(tag => `<span class="modal-tag">#${tag}</span>`).join('')}
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;

    document.querySelector('.modal-close').addEventListener('click', closeModal);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    isModalOpen = false;
}

document.querySelectorAll('.master-card').forEach(card => {
    card.addEventListener('click', function() {
        openModal(this.dataset.id);
    });
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isModalOpen) closeModal();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.master-card').forEach(card => {
            if (filter === 'все') {
                card.style.display = 'block';
            } else {
                // Получаем текст профессии из карточки и приводим к нижнему регистру
                const craftText = card.querySelector('.card-info p').textContent.toLowerCase();
                // Фильтр уже в нижнем регистре
                card.style.display = craftText === filter ? 'block' : 'none';
            }
        });
    });
});

document.querySelectorAll('.master-card').forEach(card => {
    card.style.display = 'block';
});
// Управление аудио
document.querySelectorAll('.audio-play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const audioId = this.dataset.audio;
        const audio = document.getElementById(audioId);
        
        if (audio.paused) {
            audio.play();
            this.textContent = '⏸ ПАУЗА';
            this.classList.add('playing');
        } else {
            audio.pause();
            this.textContent = '▶ ВОСПРОИЗВЕСТИ';
            this.classList.remove('playing');
        }
    });
});

// Остановка аудио при закрытии страницы
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('ended', function() {
        const btn = document.querySelector(`[data-audio="${this.id}"]`);
        if (btn) {
            btn.textContent = '▶ ВОСПРОИЗВЕСТИ';
            btn.classList.remove('playing');
        }
    });
});