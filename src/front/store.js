import { JWT_STORAGE_KEY } from "./api/auth";

export const initialStore=()=>{
  return{
    userOnline: localStorage.getItem(JWT_STORAGE_KEY) || false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case 'userOnline':
        return {
          ...store,
          userOnline: true
        }
      case 'userOffline':
        return {
          ...store,
          userOnline: false
        }
    default:
      throw Error('Unknown action.');
  }    
}
