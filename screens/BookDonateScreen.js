import React from 'react';
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity,Alert } from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      requestedBookList : []
    }
    this.requestRef = null

  } 
  getRequestedBookList = () => {
   this.requestRef = db.collection("requestedBooks")
   .onSnapshot((snapshot)=>{
     var requestedBookList = snapshot.docs.map(document=>document.data())
     this.setState({
       requestedBookList:requestedBookList
     })
   })
  } 
componentDidMount (){
  this.getRequestedBookList()
}
  componentWillUnmount (){
    this.requestRef()
  }
  keyExtractor = (item,index)=>
    index.toString();
  renderItem = ({item,i}) => {
    return (
    <ListItem
       key={i}
       title = {item.book_name}
       subtitle = {item.reason_to_request}
       titleStyle = {{color:"black",fontWeight:"bold"}}
       rightElement = {
         <TouchableOpacity>
          <Text style={{color:"#ffff"}}> 
            View
          </Text>
         </TouchableOpacity> 
       } 
       bottomDivider 
    />
    )
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MyHeader title="Donate Books" 
          navigation= {this.props.navigation}
        />
        <View style={{flex:1}}>
           {
             this.state.requestedBookList.length === 0
             ? (
               <View>
                 <Text> List of all books requested </Text>
               </View>
             ) 
             : (
               <FlatList
                  keyExtractor = {this.keyExtractor}
                  data = {this.state.requestedBookList}
                  renderItem = {this.renderItem}
               />
             )
           }
        </View>
      </View>
    );
  }
}