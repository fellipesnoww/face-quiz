// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './app.routes';

function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}

export default Routes;