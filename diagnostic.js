// Система диагностики неисправностей
const diagnosticData = {
    engine: {
        title: "Проблемы с двигателем",
        symptoms: {
            "no-start": {
                question: "Двигатель не заводится",
                causes: [
                    { name: "Разряжен аккумулятор", probability: 40, fix: "Зарядить или заменить АКБ", cost: "0-5000₽" },
                    { name: "Неисправен стартер", probability: 25, fix: "Ремонт или замена стартера", cost: "3000-8000₽" },
                    { name: "Нет искры (свечи/катушка)", probability: 20, fix: "Замена свечей или катушки", cost: "1000-5000₽" },
                    { name: "Нет топлива (насос/фильтр)", probability: 15, fix: "Замена топливного насоса/фильтра", cost: "2000-10000₽" }
                ]
            },
            "rough-idle": {
                question: "Двигатель троит на холостых",
                causes: [
                    { name: "Неисправные свечи зажигания", probability: 35, fix: "Замена свечей", cost: "800-2000₽" },
                    { name: "Подсос воздуха", probability: 25, fix: "Проверка впускного тракта", cost: "500-3000₽" },
                    { name: "Забит топливный фильтр", probability: 20, fix: "Замена топливного фильтра", cost: "500-1500₽" },
                    { name: "Неисправна катушка зажигания", probability: 20, fix: "Замена катушки", cost: "2000-5000₽" }
                ]
            },
            "overheating": {
                question: "Перегрев двигателя",
                causes: [
                    { name: "Низкий уровень охлаждающей жидкости", probability: 30, fix: "Долить ОЖ, найти утечку", cost: "500-5000₽" },
                    { name: "Неисправен термостат", probability: 25, fix: "Замена термостата", cost: "1000-2500₽" },
                    { name: "Не работает вентилятор", probability: 25, fix: "Ремонт/замена вентилятора", cost: "2000-6000₽" },
                    { name: "Забит радиатор", probability: 20, fix: "Промывка или замена радиатора", cost: "1500-8000₽" }
                ]
            },
            "oil-consumption": {
                question: "Повышенный расход масла",
                causes: [
                    { name: "Износ поршневых колец", probability: 40, fix: "Капитальный ремонт двигателя", cost: "30000-80000₽" },
                    { name: "Износ маслосъёмных колпачков", probability: 35, fix: "Замена колпачков", cost: "5000-15000₽" },
                    { name: "Утечка через прокладки", probability: 15, fix: "Замена прокладок", cost: "2000-10000₽" },
                    { name: "Турбина (если есть)", probability: 10, fix: "Ремонт турбины", cost: "15000-40000₽" }
                ]
            }
        }
    },
    transmission: {
        title: "Проблемы с трансмиссией",
        symptoms: {
            "hard-shift": {
                question: "Тугое переключение передач",
                causes: [
                    { name: "Износ сцепления", probability: 45, fix: "Замена комплекта сцепления", cost: "8000-20000₽" },
                    { name: "Старое масло в КПП", probability: 30, fix: "Замена масла в КПП", cost: "1500-3000₽" },
                    { name: "Износ синхронизаторов", probability: 15, fix: "Ремонт КПП", cost: "15000-40000₽" },
                    { name: "Неисправна тяга КПП", probability: 10, fix: "Регулировка/замена тяги", cost: "1000-3000₽" }
                ]
            },
            "clutch-slip": {
                question: "Пробуксовка сцепления",
                causes: [
                    { name: "Износ диска сцепления", probability: 70, fix: "Замена комплекта сцепления", cost: "8000-20000₽" },
                    { name: "Масло на диске сцепления", probability: 20, fix: "Устранить утечку, заменить диск", cost: "10000-25000₽" },
                    { name: "Неисправен главный цилиндр", probability: 10, fix: "Замена главного цилиндра", cost: "2000-5000₽" }
                ]
            },
            "noise-gear": {
                question: "Шум при включении передачи",
                causes: [
                    { name: "Износ выжимного подшипника", probability: 50, fix: "Замена выжимного подшипника", cost: "3000-8000₽" },
                    { name: "Износ подшипников КПП", probability: 30, fix: "Ремонт КПП", cost: "15000-40000₽" },
                    { name: "Низкий уровень масла в КПП", probability: 20, fix: "Долить масло, найти утечку", cost: "1000-5000₽" }
                ]
            }
        }
    },
    suspension: {
        title: "Проблемы с подвеской",
        symptoms: {
            "knocking": {
                question: "Стук в подвеске",
                causes: [
                    { name: "Износ стоек амортизаторов", probability: 30, fix: "Замена стоек", cost: "8000-20000₽" },
                    { name: "Износ шаровых опор", probability: 25, fix: "Замена шаровых опор", cost: "3000-8000₽" },
                    { name: "Износ стоек стабилизатора", probability: 20, fix: "Замена стоек стабилизатора", cost: "1000-3000₽" },
                    { name: "Износ сайлентблоков", probability: 15, fix: "Замена сайлентблоков", cost: "4000-12000₽" },
                    { name: "Люфт в рулевых наконечниках", probability: 10, fix: "Замена рулевых наконечников", cost: "2000-6000₽" }
                ]
            },
            "vibration": {
                question: "Вибрация при движении",
                causes: [
                    { name: "Дисбаланс колёс", probability: 40, fix: "Балансировка колёс", cost: "800-2000₽" },
                    { name: "Износ ШРУСов", probability: 25, fix: "Замена ШРУСов", cost: "4000-12000₽" },
                    { name: "Деформация дисков", probability: 20, fix: "Замена дисков", cost: "4000-20000₽" },
                    { name: "Износ подшипников ступиц", probability: 15, fix: "Замена подшипников ступиц", cost: "3000-8000₽" }
                ]
            },
            "uneven-wear": {
                question: "Неравномерный износ шин",
                causes: [
                    { name: "Нарушен сход-развал", probability: 60, fix: "Регулировка сход-развала", cost: "1500-3000₽" },
                    { name: "Износ рулевых тяг", probability: 20, fix: "Замена рулевых тяг", cost: "3000-8000₽" },
                    { name: "Деформация рычагов", probability: 15, fix: "Замена рычагов", cost: "5000-15000₽" },
                    { name: "Неправильное давление в шинах", probability: 5, fix: "Накачать до нормы", cost: "0₽" }
                ]
            }
        }
    },
    brakes: {
        title: "Проблемы с тормозами",
        symptoms: {
            "soft-pedal": {
                question: "Мягкая педаль тормоза",
                causes: [
                    { name: "Воздух в системе", probability: 50, fix: "Прокачка тормозов", cost: "1000-2000₽" },
                    { name: "Утечка тормозной жидкости", probability: 30, fix: "Найти и устранить утечку", cost: "2000-10000₽" },
                    { name: "Износ главного цилиндра", probability: 15, fix: "Замена главного цилиндра", cost: "3000-8000₽" },
                    { name: "Износ рабочих цилиндров", probability: 5, fix: "Замена рабочих цилиндров", cost: "2000-6000₽" }
                ]
            },
            "squealing": {
                question: "Скрип при торможении",
                causes: [
                    { name: "Износ тормозных колодок", probability: 60, fix: "Замена колодок", cost: "2000-6000₽" },
                    { name: "Износ тормозных дисков", probability: 25, fix: "Замена дисков", cost: "4000-12000₽" },
                    { name: "Грязь на колодках/дисках", probability: 10, fix: "Очистка", cost: "500-1000₽" },
                    { name: "Некачественные колодки", probability: 5, fix: "Замена на качественные", cost: "2000-6000₽" }
                ]
            },
            "vibration-brake": {
                question: "Вибрация при торможении",
                causes: [
                    { name: "Деформация тормозных дисков", probability: 70, fix: "Проточка или замена дисков", cost: "2000-12000₽" },
                    { name: "Неравномерный износ колодок", probability: 20, fix: "Замена колодок", cost: "2000-6000₽" },
                    { name: "Люфт в подшипниках ступиц", probability: 10, fix: "Замена подшипников", cost: "3000-8000₽" }
                ]
            }
        }
    },
    electrical: {
        title: "Проблемы с электрикой",
        symptoms: {
            "no-charge": {
                question: "Не идёт зарядка АКБ",
                causes: [
                    { name: "Неисправен генератор", probability: 50, fix: "Ремонт или замена генератора", cost: "5000-15000₽" },
                    { name: "Обрыв ремня генератора", probability: 25, fix: "Замена ремня", cost: "500-1500₽" },
                    { name: "Окисление клемм АКБ", probability: 15, fix: "Очистка клемм", cost: "0-500₽" },
                    { name: "Неисправно реле-регулятор", probability: 10, fix: "Замена реле-регулятора", cost: "1000-3000₽" }
                ]
            },
            "lights-dim": {
                question: "Тусклый свет фар",
                causes: [
                    { name: "Помутнение стёкол фар", probability: 40, fix: "Полировка или замена фар", cost: "1000-8000₽" },
                    { name: "Слабый заряд АКБ", probability: 30, fix: "Зарядка или замена АКБ", cost: "0-5000₽" },
                    { name: "Окисление контактов", probability: 20, fix: "Очистка контактов", cost: "500-1000₽" },
                    { name: "Старые лампы", probability: 10, fix: "Замена ламп", cost: "500-3000₽" }
                ]
            },
            "starter-click": {
                question: "Стартер щёлкает, но не крутит",
                causes: [
                    { name: "Разряжен АКБ", probability: 50, fix: "Зарядка или замена АКБ", cost: "0-5000₽" },
                    { name: "Окисление клемм", probability: 25, fix: "Очистка клемм", cost: "0-500₽" },
                    { name: "Неисправно втягивающее реле", probability: 15, fix: "Замена втягивающего реле", cost: "1500-4000₽" },
                    { name: "Износ щёток стартера", probability: 10, fix: "Ремонт стартера", cost: "2000-6000₽" }
                ]
            }
        }
    }
};

class DiagnosticTool {
    constructor() {
        this.currentCategory = null;
        this.currentSymptom = null;
        this.init();
    }

    init() {
        this.createDiagnosticSection();
        this.attachEventListeners();
    }

    createDiagnosticSection() {
        const diagnosticSection = document.createElement('section');
        diagnosticSection.id = 'diagnostic';
        diagnosticSection.className = 'section';
        diagnosticSection.innerHTML = `
            <h2>🔍 Диагностика неисправностей</h2>
            <div class="diagnostic-container">
                <div class="diagnostic-intro">
                    <p>Выберите категорию проблемы, затем опишите симптом. Система покажет наиболее вероятные причины и способы устранения.</p>
                </div>
                <div class="diagnostic-categories" id="diagnosticCategories"></div>
                <div class="diagnostic-symptoms" id="diagnosticSymptoms" style="display: none;"></div>
                <div class="diagnostic-results" id="diagnosticResults" style="display: none;"></div>
            </div>
        `;

        const mainElement = document.querySelector('main');
        const aboutSection = document.getElementById('about');
        mainElement.insertBefore(diagnosticSection, aboutSection.nextSibling);

        this.renderCategories();
    }

    renderCategories() {
        const container = document.getElementById('diagnosticCategories');
        const categories = [
            { key: 'engine', icon: '⚙️', title: 'Двигатель' },
            { key: 'transmission', icon: '🔧', title: 'Трансмиссия' },
            { key: 'suspension', icon: '🛞', title: 'Подвеска' },
            { key: 'brakes', icon: '🛑', title: 'Тормоза' },
            { key: 'electrical', icon: '⚡', title: 'Электрика' }
        ];

        container.innerHTML = categories.map(cat => `
            <div class="diagnostic-card" data-category="${cat.key}">
                <div class="diagnostic-icon">${cat.icon}</div>
                <h3>${cat.title}</h3>
            </div>
        `).join('');
    }

    renderSymptoms(category) {
        const container = document.getElementById('diagnosticSymptoms');
        const data = diagnosticData[category];
        
        container.innerHTML = `
            <h3>${data.title}</h3>
            <div class="symptoms-list">
                ${Object.entries(data.symptoms).map(([key, symptom]) => `
                    <button class="symptom-btn" data-symptom="${key}">
                        ${symptom.question}
                    </button>
                `).join('')}
            </div>
            <button class="back-btn" id="backToCategories">← Назад к категориям</button>
        `;
        
        container.style.display = 'block';
        document.getElementById('diagnosticCategories').style.display = 'none';
        document.getElementById('diagnosticResults').style.display = 'none';
    }

    renderResults(category, symptom) {
        const container = document.getElementById('diagnosticResults');
        const data = diagnosticData[category].symptoms[symptom];
        
        const sortedCauses = [...data.causes].sort((a, b) => b.probability - a.probability);
        
        container.innerHTML = `
            <h3>Результаты диагностики</h3>
            <div class="diagnostic-question">
                <strong>Проблема:</strong> ${data.question}
            </div>
            <div class="causes-list">
                ${sortedCauses.map((cause, index) => `
                    <div class="cause-card" style="animation-delay: ${index * 0.1}s">
                        <div class="cause-header">
                            <h4>${cause.name}</h4>
                            <div class="probability-badge" style="background: ${this.getProbabilityColor(cause.probability)}">
                                ${cause.probability}% вероятность
                            </div>
                        </div>
                        <div class="cause-details">
                            <p><strong>Решение:</strong> ${cause.fix}</p>
                            <p><strong>Стоимость:</strong> ${cause.cost}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="back-btn" id="backToSymptoms">← Выбрать другой симптом</button>
        `;
        
        container.style.display = 'block';
        document.getElementById('diagnosticSymptoms').style.display = 'none';
    }

    getProbabilityColor(probability) {
        if (probability >= 40) return '#dc3545';
        if (probability >= 25) return '#ffc107';
        return '#28a745';
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.diagnostic-card')) {
                const category = e.target.closest('.diagnostic-card').dataset.category;
                this.currentCategory = category;
                this.renderSymptoms(category);
            }

            if (e.target.closest('.symptom-btn')) {
                const symptom = e.target.closest('.symptom-btn').dataset.symptom;
                this.currentSymptom = symptom;
                this.renderResults(this.currentCategory, symptom);
            }

            if (e.target.id === 'backToCategories') {
                document.getElementById('diagnosticCategories').style.display = 'grid';
                document.getElementById('diagnosticSymptoms').style.display = 'none';
                this.currentCategory = null;
            }

            if (e.target.id === 'backToSymptoms') {
                this.renderSymptoms(this.currentCategory);
            }
        });
    }
}

// Добавляем стили
const diagnosticStyles = `
.diagnostic-container {
    margin-top: 1.5rem;
}

.diagnostic-intro {
    background: #e3f2fd;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #2196f3;
}

.diagnostic-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.diagnostic-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.diagnostic-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.diagnostic-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.diagnostic-card h3 {
    margin: 0;
    font-size: 1.3rem;
}

.symptoms-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.symptom-btn {
    background: white;
    border: 2px solid #e9ecef;
    padding: 1.5rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
    text-align: left;
}

.symptom-btn:hover {
    border-color: #2a5298;
    background: #f8f9fa;
    transform: translateX(5px);
}

.diagnostic-question {
    background: #fff3cd;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #ffc107;
    font-size: 1.1rem;
}

.causes-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.cause-card {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    animation: slideIn 0.5s ease forwards;
    opacity: 0;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
}

.cause-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.cause-header h4 {
    margin: 0;
    color: #1e3c72;
    font-size: 1.2rem;
}

.probability-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
}

.cause-details p {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.back-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.back-btn:hover {
    background: #5a6268;
    transform: translateX(-5px);
}

@media (max-width: 768px) {
    .diagnostic-categories {
        grid-template-columns: 1fr;
    }
    
    .cause-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = diagnosticStyles;
document.head.appendChild(styleSheet);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new DiagnosticTool();
});

// Обновляем навигацию
const navUl = document.querySelector('nav ul');
const diagnosticLi = document.createElement('li');
diagnosticLi.innerHTML = '<a href="#diagnostic">Диагностика</a>';
navUl.insertBefore(diagnosticLi, navUl.children[1]);
