/*
Provide a ToDoService instance once at to top-level
of our component hierarchy

createContext() function creates two components:
- ToDoContext.Provider (creates a ToDoService instance at the top-level)
- ToDoContext.Consumer (retrieve the ToDoService instance)
*/

import React from 'react'

const ToDoContext = React.createContext(null)

export const withToDoService = Component => props => (
  <ToDoContext.Consumer>
    {todoService => <Component {...props} todoService={todoService} />}
  </ToDoContext.Consumer>
);

export default ToDoContext