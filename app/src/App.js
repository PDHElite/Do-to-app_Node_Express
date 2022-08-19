import React, {useState, useEffect} from "react";
import todos from "./apis";
import Form from "./Components/Form";
import Section from "./Components/Section";
import List from "./Components/List";
import axios from "axios";


const appTitle = "Lista de Tareas";


const App = () =>{

   const [todoList, setTodoList] = useState([]);

   useEffect(() => {
      async function fetchData(){
      const {data} = await todos.get("/todos");
      setTodoList(data);
      }

      fetchData();
   }, []);
   
   const addTodo = async (item) => {
      const {data} = await todos.post("/todos", item)
      setTodoList((oldList) => [...oldList, data]) ;
   };

   const removeTodo = async (id) => {
      await todos.delete(`/todos/${id}`);
      setTodoList((oldList) => oldList.filter((item) => item._id !== id ));
      
   };

   const editTodo = async (id, item) => {
       await todos.put(`/todos/${id}`, item);
   };

    return <div className="ui container center aligned">
            <Section> 
                <h1>{appTitle}</h1>
            </Section>

             <Section>
                <Form addTodo={addTodo}/>
             </Section>

             <Section>
                <List 
                editTodoListProp = {editTodo}
                removeTodoListProp={removeTodo} 
                list={todoList}
                
                />
             </Section>
        </div>
};

export default App;