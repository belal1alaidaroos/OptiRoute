import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/apiClient';
import { 
  PlusIcon, 
  SearchIcon, 
  ClockIcon
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

const SLAsProfiles = () => {
  const [slas, setSlas] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSla, setCurrentSla] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    response: '', 
    resolution: '', 
    priority: 'Medium',
    status: 'Active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const headers = ['SLA Name', 'Response (hrs)', 'Resolution (hrs)', 'Priority', 'Status', 'Actions'];

  const filteredSlas = slas.filter(sla =>
    sla.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sla.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sla.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get('/sla-profiles');
        const list = (res.data || []).map(p => ({
          id: p.id,
          name: p.slaName,
          response: p.responseTime,
          resolution: p.resolutionTime,
          priority: p.priority,
          status: p.status || 'Active'
        }));
        setSlas(list);
      } catch {}
    };
    load();
  }, []);

  const handleAdd = () => {
    setCurrentSla(null);
    setFormData({ 
      name: '', 
      response: '', 
      resolution: '', 
      priority: 'Medium',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (sla) => {
    setCurrentSla(sla);
    setFormData({ 
      name: sla.name, 
      response: sla.response, 
      resolution: sla.resolution,
      priority: sla.priority,
      status: sla.status
    });
    setIsModalOpen(true);
  };

  const handleView = (sla) => {
    setToast({ message: `Viewing ${sla.name} SLA`, type: 'info' });
  };

  const handleDelete = (sla) => {
    setSlas(slas.filter(s => s.id !== sla.id));
    setToast({ message: `${sla.name} SLA removed (local only)`, type: 'info' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSla) {
        // Backend exposes only toggle-active; emulate local edit
        const updatedSlas = slas.map(s => 
          s.id === currentSla.id ? { ...s, ...formData } : s
        );
        setSlas(updatedSlas);
        setToast({ message: `${formData.name} SLA updated (local)`, type: 'info' });
      } else {
        const payload = {
          slaName: formData.name,
          responseTime: Number(formData.response),
          resolutionTime: Number(formData.resolution),
          priority: formData.priority
        };
        const res = await apiClient.post('/sla-profiles', payload);
        const created = res.data;
        const newSla = {
          id: created.id,
          name: created.slaName,
          response: created.responseTime,
          resolution: created.resolutionTime,
          priority: created.priority,
          status: created.status || 'Active'
        };
        setSlas([...slas, newSla]);
        setToast({ message: `${formData.name} SLA added`, type: 'success' });
      }
    } catch {
      setToast({ message: 'Failed to save SLA', type: 'error' });
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="SLA Profiles"
        subtitle="Manage service level agreements in the system"
        icon={<ClockIcon className="w-8 h-8 text-yellow-500" />}
      />

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAdd}
        addButtonText="Add SLA"
        searchPlaceholder="Search SLAs..."
        searchIcon={<SearchIcon className="w-5 h-5 text-white" />}
        addIcon={<PlusIcon className="w-5 h-5 text-white" />}
      />

      <TableContainer>
        <UnifiedTable headers={headers}>
          {filteredSlas.map((sla) => (
            <tr key={sla.id}>
              <td className="font-medium">{sla.name}</td>
              <td>{sla.response}</td>
              <td>{sla.resolution}</td>
              <td>
                <StatusBadge 
                  status={sla.priority} 
                  variant={
                    sla.priority === 'Critical' ? 'danger' : 
                    sla.priority === 'High' ? 'warning' : 'info'
                  } 
                />
              </td>
              <td>
                <StatusBadge 
                  status={sla.status} 
                  variant={sla.status === 'Active' ? 'success' : 'inactive'} 
                />
              </td>
              <td>
                <ActionButtons
                  onView={() => handleView(sla)}
                  onEdit={() => handleEdit(sla)}
                  onDelete={() => handleDelete(sla)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSla ? 'Edit SLA Profile' : 'Add SLA Profile'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <FormField
              label="SLA Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Response Time (hours) *"
              name="response"
              type="number"
              value={formData.response}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Resolution Time (hours) *"
              name="resolution"
              type="number"
              value={formData.resolution}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Priority *"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              options={priorities.map(p => ({ value: p, label: p }))}
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
            submitText={currentSla ? 'Update SLA' : 'Add SLA'}
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

export default SLAsProfiles;