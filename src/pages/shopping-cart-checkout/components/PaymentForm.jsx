import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

function PaymentForm({ paymentMethod, onPaymentMethodSelect }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: 'same'
  });

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Pay with Touch ID or Face ID'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Quick and secure payment'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    }
  ];

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return; // Limit to MM/YY
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return; // Limit to 4 digits
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'generic';
  };

  const isCardFormValid = () => {
    return (
      cardDetails.cardNumber.replace(/\s/g, '').length >= 13 &&
      cardDetails.expiryDate.length === 5 &&
      cardDetails.cvv.length >= 3 &&
      cardDetails.cardholderName.trim().length > 0
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
              paymentMethod?.id === method.id
                ? 'border-primary bg-primary-50 shadow-subtle'
                : 'border-border hover:border-secondary-300 hover:shadow-subtle'
            }`}
            onClick={() => onPaymentMethodSelect(method)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  paymentMethod?.id === method.id
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                }`}>
                  <Icon name={method.icon} size={20} />
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary">{method.name}</h4>
                  <p className="text-sm text-text-secondary">{method.description}</p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod?.id === method.id
                  ? 'border-primary bg-primary' :'border-secondary-300'
              }`}>
                {paymentMethod?.id === method.id && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Credit Card Form */}
      {paymentMethod?.id === 'credit-card' && (
        <div className="border border-border rounded-lg p-6 bg-background">
          <h4 className="font-medium text-text-primary mb-4">Card Information</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                  className="input-field pr-12"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon 
                    name="CreditCard" 
                    size={20} 
                    className={`${getCardType(cardDetails.cardNumber) === 'visa' ? 'text-blue-600' : 
                      getCardType(cardDetails.cardNumber) === 'mastercard' ? 'text-red-600' :
                      getCardType(cardDetails.cardNumber) === 'amex'? 'text-green-600' : 'text-text-secondary'}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                  className="input-field"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  CVV *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    className="input-field pr-10"
                    placeholder="123"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Icon name="HelpCircle" size={16} className="text-text-secondary" title="3-4 digit security code" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={cardDetails.cardholderName}
                onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Billing Address
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="billingAddress"
                    value="same"
                    checked={cardDetails.billingAddress === 'same'}
                    onChange={(e) => handleCardInputChange('billingAddress', e.target.value)}
                    className="text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-secondary">Same as shipping address</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="billingAddress"
                    value="different"
                    checked={cardDetails.billingAddress === 'different'}
                    onChange={(e) => handleCardInputChange('billingAddress', e.target.value)}
                    className="text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-secondary">Use a different billing address</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card Validation Status */}
          {cardDetails.cardNumber && (
            <div className="mt-4 p-3 rounded-md bg-secondary-50">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={isCardFormValid() ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={isCardFormValid() ? "text-success-600" : "text-warning-600"} 
                />
                <span className={`text-sm ${isCardFormValid() ? "text-success-600" : "text-warning-600"}`}>
                  {isCardFormValid() ? "Card information is valid" : "Please complete all required fields"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Digital Wallet Instructions */}
      {(paymentMethod?.id === 'apple-pay' || paymentMethod?.id === 'google-pay') && (
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Smartphone" size={24} className="text-primary" />
            <h4 className="font-medium text-text-primary">
              {paymentMethod.name} Setup
            </h4>
          </div>
          <p className="text-text-secondary mb-4">
            You'll be redirected to complete your payment securely with {paymentMethod.name}.
          </p>
          <div className="flex items-center space-x-2 text-sm text-success-600">
            <Icon name="Shield" size={16} />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      )}

      {/* PayPal Instructions */}
      {paymentMethod?.id === 'paypal' && (
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Wallet" size={24} className="text-primary" />
            <h4 className="font-medium text-text-primary">PayPal Checkout</h4>
          </div>
          <p className="text-text-secondary mb-4">
            You'll be redirected to PayPal to complete your payment securely.
          </p>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success-600" />
              <span>Pay with your PayPal balance, bank account, or credit card</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success-600" />
              <span>Buyer protection included</span>
            </div>
          </div>
        </div>
      )}

      {/* Security Information */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Secure Payment</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Your payment information is encrypted using SSL technology</li>
              <li>• We never store your complete card details on our servers</li>
              <li>• All transactions are processed through secure payment gateways</li>
              <li>• Your purchase is protected by our money-back guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;