import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import blocksReducer from './reducers/blocksReducer';
import GamePageContainer from './containers/gamePageContainer';
import SelectLevelOfDifficultyContainer from './containers/selectLevelOfDifficultyContainer';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    blocks: blocksReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={SelectLevelOfDifficultyContainer}/>
        <Route path="/play" component={GamePageContainer}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('.container')
);
