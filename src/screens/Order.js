import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import * as actions from "../actions";
import { connect } from "react-redux";

class OrderScreen extends Component {
  constructor() {
    super();
    this.state = {
      orders: null
    };
  }
  componentDidMount() {
    this.setState({ orders: this.props.reducerState })
  }
  componentDidUpdate(prevProps) {
    if (this.props.reducerState !== prevProps.reducerState) {
      this.setState({ orders: this.props.reducerState })
    }
  }


  showProduct(item) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('UpdateOrderQuantity', { item: item.item })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#72bcd4' }}>Order No</Text>
        <Text style={{ color: '#72bcd4' }}>Total</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.orderNo}>{item.item.orderNo}</Text>
          <Text style={styles.listPrice}>${item.item.totalPrice}</Text>
        </View>

        <View
          style={{
            marginVertical: 20,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          }}
        />
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('HomeStack', { screen: 'Home' })
              }>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, left: -10 }}>Order</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          }}
        />
        {/* ////////////////header ends//////////////// */}
        {/* <View style={styles.bodyTop}>
          <Text style={styles.bodyTopLeft}> Order Type</Text>
          <Text style={styles.bodyTopRight}> Order status</Text>
        </View> */}
        <View style={styles.body}>
            <FlatList
              data={this.state.orders}
              keyExtractor={(item) => item.orderNo}
              renderItem={(item) => this.showProduct(item)}
              showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}
            />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.order };
};
export default connect(mapStateToProps, actions)(OrderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  headerButtons: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    //marginTop:15 
  },
  headerMid: {
    flex: 3,
    fontWeight: 'bold',
    right: 55,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:15 
  },
  body: {
    flex: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
  },
  bodyTop: {
    flex: 1,
  },
  orderNo: {
    fontSize: 20,
    fontWeight: "bold",
    // top:25,
    // justifyContent: 'center',
  },
  listPrice: {
    fontSize: 20,
    fontWeight: "bold",
    // left:310,
    // justifyContent: 'center',
  },
  bodyTopLeft: {
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  bodyTopRight: {
    alignSelf: 'flex-end',
    right: 10,
    fontWeight: 'bold',
    fontSize: 15,
  }
});