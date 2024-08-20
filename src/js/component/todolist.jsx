import React,{useState,useEffect} from 'react';

let nameUser = "AngelCrispin";

export default function ToDoList () {
    const [inputValue, setInputValue ] = useState('');
    const [allTodos, setAllTodos ] = useState([]);
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(inputValue.trim() !== "") {
            let todo = {label:inputValue,is_done:false};
            createTodo(todo)
          }
        }
    }
      
  useEffect(() => {
    getTodos();
  }, []);


  const createUser = () => {
    fetch(`https://playground.4geeks.com/todo/users/${nameUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        if(resp.status==201){
          getTodos();
        }
    })
    .catch(error => {
        console.log(error);
    });

  }
  
  const getTodos = () => {

    fetch(`https://playground.4geeks.com/todo/users/${nameUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          if(resp.status==200){
            return resp.json();
          } else {
            createUser();
          }
      })
      .then(data => {
          setAllTodos(data.todos)
      })
      .catch(error => {
          console.log(error);
      });

  };


  const createTodo = (todo) => {

    fetch(`https://playground.4geeks.com/todo/todos/${nameUser}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
        getTodos();
      })
      .catch(error => {
          console.log(error);
      });

  };



  const deleteTodo = (id) => {

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
        getTodos();
      })
      .catch(error => {
          console.log(error);
      });

  };

    return (
        
			  <div className="content mx-auto">
          <input type="text" className="form-control input" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleKeyDown}/>
          <div>
              {allTodos.map((x) => (
                    <div key={x.id} className="justify-content-between d-flex todoComplete">
                      <div className='todo'>{x.label}</div>
                      <i key={x.id} className=" fa-solid fa-xmark delete" onClick={()=>deleteTodo(x.id)}></i>
                    </div>
              ))}

              {allTodos.length>0?<div className='description text-start'>{allTodos.length+" item left"}</div>:<div className='description text-center'>No tasks, add tasks</div>} 
          
                  
          </div>
        </div>)
}