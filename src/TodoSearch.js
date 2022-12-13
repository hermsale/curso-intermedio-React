import React from "react";
import './TodoSearch.css'

function TodoSearch (){
    // creamos un array que guarde un estado y una funcion, propio del objeto React.useState
    const [searchValue, setSearchValue] = React.useState('');

    // cada vez que hagamos un cambio en el input, va a llamar a la funcion setSearchValue para actualizar su estado
    const onSearchValueChange = (event) =>{
       console.log(event.target.value);
    //    por medio de la funcion, setteamos un valor nuevo al estado searchValue
       setSearchValue(event.target.value);
    }

    return [
        <input 
            className="TodoSearch"
            placeholder='Cebolla'
            // indicamos que el valor sera igual al del estado
            value={searchValue}
            // cada cambio que haya en el input, se transladará a la funcion
            onChange={onSearchValueChange}
        />,
        <p>{searchValue}</p>
    ]

}

export {TodoSearch};