'use strict'
// 1)
let money = 100000;
let income = 'Менеджер по продажам';
let addExpenses = "аренда, связь, курсы, фастфуд";
let deposit = true;
let mission = 350000;
let period = 9;

// 2)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30
// console.log(budgetDay);

//___________Lesson 3___________
money = +prompt('Ваш месячный доход?')

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую')

deposit = confirm('Есть ли у вас депозит в банке?')
let expenses1 = prompt('Введите обязательную статью расходов?')
let amount1 = +prompt('Во сколько это обойдется?')
let expenses2 = prompt('Введите обязательную статью расходов?')
let amount2 = +prompt('Во сколько это обойдется?')
let budgetMonth = money - amount1 - amount2
console.log(`Бюджет на месяц ${budgetMonth}`);
period = Math.ceil(mission / budgetMonth)
console.log(`Цель будет достигнута за ${period} месяцев`)
budgetDay = Math.floor(budgetMonth / 30)
console.log(`Бюджет на день ${budgetDay}`)

//9)
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода')
} else if (budgetDay >= 600 && budgetDay <1200 ) {
    console.log('У вас средний уровень дохода')
} else if (budgetDay >= 0 && budgetDay < 600 ) {
    console.log('К сожалению у вас уровень дохода ниже среднего')
} else {
    console.log('Что то прошло не так')
}
