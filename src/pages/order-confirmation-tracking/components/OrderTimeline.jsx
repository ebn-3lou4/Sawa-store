import React from 'react';
import Icon from '../../../components/AppIcon';

function OrderTimeline({ timeline }) {
  const getStatusIcon = (status) => {
    const iconMap = {
      ordered: 'ShoppingCart',
      processing: 'Package',
      shipped: 'Truck',
      out_for_delivery: 'MapPin',
      delivered: 'CheckCircle'
    };
    return iconMap[status] || 'Circle';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="Clock" size={20} className="mr-2 text-primary" />
        Order Status
      </h3>

      <div className="space-y-4">
        {timeline.map((step, index) => (
          <div key={step.status} className="flex items-start space-x-3">
            {/* Timeline Icon */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed 
                ? 'bg-success text-white' 
                : index === timeline.findIndex(s => !s.completed)
                  ? 'bg-primary text-white' :'bg-secondary-200 text-secondary-500'
            }`}>
              <Icon name={getStatusIcon(step.status)} size={16} />
            </div>

            {/* Timeline Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  step.completed ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-xs text-text-secondary font-mono">
                    {formatTimestamp(step.timestamp)}
                  </span>
                )}
              </div>
              <p className={`text-sm ${
                step.completed ? 'text-text-secondary' : 'text-text-secondary'
              }`}>
                {step.description}
              </p>
            </div>

            {/* Timeline Line */}
            {index < timeline.length - 1 && (
              <div className={`absolute left-[19px] mt-8 w-0.5 h-6 ${
                step.completed ? 'bg-success' : 'bg-secondary-200'
              }`} style={{ marginLeft: '-1px' }} />
            )}
          </div>
        ))}
      </div>

      {/* Estimated Delivery */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="text-sm text-text-secondary">Estimated delivery:</span>
          <span className="text-sm font-medium text-text-primary">
            January 22, 2024
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderTimeline;