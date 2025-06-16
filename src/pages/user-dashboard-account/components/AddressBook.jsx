import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock addresses data
  useEffect(() => {
    const mockAddresses = [
      {
        id: 1,
        type: 'home',
        isDefault: true,
        name: 'John Doe',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phone: '+1 (555) 123-4567'
      },
      {
        id: 2,
        type: 'work',
        isDefault: false,
        name: 'John Doe',
        addressLine1: '456 Business Ave',
        addressLine2: 'Suite 200',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'United States',
        phone: '+1 (555) 987-6543'
      },
      {
        id: 3,
        type: 'other',
        isDefault: false,
        name: 'Jane Doe',
        addressLine1: '789 Family Road',
        addressLine2: '',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
        country: 'United States',
        phone: '+1 (555) 456-7890'
      }
    ];

    setTimeout(() => {
      setAddresses(mockAddresses);
      setLoading(false);
    }, 500);
  }, []);

  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id }
          : formData.isDefault ? { ...addr, isDefault: false } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      
      setAddresses(prev => 
        formData.isDefault 
          ? [...prev.map(addr => ({ ...addr, isDefault: false })), newAddress]
          : [...prev, newAddress]
      );
    }

    // Reset form
    setFormData({
      type: 'home',
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const setAsDefault = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  const getAddressTypeLabel = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Work';
      default:
        return 'Other';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-secondary-200 rounded w-24"></div>
                <div className="h-6 bg-secondary-200 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-secondary-200 rounded w-full"></div>
                <div className="h-3 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
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
        <h2 className="text-xl font-semibold text-text-primary">Address Book</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Address</span>
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-surface border border-border rounded-lg p-4 relative">
            {address.isDefault && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name={getAddressTypeIcon(address.type)} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{getAddressTypeLabel(address.type)}</h3>
                <p className="text-sm text-text-secondary">{address.name}</p>
              </div>
            </div>

            <div className="text-sm text-text-secondary space-y-1 mb-4">
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>{address.phone}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-secondary-100 text-secondary-700 rounded-md text-sm font-medium hover:bg-secondary-200 transition-colors duration-150"
              >
                <Icon name="Edit2" size={14} />
                <span>Edit</span>
              </button>

              {!address.isDefault && (
                <button
                  onClick={() => setAsDefault(address.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors duration-150"
                >
                  <Icon name="Star" size={14} />
                  <span>Set Default</span>
                </button>
              )}

              <button
                onClick={() => handleDelete(address.id)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-error-100 text-error-700 rounded-md text-sm font-medium hover:bg-error-200 transition-colors duration-150"
              >
                <Icon name="Trash2" size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={32} className="text-secondary-400" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No addresses saved</h3>
          <p className="text-text-secondary mb-6">Add your first shipping address</p>
        </div>
      )}

      {/* Add/Edit Address Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAddress(null);
                    setFormData({
                      type: 'home',
                      name: '',
                      addressLine1: '',
                      addressLine2: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      country: 'United States',
                      phone: '',
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
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
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
                    Set as default address
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    {editingAddress ? 'Update Address' : 'Add Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
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

export default AddressBook;