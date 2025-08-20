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
  Avatar
} from '../../components/shared/UnifiedDesignComponents';
import { 
  FuelIcon, 
  PlusIcon, 
  SearchIcon, 
  GasIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  LightningIcon,
  BatteryIcon,
 } from '../../components/icons/SVGIcons';

const FuelsType = () => {
  // Lookup data (would normally come from API)
  const [emissionCategories] = useState(['Low', 'Medium', 'High', 'Zero']);
  const [fuelStatuses] = useState(['Active', 'Inactive', 'Pending Approval']);
  const [fuelUnits] = useState(['Liters', 'Gallons', 'Kilograms', 'Kilowatt-hours']);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    emissionFactor: '',
    status: 'Active',
    category: '',
    unit: 'Liters',
    description: ''
  });

  // Sample data
  const fuels = [
    {
      id: 1,
      name: 'Gasoline',
      code: 'GAS',
      emissionFactor: 2.3,
      status: 'Active',
      category: 'High',
      unit: 'Liters',
      description: 'Standard unleaded fuel for most vehicles',
      createdDate: '2023-06-15',
          icon: () => <GasIcon className="w-6 h-6" /> 
	  
    },
    {
      id: 2,
      name: 'Diesel',
      code: 'DSL',
      emissionFactor: 2.7,
      status: 'Active',
      category: 'High',
      unit: 'Liters',
      description: 'Heavy fuel for trucks and industrial vehicles',
      createdDate: '2023-05-20',
          icon: () => <FuelIcon className="w-6 h-6" /> 
    },
    {
      id: 3,
      name: 'Electric',
      code: 'ELEC',
      emissionFactor: 0.5,
      status: 'Active',
      category: 'Low',
      unit: 'Kilowatt-hours',
      description: 'Electric power for EVs and hybrid vehicles',
      createdDate: '2023-07-10',
          icon: () => <LightningIcon  className="w-6 h-6 text-white" /> 
    },
    {
      id: 4,
      name: 'Hydrogen',
      code: 'HYD',
      emissionFactor: 0.1,
      status: 'Pending Approval',
      category: 'Zero',
      unit: 'Kilograms',
      description: 'Fuel cell technology for zero-emission vehicles',
      createdDate: '2023-07-18',
          icon: () => <BatteryIcon  className="w-6 h-6 text-white" /> 
    }
  ];

  // Filter fuels based on search term
  const filteredFuels = fuels.filter(fuel =>
    fuel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fuel.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fuel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    total: fuels.length,
    active: fuels.filter(f => f.status === 'Active').length,
    pending: fuels.filter(f => f.status === 'Pending Approval').length,
    avgEmission: (fuels.reduce((sum, f) => sum + f.emissionFactor, 0) / fuels.length).toFixed(1)
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle view fuel type
  const handleView = (fuel) => {
    setSelectedFuel(fuel);
    setShowViewModal(true);
  };

  // Handle edit fuel type
  const handleEdit = (fuel) => {
    setSelectedFuel(fuel);
    setFormData({
      name: fuel.name,
      code: fuel.code,
      emissionFactor: fuel.emissionFactor,
      status: fuel.status,
      category: fuel.category,
      unit: fuel.unit,
      description: fuel.description
    });
    setShowEditModal(true);
  };

  // Handle delete fuel type
  const handleDelete = (fuel) => {
    setSelectedFuel(fuel);
    setShowDeleteModal(true);
  };

  // Handle form submission (Add & Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
      setToast({
        message: showEditModal ? 'Fuel type updated successfully!' : 'Fuel type added successfully!',
        type: 'success'
      });
    }, 1500);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDeleteModal(false);
      setToast({
        message: 'Fuel type deleted successfully!',
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
      case 'Pending Approval': return 'warning';
      default: return 'secondary';
    }
  };

  // Get category badge variant
  const getCategoryVariant = (category) => {
    switch (category) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      case 'Zero': return 'info';
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
        title="Fuel Types"
        subtitle="Manage and configure fuel types for your fleet"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Types" 
          value={stats.total.toString()} 
          icon={FuelIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Active Types" 
          value={stats.active.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)" 
        />
        <StatCard 
          title="Pending Approval" 
          value={stats.pending.toString()} 
          icon={InfoIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)" 
        />
        <StatCard 
          title="Avg Emission" 
          value={`${stats.avgEmission} kg/L`} 
          icon={GasIcon} 
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
            code: '',
            emissionFactor: '',
            status: 'Active',
            category: '',
            unit: 'Liters',
            description: ''
          });
          setShowAddModal(true);
        }}
        addButtonText="Add Fuel Type"
        searchPlaceholder="Search fuel types..."
      />

      {/* Fuel Types Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'Fuel Details',
          'Code',
          'Emission',
          'Category',
          'Status',
          'Actions'
        ]} striped hover>
          {filteredFuels.map(fuel => (
            <tr key={fuel.id}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar icon={fuel.icon} size="md" />
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                      {fuel.name}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>
                      {fuel.description}
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
                  {fuel.code}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>
                  {fuel.emissionFactor} kg CO₂/L
                </div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>
                  {fuel.unit}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={fuel.category}
                  variant={getCategoryVariant(fuel.category)}
                />
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={fuel.status}
                  variant={getStatusVariant(fuel.status)}
                />
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons 
                  onView={() => handleView(fuel)} 
                  onEdit={() => handleEdit(fuel)} 
                  onDelete={() => handleDelete(fuel)} 
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add Fuel Type Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Fuel Type" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Fuel Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              placeholder="Gasoline" 
            />
            <FormField 
              label="Code" 
              name="code" 
              value={formData.code} 
              onChange={handleInputChange} 
              required 
              placeholder="GAS" 
            />
            <FormField 
              label="Emission Factor (kg CO₂/L)" 
              name="emissionFactor" 
              type="number"
              step="0.1"
              value={formData.emissionFactor} 
              onChange={handleInputChange} 
              required 
              placeholder="2.3" 
            />
            <FormField 
              label="Unit" 
              name="unit" 
              type="select"
              value={formData.unit} 
              onChange={handleInputChange} 
              options={fuelUnits}
              required
            />
            <FormField 
              label="Category" 
              name="category" 
              type="select"
              value={formData.category} 
              onChange={handleInputChange} 
              options={emissionCategories}
              required
            />
            <FormField 
              label="Status" 
              name="status" 
              type="select"
              value={formData.status} 
              onChange={handleInputChange} 
              options={fuelStatuses}
              required
            />
          </div>
          <FormField 
            label="Description" 
            name="description" 
            type="textarea"
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Detailed description of the fuel type..." 
          />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit Fuel Type Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Fuel Type - ${selectedFuel?.name}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Fuel Name" 
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
              label="Emission Factor (kg CO₂/L)" 
              name="emissionFactor" 
              type="number"
              step="0.1"
              value={formData.emissionFactor} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Unit" 
              name="unit" 
              type="select"
              value={formData.unit} 
              onChange={handleInputChange} 
              options={fuelUnits}
              required
            />
            <FormField 
              label="Category" 
              name="category" 
              type="select"
              value={formData.category} 
              onChange={handleInputChange} 
              options={emissionCategories}
              required
            />
            <FormField 
              label="Status" 
              name="status" 
              type="select"
              value={formData.status} 
              onChange={handleInputChange} 
              options={fuelStatuses}
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

      {/* View Fuel Type Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Fuel Details - ${selectedFuel?.name}`} size="md">
        {selectedFuel && (
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
                {selectedFuel.icon}
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937', marginBottom: '4px' }}>
                  {selectedFuel.name} ({selectedFuel.code})
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <StatusBadge 
                    status={selectedFuel.category} 
                    variant={getCategoryVariant(selectedFuel.category)} 
                  />
                  <StatusBadge 
                    status={selectedFuel.status} 
                    variant={getStatusVariant(selectedFuel.status)} 
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Emission Details</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#6B7280' }}>Emission Factor:</span>
                  <span style={{ fontWeight: '500' }}>{selectedFuel.emissionFactor} kg CO₂/L</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#6B7280' }}>Measurement Unit:</span>
                  <span style={{ fontWeight: '500' }}>{selectedFuel.unit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Date Added:</span>
                  <span style={{ fontWeight: '500' }}>{selectedFuel.createdDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Description</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedFuel.description}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedFuel && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this fuel type?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for "{selectedFuel.name}" will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete Fuel Type" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default FuelsType;