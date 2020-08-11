'use strict'
// 1)
let money = +prompt('Ваш месячный доход?', '100000')
let income = 'Менеджер по продажам';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')
let deposit = confirm('Есть ли у вас депозит в банке?')
let mission = 350000;
let period = 9;
// 2)
//___________Lesson 3___________
let expenses1 = prompt('Введите обязательную статью расходов?')
let amount1 = +prompt('Во сколько это обойдется?', '50000')
let expenses2 = prompt('Введите обязательную статью расходов?')
let amount2 = +prompt('Во сколько это обойдется?','20000')
// lesson04

let showTypeOf = function(data) {
    console.log(data, typeof(data))
}

function getExpensesMonth() {
    return amount1 + amount2
}

function getAccumulatedMonth() {
    return money - getExpensesMonth()
}

let accumulatedMonth = getAccumulatedMonth()

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth)
}

period = Math.ceil(mission / accumulatedMonth)
let budgetDay = Math.floor(accumulatedMonth / 30)

showTypeOf(money)
showTypeOf(income)
showTypeOf(deposit)
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit);
console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(','));
console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев`);
// console.log(`Период равен ${period} месяцев`);
// console.log(`Цель заработать ${mission} рублей`);
console.log(`Бюджет на день ${budgetDay}`);
//9)
let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода')
    } else if (budgetDay >= 600 && budgetDay <1200 ) {
        return ('У вас средний уровень дохода')
    } else if (budgetDay >= 0 && budgetDay < 600 ) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то прошло не так')
    }
}

console.log(getStatusIncome());

