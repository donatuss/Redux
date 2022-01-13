import React, {Component} from 'react';
import FilterLink from './FilterLink';
import {Container, Grid, Divider, Label, Button, Input} from 'semantic-ui-react';
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

        // callback after action
        store.subscribe(() => {
            this.setState({txt1: this.rTxt1['inputRef'].current.value});
            this.rTxt1['inputRef'].current.value = "";
        });

    }


    handleClick = (e) => {
        const {store} = this.props;
        let _text = e;

        if (this.rTxt1['inputRef'].current.value.trim() !== "") {
            _text = this.rTxt1['inputRef'].current.value;
        }

        console.log("BEFORE", store.getState());
        store.dispatch({
            id: v4(),
            type: 'ADD_TODO',
            text: _text
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
        let random = 'E.' + Math.ceil(1000 * Math.random());
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
                            <FilterLink {...this.props} filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <FilterLink {...this.props} filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <FilterLink {...this.props} filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Competed</FilterLink>
                        </Grid.Column>
                    </Grid>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Input ref={node => this.rTxt1 = node} input={<input/>} type='text'/>
                            <span style={{width: '5px', display: 'inline-block'}}/>
                            <Button name="btnAddTodo" onClick={this.handleClick.bind(null, random)}>
                                AddTodo - {random}
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Grid centered columns={2}>
                        <Grid.Column>
                            <Label.Group tag>
                                {visibleTodos.map((x) =>
                                    <Label
                                        onClick={this.onTodoClick.bind(this, x.id)}
                                        style={{textDecoration: x.completed ? 'line-through' : 'none', cursor: 'pointer'}}
                                        key={v4()}>{x.text}</Label>
                                )}
                            </Label.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default TodoApp;