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
        this.Transaction = []; 
    }

    addTransaction(Transaction) {
        this.Transaction.push(Transaction);
    }

    getTotalExp() {
        return this.Transaction
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getTotalIncome() {
        return this.Transaction
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sume + t.amount, 0);
    }

    getBalance() {
        return this.getTotalIncome() - this.getTotalExp();
    }

    getTransaction() {
        return this.Transaction;
    }
}