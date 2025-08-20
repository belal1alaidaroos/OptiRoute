import React, { useState } from 'react';
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
  Avatar,
  SelectField
} from '../../components/shared/UnifiedDesignComponents';
import { 
  MapIcon,
  PlusIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  FlagIcon
} from '../../components/icons/SVGIcons';

const Regions = () => {
  const [countries] = useState([
    { id: 1, name: 'Saudi Arabia', code: 'SA' },
    { id: 2, name: 'United Arab Emirates', code: 'AE' },
    { id: 3, name: 'Egypt', code: 'EG' }
  ]);

  const [regions, setRegions] = useState([
    { 
      id: 1, 
      name: 'Riyadh', 
      countryId: 1,
      status: 'Active',
      priority: 'High',
      timezone: 'UTC+3',
      description: 'Central region of Saudi Arabia'
    },
    { 
      id: 2, 
      name: 'Eastern Province', 
      countryId: 1,
      status: 'Active',
      priority: 'Medium',
      timezone: 'UTC+3',
      description: 'Eastern region of Saudi Arabia'
    },
    { 
      id: 3, 
      name: 'Dubai', 
      countryId: 2,
      status: 'Active',
      priority: 'High',
      timezone: 'UTC+4',
      description: 'Major city in UAE'
    }
  ]);

  const [statuses] = useState(['Active', 'Inactive', 'Pending']);
  const [priorities] = useState(['High', 'Medium', 'Low']);
  const [timezones] = useState(['UTC+2', 'UTC+3', 'UTC+4']);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    status: 'Active',
    priority: 'Medium',
    timezone: 'UTC+3',
    description: ''
  });

  // Filter regions
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    countries.find(c => c.id === region.countryId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: regions.length,
    active: regions.filter(r => r.status === 'Active').length,
    highPriority: regions.filter(r => r.priority === 'High').length
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle view region
  const handleView = (region) => {
    setSelectedRegion(region);
    setShowViewModal(true);
  };

  // Handle edit region
  const handleEdit = (region) => {
    setSelectedRegion(region);
    setFormData({
      name: region.name,
      countryId: region.countryId,
      status: region.status,
      priority: region.priority,
      timezone: region.timezone,
      description: region.description
    });
    setShowEditModal(true);
  };

  // Handle delete region
  const handleDelete = (region) => {
    setSelectedRegion(region);
    setShowDeleteModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (selectedRegion) {
        // Update existing region
        setRegions(regions.map(r => 
          r.id === selectedRegion.id ? { ...r, ...formData } : r
        ));
      } else {
        // Add new region
        const newRegion = {
          id: Math.max(...regions.map(r => r.id)) + 1,
          ...formData
        };
        setRegions([...regions, newRegion]);
      }
      
      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
      setToast({
        message: selectedRegion ? 'Region updated successfully!' : 'Region added successfully!',
        type: 'success'
      });
    }, 1000);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setRegions(regions.filter(r => r.id !== selectedRegion.id));
      setIsLoading(false);
      setShowDeleteModal(false);
      setToast({
        message: 'Region deleted successfully!',
        type: 'success'
      });
    }, 1000);
  };

  // Close toast
  const closeToast = () => setToast(null);

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending': return 'warning';
      default: return 'secondary';
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
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
        title="Regions Management"
        subtitle="Manage and configure regions in the system"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Regions" 
          value={stats.total.toString()} 
          icon={MapIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Active Regions" 
          value={stats.active.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)" 
        />
        <StatCard 
          title="High Priority" 
          value={stats.highPriority.toString()} 
          icon={FlagIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)" 
        />
      </StatsGrid>

      {/* Controls Bar */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setFormData({
            name: '',
            countryId: '',
            status: 'Active',
            priority: 'Medium',
            timezone: 'UTC+3',
            description: ''
          });
          setShowAddModal(true);
        }}
        addButtonText="Add Region"
        searchPlaceholder="Search regions..."
      />

      {/* Regions Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'Region Details',
          'Country',
          'Status',
          'Priority',
          'Timezone',
          'Actions'
        ]} striped hover>
          {filteredRegions.map(region => {
            const country = countries.find(c => c.id === region.countryId);
            return (
              <tr key={region.id}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar 
                      icon={() => <MapIcon className="w-6 h-6" />} 
                      size="md" 
                    />
                    <div>
                      <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {region.name}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>
                        {region.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {country && (
                      <>
                        <FlagIcon className="w-5 h-5 text-gray-500" />
                        <span style={{ fontWeight: '500' }}>{country.name}</span>
                      </>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <StatusBadge
                    status={region.status}
                    variant={getStatusVariant(region.status)}
                  />
                </td>
                <td style={{ padding: '16px' }}>
                  <StatusBadge
                    status={region.priority}
                    variant={getPriorityVariant(region.priority)}
                  />
                </td>
                <td style={{ padding: '16px', fontWeight: '500' }}>
                  {region.timezone}
                </td>
                <td style={{ padding: '16px' }}>
                  <ActionButtons 
                    onView={() => handleView(region)} 
                    onEdit={() => handleEdit(region)} 
                    onDelete={() => handleDelete(region)} 
                  />
                </td>
              </tr>
            );
          })}
        </UnifiedTable>
      </TableContainer>

      {/* Add Region Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Region" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Region Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              placeholder="Riyadh" 
            />
            <SelectField
              label="Country"
              name="countryId"
              value={formData.countryId}
              onChange={handleInputChange}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <FormField 
              label="Timezone" 
              name="timezone" 
              type="select"
              value={formData.timezone} 
              onChange={handleInputChange} 
              options={timezones}
              required
            />
            <FormField 
              label="Priority" 
              name="priority" 
              type="select"
              value={formData.priority} 
              onChange={handleInputChange} 
              options={priorities}
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
          </div>
          <FormField 
            label="Description" 
            name="description" 
            type="textarea"
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Region description..." 
          />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit Region Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Region - ${selectedRegion?.name}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Region Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
            <SelectField
              label="Country"
              name="countryId"
              value={formData.countryId}
              onChange={handleInputChange}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <FormField 
              label="Timezone" 
              name="timezone" 
              type="select"
              value={formData.timezone} 
              onChange={handleInputChange} 
              options={timezones}
              required
            />
            <FormField 
              label="Priority" 
              name="priority" 
              type="select"
              value={formData.priority} 
              onChange={handleInputChange} 
              options={priorities}
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

      {/* View Region Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Region Details - ${selectedRegion?.name}`} size="md">
        {selectedRegion && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#F3F4F6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapIcon className="w-8 h-8" />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937', marginBottom: '4px' }}>
                  {selectedRegion.name}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <StatusBadge 
                    status={selectedRegion.status} 
                    variant={getStatusVariant(selectedRegion.status)} 
                  />
                  <StatusBadge 
                    status={selectedRegion.priority} 
                    variant={getPriorityVariant(selectedRegion.priority)} 
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Region Information</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Country:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FlagIcon className="w-4 h-4 text-gray-500" />
                      <span style={{ fontWeight: '500' }}>
                        {countries.find(c => c.id === selectedRegion.countryId)?.name || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Timezone:</div>
                    <div style={{ fontWeight: '500' }}>{selectedRegion.timezone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Description</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedRegion.description}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedRegion && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this region?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for "{selectedRegion.name}" will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete Region" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Regions;