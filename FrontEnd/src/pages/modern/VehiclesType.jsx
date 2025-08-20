import React, { useState } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  TruckIcon,
  TrailerIcon,
  VanIcon,
  PickupIcon
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

const VehiclesType = () => {
  const [types, setTypes] = useState([
    { id: 1, name: 'Truck', icon: 'TruckIcon', description: 'Heavy commercial vehicle for cargo transport' },
    { id: 2, name: 'Trailer', icon: 'TrailerIcon', description: 'Unpowered vehicle towed by a powered vehicle' },
    { id: 3, name: 'Van', icon: 'VanIcon', description: 'Medium-sized commercial vehicle' },
    { id: 4, name: 'Pickup', icon: 'PickupIcon', description: 'Light truck with an enclosed cab and open bed' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredTypes = types.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'TruckIcon': return <TruckIcon className="w-5 h-5" />;
      case 'TrailerIcon': return <TrailerIcon className="w-5 h-5" />;
      case 'VanIcon': return <VanIcon className="w-5 h-5" />;
      case 'PickupIcon': return <PickupIcon className="w-5 h-5" />;
      default: return <TruckIcon className="w-5 h-5" />;
    }
  };

  const handleAddType = (formData) => {
    const newType = {
      id: types.length + 1,
      ...formData
    };
    setTypes([...types, newType]);
    setToast({ message: 'Type added successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleEditType = (formData) => {
    const updatedTypes = types.map(type => 
      type.id === currentType.id ? { 
        ...type, 
        ...formData
      } : type
    );
    setTypes(updatedTypes);
    setToast({ message: 'Type updated successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleDeleteType = (id) => {
    setTypes(types.filter(type => type.id !== id));
    setToast({ message: 'Type deleted successfully', type: 'success' });
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Vehicle Types" 
        subtitle="Manage all vehicle types in the system"
        icon={<TruckIcon />}
      />

      <StatsGrid>
        <StatCard 
          title="Total Types" 
          value={types.length.toString()} 
          icon={TruckIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
        <StatCard 
          title="Trucks" 
          value={types.filter(t => t.name === 'Truck').length.toString()} 
          icon={TruckIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="Trailers" 
          value={types.filter(t => t.name === 'Trailer').length.toString()} 
          icon={TrailerIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Vans" 
          value={types.filter(t => t.name === 'Van').length.toString()} 
          icon={VanIcon} 
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)"
        />
      </StatsGrid>

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setCurrentType(null);
          setShowAddModal(true);
        }}
        addButtonText="Add Type"
        searchPlaceholder="Search types..."
      />

      <TableContainer>
        <UnifiedTable
          headers={['Type', 'Description', 'Actions']}
        >
          {filteredTypes.map((type) => (
            <tr key={type.id}>
              <td>
                <div className="flex items-center gap-2">
                  {getIconComponent(type.icon)}
                  <span className="font-medium">{type.name}</span>
                </div>
              </td>
              <td className="text-gray-600">{type.description}</td>
              <td>
                <ActionButtons
                  onView={() => console.log('View', type.id)}
                  onEdit={() => {
                    setCurrentType(type);
                    setShowAddModal(true);
                  }}
                  onDelete={() => handleDeleteType(type.id)}
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
          setCurrentType(null);
        }}
        title={currentType ? 'Edit Vehicle Type' : 'Add New Type'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          currentType ? handleEditType(formData) : handleAddType(formData);
        }}>
          <div className="space-y-4">
            <FormField
              label="Type Name *"
              name="name"
              defaultValue={currentType?.name || ''}
              required
            />
            <FormField
              label="Icon"
              name="icon"
              type="select"
              defaultValue={currentType?.icon || 'TruckIcon'}
              options={[
                { value: 'TruckIcon', label: 'Truck' },
                { value: 'TrailerIcon', label: 'Trailer' },
                { value: 'VanIcon', label: 'Van' },
                { value: 'PickupIcon', label: 'Pickup' }
              ]}
            />
            <FormField
              label="Description *"
              name="description"
              type="textarea"
              defaultValue={currentType?.description || ''}
              required
            />
          </div>
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            submitText={currentType ? 'Update Type' : 'Add Type'}
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

export default VehiclesType;