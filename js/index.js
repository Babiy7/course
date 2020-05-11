let money, time;

const startBtn = document.getElementById('start'),
    budget = document.querySelector('.budget-value'),
    daybudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value'),
    budgetInp = document.querySelector('.budget-item');

const [name1, price1, name2, price2] = document.getElementsByClassName('choose-item');
const [budgetBtn, expensesBtn, optionalExpensesBtn, countBudgetBtn] = document.getElementsByTagName(
    'button',
);
const [item1, item2, item3] = document.querySelectorAll('.optionalexpenses-item');
const incomeItem = document.querySelector('.choose-income-item');
const savings = document.querySelector('#savings');
const sum = document.querySelector('#sum');
const percent = document.querySelector('#percent');

const inputs = [name1, name2, price1, price2, budgetInp];
const optInputs = [item1, item2, item3];

const appData = {
    budget: money,
    timeData: time,
    expenses: { зал: 2000, стрижка: 300 },
    optionalExpenses: { 1: 'nozbe', 2: 'taxi' },
    income: [],
    savings: false,
    moneyPerDay: 0,
    monthIncome: 0,
    yearIncome: 0,
    detectDayBudget() {
        const sum = Object.values(this.expenses).reduce((prev, current) => prev + current);

        return Math.floor((this.budget - sum) / 30);
    },

    detectLevel() {
        if (this.moneyPerDay < 100) {
            return 'Мінімальний рівень прибутку';
        }
        if (this.moneyPerDay <= 500) {
            return 'Середній рівень прибутку';
        }
        if (this.moneyPerDay >= 500) {
            return 'Високий рівень прибутку';
        }
    },

    chooseExpenses(expenses) {
        expenses.forEach(expense => {
            const [name, price] = expense;

            appData.expenses[name] = price;
        });
    },

    chooseOptExpenses(optionalExpenses) {
        if (optionalExpenses) {
            optionalExpenses.forEach((expense, i) => {
                appData.optionalExpenses[++i] = expense.value;
            });
        }
    },

    showBudgetPerDay() {
        alert(`бюджет на день: ${appData.moneyPerDay}`);
    },

    checkSaving(save, percent) {
        if (this.savings) {
            const year = +((percent * save) / 100);
            appData.monthIncome = (year / 12).toFixed(1);
            appData.yearIncome = year.toFixed(1);
        }
    },

    chooseIncome(income) {
        if (income) {
            const incomes = income.split(',').map(element => element.trim());
            this.income = this.income.concat(incomes).sort();
        }
        return [...this.income];
    },

    showOurProgram() {
        console.log('Наша програма включає такі пункти:');

        Object.keys(this).forEach((key, i) => {
            let index = i;
            console.log(`${++index} ${key}`);
        });
    },
};

budgetBtn.addEventListener('click', () => {
    appData.budget = +budgetInp.value;
    budgetInp.value = '';
});

expensesBtn.addEventListener('click', () => {
    const expenses = [
        [name1.value, +price1.value],
        [name2.value, +price2.value],
    ];

    name1.value = '';
    price1.value = '';
    name2.value = '';
    price2.value = '';

    appData.chooseExpenses(expenses);
});

optionalExpensesBtn.addEventListener('click', () => {
    let optionalExpenses = [];
    if (item1.value || item2.value || item3.value) {
        optionalExpenses = optInputs.filter(input => input.value);
        appData.chooseOptExpenses(optionalExpenses);

        optInputs.forEach(input => {
            input.value = '';
        });
    } else {
        optionalExpenses = null;
    }
});

countBudgetBtn.addEventListener('click', () => {
    if (
        appData.budget &&
        Object.keys(appData.expenses).join('') &&
        Object.values(appData.expenses).join('')
    ) {
        budget.innerHTML = `${appData.budget}грн`;
        daybudget.innerHTML = `${(appData.moneyPerDay = appData.detectDayBudget())}грн`;
        level.innerHTML = appData.detectLevel();
        expenses.innerHTML = Object.keys(appData.expenses).join(', ');
        optionalExpenses.innerHTML = Object.values(appData.optionalExpenses).join(', ');

        if (inputs[0].classList.contains('error-input')) {
            inputs.forEach(input => {
                input.classList.remove('error-input');
            });
        }
    } else {
        inputs.forEach(input => {
            input.classList.add('error-input');
        });
    }
});

savings.addEventListener('click', e => {
    appData.savings = e.target.checked;
});

startBtn.addEventListener('click', () => {
    income.innerHTML = appData.chooseIncome(incomeItem.value).join(', ');

    appData.checkSaving(sum.value, percent.value);

    incomeItem.value = '';
    sum.value = '';
    percent.value = '';

    if (appData.savings) {
        monthSavings.innerHTML = `${appData.monthIncome}грн`;
        yearSavings.innerHTML = `${appData.yearIncome}грн`;
        savings.checked = false;
    }
});
