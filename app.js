'use strict'

let money;
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
let start = function() {
    do {
        money = prompt('Ваш месячный доход?')
    }
    while (!isNumber(money))
}
start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 5,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
        appData.addExpenses =addExpenses.toLowerCase().split(',')
        console.log(appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?')
    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function getExpensesMonth() {
        let sumExpenses = 0;
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            appData.expenses = prompt('Введите обязательную статью расходов?')
            do {
                sum = +prompt('Во сколько это обойдется?')
            }
            while (!isNumber(sum))
            sumExpenses += sum
        }
        console.log(appData.expenses);
        console.log(sumExpenses);
        return sumExpenses
    },
    getAccumulatedMonth: function getAccumulatedMonth() {
        return money - expensesAmount
    },
    getTargetMonth: function getTargetMonth() {
        return Math.ceil(appData.mission / accumulatedMonth)
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода')
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200 ) {
            return ('У вас средний уровень дохода')
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600 ) {
            return ('К сожалению у вас уровень дохода ниже среднего')
        } else {
            return ('Что то прошло не так')
        }
    },
    sendGetTargetMonthMessage: function sendGetTargetMonthMessage() {
        if (accumulatedMonth > 0) {
            console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев`);
        } else {
            console.log('Цель не будет достигнута');
        }
    },
}

appData.asking();

let expensesAmount = appData.getExpensesMonth()
const accumulatedMonth = appData.getAccumulatedMonth()


appData.period = Math.ceil(appData.mission / accumulatedMonth)
appData.budgetDay = Math.floor(accumulatedMonth / 30)

console.log('Расходы за месяц: '+ expensesAmount);
appData.sendGetTargetMonthMessage();
console.log(`Бюджет на день ${appData.budgetDay}`);
//9)

console.log(appData.getStatusIncome());

