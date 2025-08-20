import React, { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  UserIcon, 
  TruckIcon, 
  ClockIcon,
  DatabaseIcon,
  CalendarIcon,
  TrendingUpIcon,
  BellIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const UsageDashboardFixed = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [usageData, setUsageData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalVehicles: 0,
    activeVehicles: 0,
    totalTrips: 0,
    completedTrips: 0,
    dataUsage: '0 GB',
    apiCalls: 0
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/usage-dashboard');
        const first = Array.isArray(data) ? data[0] : data;
        if (first) {
          setUsageData({
            totalUsers: first.totalUsers || 0,
            activeUsers: first.activeUsers || 0,
            totalVehicles: first.totalVehicles || 0,
            activeVehicles: first.activeVehicles || 0,
            totalTrips: first.totalTrips || 0,
            completedTrips: first.completedTrips || 0,
            dataUsage: first.dataUsage || '0 GB',
            apiCalls: first.apiCalls || 0
          });
        }
      } catch (err) {
        console.error('Failed to load usage dashboard', err);
      }
    };
    load();
  }, []);

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Usage Dashboard
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Monitor system usage, performance metrics, and analytics
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
                Active Users
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {usageData.activeUsers}
              </p>
              <p style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
                +12% from last week
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
                Active Vehicles
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {usageData.activeVehicles}
              </p>
              <p style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
                +5% from last week
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
              <TruckIcon size={24} color="white" />
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
                Completed Trips
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {usageData.completedTrips}
              </p>
              <p style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
                +18% from last week
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
              <TrendingUpIcon size={24} color="white" />
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
                API Calls
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {usageData.apiCalls.toLocaleString()}
              </p>
              <p style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
                +8% from last week
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
              <BellIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
              Usage Trends
            </h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
          <div style={{ 
            height: '300px', 
            background: '#F8FAFC', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280'
          }}>
            <ChartBarIcon size={48} />
            <span style={{ marginLeft: '12px', fontSize: '16px' }}>Usage Chart Placeholder</span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
            System Health
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>CPU Usage</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>45%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Memory Usage</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#F59E0B' }}>72%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Disk Usage</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>38%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Network</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>Good</span>
            </div>
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
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '24px' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { time: '10:30 AM', action: 'User login', user: 'Ahmed Al-Rashid', type: 'success' },
            { time: '10:25 AM', action: 'Route optimized', user: 'System', type: 'info' },
            { time: '10:20 AM', action: 'Vehicle maintenance scheduled', user: 'Sarah Mohammed', type: 'warning' },
            { time: '10:15 AM', action: 'New shipment created', user: 'Omar Hassan', type: 'success' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #F3F4F6',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: activity.type === 'success' ? '#10B981' : 
                               activity.type === 'warning' ? '#F59E0B' : '#3B82F6',
                marginRight: '12px'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#1F2937' }}>
                  {activity.action}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  by {activity.user}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageDashboardFixed;

