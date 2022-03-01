import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

// {
//     id:
//     name:
//     max
// }

// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function getBudgetExpenses(budgetId) {
    //Makes us able to filter through expenses by ID
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    //Taking previous budgets, keeping all of them and adding a new budget with a new id, name and max
    setBudgets((prevBudgets) => {
      // If we have a prev budget with the same name we return the prev budget
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    //TODO: Deal with uncategorized expenses
    // Return all the budgets that don't have the same ID
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    //Passing a value that all of the childred will inherit
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {" "}
      {children}{" "}
    </BudgetsContext.Provider>
  );
};
