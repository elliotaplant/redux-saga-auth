// `src/index.js`
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Route, Router } from 'react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Import all of our components
import App from './App'
import './index.css'
import Login from './login'
import Signup from './signup'
import Widgets from './widgets'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

// Redux DevTools - completely optional, but this is necessary for it to
// work properly with redux saga.  Otherwise you'd just do:
//
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/widgets" component={Widgets} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
