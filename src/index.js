import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('creating component');
        this.state = {'content': props.state.app.propertyOne};
    }

    componentWillReceiveProps(props) {
        this.setState({'content': props.state.app.propertyOne});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        console.log('rendering');
        return (
            <div>{this.state.content}</div>
        )
    }
}

const Wrapper = ({...props}) => {
    console.log('creating hoc');
    return (
        <App {...props} />
    )
};


const app = (state = {propertyOne: 'foo'}, action) => {
    switch (action.type) {
        case 'DUPA' :
            return Object.assign({}, {
                propertyOne: action.type
            });
    }
    return state;
};
const reducer = combineReducers({
    app
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

const mapStateToProps = state => {
    return {
        state
    }
};


export const ConnectedApp = connect(
    mapStateToProps
)(Wrapper);

render((
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
), document.getElementById('app'));

setTimeout(() => {
    store.dispatch({type: 'DUPA'});
}, 1000);
