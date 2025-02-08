"use client";
import React, { useState } from "react";

interface BillingDetails {
  name: string;
  email: string;
  address: string;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutFlowProps {
  cart: { _id: string; title: string; price: number }[];
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ cart }) => {
  const [billing, setBilling] = useState<BillingDetails>({
    name: "",
    email: "",
    address: "",
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  const isCartEmpty = cart.length === 0; // Check if cart is empty

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCartEmpty) {
      alert("Your cart is empty. Add products before placing an order!");
      return;
    }
    alert(`Order placed successfully! Total: $${totalPrice}`);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Checkout</h2>

      {isCartEmpty ? (
        <p className="text-red-600 font-semibold text-center">
          Your cart is empty. Add products before proceeding to checkout.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Billing Details Form */}
          <h3 className="text-xl font-semibold text-gray-800">Billing Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billing.name}
            onChange={handleBillingChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={billing.email}
            onChange={handleBillingChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={billing.address}
            onChange={handleBillingChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />

          {/* Payment Details */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6">Payment Details</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={handlePaymentChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={payment.expiryDate}
              onChange={handlePaymentChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={payment.cvv}
              onChange={handlePaymentChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Total Price */}
          <div className="mt-6 text-lg font-bold text-gray-800">
            Total Price: ${totalPrice}
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className={`w-full py-3 text-lg font-semibold rounded-md transition duration-300 ${
              isCartEmpty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={isCartEmpty}
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutFlow;
