"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";


const SettingsPage = () => {
  // State for appearance and language dropdowns
  const [appearance, setAppearance] = useState("Light");
  const [language, setLanguage] = useState("English");

  // State for toggles
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [mobilePushNotifications, setMobilePushNotifications] = useState(true);
  const [desktopNotification, setDesktopNotification] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 p-4 sm:p-10">
        {/* Header */}
        <Header />
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {/* Appearance */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">Appearance</h2>
          <p className="text-gray-500 text-sm">Customize how your theme looks on your device</p>
        </div>
        <select
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>

      {/* Language */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">Language</h2>
          <p className="text-gray-500 text-sm">Select your language</p>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      {/* Two-factor Authentication */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">Two-factor Authentication</h2>
          <p className="text-gray-500 text-sm">Keep your account secure by enabling 2FA via mail</p>
        </div>
        <input
          type="checkbox"
          checked={twoFactorAuth}
          onChange={() => setTwoFactorAuth(!twoFactorAuth)}
          className="toggle-checkbox"
        />
      </div>

      {/* Mobile Push Notifications */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">Mobile Push Notifications</h2>
          <p className="text-gray-500 text-sm">Receive push notifications</p>
        </div>
        <input
          type="checkbox"
          checked={mobilePushNotifications}
          onChange={() => setMobilePushNotifications(!mobilePushNotifications)}
          className="toggle-checkbox"
        />
      </div>

      {/* Desktop Notification */}
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">Desktop Notification</h2>
          <p className="text-gray-500 text-sm">Receive push notifications on desktop</p>
        </div>
        <input
          type="checkbox"
          checked={desktopNotification}
          onChange={() => setDesktopNotification(!desktopNotification)}
          className="toggle-checkbox"
        />
      </div>

      {/* Email Notifications */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h2 className="font-semibold text-lg">Email Notifications</h2>
          <p className="text-gray-500 text-sm">Receive email notifications</p>
        </div>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
          className="toggle-checkbox"
        />
      </div>
    </div>
    </div>
    </div>
  );
};

export default SettingsPage;
