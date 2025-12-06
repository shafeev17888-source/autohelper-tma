// Подключаемся к Telegram
const tg = window.Telegram.WebApp;

// Когда страница загрузилась
document.addEventListener('DOMContentLoaded', function() {
    // Раскрываем на весь экран
    tg.expand();
    
    // Меняем цвет фона Telegram
    tg.setHeaderColor('#1a2980');
    tg.setBackgroundColor('#1a2980');
    
    // Показываем кнопку внизу
    tg.MainButton.setText('Открыть меню').show();
    
    // Приветствие
    
});

// 1. Функция диагностики
function runDiagnostics() {
    const resultDiv = document.getElementById('diagnostics-result');
    
    // Показываем анимацию загрузки
    resultDiv.innerHTML = '<p>🔍 Проверяем системы автомобиля...</p>';
    resultDiv.style.display = 'block';
    
    // Имитируем проверку (в реальности тут запрос к API)
    setTimeout(() => {
        const diagnostics = [
            { system: 'Двигатель', status: '✅ Отличное состояние', icon: '⚙️' },
            { system: 'Тормоза', status: '✅ Нормальный износ', icon: '🛑' },
            { system: 'Аккумулятор', status: '⚠️ Заряд 75%', icon: '🔋' },
            { system: 'Шины', status: '✅ Давление в норме', icon: '🛞' },
            { system: 'Масло', status: '✅ Замена через 3000 км', icon: '🛢️' }
        ];
        
        let html = '<h3>Результаты диагностики:</h3>';
        diagnostics.forEach(item => {
            html += `<div class="diagnostic-item">
                        <span>${item.icon} ${item.system}:</span>
                        <span>${item.status}</span>
                     </div>`;
        });
        
        html += '<p><small>Рекомендация: Проверьте аккумулятор на следующей неделе</small></p>';
        
        resultDiv.innerHTML = html;
        
        // Показываем уведомление в Telegram
        showNotification('Диагностика завершена! Проверьте результаты.');
    }, 1500);
}

// 2. Поиск сервисов
function findServices() {
    const resultDiv = document.getElementById('services-result');
    resultDiv.innerHTML = '<p>🔎 Ищем лучшие сервисы рядом...</p>';
    resultDiv.style.display = 'block';
    
    setTimeout(() => {
        const services = [
            { name: '🚗 Авто-Профи', distance: '1.2 км', rating: '4.8 ★', price: 'Средние' },
            { name: '🔧 Быстрый Ремонт', distance: '2.5 км', rating: '4.6 ★', price: 'Низкие' },
            { name: '⭐ Премиум Сервис', distance: '3.1 км', rating: '4.9 ★', price: 'Высокие' }
        ];
        
        let html = '<h3>Найденные сервисы:</h3>';
        services.forEach(service => {
            html += `<div class="service-card">
                        <strong>${service.name}</strong><br>
                        📍 ${service.distance} | ${service.rating}<br>
                        💰 Цены: ${service.price}
                     </div>`;
        });
        
        html += '<button onclick="bookService()" style="margin-top: 10px;">Записаться онлайн</button>';
        
        resultDiv.innerHTML = html;
    }, 1200);
}

// 3. История автомобиля
function showHistory() {
    const resultDiv = document.getElementById('history-result');
    resultDiv.style.display = 'block';
    
    const history = [
        { date: '15.10.2023', service: 'Замена масла и фильтров', cost: '5000 ₽' },
        { date: '22.08.2023', service: 'Замена тормозных колодок', cost: '12000 ₽' },
        { date: '10.05.2023', service: 'Техническое обслуживание', cost: '15000 ₽' },
        { date: '01.02.2023', service: 'Замена аккумулятора', cost: '8000 ₽' }
    ];
    
    let html = '<h3>📅 История обслуживания:</h3>';
    history.forEach(record => {
        html += `<div class="history-record">
                    <strong>${record.date}</strong><br>
                    ${record.service}<br>
                    <em>${record.cost}</em>
                 </div>`;
    });
    
    html += '<p>Общие затраты: 40,000 ₽</p>';
    
    resultDiv.innerHTML = html;
}

// 4. Напоминания
function setReminder() {
    const reminderText = prompt('О чём напомнить? Например: "Заменить масло"');
    
    if (reminderText) {
        const date = prompt('Когда напомнить? (через сколько дней)');
        
        if (date && !isNaN(date)) {
            showNotification(`Напоминание установлено! Напомним через ${date} дней.`);
            
            // В реальном приложении тут сохранение в базу данных
            tg.showPopup({
                title: '✅ Напоминание создано',
                message: `"${reminderText}"\nЧерез ${date} дней`,
                buttons: [{ type: 'ok' }]
            });
        }
    }
}

// 5. Бронирование сервиса
function bookService() {
    tg.showPopup({
        title: '🎉 Запись на сервис',
        message: 'Выберите удобное время:',
        buttons: [
            { id: 'morning', text: 'Утро (9:00-12:00)' },
            { id: 'afternoon', text: 'День (12:00-17:00)' },
            { id: 'evening', text: 'Вечер (17:00-20:00)' },
            { type: 'cancel' }
        ]
    });
    
    tg.onEvent('popupClosed', (data) => {
        if (data.button_id && data.button_id !== 'cancel') {
            showNotification('Запись подтверждена! Ожидайте СМС.');
        }
    });
}

// Вспомогательная функция для уведомлений
function showNotification(message) {
    // Если в Telegram есть Haptic Feedback, используем его
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Простое уведомление
    alert(message);
}

// Добавляем стили для динамических элементов через JS
const style = document.createElement('style');
style.textContent = `
    .diagnostic-item, .service-card, .history-record {
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        margin: 8px 0;
        border-radius: 8px;
        border-left: 4px solid #4FC3F7;
    }
    
    .service-card {
        border-left-color: #FFD700;
    }
    
    .history-record {
        border-left-color: #FF416C;
    }
`;

document.head.appendChild(style);
