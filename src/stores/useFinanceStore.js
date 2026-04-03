import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const MOCK_TRSNSCTIONS = [
    { id: 1, date: '2026-03-25', description: 'Tech Corp Salary', amount: 5200, type: 'income', category: 'Salary' },
  { id: 2, date: '2026-03-26', description: 'Apartment Rent', amount: 1500, type: 'expense', category: 'Housing' },
  { id: 3, date: '2026-03-28', description: 'Whole Foods', amount: 145, type: 'expense', category: 'Food' },
  { id: 4, date: '2026-03-29', description: 'Netflix Subscription', amount: 15, type: 'expense', category: 'Entertainment' },
  { id: 5, date: '2026-04-01', description: 'Freelance Project', amount: 850, type: 'income', category: 'Freelance' },
  { id: 6, date: '2026-04-02', description: 'Electric Bill', amount: 95, type: 'expense', category: 'Utilities' },
]

export const useFinanceStore = defineStore('finance', () => {
    const currentRole = ref('admin')

    const savedData = localStorage.getItem('finance_data')
    const transactions = ref(savedData ? JSON.parse(savedData) : MOCK_TRSNSCTIONS)

    watch(transactions, (newVal) => {
        localStorage.setItem('finance_data', JSON.stringify(newVal))
    }, { deep : true })

    const totalIncome = computed(() => {
        return transactions.value
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    const totalExpense = computed(() => {
        return transactions.value
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    const totalBalance = computed(() => totalIncome.value - totalExpense.value)

    const recentTransactions = computed(() => {
        return [...transactions.value]
            .sort((a,b) => new Date(b.date) - new Date(a.date))
                .slice(0,5)
    })

    const addTransaction = (transaction) => {
        transactions.value.push({
            id: Date.now(),
            ...transaction
        })
    }

    const deleteTransaction = (id) => {
        transactions.value = transactions.value.filter(t => t.id !== id)
    }

    const toggleRole = () => {
        currentRole.value = currentRole.value === 'admin' ? 'viewer' : 'admin'
    }

    return {
    currentRole,
    transactions,
    totalIncome,
    totalExpense,
    totalBalance,
    recentTransactions,
    addTransaction,
    deleteTransaction,
    toggleRole
  }
})