import React, { Component, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ApplicationProvider, Button, Layout } from '@ui-kitten/components';
import { Card } from 'react-native-paper';
import * as api from '../services/attendance';
import * as eva from '@eva-design/eva';
import { useAuth } from '../providers/auth';

export default function PresensiScreen({ route, navigation }) {
  const { state } = useAuth();
  const { getAuthState } = useAuth();
  const user = state;
  const [theme, setTheme] = React.useState('light');

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(true);
  const [AttendaceList, setAttendanceList] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      let res = await api.getListAttendances();
      console.debug('post att', res.data);
      if (res.data == undefined) {
        setLoading(true)
        setUnauthorized(true)
        setResponse(res.message);
      } else {
        setLoading(true)
        setUnauthorized(false)
        setResponse(res.message)
        setAttendanceList(res.data);
        console.debug(res)
      }
    } catch (err) {
      console.debug(err);
      setResponse("Error, mohon maaf ada kesalahan teknis.")
    }
  }

  function getAttendanceData() {
    // alert("cok anjeng");
    navigation.navigate('Siswa');
  }

  return (
    <ApplicationProvider {...eva} theme={eva[theme]}>
      {
        unauthorized == false ? (
          <View style={styles.container}>
            <FlatList
              data={AttendaceList}
              renderItem={({ item }) =>
                <Card style={{ margin: 5, backgroundColor: '#ffdb3d', borderRadius: 10 }}
                  onPress={getAttendanceData.bind()}
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
        ) : (
          <Layout style={styles.container_unauthorized}>
            {loading ? (
              <>
                <Text style={styles.text} category="h1">
                  {response}
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
        )
      }
    </ApplicationProvider>
  );
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
