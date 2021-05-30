import React,{useState} from 'react';

import {
  ApplicationProvider,
  StyleService,
  useStyleSheet,
  Button,
  Avatar,
  Divider,
  Layout,
  Text,
} from '@ui-kitten/components';

import {View, ScrollView} from 'react-native';
import {ThemeContext} from '../../theme-context';
import * as eva from '@eva-design/eva';
import {ProfileSetting} from './extra/profile-setting.component';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {useAuth} from '../providers/auth';

export default ({navigation}) => {
  const [theme, setTheme] = React.useState('light');
  const [loading, setLoading] = useState(false);

  const {state, handleLogout} = useAuth();
  const user = state;

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const signOut = async () => {
    setLoading(true)
    try {
      await handleLogout();
      console.debug("user_null",user)
      if (user === null) {
        setLoading(false)
        navigation.navigate('Login');
      }
      navigation.navigate('Login');
    } catch (err) {
      console.debug('lo_err', err);
    }
  }

  const styles = useStyleSheet(themedStyles);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Layout style={styles.photoSection} level="1">
            <ProfileAvatar
              style={styles.photo}
              // source={profile.photo}
              // editButton={renderPhotoButton}
            />
            <View style={styles.nameSection}>
              <ProfileSetting
                style={styles.setting}
                // value=
                // {`${user.user.user_detail.first_name}`}
              />
              <ProfileSetting
                style={styles.setting}
                // value=
                // {`${user.user.user_detail.last_name}`}
              />
              <ProfileSetting
                style={styles.setting}
                value=
                {`${user.user.email}`}
              />
              <Button
                style={{margin: 10}}
                onPress={() => {
                  signOut()
                }}>
                Sign Out
              </Button>
            </View>
          </Layout>
          <Text style={styles.description} appearance="hint">
            profile.description
          </Text>
          <Divider></Divider>
          {/* <ProfileSetting
            style={[styles.setting, styles.emailSetting]}
            hint="Sign Out"
            onPress={() => {
              handleLogout();
              navigate('Login');
            }}
            value=">">
            <Text>Sign Out</Text>
          </ProfileSetting> */}
          <Divider></Divider>
          <ProfileSetting
            style={[styles.setting, styles.emailSetting]}
            hint="Tentang Aplikasi"
            value=">"
          />
          <ProfileSetting style={[styles.setting]} hint="FAQ" value=">" />
          <Text style={styles.versi} appearance="default">
            Beta V.1.0.0
          </Text>
        </ScrollView>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    // backgroundColor: '',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  photo: {
    aspectRatio: 1.0,
    height: 76,
  },
  photoButton: {
    aspectRatio: 1.0,
    height: 32,
    borderRadius: 16,
  },
  nameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  description: {
    padding: 24,
    // backgroundColor: '',
  },
  versi: {
    marginTop: 20,
    textAlign: 'center',
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  setting: {
    padding: 16,
  },
  emailSetting: {
    marginTop: 24,
  },
});

// export default UserScreen;
