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
  CityIcon,
  PlusIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  MapIcon,
  FlagIcon
} from '../../components/icons/SVGIcons';

const Cities = () => {
  const [countries] = useState([
    { id: 1, name: 'Saudi Arabia', code: 'SA' },
    { id: 2, name: 'United Arab Emirates', code: 'AE' },
    { id: 3, name: 'Egypt', code: 'EG' }
  ]);

  const [regions] = useState([
    { id: 1, name: 'Riyadh', countryId: 1 },
    { id: 2, name: 'Eastern Province', countryId: 1 },
    { id: 3, name: 'Dubai', countryId: 2 },
    { id: 4, name: 'Cairo', countryId: 3 }
  ]);

  const [cities, setCities] = useState([
    { 
      id: 1, 
      name: 'Riyadh', 
      regionId: 1,
      postalCode: '11564',
      status: 'Active',
      priority: 'High',
      timezone: 'UTC+3',
      description: 'Capital city of Saudi Arabia'
    },
    { 
      id: 2, 
      name: 'Dammam', 
      regionId: 2,
      postalCode: '31451',
      status: 'Active',
      priority: 'Medium',
      timezone: 'UTC+3',
      description: 'Major city in Eastern Province'
    },
    { 
      id: 3, 
      name: 'Dubai', 
      regionId: 3,
      postalCode: '00000',
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
  const [selectedCity, setSelectedCity] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    regionId: '',
    postalCode: '',
    status: 'Active',
    priority: 'Medium',
    timezone: 'UTC+3',
    description: ''
  });

  // Handle country selection change
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    setFormData(prev => ({ 
      ...prev, 
      countryId,
      regionId: '' // Reset region when country changes
    }));
  };

  // Filter regions by selected country
  const filteredRegions = selectedCountryId 
    ? regions.filter(r => r.countryId == selectedCountryId)
    : regions;

  // Filter cities
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    regions.find(r => r.id === city.regionId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    countries.find(c => c.id === regions.find(r => r.id === city.regionId)?.countryId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: cities.length,
    active: cities.filter(c => c.status === 'Active').length,
    highPriority: cities.filter(c => c.priority === 'High').length
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle view city
  const handleView = (city) => {
    setSelectedCity(city);
    setShowViewModal(true);
  };

  // Handle edit city
  const handleEdit = (city) => {
    setSelectedCity(city);
    
    const region = regions.find(r => r.id === city.regionId);
    const countryId = region ? region.countryId : '';
    
    setSelectedCountryId(countryId);
    setFormData({
      name: city.name,
      countryId,
      regionId: city.regionId,
      postalCode: city.postalCode,
      status: city.status,
      priority: city.priority,
      timezone: city.timezone,
      description: city.description
    });
    
    setShowEditModal(true);
  };

  // Handle delete city
  const handleDelete = (city) => {
    setSelectedCity(city);
    setShowDeleteModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (selectedCity) {
        // Update existing city
        setCities(cities.map(c => 
          c.id === selectedCity.id ? { ...c, ...formData } : c
        ));
      } else {
        // Add new city
        const newCity = {
          id: Math.max(...cities.map(c => c.id)) + 1,
          ...formData
        };
        setCities([...cities, newCity]);
      }
      
      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
      setToast({
        message: selectedCity ? 'City updated successfully!' : 'City added successfully!',
        type: 'success'
      });
    }, 1000);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setCities(cities.filter(c => c.id !== selectedCity.id));
      setIsLoading(false);
      setShowDeleteModal(false);
      setToast({
        message: 'City deleted successfully!',
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
        title="Cities Management"
        subtitle="Manage and configure cities in the system"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Cities" 
          value={stats.total.toString()} 
          icon={CityIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Active Cities" 
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
            regionId: '',
            postalCode: '',
            status: 'Active',
            priority: 'Medium',
            timezone: 'UTC+3',
            description: ''
          });
          setSelectedCountryId('');
          setShowAddModal(true);
        }}
        addButtonText="Add City"
        searchPlaceholder="Search cities..."
      />

      {/* Cities Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'City Details',
          'Region',
          'Country',
          'Postal Code',
          'Priority',
          'Actions'
        ]} striped hover>
          {filteredCities.map(city => {
            const region = regions.find(r => r.id === city.regionId);
            const country = region ? countries.find(c => c.id === region.countryId) : null;
            
            return (
              <tr key={city.id}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar 
                      icon={() => <CityIcon className="w-6 h-6" />} 
                      size="md" 
                    />
                    <div>
                      <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                        {city.name}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>
                        {city.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', fontWeight: '500' }}>
                  {region?.name || 'N/A'}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {country && (
                      <>
                        <FlagIcon className="w-5 h-5 text-gray-500" />
                        <span>{country.name}</span>
                      </>
                    )}
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
                    {city.postalCode}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <StatusBadge
                    status={city.priority}
                    variant={getPriorityVariant(city.priority)}
                  />
                </td>
                <td style={{ padding: '16px' }}>
                  <ActionButtons 
                    onView={() => handleView(city)} 
                    onEdit={() => handleEdit(city)} 
                    onDelete={() => handleDelete(city)} 
                  />
                </td>
              </tr>
            );
          })}
        </UnifiedTable>
      </TableContainer>

      {/* Add City Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New City" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="City Name" 
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
              onChange={handleCountryChange}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <SelectField
              label="Region"
              name="regionId"
              value={formData.regionId}
              onChange={handleInputChange}
              options={filteredRegions.map(r => ({ value: r.id, label: r.name }))}
              disabled={!formData.countryId}
              required
            />
            <FormField 
              label="Postal Code" 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleInputChange} 
              required 
              placeholder="11564" 
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
            placeholder="City description..." 
          />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit City Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit City - ${selectedCity?.name}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="City Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
            <SelectField
              label="Country"
              name="countryId"
              value={formData.countryId}
              onChange={handleCountryChange}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <SelectField
              label="Region"
              name="regionId"
              value={formData.regionId}
              onChange={handleInputChange}
              options={filteredRegions.map(r => ({ value: r.id, label: r.name }))}
              required
            />
            <FormField 
              label="Postal Code" 
              name="postalCode" 
              value={formData.postalCode} 
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

      {/* View City Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`City Details - ${selectedCity?.name}`} size="md">
        {selectedCity && (
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
                <CityIcon className="w-8 h-6 " />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937', marginBottom: '4px' }}>
                  {selectedCity.name}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <StatusBadge 
                    status={selectedCity.status} 
                    variant={getStatusVariant(selectedCity.status)} 
                  />
                  <StatusBadge 
                    status={selectedCity.priority} 
                    variant={getPriorityVariant(selectedCity.priority)} 
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Location Information</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Region:</div>
                    <div style={{ fontWeight: '500' }}>
                      {regions.find(r => r.id === selectedCity.regionId)?.name || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Country:</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FlagIcon className="w-4 h-4 text-gray-500" />
                      <span style={{ fontWeight: '500' }}>
                        {(() => {
                          const region = regions.find(r => r.id === selectedCity.regionId);
                          return region ? countries.find(c => c.id === region.countryId)?.name : 'N/A';
                        })()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Postal Code:</div>
                    <div style={{ fontWeight: '500' }}>{selectedCity.postalCode}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Timezone:</div>
                    <div style={{ fontWeight: '500' }}>{selectedCity.timezone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Description</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedCity.description}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedCity && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this city?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for "{selectedCity.name}" will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete City" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Cities;