let money, time;

function start() {
   money = prompt('Ваш бюджет на месяц?');
   time = prompt('Введите дату в формате YYYY-MM-DD');

   while (isNaN(money) || !money) {
      money = +prompt('Ваш бюджет на месяц?');
   }
}

// start();

const appData = {
   budget: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: true,
   detectDayBudget() {
      return Math.floor(this.budget / 30);
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
};

function chooseExpenses() {
   [1, 2].forEach(_ => {
      const a = prompt('Введите обязательную статью расходов в этом месяце', ''),
         b = prompt('Во сколько обойдется?', '');

      if (a && b && a.length < 20 && b.length < 20) {
         appData.expenses[a] = b;
      }
   });
}

// chooseExpenses();

function chooseOptExpenses() {
   [1, 2, 3].forEach(num => {
      const choose = prompt('Статья необязательных расходов?');

      appData.optionalExpenses[num] = choose;
   });
}

// chooseOptExpenses();

// appData.moneyPerDay = appData.detectDayBudget();

// alert(`бюджет на день: ${appData.moneyPerDay}`);

// console.log(appData.detectLevel());

function checkSaving() {
   if (appData.savings) {
      const save = +prompt('Яка сума депозиту?'),
         percent = +prompt('Який відсоток?');

      appData.monthIncome = +((percent * save) / 100 / 12).toFixed(1);

      alert(`Дохід з депозиту: ${appData.monthIncome}грн`);
   }
}

checkSaving();
