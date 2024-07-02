document.getElementById('carbonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const transport = document.getElementById('transport').value;
    const distance = document.getElementById('distance').value;

    const carbonFootprint = calculateCarbonFootprint(transport, distance);
    const advice = getAdvice(transport);

    document.getElementById('result').innerText = `Ваш углеродный след составляет: ${carbonFootprint} кг CO2`;
    document.getElementById('advice').innerText = advice;

    saveTrip(transport, distance, carbonFootprint);
    displayTripHistory();
});

function calculateCarbonFootprint(transport, distance) {
    let emissionFactor;

    switch(transport) {
        case 'car':
            emissionFactor = 0.25; // кг CO2 на км
            break;
        case 'electricCar':
            emissionFactor = 0.05; // кг CO2 на км
            break;
        case 'bike':
            emissionFactor = 0.0; // Велосипед не производит CO2
            break;
        case 'public':
            emissionFactor = 0.05; // кг CO2 на км
            break;
        case 'walking':
            emissionFactor = 0.0; // Пешком не производит CO2
            break;
        case 'scooter':
            emissionFactor = 0.02; // кг CO2 на км
            break;
        case 'motorcycle':
            emissionFactor = 0.12; // кг CO2 на км
            break;
        case 'train':
            emissionFactor = 0.06; // кг CO2 на км
            break;
        case 'plane':
            emissionFactor = 0.15; // кг CO2 на км
            break;
        case 'boat':
            emissionFactor = 0.20; // кг CO2 на км
            break;
        case 'bus':
            emissionFactor = 0.08; // кг CO2 на км
            break;
        default:
            emissionFactor = 0;
    }

    return (emissionFactor * distance).toFixed(2);
}

function getAdvice(transport) {
    let advice;

    switch(transport) {
        case 'car':
            advice = "Совет: Попробуйте использовать общественный транспорт или электромобиль, чтобы снизить углеродный след.";
            break;
        case 'electricCar':
            advice = "Совет: Заряжайте электромобиль от возобновляемых источников энергии, чтобы минимизировать воздействие на окружающую среду.";
            break;
        case 'bike':
            advice = "Отличный выбор! Велосипед не производит углеродных выбросов.";
            break;
        case 'public':
            advice = "Хороший выбор! Общественный транспорт помогает сократить количество автомобилей на дорогах и уменьшить углеродные выбросы.";
            break;
        case 'walking':
            advice = "Отличный выбор! Пешие прогулки не производят углеродных выбросов.";
            break;
        case 'scooter':
            advice = "Совет: Используйте электросамокат для коротких поездок, чтобы сократить выбросы CO2.";
            break;
        case 'motorcycle':
            advice = "Совет: Попробуйте использовать более экологичные виды транспорта, такие как велосипед или общественный транспорт.";
            break;
        case 'train':
            advice = "Совет: Поезда являются одним из самых экологичных видов транспорта для дальних поездок.";
            break;
        case 'plane':
            advice = "Совет: Попробуйте выбирать прямые рейсы и компенсировать углеродные выбросы, посадив деревья.";
            break;
        case 'boat':
            advice = "Совет: Используйте лодки с низким уровнем выбросов или парусные суда для минимизации воздействия на окружающую среду.";
            break;
// Завершаем функцию getAdvice
case 'bus':
    advice = "Совет: Автобусы являются хорошим выбором, особенно если они работают на альтернативных видах топлива.";
    break;
default:
    advice = "Совет: Всегда старайтесь выбирать наиболее экологичные виды транспорта.";
}

return advice;
}

// Сохраняем поездку в localStorage
function saveTrip(transport, distance, carbonFootprint) {
const trip = {
transport,
distance,
carbonFootprint,
date: new Date().toLocaleString()
};

let trips = JSON.parse(localStorage.getItem('trips')) || [];
trips.push(trip);
localStorage.setItem('trips', JSON.stringify(trips));
}

// Отображаем историю поездок
function displayTripHistory() {
const tripHistory = document.getElementById('tripHistory');
tripHistory.innerHTML = '';

const trips = JSON.parse(localStorage.getItem('trips')) || [];

trips.forEach(trip => {
const li = document.createElement('li');
li.textContent = `${trip.date}: ${trip.transport} - ${trip.distance} км - ${trip.carbonFootprint} кг CO2`;
tripHistory.appendChild(li);
});
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
displayTripHistory();
setupLanguageSwitcher();
});

// Функция для переключения языков
function setupLanguageSwitcher() {
const languageButtons = document.querySelectorAll('.language-btn');
languageButtons.forEach(button => {
button.addEventListener('click', function() {
    const lang = this.getAttribute('data-lang');
    switchLanguage(lang);
});
});
}

// Переключение языка
function switchLanguage(lang) {
const elements = document.querySelectorAll('[data-lang]');
elements.forEach(element => {
const key = element.getAttribute('data-lang');
element.textContent = translations[lang][key];
});
}

// Переводы
const translations = {
ru: {
title: 'Экологический помощник',
transport: 'Вид транспорта:',
car: 'Автомобиль',
electricCar: 'Электромобиль',
bike: 'Велосипед',
public: 'Общественный транспорт',
walking: 'Пешком',
scooter: 'Электросамокат',
motorcycle: 'Мотоцикл',
train: 'Поезд',
plane: 'Самолет',
boat: 'Лодка',
bus: 'Автобус',
distance: 'Расстояние (км):',
calculate: 'Рассчитать углеродный след',
history: 'История поездок',
materials: 'Советы и материалы',
materialContent: 'Здесь будут полезные советы и материалы по снижению углеродного следа.',
share: 'Поделитесь своими достижениями',
title: 'Экологический помощник',
transport: 'Вид транспорта:',
car: 'Автомобиль',
electricCar: 'Электромобиль',
bike: 'Велосипед',
public: 'Общественный транспорт',
walking: 'Пешком',
scooter: 'Электросамокат',
motorcycle: 'Мотоцикл',
train: 'Поезд',
plane: 'Самолет',
boat: 'Лодка',
bus: 'Автобус',
distance: 'Расстояние (км):',
calculate: 'Рассчитать углеродный след',
history: 'История поездок',
materials: 'Советы и материалы',
materialContent: 'Здесь будут полезные советы и материалы по снижению углеродного следа.',
share: 'Поделитесь своими достижениями',
dailyCalculator: 'Калькулятор углеродного следа для повседневной жизни',
activity: 'Вид деятельности:',
electricity: 'Электроэнергия',
naturalGas: 'Природный газ',
water: 'Вода',
heatingOil: 'Отопительное масло',
waste: 'Отходы',
foodMeat: 'Потребление мяса',
foodVegetarian: 'Растительная пища',
clothing: 'Покупка одежды',
electronics: 'Электроника',
furniture: 'Мебель',
airTravel: 'Авиаперелеты',
trainTravel: 'Путешествие на поезде',
carTravel: 'Поездка на автомобиле',
publicTransport: 'Общественный транспорт',
quantity: 'Количество (единицы):'
},
en: {
title: 'Eco Assistant',
transport: 'Type of transport:',
car: 'Car',
electricCar: 'Electric Car',
bike: 'Bicycle',
public: 'Public Transport',
walking: 'Walking',
scooter: 'Electric Scooter',
motorcycle: 'Motorcycle',
train: 'Train',
plane: 'Plane',
boat: 'Boat',
bus: 'Bus',
distance: 'Distance (km):',
calculate: 'Calculate Carbon Footprint',
history: 'Trip History',
materials: 'Tips and Materials',
materialContent: 'Here will be useful tips and materials on reducing the carbon footprint.',
share: 'Share your achievements',
title: 'Eco Assistant',
transport: 'Type of transport:',
car: 'Car',
electricCar: 'Electric Car',
bike: 'Bicycle',
public: 'Public Transport',
walking: 'Walking',
scooter: 'Electric Scooter',
motorcycle: 'Motorcycle',
train: 'Train',
plane: 'Plane',
boat: 'Boat',
bus: 'Bus',
distance: 'Distance (km):',
calculate: 'Calculate Carbon Footprint',
history: 'Trip History',
materials: 'Tips and Materials',
materialContent: 'Here will be useful tips and materials on reducing the carbon footprint.',
share: 'Share your achievements',
dailyCalculator: 'Daily Life Carbon Footprint Calculator',
activity: 'Activity:',
electricity: 'Electricity',
naturalGas: 'Natural Gas',
water: 'Water',
heatingOil: 'Heating Oil',
waste: 'Waste',
foodMeat: 'Meat Consumption',
foodVegetarian: 'Vegetarian Food',
clothing: 'Clothing Purchase',
electronics: 'Electronics',
furniture: 'Furniture',
airTravel: 'Air Travel',
trainTravel: 'Train Travel',
carTravel: 'Car Travel',
publicTransport: 'Public Transport',
quantity: 'Quantity (units):'
}
};

// Функция для деления в ВКонтакте
function shareOnSocialMedia() {
    const text = 'Я использую Экологический помощник, чтобы уменьшить свой углеродный след!';
    const url = window.location.href;
    const imageUrl = ''; // URL изображения, если есть

    const shareUrl = `https://vk.com/share.php?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&image=${encodeURIComponent(imageUrl)}`;

    window.open(shareUrl, '_blank');
}
// Функция для отображения графика
function displayCarbonChart() {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const labels = trips.map(trip => trip.date);
    const data = trips.map(trip => parseFloat(trip.carbonFootprint));

    const ctx = document.getElementById('carbonChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Углеродный след (кг CO2)',
                data: data,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Дата'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Кг CO2'
                    }
                }
            }
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayTripHistory();
    setupLanguageSwitcher();
    displayCarbonChart();
});
// Слушатель событий для формы повседневной жизни
document.getElementById('dailyCarbonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const activity = document.getElementById('activity').value;
    const quantity = document.getElementById('quantity').value;

    const dailyCarbonFootprint = calculateDailyCarbonFootprint(activity, quantity);
    document.getElementById('dailyResult').innerText = `Ваш углеродный след составляет: ${dailyCarbonFootprint} кг CO2`;
});

// Функция для расчета углеродного следа для повседневной жизни
function calculateDailyCarbonFootprint(activity, quantity) {
    let emissionFactor;

    switch(activity) {
        case 'electricity':
            emissionFactor = 0.475; // кг CO2 на кВт*ч
            break;
        case 'naturalGas':
            emissionFactor = 2.2; // кг CO2 на кубометр
            break;
        case 'water':
            emissionFactor = 0.001; // кг CO2 на литр
            break;
        case 'heatingOil':
            emissionFactor = 2.68; // кг CO2 на литр
            break;
        case 'waste':
            emissionFactor = 0.5; // кг CO2 на кг отходов
            break;
        case 'foodMeat':
            emissionFactor = 27; // кг CO2 на кг мяса
            break;
        case 'foodVegetarian':
            emissionFactor = 2; // кг CO2 на кг растительной пищи
            break;
        case 'clothing':
            emissionFactor = 14; // кг CO2 на кг одежды
            break;
        case 'electronics':
            emissionFactor = 80; // кг CO2 на кг электроники
            break;
        case 'furniture':
            emissionFactor = 60; // кг CO2 на кг мебели
            break;
        case 'airTravel':
            emissionFactor = 0.15; // кг CO2 на км
            break;
        case 'trainTravel':
            emissionFactor = 0.06; // кг CO2 на км
            break;
        case 'carTravel':
            emissionFactor = 0.25; // кг CO2 на км
            break;
        case 'publicTransport':
            emissionFactor = 0.05; // кг CO2 на км
            break;
        // Добавьте дополнительные типы деятельности здесь
        default:
            emissionFactor = 0;
    }

    return (emissionFactor * quantity).toFixed(2);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayTripHistory();
    setupLanguageSwitcher();
    displayCarbonChart();
});