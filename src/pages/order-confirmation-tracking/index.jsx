import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import OrderSummary from './components/OrderSummary';
import ShippingInfo from './components/ShippingInfo';
import OrderTimeline from './components/OrderTimeline';
import CustomerSupport from './components/CustomerSupport';

function OrderConfirmationTracking() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock order data
    const mockOrderData = {
      orderNumber: "ORD-2024-001234",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-22",
      status: "shipped",
      trackingNumber: "1Z999AA1234567890",
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          quantity: 1,
          price: 79.99,
          variant: "Black, Premium Edition"
        },
        {
          id: 2,
          name: "Smartphone Protective Case",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
          quantity: 2,
          price: 24.99,
          variant: "Clear, iPhone 15 Pro"
        }
      ],
      shipping: {
        address: {
          name: "John Doe",
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States"
        },
        method: "Standard Shipping",
        cost: 9.99
      },
      payment: {
        method: "Credit Card",
        lastFour: "4242",
        amount: 189.97,
        billingAddress: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001"
        }
      },
      timeline: [
        {
          status: "ordered",
          title: "Order Placed",
          description: "Your order has been confirmed",
          timestamp: "2024-01-15T10:30:00Z",
          completed: true
        },
        {
          status: "processing",
          title: "Processing",
          description: "Your order is being prepared",
          timestamp: "2024-01-15T14:20:00Z",
          completed: true
        },
        {
          status: "shipped",
          title: "Shipped",
          description: "Your order is on its way",
          timestamp: "2024-01-16T09:15:00Z",
          completed: true
        },
        {
          status: "out_for_delivery",
          title: "Out for Delivery",
          description: "Your order is out for delivery",
          timestamp: null,
          completed: false
        },
        {
          status: "delivered",
          title: "Delivered",
          description: "Your order has been delivered",
          timestamp: null,
          completed: false
        }
      ]
    };

    // Simulate loading
    setTimeout(() => {
      setOrderData(mockOrderData);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePrintOrder = () => {
    window.print();
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order ${orderData.orderNumber}`,
        text: `I just placed an order! Order #${orderData.orderNumber}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Confirmation Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            Order Confirmed!
          </h1>
          <p className="text-text-secondary mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-surface rounded-lg p-4 inline-block">
            <p className="text-sm text-text-secondary mb-1">Order Number</p>
            <p className="text-lg font-bold text-primary font-mono">{orderData.orderNumber}</p>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <OrderSummary 
              items={orderData.items}
              orderDate={orderData.orderDate}
              orderNumber={orderData.orderNumber}
            />

            {/* Shipping Information */}
            <ShippingInfo 
              shipping={orderData.shipping}
              trackingNumber={orderData.trackingNumber}
              estimatedDelivery={orderData.estimatedDelivery}
            />

            {/* Payment Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="CreditCard" size={24} className="mr-2 text-primary" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Payment Method</span>
                  <span className="text-text-primary font-medium">
                    {orderData.payment.method} ending in {orderData.payment.lastFour}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Amount Charged</span>
                  <span className="text-lg font-bold text-primary font-mono">
                    ${orderData.payment.amount.toFixed(2)}
                  </span>
                </div>
                <div className="pt-4 border-t border-border-light">
                  <p className="text-sm text-text-secondary mb-2">Billing Address</p>
                  <p className="text-text-primary">
                    {orderData.payment.billingAddress.street}<br />
                    {orderData.payment.billingAddress.city}, {orderData.payment.billingAddress.state} {orderData.payment.billingAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Timeline */}
            <OrderTimeline timeline={orderData.timeline} />

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handlePrintOrder}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-surface hover:bg-secondary-100 rounded-md transition-colors duration-150"
                >
                  <Icon name="Printer" size={18} />
                  <span>Print Order</span>
                </button>
                <button
                  onClick={handleShareOrder}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-surface hover:bg-secondary-100 rounded-md transition-colors duration-150"
                >
                  <Icon name="Share2" size={18} />
                  <span>Share Order</span>
                </button>
                <Link
                  to="/product-catalog-browse"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white hover:bg-primary-700 rounded-md transition-colors duration-150"
                >
                  <Icon name="ShoppingBag" size={18} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Customer Support */}
            <CustomerSupport orderNumber={orderData.orderNumber} />
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={24} className="text-primary mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Email Confirmation Sent
              </h3>
              <p className="text-text-secondary mb-3">
                We've sent a confirmation email with your order details to your registered email address. 
                Please check your inbox and spam folder.
              </p>
              <p className="text-sm text-text-secondary">
                Didn't receive the email? 
                <button className="text-primary hover:text-primary-700 ml-1 underline">
                  Resend confirmation
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Return Policy Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="RotateCcw" size={20} className="mr-2 text-primary" />
            Return Policy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Easy Returns</h4>
              <p className="text-sm text-text-secondary mb-3">
                You have 30 days from delivery to return items for a full refund. 
                Items must be in original condition with tags attached.
              </p>
              <Link
                to="#"
                className="text-primary hover:text-primary-700 text-sm font-medium inline-flex items-center"
              >
                Start Return Process
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Link>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Free Return Shipping</h4>
              <p className="text-sm text-text-secondary mb-3">
                We provide prepaid return labels for all eligible returns. 
                Simply print the label and drop off at any authorized location.
              </p>
              <Link
                to="#"
                className="text-primary hover:text-primary-700 text-sm font-medium inline-flex items-center"
              >
                View Return Policy
                <Icon name="ExternalLink" size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderConfirmationTracking;