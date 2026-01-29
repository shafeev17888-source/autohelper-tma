// Подключаемся к Telegram
const tg = window.Telegram.WebApp;

// Инициализация помощника
document.addEventListener('DOMContentLoaded', function() {
    // Настройка Telegram Web App
    tg.expand();
    tg.setHeaderColor('#0f1b3d');
    tg.setBackgroundColor('#0f1b3d');
    tg.MainButton.setText('Позвать помощника').show();

    // Приветствие от помощника
    setTimeout(() => {
        showAssistantMessage('Привет! Я ваш персональный авто-помощник. Готов помочь с диагностикой, ремонтом и обслуживанием вашего автомобиля! 🚗💡');
    }, 1000);

    // Загружаем сохранённые данные
    loadUserData();
});

// 1. Умная диагностика
function autoDiagnose() {
    const resultDiv = document.getElementById('diagnostics-result');
    const assistantMsg = document.getElementById('assistant-message');

    assistantMsg.innerHTML = `
        <i class="fas fa-robot"></i>
        <p>🔍 Помощник проводит комплексную диагностику... <span class="loading"></span></p>
    `;

    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';

    // Имитация процесса диагностики
    const steps = [
        {text: 'Проверяю двигатель...', delay: 800},
        {text: 'Анализирую систему зажигания...', delay: 700},
        {text: 'Проверяю тормозную систему...', delay: 600},
        {text: 'Диагностирую электронику...', delay: 500},
        {text: 'Анализ завершён!', delay: 400}
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep < steps.length) {
            assistantMsg.innerHTML = `
                <i class="fas fa-robot"></i>
                <p>${steps[currentStep].text}</p>
            `;
            currentStep++;
            setTimeout(nextStep, steps[currentStep - 1].delay);
        } else {
            showResults();
        }
    }

    nextStep();

    function showResults() {
        const diagnostics = [
            { system: 'Двигатель', status: '✅ Отличное состояние', icon: '⚙️', score: 95 },
            { system: 'Тормоза', status: '✅ Нормальный износ', icon: '🛑', score: 88 },
            { system: 'Аккумулятор', status: '⚠️ Требуется подзарядка', icon: '🔋', score: 65 },
            { system: 'Шины', status: '✅ Давление оптимальное', icon: '🛞', score: 92 },
            { system: 'Масло', status: '✅ Замена через 500 км', icon: '🛢️', score: 90 }
        ];

        let html = '<div class="diagnosis-report">';
        html += '<h3><i class="fas fa-clipboard-check"></i> Отчёт помощника</h3>';

        diagnostics.forEach(item => {
            html += `
                <div class="diagnostic-item">
                    <span class="diag-icon">${item.icon}</span>
                    <div class="diag-info">
                        <strong>${item.system}</strong>
                        <span>${item.status}</span>
                    </div>
                    <div class="diag-score">
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${item.score}%"></div>
                        </div>
                        <span>${item.score}%</span>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="assistant-recommendation">
                <i class="fas fa-lightbulb"></i>
                <div>
                    <strong>Рекомендация помощника:</strong>
                    <p>Аккумулятор требует внимания. Рекомендую зарядить на станции в течение недели.</p>
                </div>
            </div>
        `;

        html += '</div>';

        resultDiv.innerHTML = html;
        resultDiv.style.display = 'block';

        assistantMsg.innerHTML = `
            <i class="fas fa-robot"></i>
            <p>Диагностика завершена! Ваш автомобиль в хорошем состоянии, но есть рекомендации по аккумулятору. 📋</p>
        `;

        // Добавляем в историю
        addHistoryItem('Помощник провёл комплексную диагностику', 'success');

        // Уведомление
        tg.showAlert('Диагностика завершена! Проверьте рекомендации помощника.');
    }
}

// 2. Быстрые действия помощника
function quickHelp() {
    const tips = [
        "🎯 Совет помощника: Проверьте давление в шинах раз в неделю",
        "🔧 Рекомендация: Замена масла каждые 10,000 км продлит жизнь двигателя",
        "💡 Подсказка: Зимой прогревайте авто 2-3 минуты перед поездкой",
        "⚠️ Важно: При появлении странных звуков сразу к диагносту"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showAssistantMessage(randomTip);
    addHistoryItem('Помощник дал совет', 'info');
}

function checkUrgent() {
    showAssistantMessage('Помощник проводит срочную проверку...');

    setTimeout(() => {
        const urgentChecks = [
            '✅ Уровень масла: в норме',
            '✅ Давление в шинах: 2.3 бар',
            '✅ Стеклоомыватель: достаточно',
            '✅ Фары: работают',
            '⚠️ Щётки стеклоочистителя: скоро менять'
        ];

        let message = 'Срочная проверка завершена:\n';
        urgentChecks.forEach(check => {
            message += `\n${check}`;
        });

        showAssistantMessage(message);
        addHistoryItem('Помощник провёл срочную проверку', 'success');
    }, 2000);
}

function findNearby() {
    showAssistantMessage('Ищу помощь рядом с вами...');

    setTimeout(() => {
        const services = [
            {type: '🚗 Эвакуатор', distance: '3 км', phone: '+7 (XXX) XXX-XX-XX'},
            {type: '🔧 Экстренный сервис', distance: '2.5 км', phone: '+7 (XXX) XXX-XX-XX'},
            {type: '⛽ Круглосуточная заправка', distance: '1 км', phone: '+7 (XXX) XXX-XX-XX'}
        ];

        let message = 'Помощь рядом:\n';
        services.forEach(service => {
            message += `\n${service.type} • ${service.distance}\n${service.phone}\n`;
        });

        showAssistantMessage(message);
        tg.showAlert('Помощник нашёл службы рядом. Номера телефонов доступны в чате.');
    }, 1500);
}

// 3. Общение с помощником
function askHelper() {
    const question = prompt('Что вы хотите спросить у помощника?');

    if (question) {
        showAssistantMessage('🤔 Думаю над вашим вопросом...');

        setTimeout(() => {
            const responses = {
                'масло': 'Рекомендую синтетическое масло 5W-30, менять каждые 10,000 км',
                'шины': 'Летние шины менять при износе протектора менее 1.6 мм',
                'аккумулятор': 'Заряжайте аккумулятор каждые 3 месяца, особенно зимой',
                'тормоза': 'Тормозные колодки меняйте при толщине менее 3 мм'
            };

            let response = "Как помощник, рекомендую обратиться к профессиональному механику для точного ответа.";

            for (const [key, value] of Object.entries(responses)) {
                if (question.toLowerCase().includes(key)) {
                    response = value;
                    break;
                }
            }

            showAssistantMessage(response);
            addHistoryItem('Вы спросили помощника: ' + question.substring(0, 30) + '...', 'chat');
        }, 2000);
    }
}

function askQuestion() {
    const input = document.getElementById('helper-input');
    if (input.value.trim()) {
        askHelperWithInput(input.value);
        input.value = '';
    }
}

function askHelperWithInput(question) {
    showAssistantMessage('Анализирую ваш вопрос...');

    setTimeout(() => {
        // Простые ответы помощника
        let response = "Понял ваш вопрос! Как авто-помощник, рекомендую: ";

        if (question.includes('почему') && question.includes('шум')) {
            response = "Шум может быть вызван износом подшипников, тормозных колодок или проблемами с выхлопной системой. Рекомендую диагностику в сервисе.";
        } else if (question.includes('стоит') && question.includes('ремонт')) {
            response = "Стоимость зависит от марки авто и сложности работ. Помощник может найти для вас несколько сервисов с ценами.";
        } else if (question.includes('выбрать') && question.includes('шины')) {
            response = "Выбирайте шины по сезону, индексу скорости и нагрузке. Для вашего региона рекомендую всесезонные шины.";
        } else {
            response = "Для точного ответа мне нужно больше информации. Опишите проблему детальнее или используйте функцию диагностики.";
        }

        showAssistantMessage(response);
        addHistoryItem('Диалог с помощником', 'chat');
    }, 1500);
}

// 4. Экстренная помощь
function emergencyHelp(type) {
    const solutions = {
        'flat_tire': {
            title: 'Прокол колеса',
            steps: [
                '1. Включите аварийную сигнализацию',
                '2. Установите знак аварийной остановки',
                '3. Замените колесо на запаску',
                '4. Если нет запаски - вызывайте эвакуатор'
            ],
            phone: '+7 (XXX) XXX-XX-XX (Эвакуатор)'
        },
        'battery': {
            title: 'Севший аккумулятор',
            steps: [
                '1. Найдите автомобиль-донор',
                '2. Соедините клеммы проводами для прикуривания',
                '3. Заведите двигатель',
                '4. Дайте поработать 15-20 минут'
            ],
            phone: '+7 (XXX) XXX-XX-XX (Техпомощь)'
        },
        'keys': {
            title: 'Ключи в авто',
            steps: [
                '1. Не пытайтесь разбить стекло',
                '2. Вызовите службу вскрытия авто',
                '3. Или обратитесь к официальному дилеру',
                '4. Имейте дубликат ключей в будущем'
            ],
            phone: '+7 (XXX) XXX-XX-XX (Вскрытие авто)'
        }
    };

    const solution = solutions[type];

    let message = `🚨 ПОМОЩЬ: ${solution.title}\n\n`;
    message += solution.steps.join('\n');
    message += `\n\n📞 Экстренный номер:\n${solution.phone}`;

    showAssistantMessage(message);
    tg.showAlert('Помощник предоставил инструкцию по экстренной ситуации!');
    addHistoryItem('Экстренная помощь: ' + solution.title, 'emergency');
}

// 5. Вспомогательные функции
function showAssistantMessage(message) {
    const assistantMsg = document.getElementById('assistant-message');
    assistantMsg.innerHTML = `
        <i class="fas fa-robot"></i>
        <p>${message.replace(/\n/g, '<br>')}</p>
    `;
}

function addHistoryItem(text, type) {
    const historyItems = document.getElementById('history-items');
    const icon = type === 'success' ? 'check-circle' :
                 type === 'emergency' ? 'exclamation-triangle' :
                 type === 'chat' ? 'comments' : 'info-circle';

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
        <i class="fas fa-${icon} ${type}"></i>
        <span>${text}</span>
        <small>Сегодня, ${time}</small>
    `;

    historyItems.prepend(item);

    // Ограничиваем количество записей
    const items = historyItems.querySelectorAll('.history-item');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
}

function setReminder(task, km) {
    showAssistantMessage(`Напоминание установлено: "${task}" через ${km} км. Помощник напомнит вовремя! ⏰`);
    addHistoryItem('Напоминание: ' + task, 'reminder');
    tg.HapticFeedback.impactOccurred('medium');
}

function quickCheck(type) {
    showAssistantMessage(`Проверяю ${type}...`);

    setTimeout(() => {
        const checks = {
            'шины': '✅ Давление в шинах: 2.3 бар (в норме)',
            'масло': '✅ Уровень масла: между метками MIN и MAX',
            'тормоза': '✅ Тормозная жидкость: уровень нормальный',
            'аккумулятор': '⚠️ Напряжение: 12.3В (требует подзарядки)'
        };

        showAssistantMessage(checks[type] || 'Проверка выполнена');
        addHistoryItem('Быстрая проверка: ' + type, 'info');
    }, 1000);
}

function showFullHistory() {
    showAssistantMessage('Полная история помощи доступна в разделе "История" вверху. Там все мои рекомендации и ваши действия! 📚');
}

// Загрузка данных пользователя
function loadUserData() {
    // В будущем здесь будет загрузка из базы данных
    console.log('Данные пользователя загружены');
}

// Добавляем CSS для новых элементов
const additionalStyles = `
    .loading:after {
        content: '...';
        animation: dots 1.5s infinite;
    }

    @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
    }

    .diagnosis-report {
        background: rgba(0, 0, 0