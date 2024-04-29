export const calculateTotalAmount = (products: any) => {
  return products.reduce((total: number, product: any) => {
    total += product.price * product.quantity;
    return total;
  }, 0);
};
