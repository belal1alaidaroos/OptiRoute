import React, { useState, useEffect } from 'react';
import {
  LockIcon,
  ShieldCheckIcon,
  KeyIcon,
  FingerprintIcon,
  TwoFactorAuthIcon,
  LogOutIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    passwordChangeRequired: false,
    sessionTimeout: 30, // minutes
    loginAlerts: false,
    deviceManagement: false
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/security-settings');
        if (res.data) {
          setSettings({
            twoFactorAuth: !!res.data.twoFactorAuth,
            passwordChangeRequired: !!res.data.passwordChangeRequired,
            sessionTimeout: Number(res.data.sessionTimeout) || 30,
            loginAlerts: !!res.data.loginAlerts,
            deviceManagement: !!res.data.deviceManagement
          });
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const handleSettingToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password changed successfully!');
  };

  const saveSecuritySettings = async () => {
    setSaving(true);
    try {
      await apiClient.put('/security-settings', {
        twoFactorAuth: settings.twoFactorAuth,
        passwordChangeRequired: settings.passwordChangeRequired,
        sessionTimeout: Number(settings.sessionTimeout) || 30,
        loginAlerts: settings.loginAlerts,
        deviceManagement: settings.deviceManagement
      });
    } catch {}
    setSaving(false);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <ShieldCheckIcon size={24} color="#3B82F6" />
        <h2 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1F2937'
        }}>
          Security Settings
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {loading && (
          <div style={{ marginBottom: '16px', color: '#6B7280' }}>Loading security settings...</div>
        )}
        {/* Password Settings */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <LockIcon size={20} color="#6B7280" />
            Password Settings
          </h3>
          
          <form onSubmit={handlePasswordChange} style={{
            backgroundColor: '#F9FAFB',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Security Features */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <KeyIcon size={20} color="#6B7280" />
            Security Features
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {/* Two-Factor Authentication */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TwoFactorAuthIcon size={20} color="#6B7280" />
                <div>
                  <div style={{ fontWeight: '500' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>Extra layer of security</div>
                </div>
              </div>
              <button 
                onClick={() => handleSettingToggle('twoFactorAuth')}
                style={{
                  background: settings.twoFactorAuth ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.twoFactorAuth ? 'flex-end' : 'flex-start',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  borderRadius: '50%'
                }} />
              </button>
            </div>

            {/* Login Alerts */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FingerprintIcon size={20} color="#6B7280" />
                <div>
                  <div style={{ fontWeight: '500' }}>Login Alerts</div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>Notify on new logins</div>
                </div>
              </div>
              <button 
                onClick={() => handleSettingToggle('loginAlerts')}
                style={{
                  background: settings.loginAlerts ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.loginAlerts ? 'flex-end' : 'flex-start',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  borderRadius: '50%'
                }} />
              </button>
            </div>

            {/* Device Management */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <KeyIcon size={20} color="#6B7280" />
                <div>
                  <div style={{ fontWeight: '500' }}>Device Management</div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>Manage connected devices</div>
                </div>
              </div>
              <button 
                onClick={() => handleSettingToggle('deviceManagement')}
                style={{
                  background: settings.deviceManagement ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.deviceManagement ? 'flex-end' : 'flex-start',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'white',
                  borderRadius: '50%'
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Session Settings */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <LockIcon size={20} color="#6B7280" />
            Session Settings
          </h3>
          
          <div style={{
            padding: '16px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Session Timeout (minutes)
            </label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="0">Never (not recommended)</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <LogOutIcon size={20} color="#EF4444" />
            Danger Zone
          </h3>
          
          <div style={{
            padding: '16px',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            backgroundColor: '#FEF2F2'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '500', color: '#DC2626' }}>Log Out of All Devices</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>
                This will log you out of all devices where you're currently signed in
              </div>
            </div>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                border: '1px solid #FECACA',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Log Out Everywhere
            </button>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={saveSecuritySettings}
            style={{
              padding: '12px 24px',
              backgroundColor: saving ? '#93C5FD' : '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Security Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;