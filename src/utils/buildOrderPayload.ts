
interface CheckoutItem {
    productId: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
}

interface Checkout {
    delivery: string;
    payment: string;
    address: string;
    cart: CheckoutItem[];
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
}

interface OrderPayload {
    deliveryOption: string;
    paymentMethod: string;
    shippingAddress: string;
    items: OrderItem[];
}

export const buildOrderPayload = (checkout: Checkout): OrderPayload => ({
    deliveryOption: checkout.delivery,
    paymentMethod: checkout.payment.toUpperCase(),
    shippingAddress: checkout.address,
    items: checkout.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
    })),
});
