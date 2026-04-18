// Калькулятор стоимости ремонта
const repairPrices = {
    engine: {
        title: "Двигатель",
        items: [
            { id: "oil-change", name: "Замена масла", price: 1500, time: 0.5 },
            { id: "spark-plugs", name: "Замена свечей зажигания", price: 1500, time: 1 },
            { id: "timing-belt", name: "Замена ремня ГРМ", price: 8000, time: 4 },
            { id: "water-pump", name: "Замена помпы", price: 5000, time: 3 },
            { id: "thermostat", name: "Замена термостата", price: 2000, time: 1.5 },
            { id: "alternator", name: "Замена генератора", price: 10000, time: 2 },
            { id: "starter", name: "Замена стартера", price: 6000, time: 2 },
            { id: "fuel-pump", name: "Замена топливного насоса", price: 8000, time: 3 },
            { id: "fuel-filter", name: "Замена топливного фильтра", price: 1000, time: 0.5 },
            { id: "air-filter", name: "Замена воздушного фильтра", price: 500, time: 0.3 }
        ]
    },
    transmission: {
        title: "Трансмиссия",
        items: [
            { id: "clutch-kit", name: "Замена сцепления (комплект)", price: 15000, time: 6 },
            { id: "gearbox-oil", name: "Замена масла в КПП", price: 2000, time: 1 },
            { id: "cv-joint", name: "Замена ШРУСа", price: 6000, time: 2 },
            { id: "cv-boot", name: "Замена пыльника ШРУСа", price: 2000, time: 1.5 },
            { id: "release-bearing", name: "Замена выжимного подшипника", price: 3000, time: 5 }
        ]
    },
    suspension: {
        title: "Подвеска",
        items: [
            { id: "front-struts", name: "Замена передних стоек (пара)", price: 12000, time: 3 },
            { id: "rear-shocks", name: "Замена задних амортизаторов (пара)", price: 8000, time: 2 },
            { id: "ball-joints", name: "Замена шаровых опор (пара)", price: 5000, time: 2.5 },
            { id: "tie-rods", name: "Замена рулевых наконечников (пара)", price: 4000, time: 2 },
            { id: "control-arms", name: "Замена рычагов (пара)", price: 10000, time: 3 },
            { id: "stabilizer-links", name: "Замена стоек стабилизатора (пара)", price: 2000, time: 1 },
            { id: "wheel-bearing", name: "Замена подшипника ступицы", price: 4000, time: 2 },
            { id: "alignment", name: "Сход-развал", price: 2000, time: 1 }
        ]
    },
    brakes: {
        title: "Тормоза",
        items: [
            { id: "front-pads", name: "Замена передних колодок", price: 3000, time: 1 },
            { id: "rear-pads", name: "Замена задних колодок", price: 2500, time: 1 },
            { id: "front-discs", name: "Замена передних дисков (пара)", price: 6000, time: 1.5 },
            { id: "rear-discs", name: "Замена задних дисков (пара)", price: 5000, time: 1.5 },
            { id: "brake-fluid", name: "Замена тормозной жидкости", price: 1500, time: 1 },
            { id: "brake-hoses", name: "Замена тормозных шлангов (комплект)", price: 3000, time: 2 },
            { id: "master-cylinder", name: "Замена главного тормозного цилиндра", price: 5000, time: 2.5 }
        ]
    },
    electrical: {
        title: "Электрика",
        items: [
            { id: "battery", name: "Замена аккумулятора", price: 4000, time: 0.3 },
            { id: "alternator-repair", name: "Ремонт генератора", price: 8000, time: 2 },
            { id: "starter-repair", name: "Ремонт стартера", price: 4000, time: 2 },
            { id: "headlight-bulbs", name: "Замена ламп в фарах (комплект)", price: 2000, time: 0.5 },
            { id: "headlight-polish", name: "Полировка фар", price: 2500, time: 1.5 },
            { id: "wiper-motor", name: "Замена моторчика дворников", price: 3000, time: 1.5 }
        ]
    },
    other: {
        title: "Прочее",
        items: [
            { id: "wheel-balance", name: "Балансировка колёс (4 шт)", price: 1500, time: 0.5 },
            { id: "tire-change", name: "Шиномонтаж (4 колеса)", price: 2000, time: 1 },
            { id: "coolant-change", name: "Замена охлаждающей жидкости", price: 2000, time: 1 },
            { id: "ac-refill", name: "Заправка кондиционера", price: 3000, time: 1 },
            { id: "diagnostics", name: "Компьютерная диагностика", price: 1000, time: 0.5 }
        ]
    }
};

class RepairCalculator {
    constructor() {
        this.selectedItems = new Map();
        this.storageKey = 'passat-b3-calculator-state';
        this.init();
    }

    init() {
        this.createCalculatorSection();
        this.loadState();
        this.attachEventListeners();
    }

    createCalculatorSection() {
        const calculatorSection = document.createElement('section');
        calculatorSection.id = 'calculator';
        calculatorSection.className = 'section';
        calculatorSection.innerHTML = `
            <h2>💰 Калькулятор стоимости ремонта</h2>
            <div class="calculator-container">
                <div class="calculator-intro">
                    <p>Выберите необходимые работы, чтобы рассчитать примерную стоимость и время ремонта.</p>
                </div>
                <div class="calculator-content">
                    <div class="calculator-items" id="calculatorItems"></div>
                    <div class="calculator-summary" id="calculatorSummary">
                        <h3>Итого</h3>
                        <div class="summary-content">
                            <div class="summary-row">
                                <span>Выбрано работ:</span>
                                <strong id="totalItems">0</strong>
                            </div>
                            <div class="summary-row">
                                <span>Время работы:</span>
                                <strong id="totalTime">0 ч</strong>
                            </div>
                            <div class="summary-row total-price">
                                <span>Стоимость:</span>
                                <strong id="totalPrice">0 ₽</strong>
                            </div>
                            <div class="summary-note">
                                <small>* Цены указаны с учётом работы. Стоимость запчастей может варьироваться.</small>
                                <small style="display: block; margin-top: 0.5rem; color: #4caf50;">✓ Выбор сохраняется автоматически</small>
                            </div>
                            <button class="clear-btn" id="clearCalculator">Очистить</button>
                            <button class="print-btn" id="printEstimate">Распечатать смету</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const mainElement = document.querySelector('main');
        const diagnosticSection = document.getElementById('diagnostic');
        mainElement.insertBefore(calculatorSection, diagnosticSection.nextSibling);

        this.renderItems();
        this.updateSummary();
    }

    renderItems() {
        const container = document.getElementById('calculatorItems');
        
        container.innerHTML = Object.entries(repairPrices).map(([categoryKey, category]) => `
            <div class="calculator-category">
                <h3>${category.title}</h3>
                <div class="calculator-items-list">
                    ${category.items.map(item => `
                        <label class="calculator-item">
                            <input type="checkbox" 
                                   data-category="${categoryKey}" 
                                   data-id="${item.id}"
                                   data-name="${item.name}"
                                   data-price="${item.price}"
                                   data-time="${item.time}">
                            <div class="item-info">
                                <span class="item-name">${item.name}</span>
                                <div class="item-details">
                                    <span class="item-price">${item.price.toLocaleString('ru-RU')} ₽</span>
                                    <span class="item-time">${item.time} ч</span>
                                </div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    attachEventListeners() {
        const container = document.getElementById('calculatorItems');
        
        container.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const checkbox = e.target;
                const itemData = {
                    category: checkbox.dataset.category,
                    id: checkbox.dataset.id,
                    name: checkbox.dataset.name,
                    price: parseInt(checkbox.dataset.price),
                    time: parseFloat(checkbox.dataset.time)
                };

                if (checkbox.checked) {
                    this.selectedItems.set(itemData.id, itemData);
                } else {
                    this.selectedItems.delete(itemData.id);
                }

                this.updateSummary();
                this.saveState();
            }
        });

        document.getElementById('clearCalculator').addEventListener('click', () => {
            this.clearAll();
        });

        document.getElementById('printEstimate').addEventListener('click', () => {
            this.printEstimate();
        });
    }

    saveState() {
        try {
            const state = Array.from(this.selectedItems.values());
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (error) {
            console.warn('Не удалось сохранить состояние:', error);
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const state = JSON.parse(saved);
                state.forEach(item => {
                    this.selectedItems.set(item.id, item);
                    // Отметить чекбоксы
                    const checkbox = document.querySelector(`input[data-id="${item.id}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
                this.updateSummary();
            }
        } catch (error) {
            console.warn('Не удалось загрузить состояние:', error);
        }
    }

    updateSummary() {
        const totalItems = this.selectedItems.size;
        const totalPrice = Array.from(this.selectedItems.values())
            .reduce((sum, item) => sum + item.price, 0);
        const totalTime = Array.from(this.selectedItems.values())
            .reduce((sum, item) => sum + item.time, 0);

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalPrice').textContent = totalPrice.toLocaleString('ru-RU') + ' ₽';
        document.getElementById('totalTime').textContent = totalTime.toFixed(1) + ' ч';

        // Анимация при изменении
        const summaryElement = document.getElementById('calculatorSummary');
        summaryElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            summaryElement.style.transform = 'scale(1)';
        }, 200);
    }

    clearAll() {
        this.selectedItems.clear();
        document.querySelectorAll('#calculatorItems input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        this.updateSummary();
        this.saveState();
    }

    printEstimate() {
        if (this.selectedItems.size === 0) {
            alert('Выберите хотя бы одну работу для печати сметы');
            return;
        }

        const items = Array.from(this.selectedItems.values());
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        const totalTime = items.reduce((sum, item) => sum + item.time, 0);

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Смета на ремонт Passat B3</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    h1 {
                        text-align: center;
                        color: #1e3c72;
                        border-bottom: 3px solid #2a5298;
                        padding-bottom: 10px;
                    }
                    .date {
                        text-align: right;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background: #1e3c72;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background: #f8f9fa;
                    }
                    .total-row {
                        font-weight: bold;
                        background: #e3f2fd !important;
                        font-size: 1.1em;
                    }
                    .note {
                        margin-top: 20px;
                        padding: 15px;
                        background: #fff3cd;
                        border-left: 4px solid #ffc107;
                        font-size: 0.9em;
                    }
                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>🚗 Смета на ремонт Volkswagen Passat B3</h1>
                <div class="date">Дата: ${new Date().toLocaleDateString('ru-RU')}</div>
                
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Наименование работы</th>
                            <th>Время (ч)</th>
                            <th>Стоимость (₽)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map((item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.name}</td>
                                <td>${item.time}</td>
                                <td>${item.price.toLocaleString('ru-RU')}</td>
                            </tr>
                        `).join('')}
                        <tr class="total-row">
                            <td colspan="2">ИТОГО:</td>
                            <td>${totalTime.toFixed(1)} ч</td>
                            <td>${totalPrice.toLocaleString('ru-RU')} ₽</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="note">
                    <strong>Примечание:</strong> Указанные цены являются ориентировочными и включают стоимость работы. 
                    Стоимость запчастей может варьироваться в зависимости от производителя и качества. 
                    Окончательная стоимость определяется после диагностики автомобиля.
                </div>
                
                <div class="no-print" style="text-align: center; margin-top: 30px;">
                    <button onclick="window.print()" style="padding: 10px 30px; font-size: 16px; cursor: pointer;">
                        Печать
                    </button>
                    <button onclick="window.close()" style="padding: 10px 30px; font-size: 16px; cursor: pointer; margin-left: 10px;">
                        Закрыть
                    </button>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
}

// Стили для калькулятора
const calculatorStyles = `
.calculator-container {
    margin-top: 1.5rem;
}

.calculator-intro {
    background: #e8f5e9;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #4caf50;
}

.calculator-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
}

.calculator-items {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.calculator-category h3 {
    color: #1e3c72;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
}

.calculator-items-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.calculator-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.calculator-item:hover {
    border-color: #2a5298;
    background: #f8f9fa;
}

.calculator-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    cursor: pointer;
}

.item-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-name {
    font-size: 1rem;
    color: #333;
}

.item-details {
    display: flex;
    gap: 1.5rem;
    font-size: 0.9rem;
}

.item-price {
    color: #28a745;
    font-weight: 600;
}

.item-time {
    color: #6c757d;
}

.calculator-summary {
    position: sticky;
    top: 100px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    height: fit-content;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transition: transform 0.2s;
}

.calculator-summary h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    text-align: center;
}

.summary-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

.summary-row.total-price {
    font-size: 1.3rem;
    border-bottom: 2px solid white;
    margin-top: 0.5rem;
}

.summary-note {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    font-size: 0.85rem;
    line-height: 1.4;
}

.clear-btn, .print-btn {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 0.5rem;
}

.clear-btn {
    background: rgba(255,255,255,0.2);
    color: white;
}

.clear-btn:hover {
    background: rgba(255,255,255,0.3);
}

.print-btn {
    background: white;
    color: #667eea;
}

.print-btn:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

@media (max-width: 1024px) {
    .calculator-content {
        grid-template-columns: 1fr;
    }
    
    .calculator-summary {
        position: static;
    }
}

@media (max-width: 768px) {
    .item-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .item-details {
        width: 100%;
        justify-content: space-between;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = calculatorStyles;
document.head.appendChild(styleSheet);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new RepairCalculator();
});

// Обновляем навигацию
const navUl = document.querySelector('nav ul');
const calculatorLi = document.createElement('li');
calculatorLi.innerHTML = '<a href="#calculator">Калькулятор</a>';
navUl.insertBefore(calculatorLi, navUl.children[2]);
