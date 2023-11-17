import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TransactionTable from "./TransactionTable"
import CategoryPieChart from "./CategoryPieChart"
import DateBarChart from "./DateBarChart"
import "./App.css"
import Login from "./login"
import SignUp from "./signup"
import Navbar from "./Navbar"
import Home from "./Home"

function App() {
  useEffect(() => {
    // Function to generate a random transaction
    const generateRandomTransaction = (id) => {
      const randomName = `Item ${id}`
      const randomPrice = (Math.random() * 100).toFixed(2)
      const year = 2023
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1 // Choose any day within the month
      const randomDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
      const categories = [
        "Groceries",
        "Clothes",
        "Gas",
        "Rent",
        "Utilites",
        "Enterntainment",
        "Electronics",
        "Travel",
        "Other",
      ]
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)]

      return {
        id,
        name: randomName,
        price: parseFloat(randomPrice),
        date: randomDate,
        category: randomCategory,
      }
    }

    // Generate 10 random transactions
    const randomTransactions = []
    for (let id = 1; id <= 10; id++) {
      randomTransactions.push(generateRandomTransaction(id))
    }

    setTransactions(randomTransactions)
  }, []) // Empty dependency array to run this effect only once

  const [transactions, setTransactions] = useState([])

  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };

  const onAddTransaction = (newTransaction) => {
    // Add the new transaction to your data state
    setTransactions([...transactions, newTransaction])
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/transactions"
            element={
              <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                  <TransactionTable
                    transactions={transactions}
                    onAddTransaction={onAddTransaction}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <CategoryPieChart
                    transactions={transactions}
                    onAddTransaction={onAddTransaction}
                  />
                </div>
                <div>
                  <DateBarChart transactions={transactions} />
                </div>
              </div>
            }
          />
          <Route path="/account" element={<AccountDisplay />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
