import React, { useState } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  TrashIcon,
  UserIcon
} from '../../components/icons/SVGIcons';
import {
  PageContainer,
  PageHeader,
  ControlsBar,
  TableContainer,
  UnifiedTable,
  ActionButtons,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast,
  SelectField
} from '../../components/shared/UnifiedDesignComponents';

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ahmed Ali', phone: '0551234567', email: 'ahmed@example.com', cityId: 1 },
    { id: 2, name: 'Mohammed Salem', phone: '0507654321', email: 'mohammed@example.com', cityId: 2 },
    { id: 3, name: 'Sara Khalid', phone: '0549876543', email: 'sara@example.com', cityId: 1 }
  ]);

  const [cities] = useState([
    { id: 1, name: 'Riyadh' },
    { id: 2, name: 'Dammam' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', cityId: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'City', 
      cell: (row) => cities.find(c => c.id === row.cityId)?.name || 'N/A'
    },
    { 
      header: 'Actions', 
      cell: (row) => (
        <ActionButtons
          onView={() => handleView(row)}
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      )
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cities.find(c => c.id === customer.cityId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setCurrentCustomer(null);
    setFormData({ name: '', phone: '', email: '', cityId: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setFormData({ 
      name: customer.name, 
      phone: customer.phone, 
      email: customer.email, 
      cityId: customer.cityId 
    });
    setIsModalOpen(true);
  };

  const handleView = (customer) => {
    setCurrentCustomer(customer);
    setToast({ show: true, message: `Viewing ${customer.name}`, type: 'info' });
  };

  const handleDelete = (customer) => {
    setCustomers(customers.filter(c => c.id !== customer.id));
    setToast({ show: true, message: `${customer.name} deleted`, type: 'success' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCustomer) {
      setCustomers(customers.map(c => 
        c.id === currentCustomer.id ? { ...c, ...formData } : c
      ));
      setToast({ show: true, message: `${formData.name} updated`, type: 'success' });
    } else {
      const newCustomer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        ...formData
      };
      setCustomers([...customers, newCustomer]);
      setToast({ show: true, message: `${formData.name} added`, type: 'success' });
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Customers"
        icon={<UserIcon />}
        description="Manage all customers in the system"
      />

      <ControlsBar
        onAdd={handleAdd}
        onSearch={(term) => setSearchTerm(term)}
        addButtonText="Add Customer"
        searchPlaceholder="Search customers..."
      />

      <TableContainer>
        <UnifiedTable
          columns={columns}
          data={filteredCustomers}
          emptyMessage="No customers found"
        />
      </TableContainer>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCustomer ? 'Edit Customer' : 'Add Customer'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <SelectField
            label="City"
            name="cityId"
            value={formData.cityId}
            onChange={handleInputChange}
            options={cities.map(c => ({ value: c.id, label: c.name }))}
            required
          />
          <FormButtons
            onCancel={() => setIsModalOpen(false)}
            submitText={currentCustomer ? 'Update' : 'Add'}
          />
        </form>
      </UnifiedModal>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </PageContainer>
  );
};

export default Customers;