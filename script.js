//เข้าถึง DOM
const balance = document.getElementById("balance")
const moneyPlus = document.getElementById("money-plus")
const moneyMinus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")



let transactions = []

function init() {
    list.innerHTML = ''
    transactions.forEach(addDataToList)
    calculate()

}
function addDataToList(transactions) {
    const symbol = transactions.amount < 0 ? '-' : '+'
    const status = transactions.amount < 0 ? 'minus' : 'plus'
    const item = document.createElement("li")
    result = formatNumber(Math.abs(transactions.amount))
    item.classList.add(status)
    item.innerHTML = `${transactions.text} <span>${symbol}${result}</span><button class="delete-btn" onclick="removeItem(${transactions.id})"> X</button >`
    list.appendChild(item)
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function generateId() {
    return Math.floor(Math.random() * 1000000)
}
function calculate() {
    const amounts = transactions.map(transactions => transactions.amount)
    //คำนวณยอดคงเหลือ
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2)
    //คำณวนรายรับ
    const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2)
    //คำนวณรายจ่าย
    const expense = (amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2)
    // แสดงผลใน UI
    balance.innerText = formatNumber(total) + `€`
    moneyPlus.innerText = formatNumber(income) + `€`
    moneyMinus.innerText = formatNumber(expense) + `€`
}

function removeItem(id) {
    transactions = transactions.filter(transactions => transactions.id !== id)
    init()
}

function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Transction and amount of money cannot be empty.")
    } else {
        const data = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(data)
        addDataToList(data)
        calculate()
        text.value = ''
        amount.value = ''
    }
}

form.addEventListener("submit", addTransaction)

init()




