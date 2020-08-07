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
console.log(addExpenses.toUpperCase().split(', '));

const budgetDay = money / 30
console.log(budgetDay);

