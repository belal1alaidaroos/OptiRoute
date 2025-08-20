import React, { useEffect, useState } from 'react';
import { 
  BellIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  TrashIcon,
  MailIcon,
  PhoneIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const GlobalNotificationsFixed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/global-notifications');
        setNotifications(data || []);
      } catch (err) {
        console.error('Failed to load global notifications', err);
      }
    };
    load();
  }, []);

  const types = ['all', 'System', 'Feature', 'Alert', 'Maintenance'];

  // CRUD Operations
  const handleCreate = () => {
    alert('Create new global notification functionality would be implemented here');
  };

  const handleView = (notification) => {
    alert(`Viewing notification: ${notification.title}`);
  };

  const handleEdit = (notification) => {
    alert(`Editing notification: ${notification.title}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this global notification?')) return;
    try {
      await apiClient.delete(`/global-notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete global notification', err);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Global Notifications
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage system-wide notifications and announcements
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
                Total Notifications
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                156
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
              <BellIcon size={24} color="white" />
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
                Active
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                12
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
              <CheckCircleIcon size={24} color="white" />
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
                Sent Today
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                8
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
              <ClockIcon size={24} color="white" />
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
                High Priority
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                3
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangleIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
              <SearchIcon style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleCreate}
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusIcon size={16} />
            Create Notification
          </button>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#F8FAFC' }}>
              <tr>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}>
                  Notification Details
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}>
                  Type & Priority
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}>
                  Recipients & Channels
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}>
                  Status
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notification, index) => (
                <tr key={notification.id} style={{
                  borderBottom: index < filteredNotifications.length - 1 ? '1px solid #F3F4F6' : 'none'
                }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {notification.title}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        {notification.message}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        Created: {notification.createdAt}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
                        marginBottom: '8px'
                      }}>
                        {notification.type}
                      </span>
                      <div>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          borderRadius: '16px',
                          backgroundColor: notification.priority === 'High' ? '#FEE2E2' : '#FEF3C7',
                          color: notification.priority === 'High' ? '#DC2626' : '#92400E'
                        }}>
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        {notification.recipients}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {notification.channels.join(', ')}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      backgroundColor: notification.status === 'Active' ? '#D1FAE5' : '#F3F4F6',
                      color: notification.status === 'Active' ? '#065F46' : '#374151'
                    }}>
                      {notification.status}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleView(notification)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#3B82F6'
                        }}
                      >
                        <EyeIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(notification)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#10B981'
                        }}
                      >
                        <WrenchIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#EF4444'
                        }}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GlobalNotificationsFixed;