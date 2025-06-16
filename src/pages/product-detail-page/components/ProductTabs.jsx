import React from 'react';
import Icon from '../../../components/AppIcon';

function ProductTabs({ product, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'shipping', label: 'Shipping & Returns', icon: 'Truck' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose max-w-none">
            <div className="text-text-primary leading-relaxed">
              <p className="mb-4">{product.description}</p>
              
              <h4 className="text-lg font-semibold text-text-primary mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-surface p-4 rounded-md">
                <h5 className="font-semibold text-text-primary mb-2">What's in the Box:</h5>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• 1x Premium Wireless Headphones</li>
                  <li>• 1x USB-C Charging Cable</li>
                  <li>• 1x 3.5mm Audio Cable</li>
                  <li>• 1x Carrying Case</li>
                  <li>• 1x Quick Start Guide</li>
                  <li>• 1x Warranty Card</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4">Technical Specifications</h4>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border-light last:border-b-0">
                      <span className="text-text-secondary font-medium">{spec.label}:</span>
                      <span className="text-text-primary text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4">Product Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary font-medium">SKU:</span>
                    <span className="text-text-primary font-mono">{product.sku}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary font-medium">Brand:</span>
                    <span className="text-text-primary">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary font-medium">Category:</span>
                    <span className="text-text-primary">{product.category.split(' > ').pop()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-text-secondary font-medium">Warranty:</span>
                    <span className="text-text-primary">{product.shipping.warranty}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface p-4 rounded-md">
              <h5 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span>Compatibility</span>
              </h5>
              <p className="text-sm text-text-secondary">
                Compatible with all Bluetooth-enabled devices including smartphones, tablets, laptops, and desktop computers. 
                Also works with wired connection using the included 3.5mm audio cable.
              </p>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Truck" size={20} className="text-primary" />
                  <span>Shipping Information</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">Free Standard Shipping</p>
                      <p className="text-sm text-text-secondary">On orders over $50. Delivery in 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Zap" size={16} className="text-accent mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">Express Shipping</p>
                      <p className="text-sm text-text-secondary">$9.99 - Next business day delivery available.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Globe" size={16} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">International Shipping</p>
                      <p className="text-sm text-text-secondary">Available to most countries. Rates calculated at checkout.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="RotateCcw" size={20} className="text-primary" />
                  <span>Returns & Exchanges</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Calendar" size={16} className="text-success mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">30-Day Return Policy</p>
                      <p className="text-sm text-text-secondary">Return items within 30 days for a full refund.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Package" size={16} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">Original Packaging Required</p>
                      <p className="text-sm text-text-secondary">Items must be in original condition and packaging.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CreditCard" size={16} className="text-accent mt-1" />
                    <div>
                      <p className="font-medium text-text-primary">Free Return Shipping</p>
                      <p className="text-sm text-text-secondary">We provide prepaid return labels for your convenience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface p-4 rounded-md">
              <h5 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Warranty Information</span>
              </h5>
              <p className="text-sm text-text-secondary mb-2">
                This product comes with a comprehensive 2-year international warranty covering manufacturing defects and hardware failures.
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Covers all manufacturing defects</li>
                <li>• Hardware component failures</li>
                <li>• Battery performance issues</li>
                <li>• Does not cover physical damage or water damage</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProductTabs;