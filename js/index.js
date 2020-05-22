const startBtn = document.getElementById('start');
const budget = document.querySelector('.budget-value');
const daybudget = document.querySelector('.daybudget-value');
const level = document.querySelector('.level-value');
const expenses = document.querySelector('.expenses-value');
const optionalExpenses = document.querySelector('.optionalexpenses-value');
const income = document.querySelector('.income-value');
const monthSavings = document.querySelector('.monthsavings-value');
const yearSavings = document.querySelector('.yearsavings-value');
const budgetInp = document.querySelector('.budget-item');

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
    budget: 0,
    time: null,
    expenses: {},
    optionalExpenses: {},
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
        for (let i = 0; i < expenses.length; i++) {
            const name = expenses[i].value;
            const price = +expenses[++i].value;

            appData.expenses[name] = price;
        }
    },

    chooseOptExpenses(optionalExpenses) {
        if (optionalExpenses) {
            optionalExpenses.forEach((expense, i) => {
                appData.optionalExpenses[++i] = expense.value;
            });
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

    budget.textContent = `${appData.budget}грн`;
    budgetInp.classList.remove('error-input');
});

expensesBtn.addEventListener('click', () => {
    inputs.slice(0, inputs.length - 1).forEach(input => {
        input.classList.remove('error-input');
    });

    appData.chooseExpenses(document.getElementsByClassName('choose-item'));
    expenses.textContent = `${Object.values(appData.expenses).reduce(
        (prev, next) => prev + next,
    )}грн`;
    helper.clearInput(null, [name1, name2, price1, price2]);
});

optionalExpensesBtn.addEventListener('click', () => {
    let optionalExpensesArr = [];
    if (item1.value || item2.value || item3.value) {
        optionalExpensesArr = optInputs.filter(input => input.value);
        appData.chooseOptExpenses(optionalExpensesArr);

        helper.clearInput(null, optInputs);
        optionalExpenses.innerHTML = Object.values(appData.optionalExpenses).join(', ');
    } else {
        optionalExpensesArr = null;
    }
});

countBudgetBtn.addEventListener('click', () => {
    if (
        appData.budget &&
        Object.keys(appData.expenses).join('') &&
        Object.values(appData.expenses).join('')
    ) {
        daybudget.innerHTML = `${(appData.moneyPerDay = appData.detectDayBudget())}грн`;
        level.innerHTML = appData.detectLevel();

        helper.removeClasses('error-input');
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

    appData.time = helper.date();

    if (appData.savings) {
        calculate();
    }

    helper.clearInput(null, [incomeItem, sum, percent]);
});

function calculate() {
    if (sum.value.trim() && percent.value.trim()) {
        const year = +((sum.value * percent.value) / 100);
        appData.monthIncome = (year / 12).toFixed(1);
        appData.yearIncome = year.toFixed(1);
        monthSavings.innerHTML = `${appData.monthIncome}грн`;
        yearSavings.innerHTML = `${appData.yearIncome}грн`;
    }
}

const helper = {
    date() {
        const now = new Date();
        return now.toLocaleDateString();
    },

    removeClasses(inputs, removeClass) {
        if (inputs[0].classList.contains(removeClass)) {
            inputs.forEach(input => {
                input.classList.remove(removeClass);
            });
        }
    },

    clearInput(input, inputs) {
        if (input) {
            input.value = '';
        } else {
            inputs.forEach(input => {
                input.value = '';
            });
        }
    },
};
