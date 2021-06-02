import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';

export default class PresensiScreen extends Component {
  constructor(props){
    super(props); 
    this.state = {
      AttendaceList:[
        {id:'1',name:'Test Absensi',check_in:'10:00',check_out:'11:00'},
        {id:'2',name:'Test Absensi',check_in:'10:00',check_out:'11:00'}
      ]
    }
  }

  getAttendanceData(){
    // alert("cok anjeng");
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.AttendaceList}
          renderItem={({item})=>
            <Card style={{ margin:5, backgroundColor:'#ffdb3d', borderRadius:10 }}
              onPress={this.getAttendanceData.bind()}
              >
              <View style={{flex:1, flexDirection:'row',padding: 10, marginLeft:20}}>
                <Text style={{flex:1, fontSize: 15}}>Nama Presensi</Text>
                <Text style={{flex:1, fontSize: 15}}>{item.name}</Text>
              </View>
              <View style={{flex:1, flexDirection:'row',padding: 10, marginLeft:20}}>
                <Text style={{flex:1, fontSize: 15}}>Check In</Text>
                <Text style={{flex:1, fontSize: 15}}>{item.check_in}</Text>
              </View>
              <View style={{flex:1, flexDirection:'row',padding: 10, marginLeft:20}}>
                <Text style={{flex:1, fontSize: 15}}>Check Out</Text>
                <Text style={{flex:1, fontSize: 15}}>{item.check_out}</Text>
              </View>
            </Card>
          }
          keyExtractor={item=>item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
});
