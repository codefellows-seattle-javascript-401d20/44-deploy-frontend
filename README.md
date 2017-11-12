401 JS --  Lab 44 Deploy Frontend
===

## About
This is a budget-tracking app that one can use to create, track, and remove budgeting categories and expenses within those categories. One can also drag and drop expenses from one category to another.

## Viewing the App's Deployment
* link: https://budget-tracker-hanson.herokuapp.com/

#### App Structure
```
Provider
  App
    BrowserRouter
      Route / Dashboard
        CategoryForm -- for creating categories
        [Category Item] -- list of Category items
           Dropzone
             CategoryForm  -- for updating categories
             ExpenseForm -- for creating expenses
             [ExpenseItem]  -- list of expense items
                Draggable
                  ExpenseForm -- for updating an expense
```

## Components
###### App Component
* Should set up the single page application routes

###### Dashboard Component
* Manages the entire `application state`
* Should display on the `/` route
* Should use react-redux's `connect` to map state and dispatch methods to props
* should display a `CategoryForm` for adding categories to the app state
* should display a `CategoryItem` for each category in the app state

###### CategoryForm Component
* Should expect an `onComplete` prop to be a function
  * That function should be invoked with the `CategoryForm` state when the form is submitted
* Should support and optional `category` prop that will initialize the state of the form

###### CategoryItem Component
* Should display the category's name and budget
* Should receive a category prop from Dashbaord
* Should display a delete button
  * `onClick` the category should be removed from the application state
* Should display a CategoryForm  
  * `onComplete` the form should update the component in the application state
* Should add an ExpenseForm to the category item that enables the user to create expenses on the app state
* Displays list of all the ExpenseItems belonging to the category
* The contents of each CategoryItem should be wrapped in a Drop-zone
* When the `onComplete` of a Drop-zone is fired, the expense should be updated so that it appears on the correct category

##### ExpenseForm Component
* Should have an `onComplete` prop that will be invoked with the form state on submit
* Should support create and update functionality

##### ExpenseItem Component
* Should have a button that will delete the expense from the appState `onClick`
* Should display the `name` and `price` of the component
* Should display an ExpenseForm that will enable the user to update the expense in the app state
* The contents of each ExpenseItem should be wrapped in a Draggable
* Expense data should be passed into the Draggables `dataTransferItem` prop

###### Draggable Component
* Enables users to drag its children
* Stores data passed into its `dataTransferItem` prop on the event handler for `onDragStart`
  * data should be stored as json under the MIME 'application/json'

###### Drop-zone Component
* Enables users to drop a Draggable component
* `onDrop`, it should invoke a callback with the data passed using the events `dataTransferObject`
