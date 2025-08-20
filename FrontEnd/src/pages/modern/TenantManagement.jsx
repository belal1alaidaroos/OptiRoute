import React, { useState } from 'react';
import { 
  BuildingIcon, 
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  CreditCardIcon,
  GlobeIcon
} from '../../components/icons/SVGIcons';

import {
  PageContainer,
  PageHeader,
  StatsGrid,
  StatCard,
  ControlsBar,
  TableContainer,
  UnifiedTable,
  ActionButtons,
  StatusBadge,
  UnifiedModal,
  FormField,
  FormButtons,
  Avatar
} from '../../components/shared/UnifiedDesignComponents';

const TenantManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    website: '',
    industry: '',
    subscriptionPlan: 'Basic',
    status: 'Active',
    maxUsers: '',
    maxVehicles: '',
    features: {
      fleetManagement: false,
      routeOptimization: false,
      realTimeTracking: false,
      maintenance: false,
      fuelManagement: false,
      reporting: false,
      apiAccess: false,
      mobileApp: false
    }
  });

  // State for tenants list
  const [tenants, setTenants] = useState([
    {
      id: 1,
      companyName: 'Al-Rajhi Transport Co.',
      contactPerson: 'Ahmed Al-Rajhi',
      email: 'admin@alrajhi-transport.com',
      phone: '+966501234567',
      address: 'King Fahd Road, Business District',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      website: 'www.alrajhi-transport.com',
      industry: 'Logistics & Transportation',
      subscriptionPlan: 'Enterprise',
      status: 'Active',
      maxUsers: 50,
      maxVehicles: 200,
      currentUsers: 35,
      currentVehicles: 150,
      createdAt: '2023-01-15',
      lastActivity: '2024-01-15 10:30',
      features: {
        fleetManagement: true, routeOptimization: true, realTimeTracking: true,
        maintenance: true, fuelManagement: true, reporting: true, apiAccess: true, mobileApp: true
      }
    },
    {
      id: 2,
      companyName: 'Saudi Express Delivery',
      contactPerson: 'Fatima Hassan',
      email: 'contact@saudi-express.com',
      phone: '+966507654321',
      address: 'Industrial City, Zone 3',
      city: 'Jeddah',
      country: 'Saudi Arabia',
      website: 'www.saudi-express.com',
      industry: 'Courier & Delivery',
      subscriptionPlan: 'Professional',
      status: 'Active',
      maxUsers: 25,
      maxVehicles: 100,
      currentUsers: 18,
      currentVehicles: 75,
      createdAt: '2023-03-20',
      lastActivity: '2024-01-14 16:45',
      features: {
        fleetManagement: true, routeOptimization: true, realTimeTracking: true,
        maintenance: true, fuelManagement: false, reporting: true, apiAccess: false, mobileApp: true
      }
    },
    {
      id: 3,
      companyName: 'Gulf Freight Solutions',
      contactPerson: 'Mohammed Ibrahim',
      email: 'info@gulf-freight.com',
      phone: '+966509876543',
      address: 'Port Area, Warehouse Complex',
      city: 'Dammam',
      country: 'Saudi Arabia',
      website: 'www.gulf-freight.com',
      industry: 'Freight & Cargo',
      subscriptionPlan: 'Basic',
      status: 'Trial',
      maxUsers: 10,
      maxVehicles: 25,
      currentUsers: 5,
      currentVehicles: 12,
      createdAt: '2024-01-01',
      lastActivity: '2024-01-15 08:15',
      features: {
        fleetManagement: true, routeOptimization: false, realTimeTracking: true,
        maintenance: false, fuelManagement: false, reporting: false, apiAccess: false, mobileApp: false
      }
    },
    {
      id: 4,
      companyName: 'Desert Logistics LLC',
      contactPerson: 'Sarah Al-Zahra',
      email: 'admin@desert-logistics.com',
      phone: '+966502468135',
      address: 'Highway 40, Logistics Hub',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      website: 'www.desert-logistics.com',
      industry: 'Supply Chain',
      subscriptionPlan: 'Professional',
      status: 'Suspended',
      maxUsers: 20,
      maxVehicles: 80,
      currentUsers: 0,
      currentVehicles: 0,
      createdAt: '2023-08-10',
      lastActivity: '2023-12-20 14:20',
      features: {
        fleetManagement: true, routeOptimization: true, realTimeTracking: true,
        maintenance: true, fuelManagement: false, reporting: true, apiAccess: false, mobileApp: true
      }
    }
  ]);

  const filteredTenants = tenants.filter(tenant => 
    tenant.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD Functions
  const handleAddTenant = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const newTenant = {
      id: tenants.length + 1,
      ...formData,
      currentUsers: 0,
      currentVehicles: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Never'
    };

    setTenants([...tenants, newTenant]);
    resetForm();
    setShowAddModal(false);
    alert('Tenant added successfully!');
  };

  const handleEditTenant = (e) => {
    e.preventDefault();
    const updatedTenants = tenants.map(tenant => 
      tenant.id === selectedTenant.id ? { ...tenant, ...formData } : tenant
    );
    setTenants(updatedTenants);
    setShowEditModal(false);
    setSelectedTenant(null);
    resetForm();
    alert('Tenant updated successfully!');
  };

  const handleDeleteTenant = () => {
    const updatedTenants = tenants.filter(tenant => tenant.id !== selectedTenant.id);
    setTenants(updatedTenants);
    setShowDeleteModal(false);
    setSelectedTenant(null);
    alert('Tenant deleted successfully!');
  };

  const resetForm = () => {
    setFormData({
      companyName: '', contactPerson: '', email: '', phone: '', address: '', 
      city: '', country: '', website: '', industry: '', subscriptionPlan: 'Basic', 
      status: 'Active', maxUsers: '', maxVehicles: '',
      features: {
        fleetManagement: false, routeOptimization: false, realTimeTracking: false,
        maintenance: false, fuelManagement: false, reporting: false, apiAccess: false, mobileApp: false
      }
    });
  };

  const openEditModal = (tenant) => {
    setSelectedTenant(tenant);
    setFormData({
      companyName: tenant.companyName,
      contactPerson: tenant.contactPerson,
      email: tenant.email,
      phone: tenant.phone,
      address: tenant.address,
      city: tenant.city,
      country: tenant.country,
      website: tenant.website,
      industry: tenant.industry,
      subscriptionPlan: tenant.subscriptionPlan,
      status: tenant.status,
      maxUsers: tenant.maxUsers,
      maxVehicles: tenant.maxVehicles,
      features: tenant.features
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (tenant) => {
    setSelectedTenant(tenant);
    setShowDeleteModal(true);
  };

  // Statistics
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  const trialTenants = tenants.filter(t => t.status === 'Trial').length;
  const totalRevenue = tenants.reduce((sum, t) => {
    const planPrices = { Basic: 500, Professional: 1500, Enterprise: 3000 };
    return sum + (t.status === 'Active' ? planPrices[t.subscriptionPlan] || 0 : 0);
  }, 0);

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return '#EF4444';
      case 'Professional': return '#F59E0B';
      case 'Basic': return '#10B981';
      default: return '#6B7280';
    }
  };

  const TenantForm = ({ onSubmit, submitText }) => (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <FormField
          label="Company Name"
          value={formData.companyName}
          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
          required
        />
        <FormField
          label="Contact Person"
          value={formData.contactPerson}
          onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
          required
        />
        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <FormField
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="+966501234567"
        />
        <FormField
          label="Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
        <FormField
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
        />
        <FormField
          label="Country"
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
        />
        <FormField
          label="Website"
          value={formData.website}
          onChange={(e) => setFormData({...formData, website: e.target.value})}
          placeholder="www.company.com"
        />
        <FormField
          label="Industry"
          value={formData.industry}
          onChange={(e) => setFormData({...formData, industry: e.target.value})}
          placeholder="e.g., Logistics & Transportation"
        />
        <FormField
          label="Subscription Plan"
          type="select"
          value={formData.subscriptionPlan}
          onChange={(e) => setFormData({...formData, subscriptionPlan: e.target.value})}
          options={['Basic', 'Professional', 'Enterprise']}
        />
        <FormField
          label="Status"
          type="select"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          options={['Active', 'Trial', 'Suspended', 'Inactive']}
        />
        <FormField
          label="Max Users"
          type="number"
          value={formData.maxUsers}
          onChange={(e) => setFormData({...formData, maxUsers: e.target.value})}
          placeholder="e.g., 50"
        />
        <FormField
          label="Max Vehicles"
          type="number"
          value={formData.maxVehicles}
          onChange={(e) => setFormData({...formData, maxVehicles: e.target.value})}
          placeholder="e.g., 200"
        />
      </div>

      {/* Features Section */}
      <div style={{ marginTop: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>
          Enabled Features
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {Object.entries(formData.features).map(([key, value]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, [key]: e.target.checked }
                })}
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '14px', color: '#374151', textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      <FormButtons
        onCancel={() => {
          setShowAddModal(false);
          setShowEditModal(false);
        }}
        onSubmit={onSubmit}
        submitText={submitText}
        submitColor={submitText === "Add Tenant" ? "#3B82F6" : "#10B981"}
      />
    </form>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Tenant Management" 
        subtitle="Manage client organizations and their subscriptions"
      />

      <StatsGrid>
        <StatCard
          title="Total Tenants"
          value={totalTenants}
          icon={BuildingIcon}
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
        />
        <StatCard
          title="Active Tenants"
          value={activeTenants}
          icon={BuildingIcon}
          color="#10B981"
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard
          title="Trial Tenants"
          value={trialTenants}
          icon={BuildingIcon}
          color="#F59E0B"
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard
          title="Monthly Revenue"
          value={`${totalRevenue.toLocaleString()} SAR`}
          icon={CreditCardIcon}
          color="#8B5CF6"
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)"
        />
      </StatsGrid>

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Tenant"
        searchPlaceholder="Search tenants by company, contact, email, or industry..."
      />

      <TableContainer>
        <UnifiedTable headers={['Company', 'Contact Info', 'Location', 'Subscription', 'Usage', 'Status', 'Actions']}>
          {filteredTenants.map((tenant) => (
            <tr key={tenant.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar icon={BuildingIcon} />
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1F2937' }}>
                      {tenant.companyName}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
                      {tenant.industry}
                    </p>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <UserIcon size={14} color="#6B7280" />
                    <span style={{ fontSize: '12px', color: '#374151' }}>{tenant.contactPerson}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MailIcon size={14} color="#6B7280" />
                    <span style={{ fontSize: '12px', color: '#374151' }}>{tenant.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PhoneIcon size={14} color="#6B7280" />
                    <span style={{ fontSize: '12px', color: '#374151' }}>{tenant.phone}</span>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MapPinIcon size={14} color="#6B7280" />
                    <span style={{ fontSize: '12px', color: '#374151' }}>{tenant.city}, {tenant.country}</span>
                  </div>
                  {tenant.website && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GlobeIcon size={14} color="#6B7280" />
                      <span style={{ fontSize: '12px', color: '#374151' }}>{tenant.website}</span>
                    </div>
                  )}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: `${getPlanColor(tenant.subscriptionPlan)}20`,
                    color: getPlanColor(tenant.subscriptionPlan),
                    marginBottom: '4px',
                    display: 'inline-block'
                  }}>
                    {tenant.subscriptionPlan}
                  </span>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
                    Since {tenant.createdAt}
                  </p>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#374151' }}>
                    Users: {tenant.currentUsers}/{tenant.maxUsers}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#374151' }}>
                    Vehicles: {tenant.currentVehicles}/{tenant.maxVehicles}
                  </p>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge status={tenant.status} />
              </td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                <ActionButtons
                  onEdit={() => openEditModal(tenant)}
                  onDelete={() => openDeleteModal(tenant)}
                  editTitle="Edit Tenant"
                  deleteTitle="Delete Tenant"
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add Tenant Modal */}
      <UnifiedModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Tenant"
        width="800px"
      >
        <TenantForm 
          onSubmit={handleAddTenant}
          submitText="Add Tenant"
        />
      </UnifiedModal>

      {/* Edit Tenant Modal */}
      <UnifiedModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Tenant"
        width="800px"
      >
        <TenantForm 
          onSubmit={handleEditTenant}
          submitText="Update Tenant"
        />
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        width="400px"
      >
        <p style={{ margin: '0 0 20px 0', color: '#6B7280' }}>
          Are you sure you want to delete tenant "{selectedTenant?.companyName}"? This action cannot be undone and will remove all associated data.
        </p>
        <FormButtons
          onCancel={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteTenant}
          submitText="Delete"
          submitColor="#EF4444"
        />
      </UnifiedModal>
    </PageContainer>
  );
};

export default TenantManagement;

