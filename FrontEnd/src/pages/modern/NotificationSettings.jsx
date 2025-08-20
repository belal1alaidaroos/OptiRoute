import React, { useEffect, useState } from 'react';
import { 
  BellIcon,
  CheckIcon,
  MailIcon,
  SmartphoneIcon,
  ToggleLeftIcon,
  ToggleRightIcon 
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceAlerts: true,
    routeUpdates: true,
    deliveryStatus: false,
    soundEnabled: true,
    vibrationEnabled: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/notification-settings');
        if (data) setSettings({
          emailNotifications: data.emailNotifications,
          smsNotifications: data.smsNotifications,
          pushNotifications: data.pushNotifications,
          maintenanceAlerts: data.maintenanceAlerts,
          routeUpdates: data.routeUpdates,
          deliveryStatus: data.deliveryStatus,
          soundEnabled: data.soundEnabled,
          vibrationEnabled: data.vibrationEnabled
        });
      } catch (err) {
        console.error('Failed to load notification settings', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiClient.put('/notification-settings', settings);
      alert('Notification settings saved!');
    } catch (err) {
      console.error('Failed to save notification settings', err);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      setSettings({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        maintenanceAlerts: true,
        routeUpdates: true,
        deliveryStatus: false,
        soundEnabled: true,
        vibrationEnabled: false
      });
    }
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
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BellIcon size={24} color="#3B82F6" />
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#1F2937'
          }}>
            Notification Settings
          </h2>
        </div>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            background: '#F3F4F6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Reset to Default
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Notification Channels */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937'
          }}>
            Notification Channels
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {/* Email Notifications */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MailIcon size={20} color="#6B7280" />
                <span style={{ fontWeight: '500' }}>Email Notifications</span>
              </div>
              <button 
                onClick={() => toggleSetting('emailNotifications')}
                style={{
                  background: settings.emailNotifications ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.emailNotifications ? 'flex-end' : 'flex-start',
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

            {/* SMS Notifications */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <SmartphoneIcon size={20} color="#6B7280" />
                <span style={{ fontWeight: '500' }}>SMS Notifications</span>
              </div>
              <button 
                onClick={() => toggleSetting('smsNotifications')}
                style={{
                  background: settings.smsNotifications ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.smsNotifications ? 'flex-end' : 'flex-start',
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

            {/* Push Notifications */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BellIcon size={20} color="#6B7280" />
                <span style={{ fontWeight: '500' }}>Push Notifications</span>
              </div>
              <button 
                onClick={() => toggleSetting('pushNotifications')}
                style={{
                  background: settings.pushNotifications ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.pushNotifications ? 'flex-end' : 'flex-start',
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

        {/* Notification Types */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937'
          }}>
            Notification Types
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {/* Maintenance Alerts */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>Maintenance Alerts</span>
                <button 
                  onClick={() => toggleSetting('maintenanceAlerts')}
                  style={{
                    background: settings.maintenanceAlerts ? '#3B82F6' : '#E5E7EB',
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px',
                    justifyContent: settings.maintenanceAlerts ? 'flex-end' : 'flex-start',
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
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                Get alerts for scheduled vehicle maintenance
              </p>
            </div>

            {/* Route Updates */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>Route Updates</span>
                <button 
                  onClick={() => toggleSetting('routeUpdates')}
                  style={{
                    background: settings.routeUpdates ? '#3B82F6' : '#E5E7EB',
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px',
                    justifyContent: settings.routeUpdates ? 'flex-end' : 'flex-start',
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
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                Receive updates about route changes and optimizations
              </p>
            </div>

            {/* Delivery Status */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>Delivery Status</span>
                <button 
                  onClick={() => toggleSetting('deliveryStatus')}
                  style={{
                    background: settings.deliveryStatus ? '#3B82F6' : '#E5E7EB',
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px',
                    justifyContent: settings.deliveryStatus ? 'flex-end' : 'flex-start',
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
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                Get notifications about shipment delivery status
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937'
          }}>
            Notification Preferences
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {/* Sound */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontWeight: '500' }}>Enable Sound</span>
              <button 
                onClick={() => toggleSetting('soundEnabled')}
                style={{
                  background: settings.soundEnabled ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.soundEnabled ? 'flex-end' : 'flex-start',
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

            {/* Vibration */}
            <div style={{
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontWeight: '500' }}>Enable Vibration</span>
              <button 
                onClick={() => toggleSetting('vibrationEnabled')}
                style={{
                  background: settings.vibrationEnabled ? '#3B82F6' : '#E5E7EB',
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                  justifyContent: settings.vibrationEnabled ? 'flex-end' : 'flex-start',
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

        {/* Save Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          marginTop: '32px'
        }}>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;