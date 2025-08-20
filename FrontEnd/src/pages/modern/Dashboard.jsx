import React from 'react';
import { 
  TruckIcon, 
  RouteIcon, 
  PackageIcon, 
  WrenchIcon,
  UserIcon,
  FuelIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from '../../components/icons/SVGIcons';

const ModernDashboard = () => {
  const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '14px', 
            color: '#6B7280',
            fontWeight: '500'
          }}>
            {title}
          </p>
          <p style={{ 
            margin: '0 0 12px 0', 
            fontSize: '32px', 
            fontWeight: '700',
            color: '#1F2937',
            lineHeight: '1'
          }}>
            {value}
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {changeType === 'up' ? (
              <ArrowUpIcon size={16} color="#10B981" />
            ) : (
              <ArrowDownIcon size={16} color="#EF4444" />
            )}
            <span style={{ 
              color: changeType === 'up' ? '#10B981' : '#EF4444' 
            }}>
              {change}
            </span>
            <span style={{ color: '#6B7280', marginLeft: '4px' }}>
              vs last month
            </span>
          </div>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          background: `${color}15`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} color={color} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ title, description, time, status, icon: Icon }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 0',
      borderBottom: '1px solid #F3F4F6'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        background: status === 'success' ? '#10B98115' : status === 'warning' ? '#F59E0B15' : '#EF444415',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={20} color={
          status === 'success' ? '#10B981' : 
          status === 'warning' ? '#F59E0B' : '#EF4444'
        } />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ 
          margin: '0 0 4px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#1F2937'
        }}>
          {title}
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          color: '#6B7280'
        }}>
          {description}
        </p>
      </div>
      <span style={{ 
        fontSize: '12px', 
        color: '#9CA3AF',
        fontWeight: '500'
      }}>
        {time}
      </span>
    </div>
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '32px', 
          fontWeight: '700',
          color: '#1F2937'
        }}>
          Good morning, Admin
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: '16px', 
          color: '#6B7280'
        }}>
          Here's what's happening with your fleet today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <StatCard
          title="Total Vehicles"
          value="156"
          change="12%"
          changeType="up"
          icon={TruckIcon}
          color="#3B82F6"
        />
        <StatCard
          title="Active Trips"
          value="43"
          change="8%"
          changeType="up"
          icon={RouteIcon}
          color="#10B981"
        />
        <StatCard
          title="Pending Shipments"
          value="287"
          change="15%"
          changeType="up"
          icon={PackageIcon}
          color="#F59E0B"
        />
        <StatCard
          title="Maintenance Due"
          value="12"
          change="5%"
          changeType="down"
          icon={WrenchIcon}
          color="#EF4444"
        />
      </div>

      {/* Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '32px'
      }}>
        {/* Recent Activities */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1F2937'
            }}>
              Recent Activities
            </h3>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#3B82F6',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              View all
            </button>
          </div>
          
          <div>
            <ActivityItem
              title="Trip TR-001 Completed"
              description="Route from Central Hub to Downtown completed successfully"
              time="2 min ago"
              status="success"
              icon={CheckCircleIcon}
            />
            <ActivityItem
              title="Maintenance Alert"
              description="Vehicle VH-025 requires scheduled maintenance"
              time="15 min ago"
              status="warning"
              icon={WrenchIcon}
            />
            <ActivityItem
              title="New Trip Started"
              description="TR-002 departed with 5 shipments to North District"
              time="32 min ago"
              status="success"
              icon={RouteIcon}
            />
            <ActivityItem
              title="Driver Assignment"
              description="John Smith assigned to vehicle VH-018"
              time="1 hr ago"
              status="success"
              icon={UserIcon}
            />
            <ActivityItem
              title="Fuel Alert"
              description="Vehicle VH-012 fuel level below 20%"
              time="2 hrs ago"
              status="warning"
              icon={FuelIcon}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Fleet Status */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0', 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1F2937'
            }}>
              Fleet Status
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10B981',
                    borderRadius: '50%'
                  }} />
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Active</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>142</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#F59E0B',
                    borderRadius: '50%'
                  }} />
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Maintenance</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>12</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#6B7280',
                    borderRadius: '50%'
                  }} />
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Idle</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>2</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #E5E7EB'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0', 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1F2937'
            }}>
              Performance
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>On-time Delivery</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>94%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#F3F4F6',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '94%',
                    height: '100%',
                    background: '#10B981',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Fuel Efficiency</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>87%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#F3F4F6',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '87%',
                    height: '100%',
                    background: '#3B82F6',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Driver Satisfaction</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>91%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#F3F4F6',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '91%',
                    height: '100%',
                    background: '#F59E0B',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;

