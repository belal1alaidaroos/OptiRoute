import React, { useState } from 'react';
import { 
  SettingsIcon, 
  UserIcon, 
  BellIcon, 
  ShieldIcon,
  DatabaseIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  SaveIcon,
  RefreshIcon
} from '../../components/icons/SVGIcons';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'OptiRoute360',
    companyEmail: 'admin@optiroute360.com',
    companyPhone: '+966 11 234 5678',
    timezone: 'Asia/Riyadh',
    language: 'English',
    currency: 'SAR',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    maintenanceAlerts: true,
    fuelAlerts: true,
    routeOptimization: true,
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '365'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'data', label: 'Data & Backup', icon: DatabaseIcon }
  ];

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          System Settings
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Configure system preferences and application settings
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                System Status
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#10B981', margin: 0 }}>
                Online
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <SettingsIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Active Users
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                24
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Last Backup
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                2h ago
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DatabaseIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Notifications
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                Enabled
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BellIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #F3F4F6',
          background: '#F8FAFC'
        }}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? '#1F2937' : '#6B7280',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'general' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                General Settings
              </h3>
              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Company Email
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="Asia/Riyadh">Asia/Riyadh</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="SAR">SAR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                Notification Settings
              </h3>
              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                  { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Get alerts for vehicle maintenance' },
                  { key: 'fuelAlerts', label: 'Fuel Alerts', desc: 'Get alerts for low fuel levels' }
                ].map((item) => (
                  <div key={item.key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {item.desc}
                      </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings[item.key]}
                        onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings[item.key] ? '#3B82F6' : '#D1D5DB',
                        borderRadius: '24px',
                        transition: '0.2s',
                        '&:before': {
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: settings[item.key] ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.2s'
                        }
                      }}>
                        <div style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: settings[item.key] ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.2s'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                Security Settings
              </h3>
              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                <div style={{
                  padding: '20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  background: '#F8FAFC'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                    Password Policy
                  </h4>
                  <ul style={{ fontSize: '14px', color: '#6B7280', margin: 0, paddingLeft: '20px' }}>
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
                <div style={{
                  padding: '20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  background: '#F8FAFC'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                    Session Management
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    Sessions expire after 8 hours of inactivity
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                Data & Backup Settings
              </h3>
              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Backup Frequency
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Data Retention (days)
                  </label>
                  <input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #F3F4F6' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <SaveIcon size={16} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

