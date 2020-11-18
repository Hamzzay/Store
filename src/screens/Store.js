import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Store extends Component {
  showProduct(item) {
console.log('item',item)
    let uri = item.item.image
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('UpdateProduct', { item })}
        style={styles.list}>
        {item.item.image !== null
          ?

          <Image
            style={styles.tinyLogo}
            source={{ uri: item.item.image }}
          />

          :
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/placeholder.png')}
          />
        }
        {(item.item.title).length > 10

          ? <Text style={styles.listTitle}>{(item.item.title).slice(0, 12)}...</Text>
          : <Text style={styles.listTitle}>{item.item.title}</Text>
        }
        <Text style={styles.listQuantity} >In-Stock: {item.item.quantity}</Text>
        <Text style={styles.listPrice}>${item.item.price}</Text>
      </TouchableOpacity>

    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('HomeStack', { screen: 'Home' })
              }>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Store</Text>
          </View>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('OrderStack', { screen: 'Order' })
              }>
              <Text>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyTop}>
            <Text style={styles.left}>Insights</Text>
            <Text style={styles.mid}>Products</Text>
            <Text style={styles.right}>Customers</Text>
          </View>
          <View
            style={styles.bodyBottom}
          >
            {this.props.reducerState.length > 0
              ?
              <FlatList
                data={this.props.reducerState}
                keyExtractor={(item) => item.sku}
                renderItem={(item) => this.showProduct(item)}
              />
              :
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#72bcd4' }}>There are no products available</Text>
              </View>
            }

          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store }
}
export default connect(mapStateToProps, actions)(Store)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  headerButton: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,

  },
  headerMid: {
    flex: 3,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  bodyTop: {
    flex: 2,
    borderColor: '#ddd',
  },
  mid: {
    paddingTop: 10,
    marginTop: 10,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    left: 155,
    backgroundColor: 'transparent',
    borderColor: '#ddd',
    borderWidth: 2,
    height: 40,
    width: 100,
  },
  left: {
    paddingTop: 10,
    marginTop: 10,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    left: 10,
    backgroundColor: 'transparent',
    borderColor: '#ddd',
    borderWidth: 2,
    height: 40,
    width: 100,
  },
  right: {
    marginTop: 10,
    paddingTop: 10,
    position: 'absolute',
    right: 10,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ddd',
    height: 40,
    width: 100,
  },
  bodyBottom: {
    flex: 11.5,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 3,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  list: {
    flex: 5,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'center',
    // left:130,
    // bottom:60,
    justifyContent: 'center',
    color: '#72bcd4'
  },
  listQuantity: {
    color: '#ABB8C3',
    justifyContent: 'center',
    alignItems: 'center',
    // left:130,
    // bottom:60,
  },
  listPrice: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: 'center',
    // left:290,
    // bottom:110,
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 70,
    height: 80,
  }
});
