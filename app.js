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
        // console.log(appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?')


        let amountExpenses;
        for (let i = 0; i < 2; i++) {
            let mandatoryExpenses = prompt('Введите обязательную статью расходов?')

        do {
            amountExpenses = +prompt('Во сколько это обойдется?')
            appData.expenses[mandatoryExpenses] = amountExpenses;
        }
        while (!isNumber(amountExpenses))
        }

        // console.log(appData.expenses);


    },
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function getExpensesMonth() {
        let sumExpenses = 0;
        for (let key in appData.expenses) {
            sumExpenses += appData.expenses[key]
        }
        return sumExpenses

    },
    getBudget: function getAccumulatedMonth() {
        return appData.budget - appData.getExpensesMonth()
    },
    getTargetMonth: function getTargetMonth() {
        return Math.ceil(appData.mission / appData.getBudget())
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
        if (appData.getBudget() > 0) {
            console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев`);
        } else {
            console.log('Цель не будет достигнута');
        }
    },
}

appData.asking();

// let expensesAmount = appData.getExpensesMonth()
// const accumulatedMonth = appData.getAccumulatedMonth()


appData.period = Math.ceil(appData.mission / appData.getBudget())
appData.budgetDay = Math.floor(appData.getBudget() / 30)

console.log('Расходы за месяц: '+ appData.getExpensesMonth());
appData.sendGetTargetMonthMessage();
// console.log(`Бюджет на день ${appData.budgetDay}`);
console.log(`Уровень дохода ${appData.getBudget()}`);
//9)

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} ${appData[key]}`)
}
