import React, {useEffect} from 'react';

import {
  ApplicationProvider,
  StyleService,
  useStyleSheet,
  Button,
  Avatar,
  Layout,
  Text,
} from '@ui-kitten/components';
import {View} from 'react-native';
import {ThemeContext} from '../../theme-context';
import * as eva from '@eva-design/eva';
import {MessageCircleIcon, PersonAddIcon, PersonIconMini} from './extra/icons';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../providers/auth';

export default ({navigation}) => {
  const [theme, setTheme] = React.useState('light');

  useEffect(() => {
    initialize()
  }, [])

  const {state,getAuthState} = useAuth();
  const user = state;

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const styles = useStyleSheet(themedStyles);

  const openScanner = () => {
    navigation.navigate('Scanner');
  };

  async function initialize() {
    try {
      const user = await getAuthState();
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
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ScrollView style={styles.container}>
          <Layout style={styles.header} level="1">
            <View style={styles.profileContainer}>
              <View style={styles.profileDetailsContainer}>
                <Text>
                  {`${user.user.username}`}
                </Text>
                <Text category="h4">
                  {`${user.user.name}`}
                  </Text>
                <View style={styles.profileLocationContainer}>
                  <PersonIconMini />
                  <Text
                    style={styles.profileLocation}
                    appearance="hint"
                    category="s1">
                    {`${user.user.username}`}
                  </Text>
                </View>
              </View>
              <Avatar
                style={styles.profileAvatar}
                size="large"
                // source={profile.photo}
              />
            </View>
            <View style={styles.profileButtonsContainer}>
              <Button
                style={styles.profileButton}
                icon={PersonAddIcon}
                onPress={openScanner}>
                Check In
              </Button>
              <Button
                appearance="outline"
                style={styles.profileButton}
                icon={MessageCircleIcon}
                onPress={openScanner}>
                Check Out
              </Button>
            </View>
          </Layout>
          {/* <Text style={styles.sectionLabel} category="s1">
            Log Absensi
          </Text>
          <View style={{alignItems: 'center', flex: 1}}>
            <Text style={styles.comingSoon} category="h1" appearance="default">
              coming soon {'\n'}
              <Text category="s1" style={styles.comingSoon} appearance="hint">
                Fitur Log absensi sedang dikembangkan, mohon bersabar :)
              </Text>
            </Text>
          </View> */}
        </ScrollView>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

// export default HomeScreen;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  header: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
    margin: 10,
  },
  profileLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLocation: {
    marginHorizontal: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  profileSocialsDivider: {
    marginHorizontal: -16,
  },
  profileSocialsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
    marginBottom: 8,
  },
  postsList: {
    paddingHorizontal: 8,
  },
  postItem: {
    width: 144,
    height: 144,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  comingSoon: {
    textAlign: 'center',
    marginTop: 100,
    marginHorizontal: 16,
    marginBottom: 100,
  },
});
