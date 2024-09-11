document.addEventListener("DOMContentLoaded", () => {
    const videoGrid = document.getElementById('video-grid');
    const addVideoBtn = document.getElementById('addVideoBtn');
    const videoUrlInput = document.getElementById('videoUrl');

    // Функция для создания элемента с видео
    function createVideoItem(videoId) {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
        videoGrid.appendChild(videoElement);
    }

    // Функция для получения ID видео из ссылки (поддержка обычных и коротких ссылок)
    function extractVideoId(url) {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
                return urlObj.searchParams.get('v');
            }
            if (urlObj.hostname === 'youtu.be') {
                return urlObj.pathname.substring(1);
            }
        } catch (error) {
            return null;
        }
    }

    // Функция для загрузки видео из LocalStorage
    function loadVideos() {
        const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
        storedVideos.forEach(videoId => createVideoItem(videoId));
    }

    // Функция для сохранения видео в LocalStorage
    function saveVideo(videoId) {
        const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
        if (!storedVideos.includes(videoId)) {  // Проверяем на дубликаты
            storedVideos.push(videoId);
            localStorage.setItem('videos', JSON.stringify(storedVideos));
        } else {
            alert("Это видео уже добавлено.");
        }
    }

    // Обработчик нажатия кнопки "Добавить видео"
    addVideoBtn.addEventListener('click', () => {
        const videoUrl = videoUrlInput.value;
        if (videoUrl) {
            const videoId = extractVideoId(videoUrl);
            if (videoId) {
                createVideoItem(videoId);  // Добавляем видео на страницу
                saveVideo(videoId);        // Сохраняем видео в LocalStorage
                videoUrlInput.value = '';  // Очищаем поле ввода
            } else {
                alert("Пожалуйста, введите корректную ссылку на YouTube.");
            }
        }
    });

    // Загружаем видео при загрузке страницы
    loadVideos();
});
