export const saveProduct = (product) => {
  return {
    type: 'save_product',
    payload: product
  }
}
export function updateProduct(product) {
  return {
    type: 'update_product',
    payload: product
  };
};

export function updateStore(store) {
  return {
    type: 'update_store',
    payload: store
  };
};
export function deleteProduct(product) {
  return {
    type: 'delete_product',
    payload: product
  };
};
export function saveOrder(order) {
  return {
    type: 'save_order',
    payload: order
  };
};
export function updateOrder(order) {
  return {
    type: 'update_order',
    payload: order
  };
};

export const deleteOrder = (order) => {
  return {
    type: 'delete_order',
    payload: order
  }
}
