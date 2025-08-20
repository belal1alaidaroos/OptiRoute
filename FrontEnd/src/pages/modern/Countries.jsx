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
import { 
  GlobeIcon,
  FlagIcon,
  PlusIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const [statuses] = useState(['Active', 'Inactive', 'Pending']);
  const [priorities] = useState(['High', 'Medium', 'Low']);
  const [timezones] = useState(['UTC+2', 'UTC+3', 'UTC+4']);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active',
    priority: 'Medium',
    currency: '',
    timezone: 'UTC+3',
    description: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get('/countries');
        setCountries(data);
      } catch (e) {
        setToast({ message: 'Failed to load countries', type: 'error' });
      }
    })();
  }, []);

  // Filter countries
  const filteredCountries = countries.filter(country =>
    (country.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (country.code || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: countries.length,
    active: countries.filter(c => c.status === 'Active').length,
    highPriority: countries.filter(c => c.priority === 'High').length
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle view country
  const handleView = (country) => {
    setSelectedCountry(country);
    setShowViewModal(true);
  };

  // Handle edit country
  const handleEdit = (country) => {
    setSelectedCountry(country);
    setFormData({
      name: country.name,
      code: country.code,
      status: country.status,
      priority: country.priority,
      currency: country.currency,
      timezone: country.timezone,
      description: country.description
    });
    setShowEditModal(true);
  };

  // Handle delete country
  const handleDelete = (country) => {
    setSelectedCountry(country);
    setShowDeleteModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (selectedCountry) {
        await apiClient.put(`/countries/${selectedCountry.id}`, {
          name: formData.name,
          status: formData.status,
          currency: formData.currency,
          timezone: formData.timezone,
        });
      } else {
        const { data } = await apiClient.post('/countries', {
          name: formData.name,
          alternativeName: formData.alternativeName,
          code: formData.code,
          currency: formData.currency,
          timezone: formData.timezone,
        });
        setCountries([...countries, data]);
      }
      const refreshed = await apiClient.get('/countries');
      setCountries(refreshed.data);
      setToast({ message: selectedCountry ? 'Country updated successfully!' : 'Country added successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Operation failed', type: 'error' });
    } finally {
      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await apiClient.delete(`/countries/${selectedCountry.id}`);
      const refreshed = await apiClient.get('/countries');
      setCountries(refreshed.data);
      setToast({ message: 'Country deleted successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Delete failed', type: 'error' });
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
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
        title="Countries Management"
        subtitle="Manage and configure countries in the system"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Countries" 
          value={stats.total.toString()} 
          icon={GlobeIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Active Countries" 
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
            code: '',
            status: 'Active',
            priority: 'Medium',
            currency: '',
            timezone: 'UTC+3',
            description: ''
          });
          setShowAddModal(true);
        }}
        addButtonText="Add Country"
        searchPlaceholder="Search countries..."
      />

      {/* Countries Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'Country Details',
          'Code',
          'Status',
          'Priority',
          'Currency',
          'Actions'
        ]} striped hover>
          {filteredCountries.map(country => (
            <tr key={country.id}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar 
                    icon={() => <FlagIcon className="w-6 h-6" />} 
                    size="md" 
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                      {country.name}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>
                      {country.description}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ 
                  background: '#F3F4F6', 
                  borderRadius: '6px', 
                  padding: '6px 12px',
                  display: 'inline-block',
                  fontWeight: '600'
                }}>
                  {country.code}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={country.status}
                  variant={getStatusVariant(country.status)}
                />
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={country.priority}
                  variant={getPriorityVariant(country.priority)}
                />
              </td>
              <td style={{ padding: '16px', fontWeight: '600' }}>
                {country.currency}
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons 
                  onView={() => handleView(country)} 
                  onEdit={() => handleEdit(country)} 
                  onDelete={() => handleDelete(country)} 
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add Country Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Country" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Country Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              placeholder="Saudi Arabia" 
            />
            <FormField 
              label="Code" 
              name="code" 
              value={formData.code} 
              onChange={handleInputChange} 
              required 
              placeholder="SA" 
            />
            <FormField 
              label="Currency" 
              name="currency" 
              value={formData.currency} 
              onChange={handleInputChange} 
              required 
              placeholder="SAR" 
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
            placeholder="Country description..." 
          />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit Country Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Country - ${selectedCountry?.name}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Country Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Code" 
              name="code" 
              value={formData.code} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Currency" 
              name="currency" 
              value={formData.currency} 
              onChange={handleInputChange} 
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

      {/* View Country Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Country Details - ${selectedCountry?.name}`} size="md">
        {selectedCountry && (
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
                <FlagIcon className="w-8 h-8 " />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937', marginBottom: '4px' }}>
                  {selectedCountry.name} ({selectedCountry.code})
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <StatusBadge 
                    status={selectedCountry.status} 
                    variant={getStatusVariant(selectedCountry.status)} 
                  />
                  <StatusBadge 
                    status={selectedCountry.priority} 
                    variant={getPriorityVariant(selectedCountry.priority)} 
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Country Information</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Currency:</div>
                    <div style={{ fontWeight: '500' }}>{selectedCountry.currency}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Timezone:</div>
                    <div style={{ fontWeight: '500' }}>{selectedCountry.timezone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Description</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedCountry.description}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedCountry && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this country?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for "{selectedCountry.name}" will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete Country" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Countries;