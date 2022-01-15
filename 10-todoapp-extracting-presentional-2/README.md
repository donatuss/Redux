## 10 Todos Aplikacja - Część 5 -  Wyodrębnienie komponentów odpowiedzialnych za prezentację cz. 2
<sub>[<< Cofnij](https://github.com/donatuss/Redux/blob/master/README.md)</sub><br/>

Część 5 aplikacji Todos - komponenty prezentacyjne - AddTodo, FilterHeader, FilterLink, Todo, TodoList, AddTodo. Logika zarządza TodoApp 

Przekształcenie FilterLink i dodanie FilterHeader
```javascript
class FilterLink extends Component {
    render() {
        const {filter, currentFilter, onClick} = this.props;

        if (filter === currentFilter) {
            return <Button active size="small"><Icon name='checkmark'/>{this.props.children}<Icon/></Button>
        }
        
        return (
            <a href='#?' onClick={e => {
                e.preventDefault();
                onClick(filter)
            }}>
                <Button size="small"><Icon/>{this.props.children}<Icon/></Button>
            </a>
        )
    };
}

class FilterHeader extends Component {
    render() {
        const {visibilityFilter, onFilterClick} = this.props;

        return (
            <div>
                <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Competed</FilterLink>
            </div>
        );
    }
}


````
Komponent AddTodo
```javascript
class AddTodo extends Component {
    render() {
        const {onAddClick} = this.props;
        let input;
        let random = 'E.' + Math.ceil(1000 * Math.random());

        return (
            <div>
                <div className="ui input">
                    <input
                        ref={node => {
                            input = node
                        }}
                        type='text'
                        defaultValue={'E.' + Math.ceil(1000 * Math.random())}/>
                </div>
                <span style={{width: '5px', display: 'inline-block'}}/>
                <Button name="btnAddTodo" onClick={() => {
                    onAddClick(input.value);
                    input.value = random;
                }}>
                    AddTodo
                </Button>
            </div>
        );
    }
}
````

Komponent TodoApp: handleClick => onAddTodoButtonClick, dodanie onFilterClick
 ```javascript
class TodoApp extends Component {
    
    ...
    onAddTodoButtonClick = (e) => {
        const {store} = this.props;
        const v4 = require('uuid/v4');

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: e
        });
        console.log("AFTER", store.getState());
    };

    onFilterClick = (filter) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
        console.log("AFTER", store.getState());
    };
    
    ...

    render() {
        const {todos, visibilityFilter} = this.props.store.getState();
        const visibleTodos = this.getVisibleTodos(
            todos,
            visibilityFilter,
        );

        return (
            <div>
                <Container fluid>
                    <Divider/>
                    <Divider/>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <FilterHeader visibilityFilter={visibilityFilter} onFilterClick={this.onFilterClick}/>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <AddTodo onAddClick={this.onAddTodoButtonClick}/>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Grid.Column>
                                <TodoList todos={visibleTodos} onTodoClick={this.onTodoClick}/>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;
 ````

 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux/blob/master/09-todoapp-extracting-presentional/README.md)
  | [Następny >>](https://github.com/donatuss/Redux/blob/master/11-todoapp-extracting-container/README.md)
 </sub>