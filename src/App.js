import './App.css';
import './Todo/Loader.css';
import React, {useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Todo/Loader"
import Modal from "./Modal/Modal";

const AddTodosForm = React.lazy(()=> import('./Todo/AddTodosForm'));

function App() {

  const [todos, setTodos] = React.useState([]);
  const [load,setLoad] = React.useState(true);

  useEffect(()=>{
    setLoad(!load);
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=13')
        .then(response => response.json())
        .then(todos =>{setTodos(todos);
        setLoad(!load)})
  },[])

  function toggleTodo(id){
    setTodos(todos.map(todo =>{
      if(todo.id===id){
        todo.completed = !todo.completed;
      }
      return todo;
    }));
  }
  function deleteTodo(id){
    setTodos(todos.filter(todo=>todo.id !== id))
  }
  function onCreate(value){
    setTodos(todos.concat([{id:todos.length+1,completed: false,title: value}]));
  }

  return (
    <Context.Provider value={{deleteTodo}}>
      <div className="App">
        <h1>Todo Application</h1>
        <Modal/>
        <React.Suspense fallback={<Loader/>}>
          <AddTodosForm add={onCreate}/>
        </React.Suspense>
        {

          (todos.length && !load) ? (<TodoList todos={todos} onToggle={toggleTodo}></TodoList>) :
              todos.length == 0 ? <p>Записей нет!</p> : <Loader/>
        }

      </div>
    </Context.Provider>
  );
}

export default App;
