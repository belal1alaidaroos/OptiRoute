import React, { useEffect, useState } from 'react';
import { 
  PageContainer,
  PageHeader,
  StatsGrid,
  StatCard,
  ControlsBar,
  TableContainer,
  UnifiedTable,
  ActionButtons,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast,
  StatusBadge,
  Avatar
} from '../../components/shared/UnifiedDesignComponents';
import apiClient from '../../lib/apiClient';
import { 
  WrenchIcon, 
  PlusIcon, 
  SearchIcon, 
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
  InfoIcon
} from '../../components/icons/SVGIcons';

const MaintenancesType = () => {
  // Lookup data (would normally come from API)
  const [categories] = useState(['Routine', 'Safety', 'Preventive', 'Corrective', 'Predictive']);
  const [statuses] = useState(['Active', 'Inactive', 'Pending Review']);
  const [frequencies] = useState(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'As Needed']);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    category: '',
    status: 'Active',
    frequency: '',
    costEstimate: '',
    description: ''
  });

  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/maintenance-types');
        setMaintenances(data || []);
      } catch (err) {
        console.error('Failed to load maintenance types', err);
      }
    };
    load();
  }, []);

  // Filter maintenance types based on search term
  const filteredMaintenances = maintenances.filter(maintenance =>
    maintenance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maintenance.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maintenance.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle view maintenance type
  const handleView = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowViewModal(true);
  };

  // Handle edit maintenance type
  const handleEdit = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setFormData({
      name: maintenance.name,
      duration: maintenance.duration,
      category: maintenance.category,
      status: maintenance.status,
      frequency: maintenance.frequency,
      costEstimate: maintenance.costEstimate,
      description: maintenance.description
    });
    setShowEditModal(true);
  };

  // Handle delete maintenance type
  const handleDelete = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowDeleteModal(true);
  };

  // Handle form submission (Add & Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (showEditModal && selectedMaintenance) {
        await apiClient.put(`/maintenance-types/${selectedMaintenance.id}`, {
          name: formData.name,
          description: formData.description,
          code: formData.code,
          status: formData.status
        });
      } else {
        await apiClient.post('/maintenance-types', {
          name: formData.name,
          description: formData.description,
          code: formData.code
        });
      }
      const { data } = await apiClient.get('/maintenance-types');
      setMaintenances(data || []);
      setShowAddModal(false);
      setShowEditModal(false);
      setToast({
        message: showEditModal ? 'Maintenance type updated successfully!' : 'Maintenance type added successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to save maintenance type', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      await apiClient.delete(`/maintenance-types/${selectedMaintenance.id}`);
      setMaintenances(maintenances.filter(m => m.id !== selectedMaintenance.id));
      setShowDeleteModal(false);
      setToast({
        message: 'Maintenance type deleted successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to delete maintenance type', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Close toast
  const closeToast = () => setToast(null);

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending Review': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <PageContainer>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} duration={3000} />
      )}

      {/* Page Header */}
      <PageHeader
        title="Maintenance Types"
        subtitle="Manage and configure maintenance types for your fleet"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Types" 
          value={maintenances.length.toString()} 
          icon={WrenchIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Active Types" 
          value={maintenances.filter(m => m.status === 'Active').length.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)" 
        />
        <StatCard 
          title="Avg Duration" 
          value="45 mins" 
          icon={ClockIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)" 
        />
        <StatCard 
          title="Categories" 
          value={categories.length.toString()} 
          icon={InfoIcon} 
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)" 
        />
      </StatsGrid>

      {/* Controls Bar */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setFormData({
            name: '',
            duration: '',
            category: '',
            status: 'Active',
            frequency: '',
            costEstimate: '',
            description: ''
          });
          setShowAddModal(true);
        }}
        addButtonText="Add Maintenance Type"
        searchPlaceholder="Search maintenance types..."
      />

      {/* Maintenance Types Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'Maintenance Details',
          'Category',
          'Status',
          'Frequency & Cost',
          'Actions'
        ]} striped hover>
          {filteredMaintenances.map(maintenance => (
            <tr key={maintenance.id}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar icon={WrenchIcon} size="md" />
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                      {maintenance.name}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>
                      {maintenance.description}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>
                  {maintenance.category}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={maintenance.status}
                  variant={getStatusVariant(maintenance.status)}
                />
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  {maintenance.frequency}
                </div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>
                  {maintenance.costEstimate}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons 
                  onView={() => handleView(maintenance)} 
                  onEdit={() => handleEdit(maintenance)} 
                  onDelete={() => handleDelete(maintenance)} 
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add Maintenance Type Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Maintenance Type" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              placeholder="Oil Change" 
            />
            <FormField 
              label="Duration (minutes)" 
              name="duration" 
              type="number"
              value={formData.duration} 
              onChange={handleInputChange} 
              required 
              placeholder="30" 
            />
            <FormField 
              label="Category" 
              name="category" 
              type="select"
              value={formData.category} 
              onChange={handleInputChange} 
              options={categories}
              required
            />
            <FormField 
              label="Status" 
              name="status" 
              type="select"
              value={formData.status} 
              onChange={handleInputChange} 
              options={statuses}
              required
            />
            <FormField 
              label="Frequency" 
              name="frequency" 
              value={formData.frequency} 
              onChange={handleInputChange} 
              placeholder="Every 5,000 km" 
            />
            <FormField 
              label="Cost Estimate" 
              name="costEstimate" 
              value={formData.costEstimate} 
              onChange={handleInputChange} 
              placeholder="$120" 
            />
          </div>
          <FormField 
            label="Description" 
            name="description" 
            type="textarea"
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Detailed description of the maintenance..." 
          />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit Maintenance Type Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Maintenance Type - ${selectedMaintenance?.name}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Duration (minutes)" 
              name="duration" 
              type="number"
              value={formData.duration} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Category" 
              name="category" 
              type="select"
              value={formData.category} 
              onChange={handleInputChange} 
              options={categories}
              required
            />
            <FormField 
              label="Status" 
              name="status" 
              type="select"
              value={formData.status} 
              onChange={handleInputChange} 
              options={statuses}
              required
            />
            <FormField 
              label="Frequency" 
              name="frequency" 
              value={formData.frequency} 
              onChange={handleInputChange} 
            />
            <FormField 
              label="Cost Estimate" 
              name="costEstimate" 
              value={formData.costEstimate} 
              onChange={handleInputChange} 
            />
          </div>
          <FormField 
            label="Description" 
            name="description" 
            type="textarea"
            value={formData.description} 
            onChange={handleInputChange} 
          />
          <FormButtons onCancel={() => setShowEditModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* View Maintenance Type Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Maintenance Details - ${selectedMaintenance?.name}`} size="md">
        {selectedMaintenance && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
              {/* Left Column */}
              <div>
                {/* Basic Information */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Basic Information</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Name:</span>
                      <span style={{ fontWeight: '500' }}>{selectedMaintenance.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Category:</span>
                      <span style={{ fontWeight: '500' }}>{selectedMaintenance.category}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Duration:</span>
                      <span style={{ fontWeight: '500' }}>{selectedMaintenance.duration} minutes</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Status:</span>
                      <StatusBadge 
                        status={selectedMaintenance.status} 
                        variant={getStatusVariant(selectedMaintenance.status)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Cost & Frequency */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Cost & Frequency</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Frequency:</span>
                      <span style={{ fontWeight: '500' }}>{selectedMaintenance.frequency}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Cost Estimate:</span>
                      <span style={{ fontWeight: '500' }}>{selectedMaintenance.costEstimate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Dates</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Last Performed:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CalendarIcon size={14} color="#6B7280" />
                    <span style={{ fontWeight: '500' }}>{selectedMaintenance.lastPerformed || 'N/A'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Next Due:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CalendarIcon size={14} color="#6B7280" />
                    <span style={{ fontWeight: '500' }}>{selectedMaintenance.nextDue || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Description</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedMaintenance.description}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedMaintenance && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this maintenance type?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for "{selectedMaintenance.name}" will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete Maintenance Type" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default MaintenancesType;