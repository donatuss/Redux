import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

ReactDOM.render(
    <Provider store={configureStore()}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
