import React from 'react';
import './App.scss';
import { Provider } from './AppState';
import AppRoutes from './AppRoutes';
import RootStore from './logic/RootStore';

const store = new RootStore();

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
