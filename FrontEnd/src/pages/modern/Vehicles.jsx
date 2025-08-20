import React, { useEffect, useState } from 'react';
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
  Avatar,
  ContactInfo,
  Toast,
  Loading
} from '../../components/shared/UnifiedDesignComponents';
import { 
  TruckIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  TrashIcon,
  FuelIcon,
  UserIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  ChevronDownIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const Vehicles = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    type: 'Truck',
    capacity: '',
    fuelType: 'Diesel',
    status: 'Active',
    driver: '',
    fuelLevel: '',
    mileage: '',
    location: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    insuranceExpiry: '',
    registrationExpiry: '',
    notes: ''
  });

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: 'ABC-123',
      make: 'Mercedes',
      model: 'Actros',
      year: '2022',
      type: 'Truck',
      capacity: '25 tons',
      fuelType: 'Diesel',
      status: 'Active',
      driver: 'Ahmed Ali',
      driverContact: 'ahmed.ali@example.com | +966501234567',
      fuelLevel: 85,
      mileage: '45,230 km',
      location: 'Riyadh Depot',
      lastMaintenanceDate: '2023-05-15',
      nextMaintenanceDate: '2023-11-15',
      insuranceExpiry: '2024-01-01',
      registrationExpiry: '2024-12-31',
      notes: 'Regular maintenance performed. No issues reported.'
    },
    {
      id: 2,
      plateNumber: 'XYZ-456',
      make: 'Volvo',
      model: 'FH16',
      year: '2021',
      type: 'Truck',
      capacity: '30 tons',
      fuelType: 'Diesel',
      status: 'In Transit',
      driver: 'Mohammed Hassan',
      driverContact: 'm.hassan@example.com | +966502345678',
      fuelLevel: 62,
      mileage: '67,890 km',
      location: 'Jeddah Highway',
      lastMaintenanceDate: '2023-04-20',
      nextMaintenanceDate: '2023-10-20',
      insuranceExpiry: '2023-12-15',
      registrationExpiry: '2023-12-31',
      notes: 'Needs tire replacement soon.'
    },
    {
      id: 3,
      plateNumber: 'DEF-789',
      make: 'MAN',
      model: 'TGX',
      year: '2023',
      type: 'Truck',
      capacity: '28 tons',
      fuelType: 'Diesel',
      status: 'Maintenance',
      driver: 'Khalid Omar',
      driverContact: 'k.omar@example.com | +966503456789',
      fuelLevel: 42,
      mileage: '12,340 km',
      location: 'Dammam Workshop',
      lastMaintenanceDate: '2023-06-10',
      nextMaintenanceDate: '2023-12-10',
      insuranceExpiry: '2024-03-01',
      registrationExpiry: '2024-12-31',
      notes: 'Currently in workshop for engine check.'
    }
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/vehicles');
        const mapped = (data || []).map(v => ({
          id: v.id,
          plateNumber: v.plateNumber,
          make: v.make,
          model: v.model,
          year: v.year,
          type: v.type || 'Truck',
          capacity: v.capacity ? `${v.capacity} tons` : '',
          fuelType: v.fuelType || 'Diesel',
          status: v.status || 'Active',
          driver: v.driverName || '',
          driverContact: '',
          fuelLevel: 0,
          mileage: '',
          location: v.hubName || '',
          lastMaintenanceDate: v.lastMaintenanceDate?.split('T')[0] || '',
          nextMaintenanceDate: '',
          insuranceExpiry: '',
          registrationExpiry: '',
          notes: ''
        }));
        setVehicles(mapped);
      } catch (err) {
        console.error('Failed to load vehicles', err);
      }
    };
    load();
  }, []);

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle view vehicle
  const handleView = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowViewModal(true);
  };

  // Handle edit vehicle
  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      plateNumber: vehicle.plateNumber,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      type: vehicle.type,
      capacity: vehicle.capacity,
      fuelType: vehicle.fuelType,
      status: vehicle.status,
      driver: vehicle.driver,
      fuelLevel: vehicle.fuelLevel,
      mileage: vehicle.mileage,
      location: vehicle.location,
      lastMaintenanceDate: vehicle.lastMaintenanceDate,
      nextMaintenanceDate: vehicle.nextMaintenanceDate,
      insuranceExpiry: vehicle.insuranceExpiry,
      registrationExpiry: vehicle.registrationExpiry,
      notes: vehicle.notes
    });
    setShowEditModal(true);
  };

  // Handle delete vehicle
  const handleDelete = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDeleteModal(true);
  };

  // Handle form submission (Add & Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
      setToast({
        message: showEditModal ? 'Vehicle updated successfully!' : 'Vehicle added successfully!',
        type: 'success'
      });
    }, 1500);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDeleteModal(false);
      setToast({
        message: 'Vehicle deleted successfully!',
        type: 'success'
      });
    }, 1000);
  };

  // Close toast
  const closeToast = () => setToast(null);

  return (
    <PageContainer>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} duration={3000} />
      )}

      {/* Page Header */}
      <PageHeader
        title="Fleet Management"
        subtitle="Manage and monitor your vehicle fleet"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard title="Total Vehicles" value="48" icon={TruckIcon} gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" />
        <StatCard title="Active Vehicles" value="42" icon={CheckCircleIcon} gradient="linear-gradient(135deg, #10B981, #059669)" />
        <StatCard title="In Maintenance" value="6" icon={WrenchIcon} gradient="linear-gradient(135deg, #F59E0B, #D97706)" />
        <StatCard title="Avg Fuel Level" value="73%" icon={FuelIcon} gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)" />
      </StatsGrid>

      {/* Controls Bar */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Vehicle"
        searchPlaceholder="Search vehicles..."
      />

      {/* Vehicles Table */}
      <TableContainer>
        <UnifiedTable headers={[
          'Vehicle Details',
          'Driver',
          'Status & Fuel',
          'Location',
          'Actions'
        ]} striped hover>
          {filteredVehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar icon={TruckIcon} size="md" />
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                      {vehicle.plateNumber}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px' }}>
                      {vehicle.capacity} • {vehicle.mileage}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserIcon size={16} color="#6B7280" />
                  <div style={{ fontWeight: '600', color: '#1F2937' }}>
                    {vehicle.driver}
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <StatusBadge
                    status={vehicle.status}
                    variant={vehicle.status === 'Active' ? 'success' : vehicle.status === 'In Transit' ? 'warning' : 'error'}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FuelIcon size={14} color="#6B7280" />
                  <div style={{ width: '60px', height: '6px', backgroundColor: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${vehicle.fuelLevel}%`,
                      height: '100%',
                      backgroundColor: vehicle.fuelLevel > 50 ? '#10B981' : vehicle.fuelLevel > 25 ? '#F59E0B' : '#EF4444',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>{vehicle.fuelLevel}%</span>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPinIcon size={14} color="#6B7280" />
                  <span style={{ color: '#6B7280' }}>{vehicle.location}</span>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons onView={() => handleView(vehicle)} onEdit={() => handleEdit(vehicle)} onDelete={() => handleDelete(vehicle)} />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Add Vehicle Modal */}
      <UnifiedModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Vehicle" size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField label="Plate Number" name="plateNumber" value={formData.plateNumber} onChange={handleInputChange} required placeholder="ABC-123" />
            <FormField label="Make" name="make" value={formData.make} onChange={handleInputChange} required placeholder="Mercedes" />
            <FormField label="Model" name="model" value={formData.model} onChange={handleInputChange} required placeholder="Actros" />
            <FormField label="Year" name="year" type="number" value={formData.year} onChange={handleInputChange} required placeholder="2022" />
            <FormField label="Type" name="type" type="select" value={formData.type} onChange={handleInputChange} options={['Truck', 'Trailer', 'Van', 'Pickup']} />
            <FormField label="Capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} required placeholder="25 tons" />
            <FormField label="Fuel Type" name="fuelType" type="select" value={formData.fuelType} onChange={handleInputChange} options={['Diesel', 'Gasoline', 'Electric', 'Hybrid']} />
            <FormField label="Status" name="status" type="select" value={formData.status} onChange={handleInputChange} options={['Active', 'In Transit', 'Maintenance', 'Out of Service']} />
            <FormField label="Driver" name="driver" value={formData.driver} onChange={handleInputChange} required placeholder="Ahmed Ali" />
            <FormField label="Fuel Level (%)" name="fuelLevel" type="number" value={formData.fuelLevel} onChange={handleInputChange} required placeholder="85" />
            <FormField label="Mileage" name="mileage" value={formData.mileage} onChange={handleInputChange} placeholder="45,230 km" />
            <FormField label="Location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Riyadh Depot" />
            <FormField label="Last Maintenance Date" name="lastMaintenanceDate" type="date" value={formData.lastMaintenanceDate} onChange={handleInputChange} />
            <FormField label="Next Maintenance Date" name="nextMaintenanceDate" type="date" value={formData.nextMaintenanceDate} onChange={handleInputChange} />
            <FormField label="Insurance Expiry" name="insuranceExpiry" type="date" value={formData.insuranceExpiry} onChange={handleInputChange} />
            <FormField label="Registration Expiry" name="registrationExpiry" type="date" value={formData.registrationExpiry} onChange={handleInputChange} />
          </div>
          <FormField label="Notes" name="notes" type="textarea" value={formData.notes} onChange={handleInputChange} placeholder="Additional notes about the vehicle..." />
          <FormButtons onCancel={() => setShowAddModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* Edit Vehicle Modal */}
      <UnifiedModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit Vehicle - ${selectedVehicle?.plateNumber}`} size="lg">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField label="Plate Number" name="plateNumber" value={formData.plateNumber} onChange={handleInputChange} required />
            <FormField label="Make" name="make" value={formData.make} onChange={handleInputChange} required />
            <FormField label="Model" name="model" value={formData.model} onChange={handleInputChange} required />
            <FormField label="Year" name="year" type="number" value={formData.year} onChange={handleInputChange} required />
            <FormField label="Type" name="type" type="select" value={formData.type} onChange={handleInputChange} options={['Truck', 'Trailer', 'Van', 'Pickup']} />
            <FormField label="Capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} required />
            <FormField label="Fuel Type" name="fuelType" type="select" value={formData.fuelType} onChange={handleInputChange} options={['Diesel', 'Gasoline', 'Electric', 'Hybrid']} />
            <FormField label="Status" name="status" type="select" value={formData.status} onChange={handleInputChange} options={['Active', 'In Transit', 'Maintenance', 'Out of Service']} />
            <FormField label="Driver" name="driver" value={formData.driver} onChange={handleInputChange} required />
            <FormField label="Fuel Level (%)" name="fuelLevel" type="number" value={formData.fuelLevel} onChange={handleInputChange} required />
            <FormField label="Mileage" name="mileage" value={formData.mileage} onChange={handleInputChange} />
            <FormField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
            <FormField label="Last Maintenance Date" name="lastMaintenanceDate" type="date" value={formData.lastMaintenanceDate} onChange={handleInputChange} />
            <FormField label="Next Maintenance Date" name="nextMaintenanceDate" type="date" value={formData.nextMaintenanceDate} onChange={handleInputChange} />
            <FormField label="Insurance Expiry" name="insuranceExpiry" type="date" value={formData.insuranceExpiry} onChange={handleInputChange} />
            <FormField label="Registration Expiry" name="registrationExpiry" type="date" value={formData.registrationExpiry} onChange={handleInputChange} />
          </div>
          <FormField label="Notes" name="notes" type="textarea" value={formData.notes} onChange={handleInputChange} />
          <FormButtons onCancel={() => setShowEditModal(false)} onSubmit={handleSubmit} loading={isLoading} />
        </form>
      </UnifiedModal>

      {/* View Vehicle Modal */}
      <UnifiedModal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Vehicle Details - ${selectedVehicle?.plateNumber}`} size="lg">
        {selectedVehicle && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
              {/* Left Column */}
              <div>
                {/* Basic Information */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Basic Information</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Make/Model:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Type:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.type}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Capacity:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.capacity}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Fuel Type:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.fuelType}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Mileage:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.mileage}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Status</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Current Status:</span>
                      <StatusBadge status={selectedVehicle.status} variant={selectedVehicle.status === 'Active' ? 'success' : selectedVehicle.status === 'In Transit' ? 'warning' : 'error'} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Fuel Level:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${selectedVehicle.fuelLevel}%`, height: '100%', backgroundColor: selectedVehicle.fuelLevel > 50 ? '#10B981' : selectedVehicle.fuelLevel > 25 ? '#F59E0B' : '#EF4444', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontWeight: '500' }}>{selectedVehicle.fuelLevel}%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Location:</span>
                      <span style={{ fontWeight: '500' }}>{selectedVehicle.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Driver Information */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Driver Information</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Avatar icon={UserIcon} size="md" />
                      <div>
                        <div style={{ fontWeight: '600', color: '#1F2937' }}>{selectedVehicle.driver}</div>
                        <ContactInfo email={selectedVehicle.driverContact.split(' | ')[0]} phone={selectedVehicle.driverContact.split(' | ')[1]} MailIcon={MailIcon} PhoneIcon={PhoneIcon} size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance & Documents */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Maintenance & Documents</h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Last Maintenance:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={14} color="#6B7280" />
                        <span style={{ fontWeight: '500' }}>{selectedVehicle.lastMaintenanceDate}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Next Maintenance:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={14} color="#6B7280" />
                        <span style={{ fontWeight: '500' }}>{selectedVehicle.nextMaintenanceDate}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Insurance Expiry:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={14} color="#6B7280" />
                        <span style={{ fontWeight: '500' }}>{selectedVehicle.insuranceExpiry}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Registration Expiry:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={14} color="#6B7280" />
                        <span style={{ fontWeight: '500' }}>{selectedVehicle.registrationExpiry}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Notes</h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
                {selectedVehicle.notes || 'No notes available'}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Deletion" size="sm">
        {selectedVehicle && (
          <div>
            <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this vehicle?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>This action cannot be undone. All data for {selectedVehicle.plateNumber} will be permanently removed.</div>
              </div>
            </div>
            <FormButtons onCancel={() => setShowDeleteModal(false)} onSubmit={handleDeleteConfirm} submitText="Delete Vehicle" submitVariant="danger" loading={isLoading} />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Vehicles;
