import React, { useState } from 'react';
import { 
  AlertTriangleIcon, 
  DownloadIcon,
  EyeIcon,
  RefreshIcon,
  XIcon,
  CheckCircleIcon,
  ClockIcon,
  SearchIcon 
} from '../../components/icons/SVGIcons';

const ErrorLogsFixed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const errorLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 10:45:23',
      severity: 'Critical',
      status: 'Open',
      message: 'Database connection timeout',
      details: 'Connection to primary database server failed after 30 seconds timeout',
      source: 'Database Service',
      errorCode: 'DB_TIMEOUT_001',
      affectedUsers: 45,
      stackTrace: 'at DatabaseConnection.connect(db.js:125)\nat UserService.getUsers(user.js:45)',
      resolution: null,
      assignedTo: 'System Admin'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:30:15',
      severity: 'High',
      status: 'Resolved',
      message: 'Route optimization service unavailable',
      details: 'External route optimization API returned 503 Service Unavailable',
      source: 'Route Service',
      errorCode: 'ROUTE_API_503',
      affectedUsers: 12,
      stackTrace: 'at RouteOptimizer.optimize(route.js:89)\nat TripController.createTrip(trip.js:156)',
      resolution: 'Switched to backup route optimization service',
      assignedTo: 'DevOps Team'
    },
    {
      id: 3,
      timestamp: '2024-01-15 10:15:42',
      severity: 'Medium',
      status: 'In Progress',
      message: 'SMS delivery failed for multiple recipients',
      details: 'Twilio API rate limit exceeded, 23 SMS messages failed to send',
      source: 'Notification Service',
      errorCode: 'SMS_RATE_LIMIT',
      affectedUsers: 23,
      stackTrace: 'at SMSService.sendBulk(sms.js:67)\nat NotificationController.sendAlerts(notification.js:234)',
      resolution: 'Implementing SMS queue with rate limiting',
      assignedTo: 'Backend Team'
    },
    {
      id: 4,
      timestamp: '2024-01-15 09:58:11',
      severity: 'Low',
      status: 'Resolved',
      message: 'Vehicle location update delayed',
      details: 'GPS tracking data delayed by 5 minutes for vehicle ABC-123',
      source: 'Tracking Service',
      errorCode: 'GPS_DELAY_WARN',
      affectedUsers: 1,
      stackTrace: 'at GPSTracker.updateLocation(gps.js:45)\nat VehicleService.trackVehicle(vehicle.js:123)',
      resolution: 'GPS device reconnected automatically',
      assignedTo: 'Support Team'
    },
    {
      id: 5,
      timestamp: '2024-01-15 09:45:33',
      severity: 'High',
      status: 'Open',
      message: 'Payment processing failed',
      details: 'Stripe webhook validation failed for subscription renewal',
      source: 'Payment Service',
      errorCode: 'PAYMENT_WEBHOOK_FAIL',
      affectedUsers: 3,
      stackTrace: 'at PaymentWebhook.validate(payment.js:178)\nat BillingController.processRenewal(billing.js:89)',
      resolution: null,
      assignedTo: 'Finance Team'
    }
  ];

  const severities = ['all', 'Critical', 'High', 'Medium', 'Low'];
  const statuses = ['all', 'Open', 'In Progress', 'Resolved'];

  const filteredLogs = errorLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return { bg: '#FEE2E2', text: '#DC2626', icon: '#DC2626' };
      case 'High': return { bg: '#FED7AA', text: '#C2410C', icon: '#C2410C' };
      case 'Medium': return { bg: '#FEF3C7', text: '#92400E', icon: '#92400E' };
      case 'Low': return { bg: '#DBEAFE', text: '#1D4ED8', icon: '#1D4ED8' };
      default: return { bg: '#F3F4F6', text: '#374151', icon: '#374151' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'In Progress': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Resolved': return { bg: '#D1FAE5', text: '#065F46' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Error Logs
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Monitor and track system errors and exceptions
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
                Total Errors
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {errorLogs.length}
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
                Open Issues
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {errorLogs.filter(log => log.status === 'Open').length}
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
              <XIcon size={24} color="white" />
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
                Critical Errors
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {errorLogs.filter(log => log.severity === 'Critical').length}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
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
                Resolution Rate
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {Math.round((errorLogs.filter(log => log.status === 'Resolved').length / errorLogs.length) * 100)}%
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
                placeholder="Search errors..."
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
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '130px'
              }}
            >
              {severities.map(severity => (
                <option key={severity} value={severity}>
                  {severity === 'all' ? 'All Severities' : severity}
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
                  {status === 'all' ? 'All Statuses' : status}
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
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
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
              <RefreshIcon size={16} />
              Refresh
            </button>
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
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {filteredLogs.map((log) => {
          const severityColors = getSeverityColor(log.severity);
          const statusColors = getStatusColor(log.status);
          
          return (
            <div key={log.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              borderLeft: `4px solid ${severityColors.icon}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <AlertTriangleIcon size={20} color={severityColors.icon} />
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                      {log.message}
                    </h3>
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
                  </div>
                  
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, marginBottom: '16px', lineHeight: '1.5' }}>
                    {log.details}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Error Code</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600', fontFamily: 'monospace' }}>
                        {log.errorCode}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Source</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {log.source}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Affected Users</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {log.affectedUsers}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Assigned To</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {log.assignedTo}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Timestamp</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ClockIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#1F2937' }}>
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {log.resolution && (
                    <div style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '12px',
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600', marginBottom: '4px' }}>
                        Resolution:
                      </div>
                      <div style={{ fontSize: '14px', color: '#065F46' }}>
                        {log.resolution}
                      </div>
                    </div>
                  )}

                  <details style={{ marginTop: '16px' }}>
                    <summary style={{ 
                      fontSize: '14px', 
                      color: '#6B7280', 
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                      Stack Trace
                    </summary>
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '12px',
                      marginTop: '8px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      color: '#374151',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {log.stackTrace}
                    </div>
                  </details>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button style={{
                    background: 'none',
                    border: '1px solid #D1D5DB',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <EyeIcon size={16} />
                    Details
                  </button>
                  {log.status === 'Open' && (
                    <button style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <CheckCircleIcon size={16} />
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ErrorLogsFixed;

