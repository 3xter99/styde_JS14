

const calculate = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const periodSelect = document.querySelector('.period-select');

console.log(calculate);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheck);
console.log(additionalIncomeItem);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(periodSelect);








const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
    start = function() {
        do{
            money = prompt('Ваш месячный доход?', 50000);
        }
        while(!isNumber(money));
    }


start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {

        if (confirm('Есть ли у вас доп заработок?')){
            let itemIncome
            do {
                itemIncome = prompt('Какой у Вас есть доп заработок?', 'Таксую')
            } while (!Number.isNaN(Number(itemIncome)))

            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000)
            } while (!isNumber(cashIncome))

            appData.income[itemIncome] = cashIncome
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < 2; i++) {
            let itemExpenses
            do {
                itemExpenses = prompt('Введите обязательную статью расходов', 'food');
            } while (!Number.isNaN(Number(itemExpenses)))


            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 2500);
            }
            while (!isNumber(cashExpenses))

            appData.expenses[itemExpenses] = +cashExpenses;
        }
    },
    getExpensesMonth: function() {
        let sum = 0;
        for( let key in appData.expenses) {
            sum += appData.expenses[key];
        }

        appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30)
    },
    getTargetMonth: function() {
        return Math.floor(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if(appData.budgetDay < 300) {
            return('Низкий уровень дохода');
        } else if (appData.budgetDay <=800) {
            return('Средний уровень дохода');
        } else {
            return('Высокий уровень дохода');
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10')
            } while (!isNumber(appData.percentDeposit))
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000)
            } while (!isNumber(appData.moneyDeposit))

        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
console.log('Уровень дохода: ' + appData.getStatusIncome());

for( let key in appData ) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

console.log(appData.addExpenses);

appData.getInfoDeposit()


// 2)

let expense = appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1)).join(',')

console.log(expense);
