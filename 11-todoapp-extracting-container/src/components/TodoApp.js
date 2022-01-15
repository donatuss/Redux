import React, {Component} from 'react';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import FilterHeader from "./FilterHeader";
import {Container, Grid, Divider} from 'semantic-ui-react';
import {v4} from 'uuid';

class TodoApp extends Component {

    constructor(props) {
        super(props);
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

    onAddTodoButtonClick = (e) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'ADD_TODO',
            id: v4(),
            text: e
        });
        console.log("AFTER", store.getState());
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

    onFilterClick = (filter) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
        console.log("AFTER", store.getState());
    };

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
                            <FilterHeader {...this.props}/>
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
                            <TodoList todos={visibleTodos} onTodoClick={this.onTodoClick}/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;