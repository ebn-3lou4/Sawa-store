import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

function AccountSettings({ user, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Update local form state when parent user prop changes (e.g., after saving)
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      security: true,
    },
    smsNotifications: {
      orderUpdates: true,
      promotions: false,
      security: false,
    },
    pushNotifications: {
      orderUpdates: true,
      promotions: false,
      newArrivals: false,
    },
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    dataSharing: false,
    marketingCommunications: false,
    thirdPartySharing: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "privacy", label: "Privacy", icon: "Lock" },
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(profileData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    console.log("Profile updated:", profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password updated");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // Show success message
  };

  const handleNotificationChange = (category, setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Personal Information
        </h3>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gender
            </label>
            <select
              value={profileData.gender}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="input-field"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {saveSuccess && (
            <p className="text-success-600 text-sm font-medium mb-2">
              Changes saved successfully!
            </p>
          )}
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Account Actions */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Account Actions
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => console.log("Download Account Data clicked")}
            className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 w-full text-left"
          >
            <Icon name="Download" size={20} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">
                Download Account Data
              </p>
              <p className="text-sm text-text-secondary">
                Get a copy of your account information
              </p>
            </div>
          </button>

          <button
            onClick={() => console.log("Delete Account clicked")}
            className="flex items-center space-x-3 p-3 bg-error-50 border border-error-200 rounded-lg hover:bg-error-100 transition-colors duration-150 w-full text-left"
          >
            <Icon name="UserX" size={20} className="text-error" />
            <div>
              <p className="font-medium text-error">Delete Account</p>
              <p className="text-sm text-error-600">
                Permanently delete your account and data
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="input-field"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Two-Factor Authentication
        </h3>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">
                SMS Authentication
              </p>
              <p className="text-sm text-text-secondary">
                Receive verification codes via SMS
              </p>
            </div>
            <button className="btn-secondary text-sm">Enable</button>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Active Sessions
        </h3>
        <div className="space-y-3">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Monitor"
                  size={20}
                  className="text-text-secondary"
                />
                <div>
                  <p className="font-medium text-text-primary">
                    Chrome on Windows
                  </p>
                  <p className="text-sm text-text-secondary">
                    Current session • New York, NY
                  </p>
                </div>
              </div>
              <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                Current
              </span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Smartphone"
                  size={20}
                  className="text-text-secondary"
                />
                <div>
                  <p className="font-medium text-text-primary">
                    Safari on iPhone
                  </p>
                  <p className="text-sm text-text-secondary">
                    2 hours ago • New York, NY
                  </p>
                </div>
              </div>
              <button className="text-error hover:text-error-700 text-sm font-medium">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Email Notifications
        </h3>
        <div className="space-y-3">
          {Object.entries(notificationSettings.emailNotifications).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {key === "orderUpdates" &&
                      "Get notified about your order status"}
                    {key === "promotions" &&
                      "Receive promotional offers and discounts"}
                    {key === "newsletter" &&
                      "Weekly newsletter with new products"}
                    {key === "security" &&
                      "Important security and account updates"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleNotificationChange("emailNotifications", key)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          SMS Notifications
        </h3>
        <div className="space-y-3">
          {Object.entries(notificationSettings.smsNotifications).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {key === "orderUpdates" &&
                      "SMS updates for order status changes"}
                    {key === "promotions" && "Text messages for special offers"}
                    {key === "security" && "Security alerts via SMS"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleNotificationChange("smsNotifications", key)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Push Notifications
        </h3>
        <div className="space-y-3">
          {Object.entries(notificationSettings.pushNotifications).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium text-text-primary capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {key === "orderUpdates" &&
                      "Browser notifications for orders"}
                    {key === "promotions" && "Push notifications for deals"}
                    {key === "newArrivals" && "Notifications for new products"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleNotificationChange("pushNotifications", key)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Profile Visibility
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg cursor-pointer">
            <input
              type="radio"
              name="profileVisibility"
              value="public"
              checked={privacySettings.profileVisibility === "public"}
              onChange={(e) =>
                handlePrivacyChange("profileVisibility", e.target.value)
              }
              className="text-primary"
            />
            <div>
              <p className="font-medium text-text-primary">Public</p>
              <p className="text-sm text-text-secondary">
                Your profile is visible to everyone
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg cursor-pointer">
            <input
              type="radio"
              name="profileVisibility"
              value="private"
              checked={privacySettings.profileVisibility === "private"}
              onChange={(e) =>
                handlePrivacyChange("profileVisibility", e.target.value)
              }
              className="text-primary"
            />
            <div>
              <p className="font-medium text-text-primary">Private</p>
              <p className="text-sm text-text-secondary">
                Only you can see your profile information
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Data & Privacy
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
            <div>
              <p className="font-medium text-text-primary">Data Sharing</p>
              <p className="text-sm text-text-secondary">
                Allow sharing of anonymized data for analytics
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.dataSharing}
                onChange={(e) =>
                  handlePrivacyChange("dataSharing", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
            <div>
              <p className="font-medium text-text-primary">
                Marketing Communications
              </p>
              <p className="text-sm text-text-secondary">
                Receive personalized marketing content
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.marketingCommunications}
                onChange={(e) =>
                  handlePrivacyChange(
                    "marketingCommunications",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
            <div>
              <p className="font-medium text-text-primary">
                Third-party Sharing
              </p>
              <p className="text-sm text-text-secondary">
                Share data with trusted partners for better service
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.thirdPartySharing}
                onChange={(e) =>
                  handlePrivacyChange("thirdPartySharing", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Tools */}
      <div className="border-t border-border-light pt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Privacy Tools
        </h3>
        <div className="space-y-3">
          <button className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 w-full text-left">
            <Icon name="Eye" size={20} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">View Data Usage</p>
              <p className="text-sm text-text-secondary">
                See how your data is being used
              </p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 w-full text-left">
            <Icon name="Download" size={20} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Export Data</p>
              <p className="text-sm text-text-secondary">
                Download a copy of your personal data
              </p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-3 bg-error-50 border border-error-200 rounded-lg hover:bg-error-100 transition-colors duration-150 w-full text-left">
            <Icon name="Trash2" size={20} className="text-error" />
            <div>
              <p className="font-medium text-error">Delete Personal Data</p>
              <p className="text-sm text-error-600">
                Request deletion of your personal information
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "security":
        return renderSecurityTab();
      case "notifications":
        return renderNotificationsTab();
      case "privacy":
        return renderPrivacyTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">
        Account Settings
      </h2>

      {/* Tab Navigation */}
      <div className="border-b border-border-light">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-150 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300"
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">{renderActiveTab()}</div>
    </div>
  );
}

export default AccountSettings;
