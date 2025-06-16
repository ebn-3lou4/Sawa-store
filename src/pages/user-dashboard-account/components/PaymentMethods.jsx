import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock payment methods data
  useEffect(() => {
    const mockPaymentMethods = [
      {
        id: 1,
        type: 'credit',
        brand: 'visa',
        lastFour: '4242',
        expiryMonth: '12',
        expiryYear: '2026',
        holderName: 'John Doe',
        isDefault: true,
        addedDate: '2023-06-15'
      },
      {
        id: 2,
        type: 'credit',
        brand: 'mastercard',
        lastFour: '8888',
        expiryMonth: '08',
        expiryYear: '2025',
        holderName: 'John Doe',
        isDefault: false,
        addedDate: '2023-09-22'
      },
      {
        id: 3,
        type: 'debit',
        brand: 'visa',
        lastFour: '1234',
        expiryMonth: '03',
        expiryYear: '2027',
        holderName: 'John Doe',
        isDefault: false,
        addedDate: '2024-01-10'
      }
    ];

    setTimeout(() => {
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 500);
  }, []);

  const [formData, setFormData] = useState({
    type: 'credit',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (processedValue.length > 19) processedValue = processedValue.slice(0, 19);
    }

    // Limit CVV to 4 digits
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
  };

  const getCardBrand = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    if (number.startsWith('6')) return 'discover';
    return 'unknown';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    const brand = getCardBrand(cardNumber);
    const lastFour = cardNumber.slice(-4);

    if (editingMethod) {
      // Update existing payment method
      setPaymentMethods(prev => prev.map(method => 
        method.id === editingMethod.id 
          ? { 
              ...method,
              type: formData.type,
              brand,
              lastFour,
              expiryMonth: formData.expiryMonth,
              expiryYear: formData.expiryYear,
              holderName: formData.holderName,
              isDefault: formData.isDefault
            }
          : formData.isDefault ? { ...method, isDefault: false } : method
      ));
    } else {
      // Add new payment method
      const newMethod = {
        id: Date.now(),
        type: formData.type,
        brand,
        lastFour,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        holderName: formData.holderName,
        isDefault: formData.isDefault,
        addedDate: new Date().toISOString().split('T')[0]
      };
      
      setPaymentMethods(prev => 
        formData.isDefault 
          ? [...prev.map(method => ({ ...method, isDefault: false })), newMethod]
          : [...prev, newMethod]
      );
    }

    // Reset form
    setFormData({
      type: 'credit',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingMethod(null);
  };

  const handleEdit = (method) => {
    setFormData({
      type: method.type,
      cardNumber: `**** **** **** ${method.lastFour}`,
      expiryMonth: method.expiryMonth,
      expiryYear: method.expiryYear,
      cvv: '',
      holderName: method.holderName,
      isDefault: method.isDefault
    });
    setEditingMethod(method);
    setShowAddForm(true);
  };

  const handleDelete = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  };

  const setAsDefault = (methodId) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
  };

  const getCardIcon = (brand) => {
    switch (brand) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      case 'discover':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardBrandName = (brand) => {
    switch (brand) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'amex':
        return 'American Express';
      case 'discover':
        return 'Discover';
      default:
        return 'Card';
    }
  };

  const getCardColor = (brand) => {
    switch (brand) {
      case 'visa':
        return 'bg-blue-500';
      case 'mastercard':
        return 'bg-red-500';
      case 'amex':
        return 'bg-green-500';
      case 'discover':
        return 'bg-orange-500';
      default:
        return 'bg-secondary-500';
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 15; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-secondary-200 rounded w-32"></div>
                <div className="h-6 bg-secondary-200 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-secondary-200 rounded w-full"></div>
                <div className="h-3 bg-secondary-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Payment Methods</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Card</span>
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-surface border border-border rounded-lg p-4 relative">
            {method.isDefault && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              </div>
            )}

            {/* Card Visual */}
            <div className={`${getCardColor(method.brand)} rounded-lg p-4 text-white mb-4 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Icon name={getCardIcon(method.brand)} size={32} />
                  <span className="text-sm font-medium opacity-90">
                    {getCardBrandName(method.brand)}
                  </span>
                </div>
                
                <div className="font-mono text-lg tracking-wider mb-4">
                  •••• •••• •••• {method.lastFour}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="opacity-70 text-xs">CARDHOLDER</p>
                    <p className="font-medium">{method.holderName}</p>
                  </div>
                  <div>
                    <p className="opacity-70 text-xs">EXPIRES</p>
                    <p className="font-medium">{method.expiryMonth}/{method.expiryYear}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Type:</span>
                <span className="text-text-primary capitalize">{method.type} Card</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Added:</span>
                <span className="text-text-primary">
                  {new Date(method.addedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEdit(method)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-secondary-700 rounded-md text-sm font-medium hover:bg-secondary-200 transition-colors duration-150"
              >
                <Icon name="Edit2" size={14} />
                <span>Edit</span>
              </button>

              {!method.isDefault && (
                <button
                  onClick={() => setAsDefault(method.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors duration-150"
                >
                  <Icon name="Star" size={14} />
                  <span>Set Default</span>
                </button>
              )}

              <button
                onClick={() => handleDelete(method.id)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-error-100 text-error-700 rounded-md text-sm font-medium hover:bg-error-200 transition-colors duration-150"
              >
                <Icon name="Trash2" size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CreditCard" size={32} className="text-secondary-400" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No payment methods</h3>
          <p className="text-text-secondary mb-6">Add a payment method for faster checkout</p>
        </div>
      )}

      {/* Add/Edit Payment Method Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMethod(null);
                    setFormData({
                      type: 'credit',
                      cardNumber: '',
                      expiryMonth: '',
                      expiryYear: '',
                      cvv: '',
                      holderName: '',
                      isDefault: false
                    });
                  }}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Card Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="input-field font-mono"
                    required
                    disabled={editingMethod && formData.cardNumber.includes('*')}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Month
                    </label>
                    <select
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Year
                    </label>
                    <select
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">YYYY</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="input-field font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="holderName"
                    value={formData.holderName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="rounded border-border"
                  />
                  <label htmlFor="isDefault" className="text-sm text-text-secondary">
                    Set as default payment method
                  </label>
                </div>

                <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Shield" size={16} className="text-warning-600 mt-0.5" />
                    <div className="text-sm text-warning-700">
                      <p className="font-medium mb-1">Secure Payment</p>
                      <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    {editingMethod ? 'Update Card' : 'Add Card'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingMethod(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;