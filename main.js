class Transaction {
    constructor(amount, description, category){
        this.id = Date.now;
        this.amount = parseFloat(amount);
        this.description = description;
        this.category = category || 'Uncategorized';
        this.date = new Date().toLocaleDateString();
    }

    getDetails(){
        return `${this.date} - ${this.description} = $${this.amount.toFixed(2)}, ${this.category}`;
    }
}

class Income extends Transaction {
    constructor(amount, description, category) {
        super(amount, description, category);
        this.type = 'income';
    }

    getDetails() {
        return `Income: ${super.getDetails()}`;
    }
}

class Expense extends Transaction {
    constructor(amount, description, category) {
        super(amount, description, category);
        this.type = 'expense';
    }

    getDetails() {
        return `Expense: ${super.getDetails()}`;
    }
}

class FinanceManager {
    constructor() {
        this.transaction = []; 
    }

    addTransaction(transaction) {
        this.transaction.push(transaction);
    }

    getTotalExp() {
        return this.transaction
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getTotalIncome() {
        return this.transaction
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getBalance() {
        return this.getTotalIncome() - this.getTotalExp();
    }

    getTransaction() {
        return this.Transaction;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const financeManager = new FinanceManager();
    const form = document.getElementById('transaction');
    const transactionList = document.getElementById('list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expense');
    const balance = document.getElementById('balance');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('desc').value;
        const category = document.getElementById('category').value;

        let transaction;

        if(type === 'income') {
            transaction = new Income(amount, description, category);
        } else {
            transaction = new Expense(amount, description, category)
        }

        financeManager.addTransaction(transaction);
        summary();
        addTransactionToList(transaction);

        form.reset();
    });

    function summary() {
        totalIncome.textContent = financeManager.getTotalIncome().toFixed(2);
        totalExpenses.textContent = financeManager.getTotalExp().toFixed(2);
        balance.textContent = financeManager.getBalance().toFixed(2);
    }

    function addTransactionToList(transaction) {
        const li = document.createElement('li');
        li.className = `transaction-itm ${transaction.type}`;
        li.textContent = transaction.getDetails();
        transactionList.prepend(li);
    }
});