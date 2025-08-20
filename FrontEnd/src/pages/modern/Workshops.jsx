import React, { useState } from 'react';
import { 
  BuildingIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  TrashIcon,
  MapPinIcon,
  UserIcon,
  CheckCircleIcon,
  PencilIcon,
  GlobeIcon,
  FuelIcon
} from '../../components/icons/SVGIcons';

// Mock city data for lookup
const cities = [
  { id: 1, name: 'Riyadh' },
  { id: 2, name: 'Jeddah' },
  { id: 3, name: 'Dammam' },
  { id: 4, name: 'Mecca' },
  { id: 5, name: 'Medina' },
];

// Workshop types
const WORKSHOP_TYPES = {
  MAINTENANCE: 'Maintenance',
  FUEL_STATION: 'Fuel Station'
};

const Workshops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingWorkshop, setViewingWorkshop] = useState(null);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      name: 'Al-Riyadh Auto Service',
      location: 'Industrial Area, Riyadh',
      cityId: 1,
      phone: '+966 11 234 5678',
      email: 'info@riyadhauto.com',
      specialties: ['Engine Repair', 'Transmission', 'Electrical'],
      rating: 4.8,
      status: 'Active',
      capacity: '15 vehicles',
      currentJobs: 8,
      latitude: 24.7136,
      longitude: 46.6753,
      type: WORKSHOP_TYPES.MAINTENANCE
    },
    {
      id: 2,
      name: 'Modern Fleet Maintenance',
      location: 'Warehouse District, Jeddah',
      cityId: 2,
      phone: '+966 12 345 6789',
      email: 'service@modernfleet.com',
      specialties: ['Brake Systems', 'AC Repair', 'Body Work'],
      rating: 4.6,
      status: 'Active',
      capacity: '20 vehicles',
      currentJobs: 12,
      latitude: 21.5433,
      longitude: 39.1728,
      type: WORKSHOP_TYPES.MAINTENANCE
    },
    {
      id: 3,
      name: 'Saudi Fuel Center',
      location: 'Highway 40, Dammam',
      cityId: 3,
      phone: '+966 13 456 7890',
      email: 'contact@saudifuel.com',
      specialties: ['Diesel', 'Gasoline', 'LPG'],
      rating: 4.2,
      status: 'Active',
      capacity: '8 lanes',
      currentJobs: 5,
      latitude: 26.4207,
      longitude: 50.0888,
      type: WORKSHOP_TYPES.FUEL_STATION
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cityId: '',
    phone: '',
    email: '',
    specialties: [],
    rating: 0,
    status: 'Active',
    capacity: '',
    currentJobs: 0,
    latitude: '',
    longitude: '',
    type: WORKSHOP_TYPES.MAINTENANCE
  });

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get city name by ID
  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : 'Unknown City';
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle specialties change
  const handleSpecialtiesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      specialties: options
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingWorkshop) {
      // Update existing workshop
      setWorkshops(workshops.map(workshop => 
        workshop.id === editingWorkshop.id ? { ...formData, id: editingWorkshop.id } : workshop
      ));
    } else {
      // Add new workshop
      const newWorkshop = {
        ...formData,
        id: workshops.length > 0 ? Math.max(...workshops.map(w => w.id)) + 1 : 1
      };
      setWorkshops([...workshops, newWorkshop]);
    }
    
    // Reset form and close modal
    setFormData({
      name: '',
      location: '',
      cityId: '',
      phone: '',
      email: '',
      specialties: [],
      rating: 0,
      status: 'Active',
      capacity: '',
      currentJobs: 0,
      latitude: '',
      longitude: '',
      type: WORKSHOP_TYPES.MAINTENANCE
    });
    setEditingWorkshop(null);
    setShowAddModal(false);
  };

  // Set workshop for editing
  const handleEdit = (workshop) => {
    setFormData(workshop);
    setEditingWorkshop(workshop);
    setShowAddModal(true);
  };

  // Delete workshop
  const handleDelete = (workshopId) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      setWorkshops(workshops.filter(workshop => workshop.id !== workshopId));
    }
  };

  // View workshop details
  const handleView = (workshop) => {
    setViewingWorkshop(workshop);
  };

  // Generate Google Maps URL
  const getGoogleMapsUrl = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  // Get workshop type icon
  const getWorkshopTypeIcon = (type) => {
    if (type === WORKSHOP_TYPES.FUEL_STATION) {
      return <FuelIcon size={16} color="#6B7280" />;
    }
    return <WrenchIcon size={16} color="#6B7280" />;
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Workshop Management
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage maintenance workshops and fuel stations
        </p>
      </div>

      {/* Stats Cards */}
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
                Total Workshops
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {workshops.length}
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
              <BuildingIcon size={24} color="white" />
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
                Maintenance
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {workshops.filter(w => w.type === WORKSHOP_TYPES.MAINTENANCE).length}
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
              <WrenchIcon size={24} color="white" />
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
                Fuel Stations
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {workshops.filter(w => w.type === WORKSHOP_TYPES.FUEL_STATION).length}
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
              <FuelIcon size={24} color="white" />
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
                Avg Rating
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {workshops.length > 0 
                  ? (workshops.reduce((sum, workshop) => sum + workshop.rating, 0) / workshops.length).toFixed(1)
                  : '0.0'}
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
              <UserIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
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
              placeholder="Search workshops..."
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
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
            />
          </div>
          <button
            onClick={() => {
              setFormData({
                name: '',
                location: '',
                cityId: '',
                phone: '',
                email: '',
                specialties: [],
                rating: 0,
                status: 'Active',
                capacity: '',
                currentJobs: 0,
                latitude: '',
                longitude: '',
                type: WORKSHOP_TYPES.MAINTENANCE
              });
              setEditingWorkshop(null);
              setShowAddModal(true);
            }}
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
              gap: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon size={16} />
            Add Workshop
          </button>
        </div>
      </div>

      {/* Workshops Table */}
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
                  letterSpacing: '0.05em'
                }}>
                  Workshop Details
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Type & Contact
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Location Details
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Capacity & Jobs
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Rating
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkshops.map((workshop, index) => (
                <tr key={workshop.id} style={{
                  borderBottom: index < filteredWorkshops.length - 1 ? '1px solid #F3F4F6' : 'none'
                }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {workshop.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        {workshop.location}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {workshop.specialties.join(', ')}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {getWorkshopTypeIcon(workshop.type)}
                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937' }}>
                          {workshop.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        {workshop.phone}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {workshop.email}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '500' }}>City:</span> {getCityName(workshop.cityId)}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '500' }}>Coordinates:</span> {workshop.latitude}, {workshop.longitude}
                      </div>
                      <a 
                        href={getGoogleMapsUrl(workshop.latitude, workshop.longitude)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#3B82F6',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        <GlobeIcon size={14} />
                        View on Map
                      </a>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {workshop.capacity}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        Current: {workshop.currentJobs} jobs
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#F59E0B' }}>
                      ⭐ {workshop.rating}
                    </div>
                    <div style={{ 
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '20px',
                      background: workshop.status === 'Active' ? '#ECFDF5' : '#FEF2F2',
                      color: workshop.status === 'Active' ? '#065F46' : '#92400E',
                      fontSize: '12px',
                      fontWeight: '500',
                      marginTop: '4px'
                    }}>
                      {workshop.status}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleView(workshop)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#3B82F6',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#EFF6FF'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                        <EyeIcon size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(workshop)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#10B981',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ECFDF5'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                        <PencilIcon size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(workshop.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#EF4444',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
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

      {/* Add/Edit Workshop Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
              {editingWorkshop ? 'Edit Workshop' : 'Add New Workshop'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Workshop Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Workshop Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value={WORKSHOP_TYPES.MAINTENANCE}>Maintenance</option>
                    <option value={WORKSHOP_TYPES.FUEL_STATION}>Fuel Station</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    City
                  </label>
                  <select
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select a city</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Full Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Current Jobs
                  </label>
                  <input
                    type="number"
                    name="currentJobs"
                    value={formData.currentJobs}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Specialties (Select multiple)
                </label>
                <select
                  multiple
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleSpecialtiesChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: 'white',
                    height: '120px'
                  }}
                >
                  <option value="Engine Repair">Engine Repair</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Brake Systems">Brake Systems</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Body Work">Body Work</option>
                  <option value="Tire Service">Tire Service</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingWorkshop(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#4B5563',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {editingWorkshop ? 'Update Workshop' : 'Add Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Workshop Detail View Modal */}
      {viewingWorkshop && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                Workshop Details
              </h2>
              <button 
                onClick={() => setViewingWorkshop(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getWorkshopTypeIcon(viewingWorkshop.type)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#1F2937' }}>
                    {viewingWorkshop.name}
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
                    {viewingWorkshop.type}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                    Status
                  </p>
                  <p style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '20px',
                    background: viewingWorkshop.status === 'Active' ? '#ECFDF5' : '#FEF2F2',
                    color: viewingWorkshop.status === 'Active' ? '#065F46' : '#92400E',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {viewingWorkshop.status}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                    Rating
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#F59E0B' }}>
                    ⭐ {viewingWorkshop.rating}
                  </p>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Location
                </p>
                <p style={{ fontSize: '14px', color: '#1F2937', marginBottom: '4px' }}>
                  {viewingWorkshop.location}
                </p>
                <p style={{ fontSize: '14px', color: '#1F2937' }}>
                  {getCityName(viewingWorkshop.cityId)}
                </p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Coordinates
                </p>
                <p style={{ fontSize: '14px', color: '#1F2937', marginBottom: '4px' }}>
                  {viewingWorkshop.latitude}, {viewingWorkshop.longitude}
                </p>
                <a 
                  href={getGoogleMapsUrl(viewingWorkshop.latitude, viewingWorkshop.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#3B82F6',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <GlobeIcon size={14} />
                  View on Google Maps
                </a>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                    Capacity
                  </p>
                  <p style={{ fontSize: '14px', color: '#1F2937' }}>
                    {viewingWorkshop.capacity}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                    Current Jobs
                  </p>
                  <p style={{ fontSize: '14px', color: '#1F2937' }}>
                    {viewingWorkshop.currentJobs}
                  </p>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Contact
                </p>
                <p style={{ fontSize: '14px', color: '#1F2937', marginBottom: '4px' }}>
                  {viewingWorkshop.phone}
                </p>
                <p style={{ fontSize: '14px', color: '#1F2937' }}>
                  {viewingWorkshop.email}
                </p>
              </div>
              
              <div>
                <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                  Specialties
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {viewingWorkshop.specialties.map((specialty, index) => (
                    <span 
                      key={index} 
                      style={{
                        background: '#E5E7EB',
                        color: '#4B5563',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workshops;