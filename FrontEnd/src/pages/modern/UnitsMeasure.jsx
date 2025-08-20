import React, { useState } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  RulerIcon
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
  StatusBadge,
  SelectField
} from '../../components/shared/UnifiedDesignComponents';

const UnitsMeasure = () => {
  const [units, setUnits] = useState([
    { id: 1, name: 'Liter', symbol: 'L', category: 'Volume', status: 'Active' },
    { id: 2, name: 'Kilogram', symbol: 'kg', category: 'Weight', status: 'Active' },
    { id: 3, name: 'Meter', symbol: 'm', category: 'Length', status: 'Inactive' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [formData, setFormData] = useState({ name: '', symbol: '', category: '', status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const categories = ['Volume', 'Weight', 'Length', 'Area', 'Temperature', 'Speed'];
  const headers = ['Unit Name', 'Symbol', 'Category', 'Status', 'Actions'];

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setCurrentUnit(null);
    setFormData({ name: '', symbol: '', category: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEdit = (unit) => {
    setCurrentUnit(unit);
    setFormData({ 
      name: unit.name, 
      symbol: unit.symbol, 
      category: unit.category,
      status: unit.status
    });
    setIsModalOpen(true);
  };

  const handleView = (unit) => {
    setToast({ message: `Viewing ${unit.name}`, type: 'info' });
  };

  const handleDelete = (unit) => {
    setUnits(units.filter(u => u.id !== unit.id));
    setToast({ message: `${unit.name} deleted`, type: 'success' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUnit) {
      const updatedUnits = units.map(u => 
        u.id === currentUnit.id ? { ...u, ...formData } : u
      );
      setUnits(updatedUnits);
      setToast({ message: `${formData.name} updated`, type: 'success' });
    } else {
      const newUnit = {
        id: Math.max(...units.map(u => u.id)) + 1,
        ...formData
      };
      setUnits([...units, newUnit]);
      setToast({ message: `${formData.name} added`, type: 'success' });
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Units of Measure"
        subtitle="Manage measurement units in the system"
        icon={<RulerIcon className="w-8 h-8 text-green-500" />}
      />

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAdd}
        addButtonText="Add Unit"
        searchPlaceholder="Search units..."
        searchIcon={<SearchIcon className="w-5 h-5 text-white" />}
        addIcon={<PlusIcon className="w-5 h-5 text-white" />}
      />

      <TableContainer>
        <UnifiedTable headers={headers}>
          {filteredUnits.map((unit) => (
            <tr key={unit.id}>
              <td className="font-medium">{unit.name}</td>
              <td>{unit.symbol}</td>
              <td>{unit.category}</td>
              <td>
                <StatusBadge 
                  status={unit.status} 
                  variant={unit.status === 'Active' ? 'success' : 'inactive'} 
                />
              </td>
              <td>
                <ActionButtons
                  onView={() => handleView(unit)}
                  onEdit={() => handleEdit(unit)}
                  onDelete={() => handleDelete(unit)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentUnit ? 'Edit Unit' : 'Add Unit'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <FormField
              label="Unit Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Symbol *"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Category *"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={categories.map(cat => ({ value: cat, label: cat }))}
              required
            />
            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
            />
          </div>
          <FormButtons
            onCancel={() => setIsModalOpen(false)}
            submitText={currentUnit ? 'Update Unit' : 'Add Unit'}
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

export default UnitsMeasure;