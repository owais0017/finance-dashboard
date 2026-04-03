export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Math.abs(amount));
}

export function getMonthName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" });
}

export function getMonthlyData(transactions) {
  const monthly = {};

  transactions.forEach((t) => {
    const month = getMonthName(t.date);
    if (!monthly[month]) monthly[month] = { month, income: 0, expenses: 0 };
    if (t.type === "income") monthly[month].income += t.amount;
    else monthly[month].expenses += Math.abs(t.amount);
  });

  return Object.values(monthly);
}

export function getCategoryData(transactions) {
  const categories = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!categories[t.category]) categories[t.category] = 0;
      categories[t.category] += Math.abs(t.amount);
    });

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
}

export function getSummary(transactions) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    balance: income - expenses,
    income,
    expenses,
    transactionCount: transactions.length,
  };
}