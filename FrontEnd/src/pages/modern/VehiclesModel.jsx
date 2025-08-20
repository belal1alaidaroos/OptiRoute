import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  TruckIcon,
  CarIcon,
  CheckCircleIcon
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
  Toast,
  SelectField,
  StatusBadge
} from '../../components/shared/UnifiedDesignComponents';

const VehiclesModel = () => {
  // Mock data services
  const mockDataService = {
    getMakes: () => [
      { id: 1, name: 'Mercedes' },
      { id: 2, name: 'Volvo' },
      { id: 3, name: 'MAN' },
      { id: 4, name: 'Scania' }
    ],
    getTypes: () => [
      { id: 1, name: 'Truck' },
      { id: 2, name: 'Trailer' },
      { id: 3, name: 'Van' },
      { id: 4, name: 'Pickup' }
    ]
  };

  // State management
  const [models, setModels] = useState([
    { id: 1, name: 'Actros', makeId: 1, typeId: 1, yearIntroduced: 1996, isActive: true },
    { id: 2, name: 'FH16', makeId: 2, typeId: 1, yearIntroduced: 1993, isActive: true },
    { id: 3, name: 'TGX', makeId: 3, typeId: 1, yearIntroduced: 2007, isActive: true }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [toast, setToast] = useState(null);
  const [makes, setMakes] = useState([]);
  const [types, setTypes] = useState([]);

  // Load lookup data
  useEffect(() => {
    setMakes(mockDataService.getMakes());
    setTypes(mockDataService.getTypes());
  }, []);

  // Filter models - FIXED SYNTAX ERROR HERE
  const filteredModels = models.filter(model => {
    const make = makes.find(m => m.id === model.makeId);
    const type = types.find(t => t.id === model.typeId);
    
    return (
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (make?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (type?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddModel = (formData) => {
    const newModel = {
      id: models.length + 1,
      ...formData,
      makeId: Number(formData.makeId),
      typeId: Number(formData.typeId),
      yearIntroduced: Number(formData.yearIntroduced),
      isActive: formData.isActive === 'true'
    };
    setModels([...models, newModel]);
    setToast({ message: 'Model added successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleEditModel = (formData) => {
    const updatedModels = models.map(model => 
      model.id === currentModel.id ? { 
        ...model, 
        ...formData,
        makeId: Number(formData.makeId),
        typeId: Number(formData.typeId),
        yearIntroduced: Number(formData.yearIntroduced),
        isActive: formData.isActive === 'true'
      } : model
    );
    setModels(updatedModels);
    setToast({ message: 'Model updated successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleDeleteModel = (id) => {
    setModels(models.filter(model => model.id !== id));
    setToast({ message: 'Model deleted successfully', type: 'success' });
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Vehicle Models" 
        subtitle="Manage all vehicle models in the system"
        icon={<CarIcon className="w-8 h-8 text-blue-500" />}
      />

      <StatsGrid>
        <StatCard 
          title="Total Models" 
          value={models.length.toString()} 
          icon={() => <CarIcon className="w-6 h-6 text-white" />} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
        <StatCard 
          title="Active Models" 
          value={models.filter(m => m.isActive).length.toString()} 
          icon={() => <CheckCircleIcon className="w-6 h-6" />} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="Truck Models" 
          value={models.filter(m => m.typeId === 1).length.toString()} 
          icon={() => <TruckIcon className="w-6 h-6" />} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Avg. Age" 
          value={`${Math.floor(
            models.reduce(
              (acc, m) => acc + (new Date().getFullYear() - m.yearIntroduced), 
              0
            ) / models.length
          )} years`}
          icon={() => <CheckCircleIcon className="w-6 h-6" />} 
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)"
        />
      </StatsGrid>

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setCurrentModel(null);
          setShowAddModal(true);
        }}
        addButtonText="Add Model"
        searchPlaceholder="Search models..."
        searchIcon={<SearchIcon className="w-5 h-5" />}
        addIcon={<PlusIcon className="w-5 h-5" />}
      />

      <TableContainer>
        <UnifiedTable
          headers={['Model Name', 'Make', 'Type', 'Year Introduced', 'Status', 'Actions']}
        >
          {filteredModels.map((model) => {
            const make = makes.find(m => m.id === model.makeId);
            const type = types.find(t => t.id === model.typeId);
            
            return (
              <tr key={model.id}>
                <td className="font-medium">{model.name}</td>
                <td>{make?.name || 'N/A'}</td>
                <td>{type?.name || 'N/A'}</td>
                <td>{model.yearIntroduced}</td>
                <td>
                  <StatusBadge 
                    status={model.isActive ? 'Active' : 'Inactive'} 
                    variant={model.isActive ? 'success' : 'inactive'} 
                  />
                </td>
                <td>
                  <ActionButtons
                    onView={() => console.log('View', model.id)}
                    onEdit={() => {
                      setCurrentModel(model);
                      setShowAddModal(true);
                    }}
                    onDelete={() => handleDeleteModel(model.id)}
                  />
                </td>
              </tr>
            );
          })}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCurrentModel(null);
        }}
        title={currentModel ? 'Edit Vehicle Model' : 'Add New Model'}
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          currentModel ? handleEditModel(formData) : handleAddModel(formData);
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField
              label="Model Name *"
              name="name"
              defaultValue={currentModel?.name || ''}
              required
            />
            <SelectField
              label="Make *"
              name="makeId"
              defaultValue={currentModel?.makeId || ''}
              options={makes.map(make => ({
                value: make.id,
                label: make.name
              }))}
              required
            />
            <SelectField
              label="Type *"
              name="typeId"
              defaultValue={currentModel?.typeId || ''}
              options={types.map(type => ({
                value: type.id,
                label: type.name
              }))}
              required
            />
            <FormField
              label="Year Introduced *"
              name="yearIntroduced"
              type="number"
              defaultValue={currentModel?.yearIntroduced || ''}
              required
            />
            <SelectField
              label="Status"
              name="isActive"
              defaultValue={currentModel?.isActive ? 'true' : 'false'}
              options={[
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' }
              ]}
            />
          </div>
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            submitText={currentModel ? 'Update Model' : 'Add Model'}
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

export default VehiclesModel;