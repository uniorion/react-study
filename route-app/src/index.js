import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, About, Articles }  from './components/App';

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>
      ,
      document.getElementById('root')
    );
  });
}

ReactDOM.render(<Router history={browserHistory}>
                  <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="home" component={Home} />
                    <Route path="about" component={About} />
                    <Route path="articles" component={Articles} />
                  </Route>
                </Router>, document.getElementById('root'));