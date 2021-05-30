import React, { useState } from 'react';
import {View} from 'react-native';
import {
  ApplicationProvider,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {KeyboardAvoidingView} from './extra/3rd-party';

import * as api from '../services/auth';
import {useAuth} from '../providers/auth';

import Form from 'react-native-basic-form';
import {ErrorText} from '../components/Shared';

export default function LoginScreen({navigation}) {

  const styles = useStyleSheet(themedStyles);
  const [theme] = React.useState('light');

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {handleLogin} = useAuth();

  const fields = [
    {name: 'username', label: 'Username', required: true},
    {name: 'password', label: 'Password', required: true, secure: true},
  ];

  async function onSubmit(state) {
    // console.log(state)
    setLoading(true);
    let response = '';
    try {
      response = await api.login(state);
      // console.log("login_",response);
      if (response.total_data != 0) {
        await handleLogin(response);
      }else if(response.total_data == 0){
        setError(response.message)
      }
      setLoading(false);

      //check if username is null
      let data = response.total_data !== 0;
      if (data) navigation.navigate('Home');
      else navigation.navigate('Login');
    } catch (error) {
      setError(error.message);
      console.debug('error', response);
      // setError(this.response.message);
      setLoading(false);
    }
  }

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  let formProps = {title: 'Login', fields, onSubmit, loading};
  return (
    <>
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text category="h1" status="control">
              Login
            </Text>
            <Text style={styles.signInLabel} category="s1" status="control">
              Sign in to your account
            </Text>
          </View>
          <Layout style={styles.formContainer} level="1">
            <ErrorText error={error} />
            <Form {...formProps}></Form>
          </Layout>
        </KeyboardAvoidingView>
      </ApplicationProvider>
    </>
  );
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: '#4A4A4A',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
