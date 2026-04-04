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

export function exportToCSV(transactions) {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    Math.abs(t.amount),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToJSON(transactions) {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.json";
  a.click();
  URL.revokeObjectURL(url);
}