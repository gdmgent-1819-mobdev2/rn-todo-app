/*
Provide a ToDoService instance once at to top-level
of our component hierarchy

createContext() function creates two components:
- ToDoContext.Provider (creates a ToDoService instance at the top-level)
- ToDoContext.Consumer (retrieve the ToDoService instance)
*/

import React from 'react'
import { AsyncStorage } from 'react-native'

import uuid from 'uuid/v1'

const DEFAULT_STATE = { allItems: {}, loadingItems: false }
const ToDoContext = React.createContext(DEFAULT_STATE)

class ToDoProvider extends React.Component {
  state = DEFAULT_STATE

  constructor(props) {
    super(props)
  }

  loadingItems = async () => {
      try {
          const allItems = await AsyncStorage.getItem('Todos')
          this.setState({
              loadingItems: true,
              allItems: JSON.parse(allItems) || {}
          })
      } catch (err) {
          console.log(err)
      }
  }

  onDoneAddItem = inputValue => {
      if (inputValue !== '') {
          this.setState(prevState => {
              const id = uuid()
              const newItemObject = {
                  [id]: {
                      id,
                      isCompleted: false,
                      text: inputValue,
                      createdAt: Date.now()
                  }
              }
              const newState = {
                  ...prevState,
                  allItems: {
                      ...prevState.allItems,
                      ...newItemObject
                  }
              }
              this.saveItems(newState.allItems)
              return { ...newState }
          })
      }
  }

  deleteItem = id => {
      this.setState(prevState => {
          const allItems = prevState.allItems
          delete allItems[id]
          const newState = {
              ...prevState,
              allItems: allItems,
          }
          this.saveItems(newState.allItems)
          return { ...newState }
      })
  }

  deleteAllItems = async () => {
      try {
          await AsyncStorage.removeItem('Todos')
          this.setState(prevState => {
              const allItems = {}
              const newState = {
                  ...prevState,
                  allItems: allItems
              }
              return { ...newState }
          })
      } catch (err) {
          console.log(err)
      }
  }

  completeItem = (id, completed) => {
      this.setState(prevState => {
          const newState = {
              ...prevState,
              allItems: {
                  ...prevState.allItems,
                  [id]: {
                      ...prevState.allItems[id],
                      isCompleted: completed
                  }
              }
          }
          this.saveItems(newState.allItems)
          return { ...newState }
      })
  }

  saveItems = items => {
      const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(items))
  }

  render() {
      return (
          <ToDoContext.Provider value={{
            ...this.state,
            loadingItems: this.loadingItems,
            onDoneAddItem: this.onDoneAddItem,
            deleteItem: this.deleteItem,
            deleteAllItems: this.deleteAllItems,
            completeItem: this.completeItem,
          }}> 
            {this.props.children} 
          </ToDoContext.Provider>
      )
  }
}

const withToDo = Component => props => (
  <ToDoContext.Consumer>
    { context => <Component {...props} {...context} />}
  </ToDoContext.Consumer>
)


export {
  ToDoContext,
  withToDo
}

export default ToDoProvider