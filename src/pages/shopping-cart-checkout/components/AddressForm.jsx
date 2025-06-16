import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

function AddressForm({ selectedAddress, onAddressSelect }) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  // Mock saved addresses
  const savedAddresses = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '(555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Corp',
      address1: '456 Business Ave',
      address2: 'Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '(555) 987-6543',
      isDefault: false
    }
  ];

  const handleInputChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveNewAddress = () => {
    // In a real app, this would save to backend
    const addressToSave = {
      ...newAddress,
      id: Date.now()
    };
    onAddressSelect(addressToSave);
    setShowNewAddressForm(false);
    setNewAddress({
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    });
  };

  const formatAddress = (address) => {
    const parts = [
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.zipCode}`,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Shipping Address</h3>

      {/* Saved Addresses */}
      <div className="space-y-3">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
              selectedAddress?.id === address.id
                ? 'border-primary bg-primary-50 shadow-subtle'
                : 'border-border hover:border-secondary-300 hover:shadow-subtle'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-text-primary">
                    {address.firstName} {address.lastName}
                  </h4>
                  {address.isDefault && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                
                {address.company && (
                  <p className="text-sm text-text-secondary mb-1">{address.company}</p>
                )}
                
                <p className="text-sm text-text-secondary mb-1">
                  {formatAddress(address)}
                </p>
                
                <p className="text-sm text-text-secondary">{address.phone}</p>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedAddress?.id === address.id
                  ? 'border-primary bg-primary' :'border-secondary-300'
              }`}>
                {selectedAddress?.id === address.id && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      {!showNewAddressForm && (
        <button
          onClick={() => setShowNewAddressForm(true)}
          className="w-full border-2 border-dashed border-secondary-300 rounded-lg p-4 text-text-secondary hover:border-primary hover:text-primary transition-colors duration-150 flex items-center justify-center space-x-2"
        >
          <Icon name="Plus" size={20} />
          <span>Add New Address</span>
        </button>
      )}

      {/* New Address Form */}
      {showNewAddressForm && (
        <div className="border border-border rounded-lg p-6 bg-background">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Add New Address</h4>
            <button
              onClick={() => setShowNewAddressForm(false)}
              className="text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={newAddress.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={newAddress.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                value={newAddress.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                value={newAddress.address1}
                onChange={(e) => handleInputChange('address1', e.target.value)}
                className="input-field"
                placeholder="Street address"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={newAddress.address2}
                onChange={(e) => handleInputChange('address2', e.target.value)}
                className="input-field"
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                City *
              </label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                State *
              </label>
              <select
                value={newAddress.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select State</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                value={newAddress.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newAddress.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-secondary">Set as default address</span>
            </label>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowNewAddressForm(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNewAddress}
              disabled={!newAddress.firstName || !newAddress.lastName || !newAddress.address1 || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressForm;