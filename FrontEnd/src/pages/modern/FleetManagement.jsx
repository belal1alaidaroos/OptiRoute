import React, { useState } from 'react';
import { 
  TruckIcon, 
  UserIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XIcon
} from '../../components/icons/SVGIcons';

const FleetManagement = ({ activeTab = 'drivers' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data for drivers
  const [drivers] = useState([
    { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@optiroute.com', phone: '+966501234567', license: 'DL123456', status: 'Active', trips: 45, rating: 4.8 },
    { id: 2, name: 'Mohammed Hassan', email: 'mohammed@optiroute.com', phone: '+966501234568', license: 'DL123457', status: 'Active', trips: 32, rating: 4.6 },
    { id: 3, name: 'Khalid Ibrahim', email: 'khalid@optiroute.com', phone: '+966501234569', license: 'DL123458', status: 'Inactive', trips: 28, rating: 4.7 },
    { id: 4, name: 'Omar Abdullah', email: 'omar@optiroute.com', phone: '+966501234570', license: 'DL123459', status: 'Active', trips: 51, rating: 4.9 },
  ]);

  // Mock data for vehicles
  const [vehicles] = useState([
    { id: 1, plateNumber: 'ABC-1234', model: 'Mercedes Sprinter', year: 2022, status: 'Active', driver: 'Ahmed Al-Rashid', mileage: 45000, lastMaintenance: '2024-01-15' },
    { id: 2, plateNumber: 'XYZ-5678', model: 'Ford Transit', year: 2021, status: 'Maintenance', driver: 'Unassigned', mileage: 62000, lastMaintenance: '2024-01-10' },
    { id: 3, plateNumber: 'DEF-9012', model: 'Isuzu NPR', year: 2023, status: 'Active', driver: 'Mohammed Hassan', mileage: 28000, lastMaintenance: '2024-01-20' },
    { id: 4, plateNumber: 'GHI-3456', model: 'Mercedes Actros', year: 2022, status: 'Active', driver: 'Omar Abdullah', mileage: 78000, lastMaintenance: '2024-01-12' },
  ]);

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddDriverModal = () => (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '32px', 
        width: '500px', 
        maxHeight: '80vh', 
        overflowY: 'auto' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>Add New Driver</h3>
          <button 
            onClick={() => setShowAddModal(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <XIcon size={24} color="#6B7280" />
          </button>
        </div>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              Full Name
            </label>
            <input 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter driver's full name"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              Email Address
            </label>
            <input 
              type="email" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="driver@optiroute.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              Phone Number
            </label>
            <input 
              type="tel" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="+966501234567"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              License Number
            </label>
            <input 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="DL123456"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{ 
                flex: 1, 
                padding: '12px', 
                border: '1px solid #D1D5DB', 
                borderRadius: '8px', 
                background: 'white', 
                color: '#374151', 
                fontSize: '14px', 
                fontWeight: '500', 
                cursor: 'pointer' 
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ 
                flex: 1, 
                padding: '12px', 
                border: 'none', 
                borderRadius: '8px', 
                background: '#3B82F6', 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '500', 
                cursor: 'pointer' 
              }}
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
          Fleet Management
        </h1>
        <p style={{ margin: 0, color: '#6B7280', fontSize: '16px' }}>
          Manage your drivers and vehicles efficiently
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #E5E7EB', 
        marginBottom: '32px',
        gap: '32px'
      }}>
        <button
          onClick={() => setCurrentTab('drivers')}
          style={{
            padding: '12px 0',
            border: 'none',
            background: 'none',
            fontSize: '16px',
            fontWeight: '500',
            color: currentTab === 'drivers' ? '#3B82F6' : '#6B7280',
            borderBottom: currentTab === 'drivers' ? '2px solid #3B82F6' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <UserIcon size={20} />
          Drivers
        </button>
        <button
          onClick={() => setCurrentTab('vehicles')}
          style={{
            padding: '12px 0',
            border: 'none',
            background: 'none',
            fontSize: '16px',
            fontWeight: '500',
            color: currentTab === 'vehicles' ? '#3B82F6' : '#6B7280',
            borderBottom: currentTab === 'vehicles' ? '2px solid #3B82F6' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <TruckIcon size={20} />
          Vehicles
        </button>
      </div>

      {/* Content Area */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
        {/* Header with Search and Add Button */}
        <div style={{ 
          padding: '24px', 
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <SearchIcon 
              size={20} 
              color="#6B7280" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder={`Search ${currentTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <PlusIcon size={16} />
            Add {currentTab === 'drivers' ? 'Driver' : 'Vehicle'}
          </button>
        </div>

        {/* Drivers Table */}
        {currentTab === 'drivers' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Driver</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>License</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver, index) => (
                  <tr key={driver.id} style={{ borderBottom: index < filteredDrivers.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%', 
                          background: '#3B82F6', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{driver.name}</div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>ID: {driver.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{driver.email}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{driver.phone}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{driver.license}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: driver.status === 'Active' ? '#DCFCE7' : '#FEF3C7',
                        color: driver.status === 'Active' ? '#166534' : '#92400E'
                      }}>
                        {driver.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{driver.trips} trips</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>⭐ {driver.rating}/5.0</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ 
                          padding: '6px', 
                          border: '1px solid #D1D5DB', 
                          borderRadius: '6px', 
                          background: 'white', 
                          cursor: 'pointer' 
                        }}>
                          <EyeIcon size={16} color="#6B7280" />
                        </button>
                        <button style={{ 
                          padding: '6px', 
                          border: '1px solid #D1D5DB', 
                          borderRadius: '6px', 
                          background: 'white', 
                          cursor: 'pointer' 
                        }}>
                          <WrenchIcon size={16} color="#6B7280" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vehicles Table */}
        {currentTab === 'vehicles' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Driver</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mileage</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maintenance</th>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle, index) => (
                  <tr key={vehicle.id} style={{ borderBottom: index < filteredVehicles.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '8px', 
                          background: '#F3F4F6', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center'
                        }}>
                          <TruckIcon size={20} color="#6B7280" />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>{vehicle.plateNumber}</div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>{vehicle.model} ({vehicle.year})</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{vehicle.driver}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: vehicle.status === 'Active' ? '#DCFCE7' : vehicle.status === 'Maintenance' ? '#FEF3C7' : '#FEE2E2',
                        color: vehicle.status === 'Active' ? '#166534' : vehicle.status === 'Maintenance' ? '#92400E' : '#DC2626'
                      }}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{vehicle.mileage.toLocaleString()} km</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: '14px', color: '#1F2937' }}>{vehicle.lastMaintenance}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ 
                          padding: '6px', 
                          border: '1px solid #D1D5DB', 
                          borderRadius: '6px', 
                          background: 'white', 
                          cursor: 'pointer' 
                        }}>
                          <EyeIcon size={16} color="#6B7280" />
                        </button>
                        <button style={{ 
                          padding: '6px', 
                          border: '1px solid #D1D5DB', 
                          borderRadius: '6px', 
                          background: 'white', 
                          cursor: 'pointer' 
                        }}>
                          <WrenchIcon size={16} color="#6B7280" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && <AddDriverModal />}
    </div>
  );
};

export default FleetManagement;

