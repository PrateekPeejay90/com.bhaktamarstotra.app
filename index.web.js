import 'react-native-gesture-handler';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from './App';
import { APP_REGISTRY_NAME } from './src/constants/appInfo';

AppRegistry.registerComponent(APP_REGISTRY_NAME, () => App);

const { element } = AppRegistry.getApplication(APP_REGISTRY_NAME, {});
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

createRoot(rootElement).render(<React.StrictMode>{element}</React.StrictMode>);
