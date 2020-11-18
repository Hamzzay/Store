import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import * as actions from "../actions";
import { connect } from "react-redux";
import Button from "../components/Button";
import NumericInput from 'react-native-numeric-input'

class UpdateOrderQuantityScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: [],
      OrderNo: "",
    };
  }

  componentDidMount() {
    console.log('this.props.route.params', this.props.route.params)
    let params = this.props.route.params.item;
    this.setState({ selectedProducts: params.products });
  }

  setQuantity(item, val) {
    let products = this.state.selectedProducts;
    products.forEach((ele) => {
      if (ele.sku === item.sku) {
        ele.orderQuantity = val;
      }
    });
    this.setState({ selectedProducts: products });
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
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <NumericInput
            value={item.item.orderQuantity}
            onChange={(val) => this.setQuantity(item.item, val)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={80}
            totalHeight={30}
            iconSize={25}
            step={1}
            minValue={0}
            valueType='real'
            rounded
            textColor='black'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#72bcd4'
            leftButtonBackgroundColor='#72bcd4' />
        </View>

      </View>
      <View style={{marginBottom: 5}}/>
      </View>
    );

  }
  editOrder() {
    let params = this.props.route.params.item;
    let totalPrice = 0

    this.state.selectedProducts.forEach((ele) => {
        totalPrice = totalPrice + ele.orderQuantity * ele.price
      })
      console.log('total',totalPrice)
    let key = {
      orderNo: params.orderNo,
      products: this.state.selectedProducts,
      totalPrice: totalPrice
    };
    console.log('key',key)

    this.props.updateOrder(key);
    this.props.navigation.navigate("Order");
  }
  deleteOrder() {
    this.props.deleteOrder(this.props.route.params.item)
    this.props.navigation.navigate("Order")
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
              Update Order
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={this.state.selectedProducts}
            keyExtractor={(item) => item.sku}
            renderItem={(item) => this.showProduct(item)}
          />
          <Button
            text="Add More Products"
            onPress={() =>
              this.props.navigation.navigate
                ("AddMoreProduct", {
                  selectedProducts: this.state.selectedProducts,
                  orderNo: this.props.route.params.item.orderNo
                })}
          />
          <Button text="Save Order" onPress={() => this.editOrder()} />
          <Button text="Delete Order" onPress={() => this.deleteOrder()} />
        </View>

      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return { reducerState: state.store };
};
export default connect(mapStateToProps, actions)(UpdateOrderQuantityScreen);

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
  headerMid: {
    flex: 3,
    left: -60,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 11,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8ED1FC",
    justifyContent: 'center',
  },
  listQuantity: {
    color: "#ABB8C3",
    left: 130,
    bottom: 60,
  },
  inputStyle: {
    width: "20%",
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 70,
    height: 80,
  },
});
