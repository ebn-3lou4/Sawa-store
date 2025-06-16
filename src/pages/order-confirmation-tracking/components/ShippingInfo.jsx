import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import formatCurrency from '../../../utils/formatCurrency';

function ShippingInfo({ shipping, trackingNumber, estimatedDelivery }) {
  const [trackingExpanded, setTrackingExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTrackPackage = () => {
    // Mock tracking URL - in real app, this would open carrier's tracking page
    window.open(`https://www.ups.com/track?tracknum=${trackingNumber}`, '_blank');
  };

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(trackingNumber);
    alert('Tracking number copied to clipboard!');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="Truck" size={24} className="mr-2 text-primary" />
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Address */}
        <div>
          <h3 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="MapPin" size={18} className="mr-2 text-secondary" />
            Delivery Address
          </h3>
          <div className="bg-surface p-4 rounded-lg">
            <p className="font-medium text-text-primary">{shipping.address.name}</p>
            <p className="text-text-secondary">{shipping.address.street}</p>
            <p className="text-text-secondary">
              {shipping.address.city}, {shipping.address.state} {shipping.address.zipCode}
            </p>
            <p className="text-text-secondary">{shipping.address.country}</p>
          </div>
        </div>

        {/* Shipping Details */}
        <div>
          <h3 className="font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Package" size={18} className="mr-2 text-secondary" />
            Shipping Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Method</span>
              <span className="text-text-primary font-medium">{shipping.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Cost</span>
              <span className="text-text-primary font-medium font-mono">
                {formatCurrency(shipping.cost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Estimated Delivery</span>
              <span className="text-text-primary font-medium">
                {formatDate(estimatedDelivery)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Information */}
      {trackingNumber && (
        <div className="mt-6 pt-6 border-t border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary flex items-center">
              <Icon name="Search" size={18} className="mr-2 text-secondary" />
              Package Tracking
            </h3>
            <button
              onClick={() => setTrackingExpanded(!trackingExpanded)}
              className="text-primary hover:text-primary-700 text-sm font-medium"
            >
              {trackingExpanded ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-text-secondary">Tracking Number</p>
                <p className="font-mono text-text-primary font-medium">{trackingNumber}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={copyTrackingNumber}
                  className="p-2 text-primary hover:text-primary-700 hover:bg-primary-100 rounded-md transition-colors duration-150"
                  title="Copy tracking number"
                >
                  <Icon name="Copy" size={16} />
                </button>
                <button
                  onClick={handleTrackPackage}
                  className="px-3 py-2 bg-primary text-white hover:bg-primary-700 rounded-md text-sm font-medium transition-colors duration-150"
                >
                  Track Package
                </button>
              </div>
            </div>

            {trackingExpanded && (
              <div className="pt-3 border-t border-primary-200">
                <p className="text-sm text-text-secondary mb-2">Latest Update</p>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">
                    Package shipped from fulfillment center - New York, NY
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 ml-6">
                  January 16, 2024 at 9:15 AM
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingInfo;