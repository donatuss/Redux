## 18 Todos Aplikacja - Część 13 - Wyodrębnienie akcji
<sub>[<< Cofnij](https://github.com/donatuss/Redux/blob/master/README.md)</sub><br/>

Wyodrębnienie akcji do katalogu actions z plikami todo.js i visibilityFilter.js        

```javascript
//todo.js
const v4 = require('uuid/v4');

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    };
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

//visibilityFilter.js
export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};
```

```javascript
//użycie - było FilterLink.js
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    };
};

//jest FilterLink.js
import {setVisibilityFilter} from "../actions/visibilityFilter";
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    };
};

//analogiczne zmiany w containars/AddTodo VisibleTodoList
```

 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux/blob/master/17-todoapps-react-redux-connect-3/README.md)
   | [Następny >>](https://github.com/donatuss/Redux/blob/master/19-todoapps-simplifying-arrow-functions/README.md)
 </sub>