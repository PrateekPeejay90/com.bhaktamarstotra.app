import React from 'react';
import { registerRootComponent } from 'expo';
import AppComponent from './src/app';

export default function App() {
  return <AppComponent />;
}

registerRootComponent(App);
