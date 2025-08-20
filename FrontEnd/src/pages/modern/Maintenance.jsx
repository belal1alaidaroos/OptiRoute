import React, { useState, useEffect } from 'react';
import { 
  WrenchIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  TrashIcon,
  ClockIcon,
  TruckIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CalendarIcon,
  PencilIcon,
  XIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const MaintenanceFixed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [cities, setCities] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  
  // Load lookups
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [citiesRes, hubsRes, typesRes, workshopsRes] = await Promise.all([
          apiClient.get('/cities'),
          apiClient.get('/hubs'),
          apiClient.get('/maintenance-types'),
          apiClient.get('/workshops')
        ]);
        setCities(citiesRes.data || []);
        setHubs(hubsRes.data || []);
        setMaintenanceTypes(typesRes.data || []);
        setWorkshops(workshopsRes.data || []);
      } catch (err) {
        console.error('Failed to load lookups', err);
      }
    };
    loadLookups();
  }, []);

  const [maintenanceJobs, setMaintenanceJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data } = await apiClient.get('/maintenance');
        setMaintenanceJobs(data || []);
      } catch (err) {
        console.error('Failed to load maintenance jobs', err);
      }
    };
    loadJobs();
  }, []);

  const filteredJobs = maintenanceJobs.filter(job =>
    job.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper functions to get lookup names by ID
  const getCityName = (id) => cities.find(city => city.id === id)?.name || 'N/A';
  const getHubName = (id) => hubs.find(hub => hub.id === id)?.name || 'N/A';
  const getMaintenanceTypeName = (id) => maintenanceTypes.find(type => type.id === id)?.name || 'N/A';
  const getWorkshopName = (id) => workshops.find(workshop => workshop.id === id)?.name || 'N/A';

  const handleCreate = async (newJob) => {
    try {
      await apiClient.post('/maintenance', newJob);
      const { data } = await apiClient.get('/maintenance');
      setMaintenanceJobs(data || []);
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to create maintenance', err);
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      await apiClient.put(`/maintenance/${updatedJob.id}`, updatedJob);
      const { data } = await apiClient.get('/maintenance');
      setMaintenanceJobs(data || []);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update maintenance', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/maintenance/${id}`);
      setMaintenanceJobs(maintenanceJobs.filter(job => job.id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Failed to delete maintenance', err);
    }
  };

  const openViewModal = (job) => {
    setCurrentJob(job);
    setShowViewModal(true);
  };

  const openEditModal = (job) => {
    setCurrentJob(job);
    setShowEditModal(true);
  };

  const openDeleteModal = (job) => {
    setCurrentJob(job);
    setShowDeleteModal(true);
  };

  // Calculate stats
  const totalJobs = maintenanceJobs.length;
  const inProgressJobs = maintenanceJobs.filter(job => job.status === 'In Progress').length;
  const completedJobs = maintenanceJobs.filter(job => job.status === 'Completed').length;
  const urgentJobs = maintenanceJobs.filter(job => job.priority === 'High').length;

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Maintenance Management
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Schedule and track vehicle maintenance and repairs
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
                Total Jobs
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {totalJobs}
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
                In Progress
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {inProgressJobs}
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
                Completed
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {completedJobs}
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
                Urgent
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {urgentJobs}
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
              placeholder="Search maintenance jobs..."
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
            onClick={() => setShowAddModal(true)}
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
            Schedule Maintenance
          </button>
        </div>
      </div>

      {/* Maintenance Jobs Table */}
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
                  Vehicle & Type
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
                  Description
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
                  Location
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
                  Schedule & Workshop
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
                  Status & Priority
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
              {filteredJobs.map((job, index) => (
                <tr key={job.id} style={{
                  borderBottom: index < filteredJobs.length - 1 ? '1px solid #F3F4F6' : 'none'
                }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {job.vehiclePlate}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {getMaintenanceTypeName(job.maintenanceTypeId)}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '14px', color: '#1F2937' }}>
                      {job.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                      {job.estimatedCost} • {job.estimatedDuration}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {getCityName(job.cityId)}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {getHubName(job.hubId)}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {job.scheduledDate}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {getWorkshopName(job.workshopId)}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backgroundColor: job.status === 'Completed' 
                          ? '#D1FAE5' 
                          : job.status === 'In Progress'
                          ? '#FEF3C7'
                          : '#F3F4F6',
                        color: job.status === 'Completed' 
                          ? '#065F46' 
                          : job.status === 'In Progress'
                          ? '#92400E'
                          : '#374151'
                      }}>
                        {job.status}
                      </span>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      borderRadius: '16px',
                      backgroundColor: job.priority === 'High' 
                        ? '#FEE2E2' 
                        : job.priority === 'Medium'
                        ? '#FEF3C7'
                        : '#F3F4F6',
                      color: job.priority === 'High' 
                        ? '#DC2626' 
                        : job.priority === 'Medium'
                        ? '#92400E'
                        : '#374151'
                    }}>
                      {job.priority}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => openViewModal(job)}
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
                        onClick={() => openEditModal(job)}
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
                        onClick={() => openDeleteModal(job)}
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

      {/* Add Maintenance Modal */}
      {showAddModal && (
        <MaintenanceModal 
          mode="create"
          job={null}
          cities={cities}
          hubs={hubs}
          maintenanceTypes={maintenanceTypes}
          workshops={workshops}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* Edit Maintenance Modal */}
      {showEditModal && (
        <MaintenanceModal 
          mode="edit"
          job={currentJob}
          cities={cities}
          hubs={hubs}
          maintenanceTypes={maintenanceTypes}
          workshops={workshops}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
        />
      )}

      {/* View Maintenance Modal */}
      {showViewModal && currentJob && (
        <ViewMaintenanceModal 
          job={currentJob}
          cities={cities}
          hubs={hubs}
          maintenanceTypes={maintenanceTypes}
          workshops={workshops}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentJob && (
        <DeleteConfirmationModal 
          job={currentJob}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(currentJob.id)}
        />
      )}
    </div>
  );
};

// Maintenance Modal Component (for Create/Edit)
const MaintenanceModal = ({ mode, job, cities, hubs, maintenanceTypes, workshops, onClose, onSubmit }) => {
  const isEdit = mode === 'edit';
  const [formData, setFormData] = useState(isEdit ? job : {
    vehiclePlate: '',
    maintenanceTypeId: maintenanceTypes[0]?.id || '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    scheduledDate: '',
    workshopId: workshops[0]?.id || '',
    cityId: cities[0]?.id || '',
    hubId: hubs[0]?.id || '',
    estimatedCost: '',
    estimatedDuration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>
            {isEdit ? 'Edit Maintenance Job' : 'Schedule New Maintenance'}
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <XIcon size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151' 
            }}>
              Vehicle Plate
            </label>
            <input
              type="text"
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Maintenance Type
              </label>
              <select
                name="maintenanceTypeId"
                value={formData.maintenanceTypeId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                {maintenanceTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Workshop
              </label>
              <select
                name="workshopId"
                value={formData.workshopId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                {workshops.map(workshop => (
                  <option key={workshop.id} value={workshop.id}>{workshop.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                City
              </label>
              <select
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Hub
              </label>
              <select
                name="hubId"
                value={formData.hubId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                {hubs.map(hub => (
                  <option key={hub.id} value={hub.id}>{hub.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151' 
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Scheduled Date
              </label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151' 
              }}>
                Estimated Cost (SAR)
              </label>
              <input
                type="text"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151' 
            }}>
              Estimated Duration
            </label>
            <input
              type="text"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              required
              placeholder="e.g., 2 hours"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: '1px solid #D1D5DB',
                color: '#374151',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              {isEdit ? 'Update Maintenance' : 'Schedule Maintenance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Maintenance Modal (Read-only)
const ViewMaintenanceModal = ({ job, cities, hubs, maintenanceTypes, workshops, onClose }) => {
  // Helper functions to get lookup names by ID
  const getCityName = (id) => cities.find(city => city.id === id)?.name || 'N/A';
  const getHubName = (id) => hubs.find(hub => hub.id === id)?.name || 'N/A';
  const getMaintenanceTypeName = (id) => maintenanceTypes.find(type => type.id === id)?.name || 'N/A';
  const getWorkshopName = (id) => workshops.find(workshop => workshop.id === id)?.name || 'N/A';

  return (
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
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>
            Maintenance Job Details
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <XIcon size={20} />
          </button>
        </div>
        
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Vehicle Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Vehicle Plate</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{job.vehiclePlate}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Maintenance Type</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{getMaintenanceTypeName(job.maintenanceTypeId)}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Job Details
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Description</p>
              <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{job.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Estimated Cost</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{job.estimatedCost}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Estimated Duration</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{job.estimatedDuration}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Location
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>City</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{getCityName(job.cityId)}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Hub</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{getHubName(job.hubId)}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Schedule
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Scheduled Date</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{job.scheduledDate}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Workshop</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{getWorkshopName(job.workshopId)}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1F2937',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              Status
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Status</p>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backgroundColor: job.status === 'Completed' 
                    ? '#D1FAE5' 
                    : job.status === 'In Progress'
                    ? '#FEF3C7'
                    : '#F3F4F6',
                  color: job.status === 'Completed' 
                    ? '#065F46' 
                    : job.status === 'In Progress'
                    ? '#92400E'
                    : '#374151'
                }}>
                  {job.status}
                </span>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Priority</p>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backgroundColor: job.priority === 'High' 
                    ? '#FEE2E2' 
                    : job.priority === 'Medium'
                    ? '#FEF3C7'
                    : '#F3F4F6',
                  color: job.priority === 'High' 
                    ? '#DC2626' 
                    : job.priority === 'Medium'
                    ? '#92400E'
                    : '#374151'
                }}>
                  {job.priority}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ job, onClose, onConfirm }) => {
  return (
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
        width: '100%',
        maxWidth: '500px',
        padding: '24px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: '#FEE2E2',
            borderRadius: '50%',
            margin: '0 auto 16px'
          }}>
            <AlertTriangleIcon size={24} color="#DC2626" />
          </div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1F2937', 
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            Delete Maintenance Job
          </h2>
          <p style={{ 
            color: '#6B7280', 
            fontSize: '16px', 
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            Are you sure you want to delete the maintenance job for <strong>{job.vehiclePlate}</strong>? 
            This action cannot be undone.
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #D1D5DB',
              color: '#374151',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.9'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Delete Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceFixed;