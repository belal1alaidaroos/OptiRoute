import React, { useState } from 'react';
import { 
  ShieldIcon, 
  DownloadIcon,
  EyeIcon,
  UserIcon,
  ClockIcon,
  BellIcon,
  AlertTriangleIcon,
  SearchIcon 
} from '../../components/icons/SVGIcons';

const AuditLogsFixed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30:45',
      user: 'Ahmed Al-Rashid',
      userRole: 'Admin',
      action: 'User Created',
      resource: 'User Management',
      details: 'Created new user: Omar Hassan (Driver)',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      severity: 'Info',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:25:12',
      user: 'Sarah Mohammed',
      userRole: 'Manager',
      action: 'Vehicle Updated',
      resource: 'Fleet Management',
      details: 'Updated vehicle ABC-123: Changed status to Maintenance',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox 121.0.0.0',
      severity: 'Info',
      status: 'Success'
    },
    {
      id: 3,
      timestamp: '2024-01-15 10:20:33',
      user: 'System',
      userRole: 'System',
      action: 'Login Failed',
      resource: 'Authentication',
      details: 'Failed login attempt for user: unknown@test.com',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown',
      severity: 'Warning',
      status: 'Failed'
    },
    {
      id: 4,
      timestamp: '2024-01-15 10:15:20',
      user: 'Fatima Ali',
      userRole: 'Dispatcher',
      action: 'Route Optimized',
      resource: 'Operations',
      details: 'Optimized route for 15 deliveries, saved 45 minutes',
      ipAddress: '192.168.1.110',
      userAgent: 'Chrome 120.0.0.0',
      severity: 'Info',
      status: 'Success'
    },
    {
      id: 5,
      timestamp: '2024-01-15 10:10:15',
      user: 'Ahmed Al-Rashid',
      userRole: 'Admin',
      action: 'Settings Changed',
      resource: 'System Settings',
      details: 'Updated notification preferences: Enabled SMS alerts',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      severity: 'Medium',
      status: 'Success'
    },
    {
      id: 6,
      timestamp: '2024-01-15 10:05:08',
      user: 'System',
      userRole: 'System',
      action: 'Data Export',
      resource: 'Reports',
      details: 'Exported vehicle usage report (500 records)',
      ipAddress: '192.168.1.100',
      userAgent: 'System Process',
      severity: 'Info',
      status: 'Success'
    }
  ];

  const actions = ['all', 'User Created', 'User Updated', 'Vehicle Updated', 'Login Failed', 'Route Optimized', 'Settings Changed', 'Data Export'];
  const users = ['all', ...Array.from(new Set(auditLogs.map(log => log.user)))];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Info': return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'Warning': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Medium': return { bg: '#FED7AA', text: '#C2410C' };
      case 'High': return { bg: '#FEE2E2', text: '#DC2626' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Failed': return { bg: '#FEE2E2', text: '#DC2626' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Audit Logs
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Track and monitor all system activities and user actions
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
                Total Events
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {auditLogs.length}
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
                Success Rate
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {Math.round((auditLogs.filter(log => log.status === 'Success').length / auditLogs.length) * 100)}%
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
                Active Users
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {users.length - 1}
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
                Security Alerts
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {auditLogs.filter(log => log.severity === 'Warning' || log.severity === 'High').length}
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
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '300px' }}>
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
                placeholder="Search logs..."
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
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {actions.map(action => (
                <option key={action} value={action}>
                  {action === 'all' ? 'All Actions' : action}
                </option>
              ))}
            </select>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {users.map(user => (
                <option key={user} value={user}>
                  {user === 'all' ? 'All Users' : user}
                </option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '120px'
              }}
            >
              <option value="1day">Last 24h</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
          
          <button
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
            <DownloadIcon size={16} />
            Export
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
                  textTransform: 'uppercase',
                  minWidth: '180px'
                }}>
                  Timestamp
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '150px'
                }}>
                  User
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '120px'
                }}>
                  Action
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '300px'
                }}>
                  Details
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '100px'
                }}>
                  Severity
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '100px'
                }}>
                  Status
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  minWidth: '80px'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => {
                const severityColors = getSeverityColor(log.severity);
                const statusColors = getStatusColor(log.status);
                
                return (
                  <tr key={log.id} style={{
                    borderBottom: index < filteredLogs.length - 1 ? '1px solid #F3F4F6' : 'none'
                  }}>
                    <td style={{ 
                      padding: '20px 24px',
                      fontSize: '14px',
                      color: '#1F2937'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ClockIcon size={16} color="#6B7280" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      fontSize: '14px',
                      color: '#1F2937'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                          {log.user}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          {log.userRole}
                        </div>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1F2937'
                    }}>
                      {log.action}
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      fontSize: '14px',
                      color: '#1F2937',
                      maxWidth: '300px'
                    }}>
                      <div style={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {log.details}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        {log.resource} • {log.ipAddress}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backgroundColor: severityColors.bg,
                        color: severityColors.text
                      }}>
                        {log.severity}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backgroundColor: statusColors.bg,
                        color: statusColors.text
                      }}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <button style={{
                        background: 'none',
                        border: '1px solid #D1D5DB',
                        padding: '6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#374151'
                      }}>
                        <EyeIcon size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsFixed;

