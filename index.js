const money = prompt('Ваш бюджет на месяц?'),
   time = prompt('Введите дату в формате YYYY-MM-DD');

const appData = {
   budget: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: false,
};

for (let i = 0; i < 2; i++) {
   const a = prompt('Введите обязательную статью расходов в этом месяце', ''),
      b = prompt('Во сколько обойдется?', '');
   console.log(a);
   if (a && b && a.length < 20 && b.length < 20) {
      appData.expenses[a] = b;
   } else {
   }
}

appData.moneyPerDay = Math.floor(appData.budget / 30);

alert(`бюджет на день: ${appData.moneyPerDay}`);

if (appData.moneyPerDay < 100) {
   console.log('Мінімальний рівень прибутку');
} else if (appData.moneyPerDay <= 500) {
   console.log('Середній рівень прибутку');
} else if (appData.moneyPerDay >= 500) {
   console.log('Високий рівень прибутку');
}
