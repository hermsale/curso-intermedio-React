import React from 'react';
import './CreateTodoButton.css' ;

function CreateTodoButton() {
return (
    <button className='CreateTodoButton'  onClick={console.log('click')}>+</button>
)
};

export {CreateTodoButton};