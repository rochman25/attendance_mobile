import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {ThemeContext} from '../../theme-context';
import {useAuth} from '../providers/auth';

export default function SplashScreen({navigation, onSignIn}) {
  const {getAuthState} = useAuth();

  useEffect(() => {
    initialize();
  }, []);

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  async function initialize() {
    try {
      const user = await getAuthState();
      // console.debug('user_data', user);

      // return user;
      if (user) {
        //check if username exist
        let username = undefined;
        if (user.data !== null) {
          username = user.username ? user.username : user.data.username;
        }
        // console.debug("user_data",username !== undefined);
        if (username !== undefined) navigation.navigate('Home');
        else navigation.navigate('Login');
      } else navigation.navigate('Login');
    } catch (e) {
      navigation.navigate('Login');
      console.debug('error_splash', e);
    }
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <Layout style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text} category="s1">
              Loading User Data.
            </Text>
          </Layout>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
