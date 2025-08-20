import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/apiClient';
import { 
  PlusIcon, 
  SearchIcon, 
  SettingsIcon
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

const ServicesMode = () => {
  const [modes, setModes] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/option-sets');
        const list = (res.data || [])
          .filter(x => (x.optionSetName || '').toLowerCase() === 'service-mode')
          .map(x => ({ id: x.id, name: x.name, description: x.description || '', status: x.isActive ? 'Active' : 'Inactive' }));
        setModes(list);
      } catch {}
    };
    load();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const headers = ['Mode Name', 'Description', 'Status', 'Actions'];

  const filteredModes = modes.filter(mode =>
    mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mode.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setCurrentMode(null);
    setFormData({ name: '', description: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEdit = (mode) => {
    setCurrentMode(mode);
    setFormData({ 
      name: mode.name, 
      description: mode.description,
      status: mode.status
    });
    setIsModalOpen(true);
  };

  const handleView = (mode) => {
    setToast({ message: `Viewing ${mode.name}`, type: 'info' });
  };

  const handleDelete = async (mode) => {
    try {
      await apiClient.delete(`/option-sets/${mode.id}`);
      setModes(modes.filter(m => m.id !== mode.id));
      setToast({ message: `${mode.name} deleted`, type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMode) {
        await apiClient.put(`/option-sets/${currentMode.id}`, {
          name: formData.name,
          description: formData.description,
          optionSetName: 'Service-Mode',
          isActive: formData.status === 'Active'
        });
        setModes(modes.map(m => m.id === currentMode.id ? { ...m, ...formData } : m));
        setToast({ message: `${formData.name} updated`, type: 'success' });
      } else {
        const res = await apiClient.post('/option-sets', {
          name: formData.name,
          description: formData.description,
          optionSetName: 'Service-Mode',
          isActive: formData.status === 'Active'
        });
        const created = res.data;
        setModes([...modes, { id: created.id, name: created.name, description: created.description || '', status: created.isActive ? 'Active' : 'Inactive' }]);
        setToast({ message: `${formData.name} added`, type: 'success' });
      }
    } catch {
      setToast({ message: 'Failed to save', type: 'error' });
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Service Modes"
        subtitle="Manage service modes in the system"
        icon={<SettingsIcon className="w-8 h-8 text-purple-500" />}
      />

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAdd}
        addButtonText="Add Mode"
        searchPlaceholder="Search modes..."
        searchIcon={<SearchIcon className="w-5 h-5 text-white" />}
        addIcon={<PlusIcon className="w-5 h-5 text-white" />}
      />

      <TableContainer>
        <UnifiedTable headers={headers}>
          {filteredModes.map((mode) => (
            <tr key={mode.id}>
              <td className="font-medium">{mode.name}</td>
              <td>{mode.description}</td>
              <td>
                <StatusBadge 
                  status={mode.status} 
                  variant={mode.status === 'Active' ? 'success' : 'inactive'} 
                />
              </td>
              <td>
                <ActionButtons
                  onView={() => handleView(mode)}
                  onEdit={() => handleEdit(mode)}
                  onDelete={() => handleDelete(mode)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMode ? 'Edit Service Mode' : 'Add Service Mode'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <FormField
              label="Mode Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              type="textarea"
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
            submitText={currentMode ? 'Update Mode' : 'Add Mode'}
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

export default ServicesMode;