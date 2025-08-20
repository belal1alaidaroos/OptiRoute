import React, { useState } from 'react';
import { 
  BellIcon, 
  CheckCircleIcon,
  XIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  TruckIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
  SearchIcon 
} from '../../components/icons/SVGIcons';

const NotificationsCenterFixed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Alert',
      title: 'Vehicle ABC-123 maintenance overdue',
      message: 'Vehicle ABC-123 has exceeded the maintenance schedule by 500km. Please schedule maintenance immediately.',
      timestamp: '2024-01-15 10:45:00',
      status: 'Unread',
      priority: 'High',
      source: 'Maintenance System',
      recipient: 'Fleet Manager',
      actions: ['Schedule Maintenance', 'Mark as Read']
    },
    {
      id: 2,
      type: 'System',
      title: 'Daily backup completed successfully',
      message: 'System backup for January 15, 2024 has been completed successfully. All data has been backed up to secure storage.',
      timestamp: '2024-01-15 10:30:00',
      status: 'Read',
      priority: 'Low',
      source: 'Backup Service',
      recipient: 'System Administrator',
      actions: ['View Details', 'Download Report']
    },
    {
      id: 3,
      type: 'Delivery',
      title: 'Delivery completed for order #ORD-456',
      message: 'Driver Omar Hassan has successfully completed delivery for order #ORD-456 to customer Al-Rashid Trading.',
      timestamp: '2024-01-15 10:15:00',
      status: 'Read',
      priority: 'Medium',
      source: 'Delivery Service',
      recipient: 'Dispatcher',
      actions: ['View Order', 'Send Feedback']
    },
    {
      id: 4,
      type: 'User',
      title: 'New user registration pending approval',
      message: 'A new user "Fatima Al-Zahra" has registered and is pending approval for Driver role.',
      timestamp: '2024-01-15 09:45:00',
      status: 'Unread',
      priority: 'Medium',
      source: 'User Management',
      recipient: 'HR Manager',
      actions: ['Approve User', 'View Profile', 'Reject']
    },
    {
      id: 5,
      type: 'Route',
      title: 'Route optimization completed',
      message: 'Route optimization for 15 deliveries has been completed. Estimated time savings: 45 minutes, fuel savings: 12%.',
      timestamp: '2024-01-15 09:30:00',
      status: 'Read',
      priority: 'Low',
      source: 'Route Optimizer',
      recipient: 'Operations Manager',
      actions: ['View Route', 'Apply Changes']
    },
    {
      id: 6,
      type: 'Alert',
      title: 'Driver exceeded speed limit',
      message: 'Driver Ahmed Khalil exceeded speed limit (85 km/h in 60 km/h zone) on Route 101 at 09:15 AM.',
      timestamp: '2024-01-15 09:15:00',
      status: 'Unread',
      priority: 'High',
      source: 'Tracking System',
      recipient: 'Safety Manager',
      actions: ['Contact Driver', 'View Location', 'Generate Report']
    }
  ]);

  const types = ['all', 'Alert', 'System', 'Delivery', 'User', 'Route'];
  const statuses = ['all', 'Unread', 'Read'];

  // CRUD Operations
  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'Read' } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'Read' })));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'Alert': return { bg: '#FEE2E2', text: '#DC2626', icon: AlertTriangleIcon };
      case 'System': return { bg: '#DBEAFE', text: '#1D4ED8', icon: BellIcon };
      case 'Delivery': return { bg: '#D1FAE5', text: '#065F46', icon: TruckIcon };
      case 'User': return { bg: '#FEF3C7', text: '#92400E', icon: UserIcon };
      case 'Route': return { bg: '#E0E7FF', text: '#3730A3', icon: MessageSquareIcon };
      default: return { bg: '#F3F4F6', text: '#374151', icon: BellIcon };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'Medium': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Low': return { bg: '#DBEAFE', text: '#1D4ED8' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Notifications Center
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage system notifications and alerts
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
                {notifications.length}
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
                Unread
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {notifications.filter(n => n.status === 'Unread').length}
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
                {notifications.filter(n => n.priority === 'High').length}
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
              <AlertTriangleIcon size={24} color="white" />
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
                Today's Alerts
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {notifications.filter(n => n.type === 'Alert').length}
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
                minWidth: '130px'
              }}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '130px'
              }}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleMarkAllRead}
              style={{
                background: '#F3F4F6',
                color: '#374151',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircleIcon size={16} />
              Mark All Read
            </button>
            <button
              onClick={() => alert('Filter functionality would be implemented here')}
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
              <SearchIcon size={16} />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredNotifications.map((notification) => {
          const typeColors = getTypeColor(notification.type);
          const priorityColors = getPriorityColor(notification.priority);
          const IconComponent = typeColors.icon;
          
          return (
            <div key={notification.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              borderLeft: notification.status === 'Unread' ? '4px solid #3B82F6' : '4px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: typeColors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent size={20} color={typeColors.text} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: notification.status === 'Unread' ? '700' : '600', 
                        color: '#1F2937', 
                        margin: 0 
                      }}>
                        {notification.title}
                      </h3>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        borderRadius: '12px',
                        backgroundColor: typeColors.bg,
                        color: typeColors.text
                      }}>
                        {notification.type}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        borderRadius: '12px',
                        backgroundColor: priorityColors.bg,
                        color: priorityColors.text
                      }}>
                        {notification.priority}
                      </span>
                      {notification.status === 'Unread' && (
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#3B82F6'
                        }} />
                      )}
                    </div>
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6B7280', 
                      margin: 0, 
                      marginBottom: '12px', 
                      lineHeight: '1.5' 
                    }}>
                      {notification.message}
                    </p>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', fontSize: '12px', color: '#9CA3AF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ClockIcon size={12} />
                        {notification.timestamp}
                      </div>
                      <div>
                        Source: {notification.source}
                      </div>
                      <div>
                        To: {notification.recipient}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {notification.actions.map((action, index) => (
                        <button key={index} style={{
                          background: index === 0 ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'none',
                          color: index === 0 ? 'white' : '#374151',
                          border: index === 0 ? 'none' : '1px solid #D1D5DB',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  {notification.status === 'Unread' && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #D1D5DB',
                        padding: '6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#374151'
                      }}
                    >
                      <CheckCircleIcon size={14} />
                    </button>
                  )}
                  <button 
                    onClick={() => alert(`Viewing notification: ${notification.title}`)}
                    style={{
                      background: 'none',
                      border: '1px solid #D1D5DB',
                      padding: '6px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#374151'
                    }}
                  >
                    <EyeIcon size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(notification.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #D1D5DB',
                      padding: '6px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#EF4444'
                    }}
                  >
                    <XIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsCenterFixed;