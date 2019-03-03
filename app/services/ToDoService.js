import {
	AsyncStorage
} from 'react-native'

const prefix = 'nmd-'

class ToDoService {
  items = null

  constructor() {
    
  }

  getItems = async() => {
    return await AsyncStorage.getItem(`${prefix}todos`)
  }

  addItem = () => {
    
  }

  updateItem = () => {
    
  }

  deleteItem = () => {
    
  }

  softDeleteItem = () => {
    
  }

  softUnDeleteItem = () => {
    
  }
  
}

export default ToDoService