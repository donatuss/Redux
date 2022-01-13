import React from 'react';
import {Label} from 'semantic-ui-react';

const Todo = ({onClick, completed, text}) => (
    <Label
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer'}}>
        {text}
    </Label>
);

export default Todo;