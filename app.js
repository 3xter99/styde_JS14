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
