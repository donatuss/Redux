## 07 Todos Aplikacja - Część 2 - Uzupełnienie reduktora o TOGGLE_TODO 
<sub>[<< Cofnij](https://github.com/donatuss/Redux/blob/master/README.md)</sub><br/>

Część 2 aplikacji Todos - rozszerzamy reduktor o TOGGLE_TODO i obsługa w komponencie TodoApp 


```javascript
// reducers/todos.js

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(x => todo(x, action));
        default:
            return state;
    }
};


const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false,
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

````
Komponent TodoApp
```javascript

class TodoApp extends Component {

    onTodoClick = (id) => {
        const {store} = this.props;
        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'TOGGLE_TODO',
            id
        });
        console.log("AFTER", store.getState());
    };

    render() {
    
        return (
            <div>
                ...
                <Label.Group tag>
                    {this.props.store.getState().map((x) =>
                        <Label
                            onClick={this.onTodoClick.bind(this, x.id)}
                            style={{textDecoration: x.completed ? 'line-through' : 'none', cursor: 'pointer'}}
                            key={v4()}>{x.text}</Label>
                    )}
                </Label.Group>
                ...
            </div>
        )
    }
}

export default TodoApp;
````

 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux/blob/master/06-todoapp-first-draft/README.md)
  | [Następny >>](https://github.com/donatuss/Redux/blob/master/08-todoapp-filtering-todos/README.md)
 </sub>