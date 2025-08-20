import React, { useEffect, useState } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  TruckIcon,
  FlagIcon,
  CheckCircleIcon,
  CalendarIcon
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
  UnifiedModal,
  FormField,
  FormButtons,
  Toast
} from '../../components/shared/UnifiedDesignComponents';
import apiClient from '../../lib/apiClient';

// Temporary StatusBadge implementation
const StatusBadge = ({ status, variant = 'default' }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    default: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {status}
    </span>
  );
};

const VehiclesMake = () => {
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/vehicles/makes');
        setMakes(data || []);
      } catch (err) {
        console.error('Failed to load vehicle makes', err);
      }
    };
    load();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMake, setCurrentMake] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredMakes = makes.filter(make =>
    make.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    make.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMake = async (formData) => {
    try {
      await apiClient.post('/vehicles/makes', {
        name: formData.name,
        country: formData.country,
        popular: formData.popular === 'true'
      });
      const { data } = await apiClient.get('/vehicles/makes');
      setMakes(data || []);
      setToast({ message: 'Make added successfully', type: 'success' });
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to add make', err);
    }
  };

  const handleEditMake = async (formData) => {
    try {
      await apiClient.put(`/vehicles/makes/${currentMake.id}`, {
        name: formData.name,
        country: formData.country,
        popular: formData.popular === 'true'
      });
      const { data } = await apiClient.get('/vehicles/makes');
      setMakes(data || []);
      setToast({ message: 'Make updated successfully', type: 'success' });
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to update make', err);
    }
  };

  const handleDeleteMake = async (id) => {
    try {
      await apiClient.delete(`/vehicles/makes/${id}`);
      setMakes(makes.filter(make => make.id !== id));
      setToast({ message: 'Make deleted successfully', type: 'success' });
    } catch (err) {
      console.error('Failed to delete make', err);
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Vehicle Makes" 
        subtitle="Manage all vehicle manufacturers in the system"
        icon={<TruckIcon />}
      />

      <StatsGrid>
        <StatCard 
          title="Total Makes" 
          value={makes.length.toString()} 
          icon={TruckIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
        <StatCard 
          title="Popular Makes" 
          value={makes.filter(m => m.popular).length.toString()} 
          icon={FlagIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="German Makes" 
          value={makes.filter(m => m.country === 'Germany').length.toString()} 
          icon={FlagIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Swedish Makes" 
          value={makes.filter(m => m.country === 'Sweden').length.toString()} 
          icon={FlagIcon} 
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)"
        />
      </StatsGrid>

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setCurrentMake(null);
          setShowAddModal(true);
        }}
        addButtonText="Add Make"
        searchPlaceholder="Search makes..."
      />

      <TableContainer>
        <UnifiedTable
          headers={['Make Name', 'Country', 'Popular', 'Actions']}
        >
          {filteredMakes.map((make) => (
            <tr key={make.id}>
              <td className="font-medium">{make.name}</td>
              <td>{make.country}</td>
              <td>
                <StatusBadge 
                  status={make.popular ? 'Yes' : 'No'} 
                  variant={make.popular ? 'success' : 'inactive'} 
                />
              </td>
              <td>
                <ActionButtons
                  onView={() => console.log('View', make.id)}
                  onEdit={() => {
                    setCurrentMake(make);
                    setShowAddModal(true);
                  }}
                  onDelete={() => handleDeleteMake(make.id)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCurrentMake(null);
        }}
        title={currentMake ? 'Edit Vehicle Make' : 'Add New Make'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          currentMake ? handleEditMake(formData) : handleAddMake(formData);
        }}>
          <div className="space-y-4">
            <FormField
              label="Make Name *"
              name="name"
              defaultValue={currentMake?.name || ''}
              required
            />
            <FormField
              label="Country *"
              name="country"
              defaultValue={currentMake?.country || ''}
              required
            />
            <FormField
              label="Popular Make"
              name="popular"
              type="select"
              defaultValue={currentMake?.popular ? 'true' : 'false'}
              options={[
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' }
              ]}
            />
          </div>
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            submitText={currentMake ? 'Update Make' : 'Add Make'}
          />
        </form>
      </UnifiedModal>

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

export default VehiclesMake;