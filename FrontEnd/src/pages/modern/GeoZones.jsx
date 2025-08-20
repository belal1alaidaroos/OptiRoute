import React, { useEffect, useState } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  TrashIcon,
  MapIcon
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
  SelectField,
  StatusBadge
} from '../../components/shared/UnifiedDesignComponents';
import apiClient from '../../lib/apiClient';

const GeoZones = () => {
  const [zones, setZones] = useState([]);

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [citiesRes, zonesRes] = await Promise.all([
          apiClient.get('/cities'),
          apiClient.get('/geo-zones')
        ]);
        setCities(citiesRes.data || []);
        setZones(zonesRes.data || []);
      } catch (err) {
        console.error('Failed to load geo zones', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [formData, setFormData] = useState({ name: '', cityId: '', description: '', status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const headers = ['Zone Name', 'City', 'Description', 'Status', 'Actions'];

  const filteredZones = zones.filter(zone => {
    const city = cities.find(c => c.id === zone.cityId);
    return (
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (city?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      zone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setCurrentZone(null);
    setFormData({ name: '', cityId: '', description: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEdit = (zone) => {
    setCurrentZone(zone);
    setFormData({ 
      name: zone.name, 
      cityId: zone.cityId, 
      description: zone.description,
      status: zone.status
    });
    setIsModalOpen(true);
  };

  const handleView = (zone) => {
    setToast({ message: `Viewing ${zone.name} zone`, type: 'info' });
  };

  const handleDelete = async (zone) => {
    try {
      await apiClient.delete(`/geo-zones/${zone.id}`);
      setZones(zones.filter(z => z.id !== zone.id));
      setToast({ message: `${zone.name} zone deleted`, type: 'success' });
    } catch (err) {
      console.error('Failed to delete zone', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentZone) {
        await apiClient.put(`/geo-zones/${currentZone.id}`, {
          name: formData.name,
          cityId: formData.cityId,
          description: formData.description,
          status: formData.status
        });
      } else {
        await apiClient.post('/geo-zones', {
          name: formData.name,
          cityId: formData.cityId,
          description: formData.description
        });
      }
      const { data } = await apiClient.get('/geo-zones');
      setZones(data || []);
      setToast({ message: currentZone ? `${formData.name} zone updated` : `${formData.name} zone added`, type: 'success' });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save zone', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Geo Zones"
        subtitle="Manage geographical zones in the system"
        icon={<MapIcon className="w-8 h-8 text-blue-500" />}
      />

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAdd}
        addButtonText="Add Zone"
        searchPlaceholder="Search zones..."
        searchIcon={<SearchIcon className="w-5 h-5 text-white" />}
        addIcon={<PlusIcon className="w-5 h-5 text-white" />}
      />

      <TableContainer>
        <UnifiedTable headers={headers}>
          {filteredZones.map((zone) => {
            const city = cities.find(c => c.id === zone.cityId);
            return (
              <tr key={zone.id}>
                <td className="font-medium">{zone.name}</td>
                <td>{city?.name || 'N/A'}</td>
                <td>{zone.description}</td>
                <td>
                  <StatusBadge 
                    status={zone.status} 
                    variant={zone.status === 'Active' ? 'success' : 'inactive'} 
                  />
                </td>
                <td>
                  <ActionButtons
                    onView={() => handleView(zone)}
                    onEdit={() => handleEdit(zone)}
                    onDelete={() => handleDelete(zone)}
                  />
                </td>
              </tr>
            );
          })}
        </UnifiedTable>
      </TableContainer>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentZone ? 'Edit Zone' : 'Add Zone'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <FormField
              label="Zone Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="City *"
              name="cityId"
              value={formData.cityId}
              onChange={handleInputChange}
              options={cities.map(c => ({ value: c.id, label: c.name }))}
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
            submitText={currentZone ? 'Update Zone' : 'Add Zone'}
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

export default GeoZones;