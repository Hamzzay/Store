import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as actions from "../actions";
import { connect } from "react-redux";
import Button from "../components/Button";
import NumericInput from 'react-native-numeric-input'

class OrderQuantityScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: [],
    };
  }

  componentDidMount() {
    let params = this.props.route.params.selectedProducts;
    let products = [];
    params.forEach((param) => {
      this.props.reducerState.forEach((product) => {
        if (param.value === product.sku) {
          product.orderQuantity = 0
          product.qtyError = ''
          products = [...products, product];
        }
      });
    });
    if(this.props.route.params?.LastOrderDetails){
      let selectedProducts = this.props.route.params?.LastOrderDetails.selectedProducts;
      selectedProducts = selectedProducts.concat(products);
      this.setState({ selectedProducts: selectedProducts });  
    } else {
      this.setState({ selectedProducts: products });
    }
    
  }

  handlePress() {

    let error = false
    let store = this.props.reducerState
    this.state.selectedProducts.forEach(selectedProduct => {
      store.forEach(product => {
        if (product.sku === selectedProduct.sku) {
          if (product.quantity === 0 && selectedProduct.orderQuantity > 0) {
            selectedProduct.qtyError = `Out of stock`
            selectedProduct.orderQuantity = 0
            error = true
          }
        }
      })
      if (selectedProduct.qtyError !== '') {
        error = true
      }
    })
    if (!error) {

      let orderProducts = this.state.selectedProducts.filter(item => {
        if (item.orderQuantity === 0) {
          return false
        } else {
          return true
        }
      })
      let key = {
        orderNo: Math.floor(Math.random() * 10000),
        products: orderProducts,

      };

      let newStore = this.props.reducerState
      orderProducts.forEach(product => {
        newStore.forEach(p => {
          if (p.sku === product.sku) {
            let newProd = p
            newProd.quantity = parseInt(p.quantity) - parseInt(product.orderQuantity)
            this.props.updateProduct(newProd)
          }
        })
      })
      // this.props.updateStore(newStore)

      let totalPrice = 0

      orderProducts.forEach((ele) => {
        totalPrice = totalPrice + ele.orderQuantity * ele.price
      })
      key.totalPrice = totalPrice

      if(this.props.route.params?.LastOrderDetails){
        key.orderNo = this.props.route.params.LastOrderDetails.orderNo
        this.props.updateOrder(key);
        this.props.navigation.navigate("Order");
      } else {
        this.props.saveOrder(key);
        this.props.navigation.navigate("OrderStack");
      }
      alert('hi')
      

    }
  }

  setQuantity(item, val) {
    let newSelectedProducts = this.state.selectedProducts;
    let store = this.props.reducerState
    newSelectedProducts.forEach(newProduct => {
      if (newProduct.sku === item.sku) {
        store.forEach(product => {
          if (product.sku === item.sku) {
            if (product.quantity >= val) {
              newProduct.orderQuantity = val
              newProduct.qtyError = ''
              // product.quantity = parseInt(product.quantity) - parseInt(val)
            } else if (product.quantity === 0) {
              newProduct.qtyError = `Out of stock`
              if (val === 0) {
                newProduct.orderQuantity = val
                newProduct.qtyError = ``
              }
            } else {
              newProduct.qtyError = `Max qty: ${parseInt(product.quantity)}`
            }
          }
        })
      }
    })

    this.setState({ selectedProducts: newSelectedProducts });
  }

  showProduct(item) {

    return (
      <View>
        <View style={styles.list}>
          {item.item.image !== null
            ? <Image style={styles.tinyLogo} source={{ uri: item.item.image }} />
            : <Image style={styles.tinyLogo} source={require('../../assets/placeholder.png')} />
          }
          {(item.item.title).length > 10

            ? <Text style={styles.listTitle}>{(item.item.title).slice(0, 12)}...</Text>
            : <Text style={styles.listTitle}>{item.item.title}</Text>

          }
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <NumericInput
              value={item.item.orderQuantity}
              onChange={(val) => this.setQuantity(item.item, val)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={80}
              totalHeight={40}
              iconSize={25}
              step={1}
              minValue={0}
              valueType='real'
              rounded
              textColor='black'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#72bcd4'
              leftButtonBackgroundColor='#72bcd4'
            // containerStyle = {{marginLeft: 100}}
            />
            <Text style={{ color: 'red' }}>{item.item.qtyError}</Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 5,
            // borderBottomColor: 'wh',
            // borderBottomWidth: 1,
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("HomeStack", { screen: "Home" })

              }
            >
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerMid}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Add Quantity
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={this.state.selectedProducts}
            keyExtractor={(item) => item.sku}
            renderItem={(item) => this.showProduct(item)}
          />
          <Button text="Done" onPress={() => this.handlePress()} />
        </View>

      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store, };
};
export default connect(mapStateToProps, actions)(OrderQuantityScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    marginTop: 20,
  },
  headerButton: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerMid: {
    flex: 3,
    right: 50,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 11.5,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8ED1FC",
  },
  tinyLogo: {
    width: 70,
    height: 80,
  },
  inputStyle: {
    marginBottom: 15
  },
});
