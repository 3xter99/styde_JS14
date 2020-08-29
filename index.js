'use strict'



const start = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
let placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
let placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
const salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items')
const periodSelect = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let titlePeriodAmount = document.querySelector('.period-amount')
let cancel = document.getElementById('cancel')
const depositCheck = document.getElementById('deposit-check')
const depositCheckmark = document.querySelector('.deposit-checkmark')
const depositBank = document.querySelector('.deposit-bank')
const depositAmount = document.querySelector('.deposit-amount')
const depositPercent = document.querySelector('.deposit-percent')
let isLoad = JSON.parse(localStorage.getItem('word'))
// console.log(isLoad);


class AppData {
    constructor() {
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

    start () {

        this.budget = +salaryAmount.value;
        this.getExpInc()
        this.getExpensesMonth();
        this.getAddIncExp('addExpenses', true);
        this.getAddIncExp('addIncome', false);
        this.getInfoDeposit()

        this.getBudget();

        this.showResult();
        this.blockInput()
        this.resetButton()
        this.local()



    };
    local()  {
        isLoad = JSON.stringify(localStorage.setItem('word', 'true'))

        JSON.stringify(localStorage.setItem('budgetMonthValue', this.budgetMonth));
        JSON.stringify(localStorage.setItem('budgetDayValue', this.budgetDay));
        JSON.stringify(localStorage.setItem('expensesMonthValue', this.expensesMonth));
        localStorage.setItem('additionalExpensesValue', JSON.stringify(this.addExpenses.join(', ')))
        localStorage.setItem('additionalIncomeValue', JSON.stringify(this.addIncome.join(', ')));
        JSON.stringify(localStorage.setItem('targetMonthValue', this.getTargetMonth()));
        JSON.stringify(localStorage.setItem('incomePeriodValue', this.calcPeriod()));

        Object.keys(localStorage).forEach(item => {
            document.cookie = `${item} = ${JSON.parse(localStorage.getItem(item))}`
        })


        // const obj = {
        //     'word' : true,
        //     'budgetMonthValue' : budgetMonthValue.value,
        //     'budgetDayValue' : budgetDayValue.value,
        //     'expensesMonthValue' : expensesMonthValue.value,
        //     'additionalExpensesValue' : additionalExpensesValue.value,
        //     'additionalIncomeValue' : additionalIncomeValue.value,
        //     'targetMonthValue' : targetMonthValue.value,
        //     'incomePeriodValue' : incomePeriodValue.value
        // }
        //
        // for (let key in obj) {
        //     document.cookie = `${key} = ${obj[key]}`
        // }
        console.log(this.get_all_cookies());
        console.log(Object.keys(this.get_all_cookies()));
        console.log(Object.keys(localStorage))




    }
    get_all_cookies() {
        let cookies = { };
        if (document.cookie && document.cookie !== '') {
            let split = document.cookie.split(';');
            for (let i = 0; i < split.length; i++) {
                let name_value = split[i].split("=");
                name_value[0] = name_value[0].replace(/^ /, '');
                cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
            }
        }
        return cookies;
    }


    isNumber (n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    };

    getAddIncExp(addPlace, expenses) {
        let addBudget, itemValue;
        if (expenses) {
            addBudget = additionalExpensesItem.value.split(', ');
        } else {
            addBudget = additionalIncomeItem;
        }
        addBudget.forEach((item) => {
            let itemValue = (expenses) ? item.trim() : item.value.trim();
            if (itemValue !== '') {
                this[addPlace].push(itemValue);
            }
        });
    };


    showResult  () {

        budgetMonthValue.value = this.budgetMonth;

        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ')
        targetMonthValue.value = this.getTargetMonth();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod()
        })
        incomePeriodValue.value = this.calcPeriod();

    };


    addIncExpBlock(item) {

        const name = item.target.className.split(' ')[1].split('_')[0];
        let nameItems, plus;
        if (name === 'income') {
            nameItems = document.querySelectorAll('.income-items');
            plus = document.getElementsByTagName('button')[0];
        } else if (name === 'expenses') {
            nameItems = document.querySelectorAll('.expenses-items')
            plus = document.getElementsByTagName('button')[1];
        }
        const cloneIncomeItem = nameItems[0].cloneNode(true)
        cloneIncomeItem.querySelector(`.${name}-title`).value = '';
        cloneIncomeItem.querySelector(`.${name}-amount`).value = '';
        nameItems[0].parentNode.insertBefore(cloneIncomeItem, plus)
        nameItems = document.querySelectorAll(`.${name}-items`);
        //проверка клона на буквы и цифры_______________________
        const placeholderName = cloneIncomeItem.querySelector(`.${name}-title`);
        placeholderName.addEventListener('input', () => {
            placeholderName.value = placeholderName.value.replace(/[^А-Яа-я ,.]/, '');
        })
        const placeholderSum = cloneIncomeItem.querySelector(`.${name}-amount`);
        placeholderSum.addEventListener('input', () => {
            placeholderSum.value = placeholderSum.value.replace(/[^0-9]/, '');
        })
        //_______________________________________________________
        if (nameItems.length === 3) {
            plus.style.display = 'none';
        }
    };


    getExpInc () {
        const count = item => {
            const startStr = item.className.split('-')[0]
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItem.forEach(count);
        expensesItems.forEach(count)

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    getExpensesMonth () {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }

        this.expensesMonth = +sum;
    };

    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100)
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30)
    };

    getTargetMonth () {

        return this.budgetMonth <= 0 ? 0 : Math.floor(targetAmount.value / this.budgetMonth);
    };

    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    };

    blockInput () {
        placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

        additionalExpensesItem.setAttribute("disabled", "disabled")
        depositPercent.setAttribute("disabled", "disabled")

        placeholderName.forEach(item => {
            item.setAttribute("disabled", "disabled")
        })
        placeholderSum.forEach(item => {
            item.setAttribute("disabled", "disabled")
        })
    };

    resetButton () {
        cancel.style.display = "block"
        start.style.display = 'none'

    };

    rest () {
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

        start.disabled = true


        depositPercent.removeAttribute('disabled')
        depositBank.value = ''
        depositBank.style.display = 'none'
        depositAmount.style.display = 'none'
        // depositCheck.innerText = ''
        depositAmount.value = ''
        depositPercent.value = ''
        depositPercent.style.display = 'none'
        this.deposit = false



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

        incomeItem = document.querySelectorAll('.income-items')
        incomeItem.forEach((item, index) => {
            if (index >= 1) {
                item.remove()
            }
        })
        incomePlus.style.display = '';

        expensesItems = document.querySelectorAll('.expenses-items')
        expensesItems.forEach((item, index) => {
            if (index >= 1) {
                item.remove()
            }
        })
        expensesPlus.style.display = '';
        periodSelect.value = titlePeriodAmount.textContent = 1

        console.log(incomeItem);
        cancel.style.display = "none"
        start.style.display = 'block'

        localStorage.clear()
        this.deleteAllCookies()


        this.getExpInc()
        this.getExpensesMonth();
        this.getAddIncExp()
        this.getBudget();
        this.showResult();
    };

    getInfoDeposit () {
        if (this.deposit) {
                this.percentDeposit = depositPercent.value
                this.moneyDeposit = depositAmount.value
        }
    };
    checkPercent() {
        depositPercent.value = depositPercent.value.replace(/[^0-9]/, '');
        if (depositPercent.value > 100) {
            depositPercent.value = ''
        }
    }

    changePercent() {

        const valueSelect = this.value;
        if (valueSelect === 'other') {

            depositPercent.style.display = 'inline-block'
            depositPercent.value = ''


        } else {
            depositPercent.value = valueSelect
            depositPercent.style.display = 'none'
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block'
            depositAmount.style.display = 'inline-block'
            this.deposit = true
            depositBank.addEventListener('change', this.changePercent)
            depositPercent.addEventListener('input', appData.checkPercent.bind(appData))

        } else {
            depositBank.style.display = 'none'
            depositAmount.style.display = 'none'
            depositBank.value = ''
            depositAmount.value = ''
            depositPercent.value = ''
            depositPercent.style.display = 'none'
            this.deposit = false

            depositBank.removeEventListener('change', this.changePercent)
        }
    };
    deleteAllCookies() {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }


    eventListener (){
        start.disabled = true
        salaryAmount.addEventListener('input', function (event) {
            // console.log(event);
            salaryAmount.value = salaryAmount.value.replace(/[^0-9]/, '');
            start.disabled = event.target.value === ''
        })
//запрет введения букв и цифр___________________________

        placeholderSum.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^0-9]/, '');
            })
        })

        let asd = JSON.parse(localStorage.getItem('word'))
        if (asd == true) {
            this.blockInput()
            this.resetButton()
            budgetMonthValue.value = JSON.parse(localStorage.getItem('budgetMonthValue'))
            budgetDayValue.value = JSON.parse(localStorage.getItem('budgetDayValue'))
            expensesMonthValue.value = JSON.parse(localStorage.getItem('expensesMonthValue'))
            additionalExpensesValue.value = JSON.parse(localStorage.getItem('additionalExpensesValue'))
            additionalIncomeValue.value = JSON.parse(localStorage.getItem('additionalIncomeValue'))
            targetMonthValue.value = JSON.parse(localStorage.getItem('targetMonthValue'))
            incomePeriodValue.value = JSON.parse(localStorage.getItem('incomePeriodValue'))
        }
        for (let i = 0; i<= Object.keys(localStorage).length; i++) {
            if (Object.keys(localStorage)[i] !== Object.keys(this.get_all_cookies())[i]) {
                localStorage.clear()
                this.deleteAllCookies()
                this.rest()
            }
        }

//\s
        placeholderName.forEach((item) => {
            placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^А-Яа-я ,.]/, '');
            })
        })
//________________________________

        start.addEventListener('click', appData.start.bind(appData))
        expensesPlus.addEventListener('click', appData.addIncExpBlock)
        incomePlus.addEventListener('click', appData.addIncExpBlock)
        periodSelect.addEventListener('input', () => {
            titlePeriodAmount.textContent = periodSelect.value
        })
        appData.getInfoDeposit()
        cancel.addEventListener('click', appData.rest.bind(appData))

        depositCheck.addEventListener('change', this.depositHandler.bind(this))


    }
}


const appData = new AppData();

appData.eventListener()
console.log(appData);
