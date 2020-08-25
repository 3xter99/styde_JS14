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
let incomeAmount = document.querySelector('.income-amount');
let expensesAmount = document.querySelector('.expenses-amount');
let placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
let placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');


const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items')
const additionalExpenses = document.querySelector('.additional_expenses');
const periodSelect = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let titlePeriodAmount = document.querySelector('.period-amount')
let cancel = document.getElementById('cancel')


const AppData = function () {

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
}

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses()
    this.getIncome();
    this.getIncomeMonth()
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.blockInput()
    this.resetButton()

};
AppData.prototype.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',')
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item)
        }
    }.bind(appData))

};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach( item => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue)
            console.log(this)
        }
    }, this)
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ')
    targetMonthValue.value = this.getTargetMonth();


    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod()
    }, this)
    incomePeriodValue.value = this.calcPeriod();

};
AppData.prototype.addExpensesBlock = function() {
    //клоннируем элемент expensesItem и вставляем его хуй пойми куда, вроде перед кнопкой
    let cloneExpensesItem = expensesItems[0].cloneNode(true)
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus)
    expensesItems = document.querySelectorAll('.expenses-items')

    //проверка клона на буквы и цифры_______________________
    let placeholderName = cloneExpensesItem.querySelector('.expenses-title');
    placeholderName.addEventListener('input', () => {
        placeholderName.value = placeholderName.value.replace(/[^А-Яа-я ,.]/,'');
    })
    let placeholderSum = cloneExpensesItem.querySelector('.expenses-amount');
    placeholderSum.addEventListener('input', () => {
        placeholderSum.value = placeholderSum.value.replace(/[^0-9]/,'');
    })
    //_____________________________________________________

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItem[0].cloneNode(true)
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus)
    incomeItem = document.querySelectorAll('.income-items');
    //проверка клона на буквы и цифры_______________________
    let placeholderName = cloneIncomeItem.querySelector('.income-title');
    placeholderName.addEventListener('input', () => {
        placeholderName.value = placeholderName.value.replace(/[^А-Яа-я ,.]/,'');
    })
    let placeholderSum = cloneIncomeItem.querySelector('.income-amount');
    placeholderSum.addEventListener('input', () => {
        placeholderSum.value = placeholderSum.value.replace(/[^0-9]/,'');
    })
    //_______________________________________________________


    if (incomeItem.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this)
};
AppData.prototype.getIncome = function() {
    //это дз, исправить как в getExpenses
    incomeItem.forEach(item => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    }, this)

};
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
    console.log(this.incomeMonth);
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for( let key in this.expenses) {
        sum += +this.expenses[key];
    }

    this.expensesMonth = +sum;
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30)
};
AppData.prototype.getTargetMonth = function() {
    return Math.floor(targetAmount.value / this.budgetMonth);
};
// AppData.prototype.getStatusIncome = function() {
//     if(appData.budgetDay < 300) {
//         return('Низкий уровень дохода');
//     } else if (appData.budgetDay <=800) {
//         return('Средний уровень дохода');
//     } else {
//         return('Высокий уровень дохода');
//     }
// };
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10')
        } while (!this.isNumber(this.percentDeposit))
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000)
        } while (!this.isNumber(this.moneyDeposit))

    }
};
AppData.prototype.calcPeriod = function () {
    console.log(this)
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockInput = function () {
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

    additionalExpensesItem.setAttribute("disabled", "disabled")
    placeholderName.forEach(item => {
        item.setAttribute("disabled", "disabled")
    })
    placeholderSum.forEach(item => {
        item.setAttribute("disabled", "disabled")
    })
};
AppData.prototype.resetButton = function () {
    cancel.style.display = "block"
    start.style.display = 'none'

};
AppData.prototype.rest = function () {
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
    this.budget = 0
    this.budgetDay = 0
    this.budgetMonth = 0
    this.expensesMonth = 0
    this.income = {}
    this.incomeMonth = 0
    this.addIncome = []
    this.expenses = {}
    this.addExpenses = []
    this.deposit = false
    this.percentDeposit = 0
    this.moneyDeposit = 0


    salaryAmount.textContent = ''
    additionalExpensesItem.removeAttribute('disabled')
    additionalExpensesItem.value = ''
    placeholderName.forEach(item => {
        item.removeAttribute('disabled')
        item.value = ''
    })

    placeholderSum.forEach(item => {
        item.removeAttribute('disabled')
        item.value = ''
    })
    cancel.style.display = "none"
    start.style.display = 'block'

    this.getExpenses()
    this.getIncome();
    this.getIncomeMonth()
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.eventListener = function () {
    start.disabled = true
    salaryAmount.addEventListener('input', function (event) {
        // console.log(event);
        salaryAmount.value = salaryAmount.value.replace(/[^0-9]/,'');
        start.disabled = event.target.value === ''
    })


//запрет введения букв и цифр___________________________

    placeholderSum.forEach((item) => {
        item.addEventListener('input', function () {
            console.log(item.value)
            item.value = item.value.replace(/[^0-9]/, '');
        })
    })

//\s
    console.log(placeholderName);
    placeholderName.forEach((item) => {
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
        item.addEventListener('input', function () {
            console.log(item.value)
            item.value = item.value.replace(/[^А-Яа-я ,.]/,'');
        })
    })
//________________________________

    start.addEventListener('click', appData.start.bind(appData))

    expensesPlus.addEventListener('click', appData.addExpensesBlock)
    incomePlus.addEventListener('click', appData.addIncomeBlock)
    periodSelect.addEventListener('input', function () {
        titlePeriodAmount.textContent = periodSelect.value
    })

    appData.getInfoDeposit()


    cancel.addEventListener('click', appData.rest.bind(appData))

    let expense = appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1)).join(',')

}

const appData = new AppData();

appData.eventListener()
console.log(appData);
