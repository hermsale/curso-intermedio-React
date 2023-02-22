import React from "react";
import { useLocalStorage } from "./useLocalStorage";



const TodoContext = React.createContext();


function TodoProvider(props){

     // react Hooks personalizado //////////////////////////////////////////////////////////////////////////////

  // traeremos las variables que conectan con el return del LocalStorage, de nuestro custom hook - le pasamos por parametro la key del LocalStorage
  const {
    item:todos
   ,saveItem:saveTodos
   ,loading
   ,error
 } = useLocalStorage('TODOS_V1',[]);

 console.log(todos.length);
   // se guarda el estado y una funcion para actualizarlo, esto es propio del objeto React.useState
   const [searchValue, setSearchValue] = React.useState('');  

   //////////////////////////////////////////////////////////////////////////////////
   // guardara la cantidad de todo's completos - si todo.completed es true
   const completedTodos = todos.filter( todo => !!todo.completed).length;
   const totalTodos = todos.length;

  //  console.log(completedTodos);
 // creamos un array vacio que almacenara las coincidencias de la busqueda
   let searchedTodos = [];

   // si no hay nada escrito en searchValue, mostramos todos los todos
   if(!searchValue.length >=1) {
     searchedTodos = todos;
   }else{
     // guardamos en searchTodos el filtro donde la condicion de aparicion es que este incluido algo de todoText en searchText
     searchedTodos = todos.filter(todo =>{
       // pasamos a minuscula el texto del array
       const todoText = todo.text.toLowerCase();
       // pasamos a minuscula la busqueda
       const searchText = searchValue.toLowerCase();
       // si algo de todoText esta en searchText, lo retornamos
       return todoText.includes(searchText);
      })
   }

 

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   // completetar Todo's - esta funcion nos permite marcar como completo o sin completar un TODO 

   // recibimos el index para compararlo y ver cual cumple la condicion, para pasarlo a completo/incompleto
   const toggleCompleteTodo = (index) => {
     // guardamos el indice de la coincidencia, entre el index que nos llega y el del array
     const todoIndex = todos.findIndex(todo => todo.index === index);
     console.log(todoIndex);
     // clonamos en un nuevo array los todos
     const newItem = [...todos];
     // le cambiamos la propiedad complete 
     newItem[todoIndex].completed = !newItem[todoIndex].completed;

     // cambiabamos el estado de todos 
     // setItem(newItem); 

     // llamamos a la funcion encargada de actualizar el estado de los TODO's y guardarlo en el LocalStorage
     saveTodos(newItem);
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   // eliminar Todo's - esta función elimina de manera permanente un TODO, ya sea tildado como completo o no

   // recibimos el index para compararlo y ver cual cumple la condicion, para pasarlo a completo/incompleto
   const deleteTodo = (index) => {
     // guardamos el indice de la coincidencia, entre el index que nos llega y el del array
     const todoIndex = todos.findIndex(todo => todo.index === index);
     console.log(todoIndex);
     // // clonamos en un nuevo array los todos
     const newItem = [...todos];
     // eliminamos el elemento 
     newItem.splice(todoIndex,1);

     // cambiabamos el estado de todos 
     // setItem(newItem); 
     
     // llamamos a la funcion encargada de actualizar el estado de los TODO's y guardarlo en el LocalStorage
     saveTodos(newItem);
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////



   // pruebas de render useEffect 
   // console.log('Render antes del use effect');

   
   // React.useEffect(() => {
   //   console.log('use effect sin condicional');
   // });
   
   
   // React.useEffect(() => {
   //   console.log('use effect doble condicion');
   // },[totalTodos,completedTodos]);

   // console.log('Render despues del use effect');

    return(
        // Este lo vamos a utilizar para envolver toda nuestra aplicación en nuestra aplicación App.js
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            toggleCompleteTodo,
            deleteTodo
        }}>
          {/* envolvemos en nuestro proveedor todos los elementos de la App */}
            {props.children}
        </TodoContext.Provider>
    );
}


export {TodoContext, TodoProvider};