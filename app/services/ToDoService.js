import {
	AsyncStorage
} from 'react-native'

const prefix = 'nmd-'

class ToDoService {
  constructor() {
    
  }
  getItems = async() => {
    return await AsyncStorage.getItem(`${prefix}todos`)
  }
}

export default ToDoService
