// ======== КОНФИГУРАЦИЯ ========
// Все URL картинок и 3D моделей хранятся здесь

const CONFIG = {
    // 3D модели автомобилей (можно переключать)
    car3d: {
        // Разные модели на выбор
        model1: "https://prod.spline.design/6Wq1Q7YV7KQ-0UHA/scene.splinecode", // Спортивная машина
        model2: "https://prod.spline.design/cZnw7z-8gV6Dq9FY/scene.splinecode", // Классическая машина
        model3: "https://prod.spline.design/OcayKqNkqF-4I6tL/scene.splinecode", // Tesla
        current: "https://prod.spline.design/6Wq1Q7YV7KQ-0UHA/scene.splinecode" // Активная модель
    },
    
    // Иконки для контактов (можно заменить на свои)
    icons: {
        phone: "📞", // Можно заменить на URL картинки: "https://твойсайт.ru/phone.png"
        vk: "VK",    // Или: "https://твойсайт.ru/vk.png"
        telegram: "📱" // Или: "https://твойсайт.ru/tg.png"
    },
    
    // Фоны для 3D контейнера
    backgrounds: {
        day: "linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
        night: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
    }
};

// Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Имя пользователя
const user = tg.initDataUnsafe?.user;
const username = user?.first_name || user?.username || 'друг';

// Загружаем тему
const savedTheme = localStorage.getItem('theme');

// Экспортируем для использования в HTML
window.CONFIG = CONFIG;
window.username = username;
window.savedTheme = savedTheme;
window.tg = tg;
