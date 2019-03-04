import React from 'react'
import Main from './app/Main'

import ToDoProvider from './app/services/ToDoProvider'

export default class App extends React.Component {
  render() {
    return (
      <ToDoProvider>
          <Main title='NMD To Do'/>
      </ToDoProvider>
    )
  }
}


