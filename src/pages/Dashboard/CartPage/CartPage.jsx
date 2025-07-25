import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./CartPage.scss";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "p1",
      name: "Premium Subscription - 1 Year",
      price: 99.99,
      image: "/images/products/premium-yearly.jpg",
      quantity: 1,
      description: "Ad-free music, offline listening, and high quality audio",
    },
    {
      id: "p2",
      name: "Wireless Headphones",
      price: 149.99,
      image: "/images/products/headphones.jpg",
      quantity: 1,
      description: "Noise cancelling wireless headphones",
    },
    {
      id: "p3",
      name: "Merch Bundle",
      price: 49.99,
      image: "/images/products/merch-bundle.jpg",
      quantity: 2,
      description: "T-shirt, cap, and stickers",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="cart-header">
            <h1>Your Cart</h1>
            <p>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <p className="secure-checkout">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm3.5 5.5v3.6c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V6.5c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5z"
                    fill="#1DB954"
                  />
                  <path
                    d="M7.5 9.5V11h1V9.5h1.5V8H8.5V6.5H7.5V8H6v1.5h1.5z"
                    fill="#fff"
                  />
                </svg>
                Secure Checkout
              </p>
            </div>
          </div>

          <div className="suggestions-section">
            <h2>You Might Also Like</h2>
            <div className="suggestions-grid">
              {[1, 2, 3].map((i) => (
                <div className="suggestion-item" key={i}>
                  <img
                    src={`/images/products/suggestion-${i}.jpg`}
                    alt={`Suggestion ${i}`}
                    className="suggestion-image"
                  />
                  <div className="suggestion-info">
                    <h3>
                      {i === 1
                        ? "Bluetooth Speaker"
                        : i === 2
                        ? "Vinyl Record"
                        : "Gift Card"}
                    </h3>
                    <p>${i === 1 ? "79.99" : i === 2 ? "24.99" : "50.00"}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
