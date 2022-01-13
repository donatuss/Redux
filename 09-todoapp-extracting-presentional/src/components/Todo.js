import React from 'react';
import {Label} from 'semantic-ui-react';
import {v4} from "uuid";

const Todo = ({onClick, completed, text}) => (
    <Label
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer'}}>
        {text}
    </Label>
);

export default Todo;