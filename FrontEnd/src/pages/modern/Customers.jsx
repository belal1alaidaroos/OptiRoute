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
import apiClient from '../../lib/apiClient';

const Customers = () => {
  // Main state
  const [customers, setCustomers] = useState([]);

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

  // Load initial data
  useEffect(() => {
    (async () => {
      try {
        const [countriesRes, customersRes] = await Promise.all([
          apiClient.get('/countries'),
          apiClient.get('/customers')
        ]);
        setCountries(countriesRes.data || []);
        setCustomers((customersRes.data || []).map(c => ({
          id: c.id,
          customerId: c.customerId,
          name: c.name,
          phone: c.phone,
          landline: c.landline,
          email: c.email,
          country_id: c.countryId,
          region_id: c.regionId,
          city_id: c.cityId,
          address: c.address,
          status: (c.status || 'Active').toLowerCase(),
          joinDate: c.joinDate,
          totalOrders: c.totalOrders,
          totalValue: c.totalValue
        })));
      } catch (e) {
        setToast({ message: 'Failed to load customers or lookups', type: 'error' });
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      (async () => {
        try {
          const { data } = await apiClient.get('/regions', { params: { countryId: selectedCountry } });
          setRegions(data || []);
          setSelectedRegion('');
          setCities([]);
        } catch (e) {
          setToast({ message: 'Failed to load regions', type: 'error' });
        }
      })();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      (async () => {
        try {
          const { data } = await apiClient.get('/cities', { params: { regionId: selectedRegion } });
          setCities(data || []);
        } catch (e) {
          setToast({ message: 'Failed to load cities', type: 'error' });
        }
      })();
    }
  }, [selectedRegion]);

  // Customer CRUD operations
  const handleAddCustomer = async (formData) => {
    try {
      const payload = {
        customerId: `CUST-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        landline: formData.landline,
        email: formData.email,
        countryId: selectedCountry || formData.country_id,
        regionId: selectedRegion || formData.region_id,
        cityId: formData.city_id,
        address: formData.address
      };
      await apiClient.post('/customers', payload);
      const { data } = await apiClient.get('/customers');
      setCustomers((data || []).map(c => ({
        id: c.id,
        customerId: c.customerId,
        name: c.name,
        phone: c.phone,
        landline: c.landline,
        email: c.email,
        country_id: c.countryId,
        region_id: c.regionId,
        city_id: c.cityId,
        address: c.address,
        status: (c.status || 'Active').toLowerCase(),
        joinDate: c.joinDate,
        totalOrders: c.totalOrders,
        totalValue: c.totalValue
      })));
      setToast({ message: 'Customer added successfully', type: 'success' });
      setShowAddModal(false);
    } catch (e) {
      setToast({ message: 'Failed to add customer', type: 'error' });
    }
  };

  const handleEditCustomer = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        landline: formData.landline,
        email: formData.email,
        countryId: selectedCountry || formData.country_id,
        regionId: selectedRegion || formData.region_id,
        cityId: formData.city_id,
        address: formData.address,
        status: formData.status
      };
      await apiClient.put(`/customers/${currentCustomer.id}`, payload);
      const { data } = await apiClient.get('/customers');
      setCustomers((data || []).map(c => ({
        id: c.id,
        customerId: c.customerId,
        name: c.name,
        phone: c.phone,
        landline: c.landline,
        email: c.email,
        country_id: c.countryId,
        region_id: c.regionId,
        city_id: c.cityId,
        address: c.address,
        status: (c.status || 'Active').toLowerCase(),
        joinDate: c.joinDate,
        totalOrders: c.totalOrders,
        totalValue: c.totalValue
      })));
      setToast({ message: 'Customer updated successfully', type: 'success' });
      setShowAddModal(false);
    } catch (e) {
      setToast({ message: 'Failed to update customer', type: 'error' });
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await apiClient.delete(`/customers/${id}`);
      const { data } = await apiClient.get('/customers');
      setCustomers((data || []).map(c => ({
        id: c.id,
        customerId: c.customerId,
        name: c.name,
        phone: c.phone,
        landline: c.landline,
        email: c.email,
        country_id: c.countryId,
        region_id: c.regionId,
        city_id: c.cityId,
        address: c.address,
        status: (c.status || 'Active').toLowerCase(),
        joinDate: c.joinDate,
        totalOrders: c.totalOrders,
        totalValue: c.totalValue
      })));
      setToast({ message: 'Customer deleted successfully', type: 'success' });
    } catch (e) {
      setToast({ message: 'Failed to delete customer', type: 'error' });
    }
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
              onChange={(e) => setSelectedCountry(e.target.value)}
              options={countries.map(c => ({ value: c.id, label: c.name }))}
              required
            />
            <FormField
              label="Region"
              name="region_id"
              type="select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
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