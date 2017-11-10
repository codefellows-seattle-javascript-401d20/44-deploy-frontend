let emptyState = {};

export const validateExpense = (expense) => {
  if(!expense.name || !expense.price)
    throw new Error('expense expected a name and price');
};

export default (state=emptyState, {type, payload}) => {
  let categoryID, categoryExpenses, result;
  switch(type){
    case 'CATEGORY_CREATE':
      return { ...state, [payload.id]: [] };
    case 'CATEGORY_DESTROY':
     return { ...state, [payload.id]: undefined};
    case 'EXPENSE_UPDATE_CATEGORY_ID':
      let expense = payload.expense;
      let oldCategoryID = expense.categoryID;
      if(oldCategoryID == payload.categoryID)
        return state
      let oldCategory = state[expense.categoryID].filter(item => item.id !== expense.id);
      expense.categoryID = payload.categoryID;
      let newCategory = [expense, ...state[payload.categoryID]];
      return {
        ...state,
        [oldCategoryID]: oldCategory,
        [expense.categoryID]: newCategory,
      }
    case 'EXPENSE_CREATE':
      validateExpense(payload)
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      result = [...categoryExpenses, payload];
      return { ...state, [categoryID]: result };
    case 'EXPENSE_UPDATE':
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      result = categoryExpenses.map(item =>
        item.id === payload.id ? payload : item);
      return { ...state, [categoryID]: result };

    case 'EXPENSE_DELETE':
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      result = categoryExpenses.filter(item => item.id !== payload.id);
      return { ...state, [categoryID]: result };
    default:
      return state;
  }
};
