'use strict'
// 1)
// Проверка на число
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
//

let money;
let income = 'Менеджер по продажам';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
let deposit = confirm('Есть ли у вас депозит в банке?')
let mission = 350000;
let period = 9;


const start = function() {
    do {
    money = prompt('Ваш месячный доход?')
    }
    while (!isNumber(money))
}
start();

let expenses = []
// lesson04

const showTypeOf = function(data) {
    console.log(data, typeof(data))
}

function getExpensesMonth() {
    let sumExpenses = 0;
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?')
        do {
            sum = +prompt('Во сколько это обойдется?')
        }
        while (!isNumber(sum))
        sumExpenses += sum
    }

    console.log(expenses);
    return sumExpenses
}

let expensesAmount = getExpensesMonth()

function getAccumulatedMonth() {
    return money - expensesAmount
}

const accumulatedMonth = getAccumulatedMonth()

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth)
}

function sendGetTargetMonthMessage() {
    if (accumulatedMonth > 0) {
        console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев`);
    } else {
        console.log('Цель не будет достигнута');
    }
}

period = Math.ceil(mission / accumulatedMonth)
let budgetDay = Math.floor(accumulatedMonth / 30)

showTypeOf(money)
showTypeOf(income)
showTypeOf(deposit)
console.log('Расходы за месяц: '+ expensesAmount);
console.log(addExpenses.toLowerCase().split(','));
sendGetTargetMonthMessage();
console.log(`Бюджет на день ${budgetDay}`);
//9)
const getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода')
    } else if (budgetDay >= 600 && budgetDay < 1200 ) {
        return ('У вас средний уровень дохода')
    } else if (budgetDay >= 0 && budgetDay < 600 ) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то прошло не так')
    }
}

console.log(getStatusIncome());

