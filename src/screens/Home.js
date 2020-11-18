import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import * as actions from "../actions";
import { connect } from "react-redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      productsCount: "",
      orderCount: "",
    }
  }

  componentDidMount() {
    let products = this.props.productReducer
    let orders = this.props.orderReducer

    this.setState({
      productsCount: products.length,
      orderCount: orders.length
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('OrderStack', { screen: 'Order' })
              }>
              <Text>Order</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Home</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('StoreStack', { screen: 'Store' })
              }>
              <Text>Store</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          }}
        />
        {/* ///////////header section end////////// */}
        <View style={styles.Top}>
          {/* <Text>Month to date Sep 1,2020-Sep 7,2020</Text> */}
        </View>
        <View style={styles.upperBody}>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Events: 0</Text>
                </View>
              </Card>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('StoreStack', { screen: 'Store' })}
              style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Products:{this.state.productsCount}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Guests: 0</Text>
                </View>
              </Card>
            </View>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Customers: 0</Text>
                </View>
              </Card>
            </View>
          </View>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Events Soles: 0</Text>
                </View>
              </Card>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('OrderStack', { screen: 'Order' })}
              style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Orders: {this.state.orderCount}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.lowerBody}>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Published events: 0</Text>
                </View>
              </Card>
            </View>
            <View style={styles.upperBodyA}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Button
                  text="Add Order"
                  onPress={() => this.props.navigation.navigate('AddOrder')}
                />
              </View>
            </View>
          </View>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Published boutiques: 0</Text>
                </View>
              </Card>
            </View>
            <View style={styles.upperBodyA}>
              {/* /////////empty////////// */}
            </View>
          </View>
          <View style={styles.upperBodyA}>
            <View style={styles.upperBodyA}>
              <Card>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>Products inventory: 0</Text>
                </View>
              </Card>
            </View>
            <View style={styles.upperBodyA}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Button
                  text="Add Product"
                  onPress={(event) => this.props.navigation.navigate('AddProduct')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 2 }}></View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return { orderReducer: state.order, productReducer: state.store };
};
export default connect(mapStateToProps, actions)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1.25,
    flexDirection: 'row',
  },
  headerButtons: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20
  },

  headerMid: {
    flex: 3,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
  upperBody: {
    flex: 4,
  },
  Top: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  upperBodyA: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    height: 60,
  },
  lowerBody: {
    flex: 4,
  },
});
