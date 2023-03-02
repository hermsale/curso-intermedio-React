import React from "react";

// este hook nos devolvera el item que hayamos guardado en LocalStorage. Ese elemento lo guardaremos dentro de un parametro al que llamaremos itemName 

// este hook nos traera el itemName hacia donde nos direccionaremos en el localStorage ('TODOS_V1') para guardar items Y el valor inicial ("[]")
function useLocalStorage(itemName, initialValue) {

    // hook para controlar si hay un error en la carga
    const [error, setError] = React.useState(false);
    // hook para controlar el estado de carga de la aplicación. 
    const [loading, setLoading] = React.useState(true);
    
     // estado inicial de nuestros Todo's
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
      
  
      setTimeout(() => {
        try{
            // creamos la variable que almacenara los TODO's (si es que los hay) guardados en TODOS_V1 (o la version que nos traiga por parametro en itemName)
              const localStorageItem = localStorage.getItem(itemName);
            // variable que contendra el objeto JavaScript una vez parsiado el archivo JSON
              let parsedItem;
      
            
            // si no hay nada en localStorageItem, que cree un array vacio y listo para rellenar
            // Esta posibilidad se puede dar si es un usuario que recien inicia la aplicación y no tiene nada cargado
            if(!localStorageItem){
              // esta variable es la que manejara el estado inicial de nuestros Todo's. como no hay nada cargado asignamos un array vacio
              localStorage.setItem(itemName, JSON.stringify(initialValue));
              parsedItem = initialValue;
            }else{
              // en el caso que si haya objetos en localStorageItem, se lo pasamos a la variable encargada del manejo de estados de Todo's
              parsedItem = JSON.parse(localStorageItem);
            }
      
            setItem(parsedItem);
            // ya termino de cargar y pasamos el estado a false
            setLoading(false);
            // setError(false);
          
          }catch(error){
          setError(error);
        }
      },5000);
    });
   
  
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // funcion para guardar cambios de los Todos en el LocalStorage
      const saveItem = (newItem)=>{
        try{
          const stringifiedItem = JSON.stringify(newItem);
          localStorage.setItem(itemName,stringifiedItem);
          
          setItem(newItem); 
        }
        catch{
          setError(true);
        }
      }
  
      // por medio del return le enviamos al App lo necesario, para que funcione la aplicacion 
      // le devolvemos un objeto, ya que por convención cuando se devuelve mas de 2 valores, hay que pasarlo de esta forma 
      return {
        item,
        saveItem,
        loading, // estado de carga
        error // estado de error
  
      }
      
  }

  export {useLocalStorage};