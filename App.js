import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/routes/Navigation';
import AuthProvider from './app/providers/auth';
import RNBootSplash from 'react-native-bootsplash';

function App () {
  useEffect(() => {
    const init = async () => {};
    init().finally(async () => {
      await RNBootSplash.hide({fade:true});
    })
  },[]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation></Navigation>
      </NavigationContainer>
    </AuthProvider>
  );

}

export default App;