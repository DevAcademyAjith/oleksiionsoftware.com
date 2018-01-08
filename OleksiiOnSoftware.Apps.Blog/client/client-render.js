/* @flow */

// Polyfills
import 'url-search-params-polyfill'

// Infrastructure
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

// App
import { App, DevTools } from 'containers'
import configureStore from 'store'
import routes from 'routes'

// Use browser history
const history = createHistory()

// Load the default store state from server-side
const store = configureStore(history, window.initialStoreData)
window.dev = { store }

// Render the app
render(
  <Provider store={store}>
    <ConnectedRouter store={store} history={history}>
      <App routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// Render the dev tools
// TODO: Remove for production builds
render(
  <DevTools store={store} />,
  document.getElementById('tools')
)