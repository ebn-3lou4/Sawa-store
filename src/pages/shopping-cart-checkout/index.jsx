import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import CartItemCard from './components/CartItemCard';
import OrderSummary from './components/OrderSummary';
import ShippingOptions from './components/ShippingOptions';
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';
import ProgressIndicator from './components/ProgressIndicator';

function ShoppingCartCheckout() {
  const { cart: contextCart, updateCartQty, removeFromCart } = useShop();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(contextCart);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Keep local copy in sync with context cart
  React.useEffect(() => {
    setCartItems(contextCart);
  }, [contextCart]);

  /* Removed mock data */

  /*const mockCartItems = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        brand: 'TechSound',
        price: 79.99,
        originalPrice: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        variant: {
          color: 'Black',
          size: 'Standard'
        },
        inStock: true
      },
      {
        id: 2,
        name: 'Smartphone Protective Case',
        brand: 'GuardTech',
        price: 24.99,
        originalPrice: 34.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop',
        variant: {
          color: 'Clear',
          model: 'iPhone 14 Pro'
        },
        inStock: true
      },
      {
        id: 3,
        name: 'USB-C Fast Charging Cable',
        brand: 'PowerLink',
        price: 15.99,
        originalPrice: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        variant: {
          length: '6ft',
          color: 'White'
        },
        inStock: true
      }
    ];
    // removed
  */

  const steps = [
    { id: 1, name: 'Cart', icon: 'ShoppingCart' },
    { id: 2, name: 'Shipping', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percentage / 100) : 0;
  const shippingCost = selectedShipping ? selectedShipping.cost : 0;
  const taxRate = 0.08;
  const taxAmount = (subtotal - discountAmount + shippingCost) * taxRate;
  const total = subtotal - discountAmount + shippingCost + taxAmount;

  const handleQuantityUpdate = (itemId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartQty(itemId, newQuantity);
  }
};

  const handleRemoveItem = (itemId) => {
  removeFromCart(itemId);
};

  const handleApplyDiscount = () => {
    const validCodes = {
      'SAVE10': { percentage: 10, description: '10% off your order' },
      'WELCOME20': { percentage: 20, description: '20% off for new customers' },
      'FREESHIP': { percentage: 0, description: 'Free shipping', freeShipping: true }
    };

    if (validCodes[discountCode.toUpperCase()]) {
      setAppliedDiscount({
        code: discountCode.toUpperCase(),
        ...validCodes[discountCode.toUpperCase()]
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/order-confirmation-tracking');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingCart" size={48} className="text-secondary-400" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Your cart is empty</h2>
            <p className="text-text-secondary mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/product-catalog-browse"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Cart Items */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-primary">Shopping Cart</h2>
                  <span className="text-text-secondary">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-surface rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-secondary-50 border-b border-border text-sm font-medium text-text-secondary">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {cartItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onQuantityUpdate={handleQuantityUpdate}
                        onRemove={handleRemoveItem}
                        isLoading={isLoading}
                        layout="table"
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onQuantityUpdate={handleQuantityUpdate}
                      onRemove={handleRemoveItem}
                      isLoading={isLoading}
                      layout="card"
                    />
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Link
                    to="/product-catalog-browse"
                    className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-colors duration-150"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Continue Shopping</span>
                  </Link>
                  
                  <button
                    onClick={handleNextStep}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>Proceed to Shipping</span>
                    <Icon name="ArrowRight" size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">Shipping Information</h2>
                
                <AddressForm
                  selectedAddress={selectedAddress}
                  onAddressSelect={setSelectedAddress}
                />

                <ShippingOptions
                  selectedShipping={selectedShipping}
                  onShippingSelect={setSelectedShipping}
                />

                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <button
                    onClick={handlePreviousStep}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Back to Cart</span>
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedAddress || !selectedShipping}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue to Payment</span>
                    <Icon name="ArrowRight" size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">Payment Information</h2>
                
                <PaymentForm
                  paymentMethod={paymentMethod}
                  onPaymentMethodSelect={setPaymentMethod}
                />

                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <button
                    onClick={handlePreviousStep}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Back to Shipping</span>
                  </button>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod || isLoading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={20} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Lock" size={20} />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                subtotal={subtotal}
                discountAmount={discountAmount}
                appliedDiscount={appliedDiscount}
                shippingCost={shippingCost}
                taxAmount={taxAmount}
                total={total}
                discountCode={discountCode}
                onDiscountCodeChange={setDiscountCode}
                onApplyDiscount={handleApplyDiscount}
                onRemoveDiscount={() => {
                  setAppliedDiscount(null);
                  setDiscountCode('');
                }}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartCheckout;