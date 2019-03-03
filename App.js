import React from 'react'
import Main from './app/Main'

import ToDoService, { ToDoContext } from './app/services'

export default class App extends React.Component {
  render() {
    return (
      <ToDoContext.Provider value={ new ToDoService() }>
        <ToDoContext.Consumer>
          { todoService => <Main title='NMD To Do' todoService={ todoService } /> }
        </ToDoContext.Consumer>
      </ToDoContext.Provider>
    )
  }
}


