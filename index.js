'use strict'

const start = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const depositCheck = document.querySelector('#deposit-check');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');


const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items')
const additionalExpenses = document.querySelector('.additional_expenses');
const periodSelect = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let titlePeriodAmount = document.querySelector('.period-amount')



const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}



let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {


            appData.budget = +salaryAmount.value;
            appData.getExpenses()
            appData.getIncome();
            appData.getIncomeMonth()
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.showResult();




    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',')
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item)
            }
        })

    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue)
            }

        })
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ')
        targetMonthValue.value = appData.getTargetMonth();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        })
        incomePeriodValue.value = appData.calcPeriod();

    },
    addExpensesBlock: function() {
        //клоннируем элемент expensesItem и вставляем его хуй пойми куда, вроде перед кнопкой
        let cloneExpensesItem = expensesItems[0].cloneNode(true)
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus)
        expensesItems = document.querySelectorAll('.expenses-items')
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';

        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true)
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus)
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        })
    },
    getIncome: function() {
        //это дз, исправить как в getExpenses
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        })

    },
    getIncomeMonth: function() {
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        console.log(appData.incomeMonth);
    },
    getExpensesMonth: function() {
        let sum = 0;
        for( let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.expensesMonth = +sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30)
    },
    getTargetMonth: function() {
        return Math.floor(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};


start.disabled = true
salaryAmount.addEventListener('input', function (event) {
    console.log(event);
    salaryAmount.value = salaryAmount.value.replace(/[^0-9]/,'');
    start.disabled = event.target.value === ''
})
start.addEventListener('click', appData.start)

expensesPlus.addEventListener('click', appData.addExpensesBlock)
incomePlus.addEventListener('click', appData.addIncomeBlock)
periodSelect.addEventListener('input', function () {
    titlePeriodAmount.textContent = periodSelect.value
})

// if (appData.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев')
// } else {
//     console.log('Цель не будет достигнута')
// }

//
// for( let key in appData ) {
//     console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
// }


appData.getInfoDeposit()


// 2)

let expense = appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1)).join(',')

