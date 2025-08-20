import React, { useState, useEffect } from 'react';
import { 
  UserIcon,
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  DollarSignIcon,
  MapPinIcon
} from '../../components/icons/SVGIcons';
import {
  PageContainer,
  PageHeader,
  StatCard,
  StatsGrid,
  ControlsBar,
  TableContainer,
  UnifiedTable,
  ActionButtons,
  StatusBadge,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast
} from '../../components/shared/UnifiedDesignComponents';

// Mock data services - These will be replaced with real API calls later
const mockDataService = {
  getCountries: () => [
    { id: 1, name: 'Saudi Arabia', code: 'SA' },
    { id: 2, name: 'United Arab Emirates', code: 'AE' },
    { id: 3, name: 'Kuwait', code: 'KW' }
  ],

  getRegions: (countryId) => {
    const allRegions = [
      { id: 1, country_id: 1, name: 'Riyadh Province' },
      { id: 2, country_id: 1, name: 'Makkah Province' },
      { id: 3, country_id: 1, name: 'Eastern Province' },
      { id: 4, country_id: 2, name: 'Dubai' },
      { id: 5, country_id: 2, name: 'Abu Dhabi' },
      { id: 6, country_id: 3, name: 'Al Asimah' }
    ];
    return countryId ? allRegions.filter(r => r.country_id === countryId) : allRegions;
  },

  getCities: (regionId) => {
    const allCities = [
      { id: 1, region_id: 1, name: 'Riyadh' },
      { id: 2, region_id: 1, name: 'Diriyah' },
      { id: 3, region_id: 2, name: 'Makkah' },
      { id: 4, region_id: 2, name: 'Jeddah' },
      { id: 5, region_id: 3, name: 'Dammam' },
      { id: 6, region_id: 3, name: 'Khobar' },
      { id: 7, region_id: 4, name: 'Downtown Dubai' },
      { id: 8, region_id: 5, name: 'Abu Dhabi City' },
      { id: 9, region_id: 6, name: 'Kuwait City' }
    ];
    return regionId ? allCities.filter(c => c.region_id === regionId) : allCities;
  }
};

const Customers = () => {
  // Main state
  const [customers, setCustomers] = useState([
    {
      id: 1,
      customerId: 'CUST-001',
      name: 'Ahmed Ali',
      phone: '+966501234567',
      landline: '+96611234567',
      email: 'ahmed@example.com',
      country_id: 1,
      region_id: 1,
      city_id: 1,
      address: '123 King Fahd Road',
      status: 'active',
      joinDate: '2023-01-15',
      totalOrders: 12,
      totalValue: '45,000 SAR'
    },
    // More sample customers...
  ]);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [toast, setToast] = useState(null);

  // Lookup data state
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Load lookup data
  useEffect(() => {
    setCountries(mockDataService.getCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setRegions(mockDataService.getRegions(selectedCountry));
      setSelectedRegion('');
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      setCities(mockDataService.getCities(selectedRegion));
    }
  }, [selectedRegion]);

  // Customer CRUD operations
  const handleAddCustomer = (formData) => {
    const newCustomer = {
      id: customers.length + 1,
      customerId: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      ...formData,
      status: formData.status || 'active',
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalValue: '0 SAR'
    };
    setCustomers([...customers, newCustomer]);
    setToast({ message: 'Customer added successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleEditCustomer = (formData) => {
    const updatedCustomers = customers.map(c => 
      c.id === currentCustomer.id ? { ...c, ...formData } : c
    );
    setCustomers(updatedCustomers);
    setToast({ message: 'Customer updated successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
    setToast({ message: 'Customer deleted successfully', type: 'success' });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    
    if (currentCustomer) {
      handleEditCustomer(formData);
    } else {
      handleAddCustomer(formData);
    }
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper to get related entity name
  const getEntityName = (entities, id) => {
    return entities.find(e => e.id === id)?.name || '';
  };

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader 
        title="Customers Management" 
        subtitle="Manage all customer records with complete geographical information" 
        icon={<UserIcon />}
      />

      {/* Statistics Cards */}
      <StatsGrid>
        <StatCard 
          title="Total Customers" 
          value={customers.length.toString()} 
          icon={UserIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
        <StatCard 
          title="Active" 
          value={customers.filter(c => c.status === 'active').length.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="New This Month" 
          value="24" 
          icon={ClockIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Total Value" 
          value="1.8M SAR" 
          icon={DollarSignIcon} 
          gradient="linear-gradient(135deg, #667EEA, #764BA2)"
        />
      </StatsGrid>

      {/* Controls */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setCurrentCustomer(null);
          setSelectedCountry('');
          setSelectedRegion('');
          setShowAddModal(true);
        }}
        addButtonText="Add Customer"
        searchPlaceholder="Search customers..."
        additionalControls={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        }
      />

      {/* Customers Table */}
      <TableContainer>
        <UnifiedTable
          headers={['Customer', 'Contact', 'Location', 'Status', 'Value', 'Actions']}
        >
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-gray-500">{customer.customerId}</div>
              </td>
              <td>
                <div className="font-medium">{customer.phone}</div>
                <div className="text-sm text-gray-500">{customer.email}</div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <div>
                    <div>{getEntityName(cities, customer.city_id)}</div>
                    <div className="text-xs text-gray-500">
                      {getEntityName(regions, customer.region_id)}, {getEntityName(countries, customer.country_id)}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <StatusBadge status={customer.status} variant={customer.status} />
              </td>
              <td className="font-medium">
                {customer.totalValue}
                <div className="text-sm text-gray-500">{customer.totalOrders} orders</div>
              </td>
              <td>
                <ActionButtons
                  onView={() => console.log('View', customer.id)}
                  onEdit={() => {
                    setCurrentCustomer(customer);
                    setSelectedCountry(customer.country_id);
                    setSelectedRegion(customer.region_id);
                    setShowAddModal(true);
                  }}
                  onDelete={() => handleDeleteCustomer(customer.id)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add/Edit Customer Modal */}
      <UnifiedModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCurrentCustomer(null);
        }}
        title={currentCustomer ? 'Edit Customer' : 'Add New Customer'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormField
              label="Full Name"
              name="name"
              defaultValue={currentCustomer?.name || ''}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              defaultValue={currentCustomer?.email || ''}
              required
            />
            <FormField
              label="Mobile"
              name="phone"
              defaultValue={currentCustomer?.phone || ''}
              required
            />
            <FormField
              label="Landline"
              name="landline"
              defaultValue={currentCustomer?.landline || ''}
            />
            <FormField
              label="Country"
              name="country_id"
              type="select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(Number(e.target.value))}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <FormField
              label="Region"
              name="region_id"
              type="select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(Number(e.target.value))}
              options={regions.map(r => ({ value: r.id, label: r.name }))}
              disabled={!selectedCountry}
              required
            />
            <FormField
              label="City"
              name="city_id"
              type="select"
              defaultValue={currentCustomer?.city_id || ''}
              options={cities.map(c => ({ value: c.id, label: c.name }))}
              disabled={!selectedRegion}
              required
            />
            <FormField
              label="Address"
              name="address"
              defaultValue={currentCustomer?.address || ''}
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              defaultValue={currentCustomer?.status || 'active'}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' }
              ]}
            />
            <FormField
              label="Join Date"
              name="joinDate"
              type="date"
              defaultValue={currentCustomer?.joinDate || ''}
            />
          </div>
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            submitText={currentCustomer ? 'Update Customer' : 'Add Customer'}
          />
        </form>
      </UnifiedModal>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </PageContainer>
  );
};

export default Customers;