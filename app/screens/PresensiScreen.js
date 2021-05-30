import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';

export default class PresensiScreen extends Component {
  onSuccess = async (e) => {
    try {

      await this.props.navigation.navigate('Presensi', {
        data: e.data,
        // scanner: this.scanner,
      });
    } catch (err) {
      console.debug('err', err);
      // await this.props.navigation.navigate('Home')
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          cameraStyle={{
            height: Dimensions.get('window').height,
          }}></QRCodeScanner> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1
  },
});
