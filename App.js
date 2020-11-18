import "react-native-gesture-handler";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import reducers from "./src/reducers";
import HomeScreen from "./src/screens/Home";
import OrderScreen from "./src/screens/Order";
import StoreScreen from "./src/screens/Store";
import AddProductScreen from "./src/screens/AddProduct";
import AddOrderScreen from "./src/screens/AddOrder";
import UpdateProduct from "./src/screens/UpdateProduct";
import OrderQuantityScreen from "./src/screens/OrderQuantity";
import UpdateOrderQuantityScreen from "./src/screens/UpdateOrderQuantity";
import AddMoreProductScreen from "./src/screens/AddMoreProduct";
import OrderQuantityAgain from "./src/screens/OrderQuantityAgain";
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="AddOrder" component={AddOrderScreen} />
      <Stack.Screen name="OrderQuantity" component={OrderQuantityScreen} />
      <Stack.Screen name="UpdateOrderQuantity" component={UpdateOrderQuantityScreen} />
      <Stack.Screen name="AddMoreProduct" component={AddMoreProductScreen} />
      <Stack.Screen name="OrderQuantityAgain" component={OrderQuantityAgain} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator initialRouteName="Order" screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="OrderQuantity" component={OrderQuantityScreen} />
      <Stack.Screen name="UpdateOrderQuantity" component={UpdateOrderQuantityScreen} />
      <Stack.Screen name="OrderQuantityAgain" component={OrderQuantityAgain} />
      <Stack.Screen name="AddMoreProduct" component={AddMoreProductScreen} />
    </Stack.Navigator>
  );
}

function StoreStack() {
  return (
    <Stack.Navigator initialRouteName="Store" screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
    </Stack.Navigator>
  );
}

let store = createStore(persistedReducer);
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="HomeStack" tabBarOptions={{ activeTintColor: "#72bcd4", }}   >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
              tabBarLabel: "Home", unmountOnBlur: true,
              tabBarIcon: ({ color, size }) => (<Ionicons name="ios-home" color={color} size={size} />),
            }}
            />
            <Tab.Screen name="OrderStack" component={OrderStack} options={{
              tabBarLabel: "Order", unmountOnBlur: true,
              tabBarIcon: ({ color, size }) => (<Ionicons name="ios-reorder" color={color} size={size} />),
            }}
            />
            <Tab.Screen name="StoreStack" component={StoreStack} options={{
              tabBarLabel: "Store", unmountOnBlur: true,
              tabBarIcon: ({ color, size }) => (<Ionicons name="md-appstore" color={color} size={size} />),
            }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
