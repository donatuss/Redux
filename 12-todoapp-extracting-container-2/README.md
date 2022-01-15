## 12 Todos Aplikacja - Część 7 -  Wyodrębnienie komponentów kontenerów - cz. 2 
<sub>[<< Cofnij](https://github.com/donatuss/Redux/blob/master/README.md)</sub><br/>

Część 7 aplikacji Todos - Wyodrębnienie komponentów kontenerowych (AddTodo, VisibleTodoList). 

Komponet kontenerowy  AddTodo
```javascript
// Do AddTodo przechodzi obsluga onAddTodoButtonClick z TodoApp:
class AddTodo extends Component {

    onClick = () => {
        const {store} = this.props;
        const v4 = require('uuid/v4');

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: this.input.value
        });
        console.log("AFTER", store.getState());
        this.input.value = 'E.' + Math.ceil(1000 * Math.random());
    };

    render() {
        ...
    }
}
````
Komponet kontenerowy VisibleTodoList
```javascript
//Obsluga getVisibleTodos onTodoClick z TodoApp
class VisibleTodoList extends Component {

    getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(
                    t => t.completed
                );
            case 'SHOW_ACTIVE':
                return todos.filter(
                    t => !t.completed
                );
            default:
                return todos;
        }
    };

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
        const {store} = this.props;

        const {todos, visibilityFilter} = store.getState();
        const visibleTodos = this.getVisibleTodos(
            todos,
            visibilityFilter,
        );

        return <TodoList
            todos={visibleTodos}
            onTodoClick={this.onTodoClick}>
        </TodoList>
    };
}
````

Komponet TodoApp po zmianach
```javascript
class TodoApp extends Component {

    constructor() {
        super();
        this.state = {
            txt1: 'E.' + Math.ceil(1000 * Math.random())
        };
    }

    componentDidMount() {
        const {store} = this.props;
        //callback after action
        this.unsubscribe = store.subscribe(() => {
            //force render
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <FilterHeader {...this.props}/>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <AddTodo {...this.props}/>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <VisibleTodoList {...this.props}/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
````

 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux/blob/master/11-todoapp-extracting-container/README.md)
  | [Następny >>](https://github.com/donatuss/Redux/blob/master/13-todoapp-pass-store-by-context/README.md)
 </sub>
