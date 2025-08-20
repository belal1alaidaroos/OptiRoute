import React, { useState } from 'react';
import { 
  UserIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  XIcon,
  PhoneIcon,
  MailIcon,
  TrashIcon,
  LocationMarkerIcon
} from '../../components/icons/SVGIcons';

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // Lookup data
  const licenseTypes = [
    { id: 1, name: 'Light Vehicle' },
    { id: 2, name: 'Heavy Vehicle' },
    { id: 3, name: 'Motorcycle' },
    { id: 4, name: 'Public Transport' }
  ];

  const vehicleTypes = [
    { id: 1, name: 'Sedan' },
    { id: 2, name: 'SUV' },
    { id: 3, name: 'Truck' },
    { id: 4, name: 'Van' },
    { id: 5, name: 'Motorcycle' }
  ];

  const hubs = [
    { id: 1, name: 'Riyadh Main Hub' },
    { id: 2, name: 'Jeddah Operations' },
    { id: 3, name: 'Dammam Logistics' },
    { id: 4, name: 'Mecca Distribution' },
    { id: 5, name: 'Medina Center' }
  ];

  // Form data with new lookup fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license: '',
    licenseTypeId: '',
    vehicleTypeId: '',
    hubId: '',
    licenseExpiry: '',
    address: '',
    status: 'Active'
  });

  // State for drivers list with new fields
  const [drivers, setDrivers] = useState([
    { 
      id: 1, 
      name: 'Ahmed Al-Rashid', 
      email: 'ahmed@optiroute.com', 
      phone: '+966501234567', 
      license: 'DL123456', 
      licenseTypeId: 1, 
      vehicleTypeId: 1, 
      hubId: 1,
      status: 'Active', 
      trips: 45, 
      rating: 4.8, 
      joinDate: '2023-01-15', 
      address: 'Riyadh, Saudi Arabia', 
      licenseExpiry: '2025-01-15' 
    },
    { 
      id: 2, 
      name: 'Mohammed Hassan', 
      email: 'mohammed@optiroute.com', 
      phone: '+966501234568', 
      license: 'DL123457', 
      licenseTypeId: 2, 
      vehicleTypeId: 3, 
      hubId: 2,
      status: 'Active', 
      trips: 32, 
      rating: 4.6, 
      joinDate: '2023-02-20', 
      address: 'Jeddah, Saudi Arabia', 
      licenseExpiry: '2025-02-20' 
    },
    { 
      id: 3, 
      name: 'Khalid Ibrahim', 
      email: 'khalid@optiroute.com', 
      phone: '+966501234569', 
      license: 'DL123458', 
      licenseTypeId: 3, 
      vehicleTypeId: 5, 
      hubId: 3,
      status: 'Inactive', 
      trips: 28, 
      rating: 4.7, 
      joinDate: '2023-03-10', 
      address: 'Dammam, Saudi Arabia', 
      licenseExpiry: '2025-03-10' 
    },
    { 
      id: 4, 
      name: 'Omar Abdullah', 
      email: 'omar@optiroute.com', 
      phone: '+966501234570', 
      license: 'DL123459', 
      licenseTypeId: 1, 
      vehicleTypeId: 2, 
      hubId: 4,
      status: 'Active', 
      trips: 51, 
      rating: 4.9, 
      joinDate: '2023-01-05', 
      address: 'Mecca, Saudi Arabia', 
      licenseExpiry: '2025-01-05' 
    },
  ]);

  // Enhanced search to include lookup fields
  const filteredDrivers = drivers.filter(driver => {
    const searchLower = searchTerm.toLowerCase();
    const licenseType = licenseTypes.find(lt => lt.id === driver.licenseTypeId)?.name || '';
    const vehicleType = vehicleTypes.find(vt => vt.id === driver.vehicleTypeId)?.name || '';
    const hub = hubs.find(h => h.id === driver.hubId)?.name || '';
    
    return (
      driver.name.toLowerCase().includes(searchLower) ||
      driver.email.toLowerCase().includes(searchLower) ||
      driver.license.toLowerCase().includes(searchLower) ||
      licenseType.toLowerCase().includes(searchLower) ||
      vehicleType.toLowerCase().includes(searchLower) ||
      hub.toLowerCase().includes(searchLower)
    );
  });

  // CRUD Functions with new fields
  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.license || !formData.hubId) {
      alert('Please fill in all required fields');
      return;
    }

    const newDriver = {
      id: drivers.length + 1,
      ...formData,
      trips: 0,
      rating: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setDrivers([...drivers, newDriver]);
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      license: '', 
      licenseTypeId: '', 
      vehicleTypeId: '', 
      hubId: '',
      licenseExpiry: '', 
      address: '', 
      status: 'Active' 
    });
    setShowAddModal(false);
    alert('Driver added successfully!');
  };

  const handleEditDriver = (e) => {
    e.preventDefault();
    const updatedDrivers = drivers.map(driver => 
      driver.id === selectedDriver.id ? { ...driver, ...formData } : driver
    );
    setDrivers(updatedDrivers);
    setShowEditModal(false);
    setSelectedDriver(null);
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      license: '', 
      licenseTypeId: '', 
      vehicleTypeId: '', 
      hubId: '',
      licenseExpiry: '', 
      address: '', 
      status: 'Active' 
    });
    alert('Driver updated successfully!');
  };

  const handleDeleteDriver = () => {
    const updatedDrivers = drivers.filter(driver => driver.id !== selectedDriver.id);
    setDrivers(updatedDrivers);
    setShowDeleteModal(false);
    setSelectedDriver(null);
    alert('Driver deleted successfully!');
  };

  const openEditModal = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      license: driver.license,
      licenseTypeId: driver.licenseTypeId,
      vehicleTypeId: driver.vehicleTypeId,
      hubId: driver.hubId,
      licenseExpiry: driver.licenseExpiry,
      address: driver.address,
      status: driver.status
    });
    setShowEditModal(true);
  };

  const openViewModal = (driver) => {
    setSelectedDriver(driver);
    setShowViewModal(true);
  };

  const openDeleteModal = (driver) => {
    setSelectedDriver(driver);
    setShowDeleteModal(true);
  };

  // Statistics
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(d => d.status === 'Active').length;
  const inactiveDrivers = drivers.filter(d => d.status === 'Inactive').length;
  const avgRating = drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length;

  // Helper function to get lookup name by ID
  const getLookupName = (id, lookupArray) => {
    const item = lookupArray.find(item => item.id === id);
    return item ? item.name : 'N/A';
  };

  // Modal Components with new fields
  const AddDriverModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Add New Driver</h2>
          <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleAddDriver}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Number *</label>
            <input
              type="text"
              value={formData.license}
              onChange={(e) => setFormData({...formData, license: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Type *</label>
            <select
              value={formData.licenseTypeId}
              onChange={(e) => setFormData({...formData, licenseTypeId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              <option value="">Select License Type</option>
              {licenseTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Vehicle Type *</label>
            <select
              value={formData.vehicleTypeId}
              onChange={(e) => setFormData({...formData, vehicleTypeId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Hub *</label>
            <select
              value={formData.hubId}
              onChange={(e) => setFormData({...formData, hubId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              <option value="">Select Hub</option>
              {hubs.map(hub => (
                <option key={hub.id} value={hub.id}>{hub.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Expiry</label>
            <input
              type="date"
              value={formData.licenseExpiry}
              onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: '#3B82F6',
                color: 'white',
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

  const EditDriverModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Edit Driver</h2>
          <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleEditDriver}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Number *</label>
            <input
              type="text"
              value={formData.license}
              onChange={(e) => setFormData({...formData, license: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Type *</label>
            <select
              value={formData.licenseTypeId}
              onChange={(e) => setFormData({...formData, licenseTypeId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              {licenseTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Vehicle Type *</label>
            <select
              value={formData.vehicleTypeId}
              onChange={(e) => setFormData({...formData, vehicleTypeId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              {vehicleTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Hub *</label>
            <select
              value={formData.hubId}
              onChange={(e) => setFormData({...formData, hubId: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            >
              {hubs.map(hub => (
                <option key={hub.id} value={hub.id}>{hub.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>License Expiry</label>
            <input
              type="date"
              value={formData.licenseExpiry}
              onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: '#10B981',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Update Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const ViewDriverModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Driver Details</h2>
          <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserIcon size={36} color="white" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '700' }}>{selectedDriver?.name}</h3>
            <p style={{ margin: 0, color: '#6B7280' }}>Driver ID: {selectedDriver?.id}</p>
          </div>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Personal Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Email</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.email}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Phone</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.phone}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Address</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.address || 'N/A'}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Join Date</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>License & Vehicle</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>License Number</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.license}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>License Type</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{getLookupName(selectedDriver?.licenseTypeId, licenseTypes)}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Vehicle Type</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{getLookupName(selectedDriver?.vehicleTypeId, vehicleTypes)}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>License Expiry</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.licenseExpiry || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Hub & Status</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Hub</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LocationMarkerIcon size={16} color="#6B7280" />
                <p style={{ margin: 0, fontWeight: '500' }}>{getLookupName(selectedDriver?.hubId, hubs)}</p>
              </div>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Status</p>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                background: selectedDriver?.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                color: selectedDriver?.status === 'Active' ? '#065F46' : '#991B1B'
              }}>
                {selectedDriver?.status}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Performance</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Total Trips</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.trips}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280' }}>Rating</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#F59E0B' }}>⭐</span>
                <p style={{ margin: 0, fontWeight: '500' }}>{selectedDriver?.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DeleteConfirmModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '400px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Confirm Delete</h2>
        <p style={{ margin: '0 0 20px 0', color: '#6B7280' }}>
          Are you sure you want to delete driver "{selectedDriver?.name}"? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setShowDeleteModal(false)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteDriver}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: '#EF4444',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700', color: '#1F2937' }}>
          Driver Management
        </h1>
        <p style={{ margin: 0, color: '#6B7280', fontSize: '16px' }}>
          Manage your fleet drivers and their information
        </p>
      </div>

      {/* Statistics Cards - HORIZONTAL LAYOUT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '24px' 
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Total Drivers
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
                {totalDrivers}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
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
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Active Drivers
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#10B981' }}>
                {activeDrivers}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
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
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Inactive Drivers
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#EF4444' }}>
                {inactiveDrivers}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
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
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Average Rating
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#F59E0B' }}>
                {avgRating.toFixed(1)}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
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
      </div>

      {/* Controls */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <SearchIcon 
              size={20} 
              color="#6B7280" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search drivers by name, email, license, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
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
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon size={16} />
            Add Driver
          </button>
        </div>
      </div>

      {/* Drivers Table with new columns */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Driver</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Contact</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>License</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>License Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Vehicle Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Hub</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <UserIcon size={20} color="white" />
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1F2937' }}>{driver.name}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Joined: {driver.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MailIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#374151' }}>{driver.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <PhoneIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#374151' }}>{driver.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#1F2937' }}>{driver.license}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Expires: {driver.licenseExpiry}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      display: 'inline-block'
                    }}>
                      {getLookupName(driver.licenseTypeId, licenseTypes)}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: '#F0FDF4',
                      color: '#166534',
                      display: 'inline-block'
                    }}>
                      {getLookupName(driver.vehicleTypeId, vehicleTypes)}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <LocationMarkerIcon size={14} color="#6B7280" />
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>
                        {getLookupName(driver.hubId, hubs)}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: driver.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                      color: driver.status === 'Active' ? '#065F46' : '#991B1B'
                    }}>
                      {driver.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <button
                        onClick={() => openViewModal(driver)}
                        style={{
                          padding: '6px',
                          background: '#F3F4F6',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="View Driver"
                      >
                        <EyeIcon size={16} color="#6B7280" />
                      </button>
                      <button
                        onClick={() => openEditModal(driver)}
                        style={{
                          padding: '6px',
                          background: '#F3F4F6',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Edit Driver"
                      >
                        <WrenchIcon size={16} color="#6B7280" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(driver)}
                        style={{
                          padding: '6px',
                          background: '#FEE2E2',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete Driver"
                      >
                        <TrashIcon size={16} color="#EF4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddDriverModal />}
      {showEditModal && <EditDriverModal />}
      {showViewModal && <ViewDriverModal />}
      {showDeleteModal && <DeleteConfirmModal />}
    </div>
  );
};

export default Drivers;