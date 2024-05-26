/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigation from './src/Navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
}

export default App;
