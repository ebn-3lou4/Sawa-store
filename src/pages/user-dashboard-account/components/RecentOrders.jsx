import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

function RecentOrders({ preview = false }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock orders data
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 129.99,
        items: 3,
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2024-01-18',
        products: [
          {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
            price: 79.99,
            quantity: 1
          },
          {
            id: 2,
            name: 'Smartphone Case',
            image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop',
            price: 24.99,
            quantity: 2
          }
        ]
      },
      {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 89.50,
        items: 2,
        trackingNumber: 'TRK987654321',
        estimatedDelivery: '2024-01-16',
        products: [
          {
            id: 3,
            name: 'USB-C Cable',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
            price: 19.99,
            quantity: 1
          },
          {
            id: 4,
            name: 'Wireless Mouse',
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
            price: 69.51,
            quantity: 1
          }
        ]
      },
      {
        id: 'ORD-2024-003',
        date: '2024-01-05',
        status: 'processing',
        total: 199.99,
        items: 1,
        trackingNumber: null,
        estimatedDelivery: '2024-01-20',
        products: [
          {
            id: 5,
            name: 'Mechanical Keyboard',
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop',
            price: 199.99,
            quantity: 1
          }
        ]
      },
      {
        id: 'ORD-2023-045',
        date: '2023-12-28',
        status: 'cancelled',
        total: 45.00,
        items: 1,
        trackingNumber: null,
        estimatedDelivery: null,
        products: [
          {
            id: 6,
            name: 'Phone Stand',
            image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=100&h=100&fit=crop',
            price: 45.00,
            quantity: 1
          }
        ]
      }
    ];

    setTimeout(() => {
      setOrders(preview ? mockOrders.slice(0, 3) : mockOrders);
      setLoading(false);
    }, 500);
  }, [preview]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success-100 text-success-700';
      case 'shipped':
        return 'bg-primary-100 text-primary-700';
      case 'processing':
        return 'bg-warning-100 text-warning-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-secondary-200 rounded w-32"></div>
                <div className="h-6 bg-secondary-200 rounded w-20"></div>
              </div>
              <div className="h-3 bg-secondary-200 rounded w-48 mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Package" size={32} className="text-secondary-400" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No orders yet</h3>
        <p className="text-text-secondary mb-6">Start shopping to see your orders here</p>
        <Link
          to="/product-catalog-browse"
          className="btn-primary"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!preview && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Order History</h2>
          <div className="flex items-center space-x-2">
            <select className="input-field text-sm py-2">
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="shipped">Shipped</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Icon name={getStatusIcon(order.status)} size={16} className="text-text-secondary" />
                <span className="font-medium text-text-primary">{order.id}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              {new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-2">
                {order.products.slice(0, 3).map((product, index) => (
                  <div key={product.id} className="w-12 h-12 bg-background rounded-md overflow-hidden border border-border-light">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order.products.length > 3 && (
                  <div className="w-12 h-12 bg-secondary-100 rounded-md flex items-center justify-center border border-border-light">
                    <span className="text-xs font-medium text-text-secondary">+{order.products.length - 3}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-text-secondary">
                {order.items} item{order.items !== 1 ? 's' : ''} • Total: <span className="font-medium font-mono">${order.total.toFixed(2)}</span>
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              {order.trackingNumber && (
                <div className="text-sm">
                  <span className="text-text-secondary">Tracking: </span>
                  <span className="font-mono text-text-primary">{order.trackingNumber}</span>
                </div>
              )}
              {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                <div className="text-sm">
                  <span className="text-text-secondary">Est. Delivery: </span>
                  <span className="text-text-primary">
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/order-confirmation-tracking"
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-150"
            >
              <Icon name="Eye" size={16} />
              <span>View Details</span>
            </Link>

            {order.status === 'delivered' && (
              <button className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-md text-sm font-medium hover:bg-secondary-200 transition-colors duration-150">
                <Icon name="RotateCcw" size={16} />
                <span>Reorder</span>
              </button>
            )}

            {(order.status === 'processing' || order.status === 'shipped') && (
              <button className="flex items-center space-x-2 px-3 py-2 bg-error-100 text-error-700 rounded-md text-sm font-medium hover:bg-error-200 transition-colors duration-150">
                <Icon name="X" size={16} />
                <span>Cancel</span>
              </button>
            )}

            {order.trackingNumber && (
              <button className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border text-text-secondary rounded-md text-sm font-medium hover:bg-secondary-50 transition-colors duration-150">
                <Icon name="Truck" size={16} />
                <span>Track Package</span>
              </button>
            )}
          </div>
        </div>
      ))}

      {preview && orders.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-text-secondary">
            Showing {orders.length} of your recent orders
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentOrders;