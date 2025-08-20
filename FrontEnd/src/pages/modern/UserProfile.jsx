import React, { useState } from 'react';
import { 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  SaveIcon,
  CameraIcon,
  KeyIcon,
  BellIcon,
  ShieldIcon,
  EditIcon
} from '../../components/icons/SVGIcons';

const UserProfileFixed = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@optiroute360.com',
    phone: '+966 50 123 4567',
    role: 'Admin',
    department: 'Operations',
    joinDate: '2023-06-15',
    lastLogin: '2024-01-15 10:30',
    avatar: 'A'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ];

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          User Profile
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage your account settings and preferences
        </p>
      </div>

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
                Account Status
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#10B981', margin: 0 }}>
                Active
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
                Role
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {profile.role}
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
              <ShieldIcon size={24} color="white" />
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
                Member Since
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                2023
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
              <KeyIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
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
                  borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '32px' }}>
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: '600'
                  }}>
                    {profile.avatar}
                  </div>
                  <button style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#3B82F6',
                    border: '2px solid white',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CameraIcon size={14} />
                  </button>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1F2937', margin: 0, marginBottom: '4px' }}>
                    {profile.name}
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '16px', margin: 0, marginBottom: '4px' }}>
                    {profile.role} • {profile.department}
                  </p>
                  <p style={{ color: '#9CA3AF', fontSize: '14px', margin: 0 }}>
                    Last login: {profile.lastLogin}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
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
                      Department
                    </label>
                    <input
                      type="text"
                      value={profile.department}
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
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
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
                    value={profile.phone}
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

          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                Security Settings
              </h3>
              <div style={{ display: 'grid', gap: '24px', maxWidth: '600px' }}>
                <div style={{
                  padding: '20px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                    Change Password
                  </h4>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="password"
                      placeholder="Current Password"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
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
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
                Notification Preferences
              </h3>
              <div style={{ display: 'grid', gap: '16px', maxWidth: '600px' }}>
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                  { key: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' }
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
                      <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#3B82F6',
                        borderRadius: '24px',
                        transition: '0.2s'
                      }}>
                        <div style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: '26px',
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
                gap: '8px'
              }}
            >
              <SaveIcon size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFixed;

