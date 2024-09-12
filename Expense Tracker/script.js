// DOM elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseItems = document.getElementById('expense-items');

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Display expenses on page load
function displayExpenses() {
    expenseItems.innerHTML = '';  // Clear previous list
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="deleteExpense(${index})">Delete</button>
            <button onclick="editExpense(${index})">Edit</button>
        `;
        expenseItems.appendChild(li);
    });
}

// Add a new expense
addExpenseBtn.addEventListener('click', () => {
    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;
    
    if (expenseName && expenseAmount) {
        const newExpense = { name: expenseName, amount: expenseAmount };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        
        // Clear input fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }
});

// Delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Edit an expense
function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    
    // Remove the original expense
    deleteExpense(index);
}

// Initial display
displayExpenses();