import React from 'react';
import ReactDOM from 'react-dom';

import Provider from './store/Provider';
import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

ReactDOM.render(
    <Provider store={configureStore()}>
        <TodoApp/>
    </Provider>,
document.getElementById('root')
)
;
