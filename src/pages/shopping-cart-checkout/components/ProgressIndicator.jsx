import React from 'react';
import Icon from '../../../components/AppIcon';

function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-text-secondary">
            {steps.find(step => step.id === currentStep)?.name}
          </span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isUpcoming = step.id > currentStep;

              return (
                <li key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                        isCompleted
                          ? 'bg-primary border-primary text-white'
                          : isCurrent
                          ? 'bg-primary-50 border-primary text-primary' :'bg-background border-secondary-300 text-text-secondary'
                      }`}
                    >
                      {isCompleted ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <Icon name={step.icon} size={20} />
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isCompleted || isCurrent
                          ? 'text-text-primary' :'text-text-secondary'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                        step.id < currentStep
                          ? 'bg-primary' :'bg-secondary-300'
                      }`}
                      style={{ marginTop: '-1.5rem' }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default ProgressIndicator;