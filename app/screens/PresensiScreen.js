import React, { Component, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ApplicationProvider, Button, Layout } from '@ui-kitten/components';
import { Card } from 'react-native-paper';
import * as api from '../services/attendance';
import * as eva from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';

export default class PresensiScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AttendaceList: [
      ],
      loading: false,
      response: null,
      theme: 'light'
    }
    // navigation = null;
  }

  async componentDidMount() {
    // navigation = useNavigation();
    try {
      let res = await api.getListAttendances();
      console.debug('post att', res.data);
      if (res.data == undefined) {
        this.setState({
          loading: true,
          response: res.message
        })
      } else {
        this.setState({
          AttendaceList: res.data
        })
        console.debug(res)
      }
    } catch (err) {
      console.debug(err);
      this.setState({ response: "Error, mohon maaf ada kesalahan teknis." });
    }
  }

  getAttendanceData() {
    // alert("cok anjeng");
  }

  render() {
    const { navigation } = this.props;
    return (
      <ApplicationProvider {...eva} theme={eva[this.state.theme]}>
        <Layout style={styles.container_unauthorized}>
          {this.state.loading ? (
            <>
              <Text style={styles.text} category="h1">
                {this.state.response}
              </Text>
              <Button
                style={{ marginVertical: 4 }}
                onPress={() => navigation.navigate('Home')}>
                Kembali
              </Button>
            </>
          ) : (
            <>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.text} category="s1">
                Mohon tunggu.
              </Text>
            </>
          )}
        </Layout>
        <View style={styles.container}>
          <FlatList
            data={this.state.AttendaceList}
            renderItem={({ item }) =>
              <Card style={{ margin: 5, backgroundColor: '#ffdb3d', borderRadius: 10 }}
                onPress={this.getAttendanceData.bind()}
              >
                <View style={{ flex: 1, flexDirection: 'row', padding: 10, marginLeft: 20 }}>
                  <Text style={{ flex: 1, fontSize: 15 }}>Nama Presensi</Text>
                  <Text style={{ flex: 1, fontSize: 15 }}>{item.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 10, marginLeft: 20 }}>
                  <Text style={{ flex: 1, fontSize: 15 }}>Check In</Text>
                  <Text style={{ flex: 1, fontSize: 15 }}>{item.check_in}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 10, marginLeft: 20 }}>
                  <Text style={{ flex: 1, fontSize: 15 }}>Check Out</Text>
                  <Text style={{ flex: 1, fontSize: 15 }}>{item.check_out}</Text>
                </View>
              </Card>
            }
            keyExtractor={item => item.id}
          />
        </View>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  container_unauthorized: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
