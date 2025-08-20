import React, { useState } from 'react';
import { PackageIcon, RouteIcon, MapPinIcon } from '../../components/icons/SVGIcons';

const Operations = ({ activeTab = 'operations' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab === 'operations' ? 'shipments' : activeTab);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
          Operations Management
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#6B7280' }}>
          Manage shipments, trips, and route optimization
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {[
          { id: 'shipments', label: 'Shipments', icon: PackageIcon },
          { id: 'trips', label: 'Trips', icon: RouteIcon },
          { id: 'route-optimize', label: 'Route Optimization', icon: MapPinIcon }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            style={{
              padding: '12px 24px',
              background: currentTab === tab.id ? '#3B82F6' : 'white',
              color: currentTab === tab.id ? 'white' : '#6B7280',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{
        background: 'white',
        padding: '48px',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#F3F4F6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          {currentTab === 'shipments' && <PackageIcon size={32} color="#6B7280" />}
          {currentTab === 'trips' && <RouteIcon size={32} color="#6B7280" />}
          {currentTab === 'route-optimize' && <MapPinIcon size={32} color="#6B7280" />}
        </div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>
          {currentTab === 'shipments' && 'Shipments Management'}
          {currentTab === 'trips' && 'Trips Management'}
          {currentTab === 'route-optimize' && 'Route Optimization'}
        </h3>
        <p style={{ margin: '0 auto 24px auto', color: '#6B7280', maxWidth: '400px' }}>
          {currentTab === 'shipments' && 'Create, track, and manage all your shipments in one place.'}
          {currentTab === 'trips' && 'Plan, monitor, and optimize your delivery trips efficiently.'}
          {currentTab === 'route-optimize' && 'Optimize routes for maximum efficiency and cost savings.'}
        </p>
        <button style={{
          background: '#3B82F6',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Operations;

