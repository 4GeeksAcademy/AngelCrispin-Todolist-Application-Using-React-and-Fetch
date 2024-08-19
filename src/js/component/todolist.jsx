import React,{useState,useEffect} from 'react';

let cont=0;

export default function ToDoList () {
    const [inputValue, setInputValue ] = useState('');
    const [allTodos, setAllTodos ] = useState([]);
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(inputValue.trim() !== "") {
            //let todo = [...allTodos];
            //todo.push({id:cont,label:inputValue});
            let todo = {label:inputValue,is_done:false};
            createTodo(todo)
          }
        }
      }
      

    // const deleteToDo = (index) => {
    //   let todoAux = [];
    //   allTodos.map((item)=>{ 
    //     if(item.id!=index){
    //       todoAux.push(item);
    //     }
    //   })  
    //   setAllTodos(todoAux);
    // }


    
  useEffect(() => {
    getTodos();
  }, []);


  
  const getTodos = () => {

    fetch('https://playground.4geeks.com/todo/users/AngelCrispin', {
        method: "GET",
        //body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // Será true si la respuesta es exitosa
          console.log(resp.status); // El código de estado 200, 300, 400, etc.
          //console.log(resp.text()); // Intentará devolver el resultado exacto como string
          return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then(data => {
          // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
          setAllTodos(data.todos)
      })
      .catch(error => {
          // Manejo de errores
          console.log(error);
      });

  };


  const createTodo = (todo) => {

    fetch('https://playground.4geeks.com/todo/todos/AngelCrispin', {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // Será true si la respuesta es exitosa
          console.log(resp.status); // El código de estado 200, 300, 400, etc.
          //console.log(resp.text()); // Intentará devolver el resultado exacto como string
          return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then(data => {
          // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
          getTodos();
      })
      .catch(error => {
          // Manejo de errores
          console.log(error);
      });

  };



  const deleteTodo = (id) => {
    console.log(id)
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // Será true si la respuesta es exitosa
          console.log(resp.status); // El código de estado 200, 300, 400, etc.
          //console.log(resp.text()); // Intentará devolver el resultado exacto como string
          //return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then(data => {
          // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          //console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
          getTodos();
      })
      .catch(error => {
          // Manejo de errores
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