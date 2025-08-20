import React, { useState, useEffect, useCallback } from 'react';
import { 
  PageContainer,
  PageHeader,
  StatsGrid,
  StatCard,
  ControlsBar,
  TableContainer,
  UnifiedTable,
  ActionButtons,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast,
  StatusBadge,
  Avatar
} from '../../components/shared/UnifiedDesignComponents';
import { 
  RouteIcon, 
  PlusIcon, 
  SearchIcon, 
  ClockIcon,
  AlertTriangleIcon,
  MapPinIcon,
  TruckIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../../components/icons/SVGIcons';
import Pagination from '../../components/shared/Pagination';
import apiClient from '../../lib/apiClient';

const Trips = () => {
  // Constants
  const ITEMS_PER_PAGE = 10;
  const DEFAULT_FORM_DATA = {
    tripNumber: '',
    tripType: 'Delivery', // Added Trip Type with default
    driver: '',
    vehicle: '',
    startHub: '',
    endHub: '',
    startDate: '',
    endDate: '',
    status: 'Scheduled',
    distance: '',
    stops: [],
    mapIntegrationKey: '',
    notes: ''
  };

  // Lookup data (would normally come from API)
  const [statuses] = useState(['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Delayed']);
  const [tripTypes] = useState(['Delivery', 'Pickup']); // Added Trip Types
  const [drivers] = useState(['Ahmed Ali', 'Mohammed Hassan', 'Omar Khaled', 'Youssef Ahmed']);
  const [vehicles] = useState(['ABC-123', 'XYZ-456', 'DEF-789', 'GHI-012']);
  const [hubs] = useState(['Riyadh Hub', 'Jeddah Hub', 'Dammam Hub', 'Mecca Hub']);
  const [cities] = useState(['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar']);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tripTypeFilter, setTripTypeFilter] = useState(''); // Added Trip Type filter
  const [driverFilter, setDriverFilter] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [hubFilter, setHubFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [trips, setTrips] = useState([]);

  // Load trips from backend
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/trips');
        const mapped = (data || []).map(t => ({
          id: t.id,
          tripNumber: t.tripNumber,
          tripType: t.tripType || 'Delivery',
          driver: t.driverName,
          vehicle: t.vehiclePlateNumber,
          startHub: t.startHubName,
          endHub: t.endHubName,
          startDate: t.startDate?.split('T')[0] || '',
          endDate: t.endDate?.split('T')[0] || '',
          status: t.status || 'Scheduled',
          distance: t.distance ? `${t.distance} km` : '',
          duration: t.duration ? `${t.duration} min` : '',
          stops: [],
          mapIntegrationKey: '',
          notes: ''
        }));
        setTrips(mapped);
      } catch (err) {
        console.error('Failed to load trips', err);
      }
    };
    load();
  }, []);

  // Filter trips based on filters
  const filteredTrips = useCallback(() => {
    return trips.filter(trip => {
      const matchesSearch = trip.tripNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || trip.status === statusFilter;
      const matchesTripType = !tripTypeFilter || trip.tripType === tripTypeFilter; // Added
      const matchesDriver = !driverFilter || trip.driver === driverFilter;
      const matchesVehicle = !vehicleFilter || trip.vehicle === vehicleFilter;
      const matchesHub = !hubFilter || 
                        trip.startHub === hubFilter || 
                        trip.endHub === hubFilter;
      const matchesDate = !dateFilter || trip.startDate === dateFilter;
      
      return matchesSearch && matchesStatus && matchesTripType && matchesDriver && 
             matchesVehicle && matchesHub && matchesDate;
    });
  }, [trips, searchTerm, statusFilter, tripTypeFilter, driverFilter, vehicleFilter, hubFilter, dateFilter]);

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTrips = filteredTrips().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrips().length / ITEMS_PER_PAGE);

  // Calculate statistics
  const stats = {
    total: trips.length,
    completed: trips.filter(t => t.status === 'Completed').length,
    inProgress: trips.filter(t => t.status === 'In Progress').length,
    totalDistance: trips.reduce((sum, t) => sum + parseInt(t.distance), 0)
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle view trip
  const handleView = (trip) => {
    setSelectedTrip(trip);
    setShowViewModal(true);
  };

  // Handle edit trip
  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setFormData({
      tripNumber: trip.tripNumber,
      tripType: trip.tripType, // Added
      driver: trip.driver,
      vehicle: trip.vehicle,
      startHub: trip.startHub,
      endHub: trip.endHub,
      startDate: trip.startDate,
      endDate: trip.endDate,
      status: trip.status,
      distance: trip.distance,
      stops: trip.stops,
      mapIntegrationKey: trip.mapIntegrationKey,
      notes: trip.notes
    });
    setShowEditModal(true);
  };

  // Handle delete trip
  const handleDelete = (trip) => {
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };

  // Handle form submission (Add & Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (showEditModal && selectedTrip) {
        // Update existing trip
        setTrips(prev => prev.map(trip => 
          trip.id === selectedTrip.id ? { ...formData, id: selectedTrip.id } : trip
        ));
        setToast({
          message: 'Trip updated successfully!',
          type: 'success'
        });
      } else {
        // Add new trip
        const newTrip = {
          ...formData,
          id: Math.max(...trips.map(t => t.id), 0) + 1,
          duration: '0h 0m', // This would be calculated in a real app
          createdDate: new Date().toISOString().split('T')[0],
          updatedDate: new Date().toISOString().split('T')[0]
        };
        
        setTrips(prev => [...prev, newTrip]);
        setToast({
          message: 'Trip added successfully!',
          type: 'success'
        });
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      setFormData(DEFAULT_FORM_DATA);
    }, 1500);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedTrip) {
        setTrips(prev => prev.filter(trip => trip.id !== selectedTrip.id));
        setToast({
          message: 'Trip deleted successfully!',
          type: 'success'
        });
      }
      
      setIsLoading(false);
      setShowDeleteModal(false);
    }, 1000);
  };

  // Close toast
  const closeToast = () => setToast(null);

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Scheduled': return 'warning';
      case 'Cancelled': return 'error';
      case 'Delayed': return 'secondary';
      default: return 'secondary';
    }
  };

  // Add stop to form
  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { city: '', arrival: '', departure: '' }]
    }));
  };

  // Update stop in form
  const updateStop = (index, field, value) => {
    const updatedStops = [...formData.stops];
    updatedStops[index] = {
      ...updatedStops[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      stops: updatedStops
    }));
  };

  // Remove stop from form
  const removeStop = (index) => {
    const updatedStops = formData.stops.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      stops: updatedStops
    }));
  };

  // Reset form when add modal is closed
  const handleAddModalClose = () => {
    setShowAddModal(false);
    setFormData(DEFAULT_FORM_DATA);
  };

  return (
    <PageContainer>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} duration={3000} />
      )}

      {/* Page Header */}
      <PageHeader
        title="Trips Management"
        subtitle="Manage and track all vehicle trips with detailed information"
      />

      {/* Statistics Grid */}
      <StatsGrid>
        <StatCard 
          title="Total Trips" 
          value={stats.total.toString()} 
          icon={RouteIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)" 
        />
        <StatCard 
          title="Completed" 
          value={stats.completed.toString()} 
          icon={ClockIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)" 
        />
        <StatCard 
          title="In Progress" 
          value={stats.inProgress.toString()} 
          icon={AlertTriangleIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)" 
        />
        <StatCard 
          title="Total Distance" 
          value={`${stats.totalDistance} km`} 
          icon={MapPinIcon} 
          gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)" 
        />
      </StatsGrid>

      {/* Filters Bar - Updated order: Date, Hub, Vehicle, Driver, Status, Type */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '16px',
        background: '#FFF',
        borderRadius: '8px',
        padding: '16px'
      }}>
        {/* Date Filter - First */}
        <FormField
          type="date"
          label="Date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        
        {/* Hub Filter - Second */}
        <FormField
          type="select"
          label="Hub"
          value={hubFilter}
          onChange={(e) => {
            setHubFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Hubs' },
            ...hubs.map(hub => ({ value: hub, label: hub }))
          ]}
        />
        
        {/* Vehicle Filter - Third */}
        <FormField
          type="select"
          label="Vehicle"
          value={vehicleFilter}
          onChange={(e) => {
            setVehicleFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Vehicles' },
            ...vehicles.map(vehicle => ({ value: vehicle, label: vehicle }))
          ]}
        />
        
        {/* Driver Filter - Fourth */}
        <FormField
          type="select"
          label="Driver"
          value={driverFilter}
          onChange={(e) => {
            setDriverFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Drivers' },
            ...drivers.map(driver => ({ value: driver, label: driver }))
          ]}
        />
        
        {/* Status Filter - Fifth */}
        <FormField
          type="select"
          label="Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Statuses' },
            ...statuses.map(status => ({ value: status, label: status }))
          ]}
        />
        
        {/* Trip Type Filter - Sixth */}
        <FormField
          type="select"
          label="Trip Type"
          value={tripTypeFilter}
          onChange={(e) => {
            setTripTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Types' },
            ...tripTypes.map(type => ({ value: type, label: type }))
          ]}
        />
      </div>

      {/* Controls Bar */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onAddClick={() => {
          setFormData(DEFAULT_FORM_DATA);
          setShowAddModal(true);
        }}
        addButtonText="Add Trip"
        searchPlaceholder="Search trips..."
      />

      {/* Trips Table */}
      <TableContainer>
        <UnifiedTable 
          headers={[
            'Trip Details',
            'Driver & Vehicle',
            'Route',
            'Distance/Duration',
            'Status',
            'Actions'
          ]} 
          striped 
          hover
          emptyState={filteredTrips().length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ marginBottom: '16px', color: '#6B7280' }}>
                No trips found matching your criteria
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setTripTypeFilter('');
                  setDriverFilter('');
                  setVehicleFilter('');
                  setHubFilter('');
                  setDateFilter('');
                }}
                style={{
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer'
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : undefined}
        >
          {currentTrips.map(trip => (
            <tr key={trip.id}>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                    {trip.tripNumber}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {trip.tripType} • {trip.startDate} - {trip.endDate} {/* Added Trip Type */}
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar icon={UserIcon} size="sm" />
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                      {trip.driver}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '14px' }}>
                      {trip.vehicle}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                    {trip.startHub} → {trip.endHub}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {trip.stops.length} stops
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                    {trip.distance}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {trip.duration}
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge
                  status={trip.status}
                  variant={getStatusVariant(trip.status)}
                />
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons 
                  onView={() => handleView(trip)} 
                  onEdit={() => handleEdit(trip)} 
                  onDelete={() => handleDelete(trip)} 
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Pagination */}
      {filteredTrips().length > ITEMS_PER_PAGE && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Add Trip Modal */}
      <UnifiedModal 
        isOpen={showAddModal} 
        onClose={handleAddModalClose} 
        title="Add New Trip" 
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField 
              label="Trip Number" 
              name="tripNumber" 
              value={formData.tripNumber} 
              onChange={handleInputChange} 
              required 
              placeholder="TRP-2024-001" 
            />
            
            {/* Added Trip Type field */}
            <FormField 
              label="Trip Type" 
              name="tripType" 
              type="select"
              value={formData.tripType} 
              onChange={handleInputChange} 
              options={tripTypes.map(type => ({ value: type, label: type }))}
              required
            />
            
            <FormField 
              label="Driver" 
              name="driver" 
              type="select"
              value={formData.driver} 
              onChange={handleInputChange} 
              options={drivers.map(d => ({ value: d, label: d }))}
              required
            />
            <FormField 
              label="Vehicle" 
              name="vehicle" 
              type="select"
              value={formData.vehicle} 
              onChange={handleInputChange} 
              options={vehicles.map(v => ({ value: v, label: v }))}
              required
            />
            <FormField 
              label="Start Hub" 
              name="startHub" 
              type="select"
              value={formData.startHub} 
              onChange={handleInputChange} 
              options={hubs.map(h => ({ value: h, label: h }))}
              required
            />
            <FormField 
              label="End Hub" 
              name="endHub" 
              type="select"
              value={formData.endHub} 
              onChange={handleInputChange} 
              options={hubs.map(h => ({ value: h, label: h }))}
              required
            />
            <FormField 
              label="Start Date" 
              name="startDate" 
              type="date"
              value={formData.startDate} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="End Date" 
              name="endDate" 
              type="date"
              value={formData.endDate} 
              onChange={handleInputChange} 
              required 
            />
            <FormField 
              label="Status" 
              name="status" 
              type="select"
              value={formData.status} 
              onChange={handleInputChange} 
              options={statuses.map(s => ({ value: s, label: s }))}
              required
            />
            <FormField 
              label="Distance (km)" 
              name="distance" 
              type="number"
              value={formData.distance} 
              onChange={handleInputChange} 
              required 
              placeholder="950" 
              min="1"
            />
            <FormField 
              label="Map Integration Key" 
              name="mapIntegrationKey" 
              value={formData.mapIntegrationKey} 
              onChange={handleInputChange} 
              placeholder="map123456" 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
              Stops
            </h3>
            {formData.stops.map((stop, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}
                aria-label={`Stop ${index + 1}`}
              >
                <FormField
                  label="City"
                  type="select"
                  value={stop.city}
                  onChange={(e) => updateStop(index, 'city', e.target.value)}
                  options={[
                    { value: '', label: 'Select City', disabled: true },
                    ...cities.map(c => ({ value: c, label: c }))
                  ]}
                  required
                />
                <FormField
                  label="Arrival Time"
                  type="time"
                  value={stop.arrival}
                  onChange={(e) => updateStop(index, 'arrival', e.target.value)}
                  required
                />
                <FormField
                  label="Departure Time"
                  type="time"
                  value={stop.departure}
                  onChange={(e) => updateStop(index, 'departure', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStop(index)}
                  style={{
                    background: '#FEF2F2',
                    color: '#EF4444',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    marginTop: '24px'
                  }}
                  aria-label={`Remove stop ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStop}
              style={{
                background: '#EFF6FF',
                color: '#3B82F6',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Add Stop
            </button>
          </div>

          <FormField 
            label="Notes" 
            name="notes" 
            type="textarea"
            value={formData.notes} 
            onChange={handleInputChange} 
            placeholder="Additional notes about the trip..." 
          />
          <FormButtons 
            onCancel={handleAddModalClose} 
            onSubmit={handleSubmit} 
            loading={isLoading} 
            submitDisabled={!formData.tripNumber || !formData.driver || !formData.vehicle}
          />
        </form>
      </UnifiedModal>

      {/* View Trip Modal */}
      <UnifiedModal 
        isOpen={showViewModal} 
        onClose={() => setShowViewModal(false)} 
        title={`Trip Details - ${selectedTrip?.tripNumber}`} 
        size="lg"
      >
        {selectedTrip && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#F3F4F6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TruckIcon size={32} />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937', marginBottom: '4px' }}>
                  {selectedTrip.tripNumber}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <StatusBadge 
                    status={selectedTrip.status} 
                    variant={getStatusVariant(selectedTrip.status)} 
                  />
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    {selectedTrip.tripType} • {selectedTrip.startDate} - {selectedTrip.endDate} {/* Added Trip Type */}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                  Trip Information
                </h3>
                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                  {/* Added Trip Type row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Trip Type:</span>
                    <span style={{ fontWeight: '500' }}>{selectedTrip.tripType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Driver:</span>
                    <span style={{ fontWeight: '500' }}>{selectedTrip.driver}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Vehicle:</span>
                    <span style={{ fontWeight: '500' }}>{selectedTrip.vehicle}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Distance:</span>
                    <span style={{ fontWeight: '500' }}>{selectedTrip.distance}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280' }}>Duration:</span>
                    <span style={{ fontWeight: '500' }}>{selectedTrip.duration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                  Route Information
                </h3>
                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Start:</div>
                    <div style={{ fontWeight: '500', marginBottom: '8px' }}>{selectedTrip.startHub}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>End:</div>
                    <div style={{ fontWeight: '500', marginBottom: '8px' }}>{selectedTrip.endHub}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B7280', marginBottom: '4px' }}>Map Key:</div>
                    <div style={{ fontWeight: '500' }}>{selectedTrip.mapIntegrationKey || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                Stops ({selectedTrip.stops.length})
              </h3>
              <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                {selectedTrip.stops.length > 0 ? (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {selectedTrip.stops.map((stop, index) => (
                      <div 
                        key={index} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1fr 1fr 1fr',
                          gap: '16px',
                          paddingBottom: '16px',
                          borderBottom: index < selectedTrip.stops.length - 1 ? '1px solid #E5E7EB' : 'none'
                        }}
                        aria-label={`Stop ${index + 1}`}
                      >
                        <div>
                          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>City</div>
                          <div style={{ fontWeight: '500' }}>{stop.city}</div>
                        </div>
                        <div>
                          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>Arrival</div>
                          <div style={{ fontWeight: '500' }}>{stop.arrival}</div>
                        </div>
                        <div>
                          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>Departure</div>
                          <div style={{ fontWeight: '500' }}>{stop.departure}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#6B7280', textAlign: 'center', padding: '16px' }}>
                    No stops recorded for this trip
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                Notes
              </h3>
              <div style={{ 
                background: '#F9FAFB', 
                borderRadius: '8px', 
                padding: '16px', 
                minHeight: '80px' 
              }}>
                {selectedTrip.notes || 'No additional notes provided.'}
              </div>
            </div>
          </div>
        )}
      </UnifiedModal>

      {/* Delete Confirmation Modal */}
      <UnifiedModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        title="Confirm Deletion" 
        size="sm"
      >
        {selectedTrip && (
          <div>
            <div style={{ 
              background: '#FEF2F2', 
              borderRadius: '8px', 
              padding: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '24px' 
            }}>
              <AlertTriangleIcon size={20} color="#DC2626" />
              <div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Are you sure you want to delete this trip?</div>
                <div style={{ color: '#6B7280', fontSize: '14px' }}>
                  This action cannot be undone. All data for "{selectedTrip.tripNumber}" will be permanently removed.
                </div>
              </div>
            </div>
            <FormButtons 
              onCancel={() => setShowDeleteModal(false)} 
              onSubmit={handleDeleteConfirm} 
              submitText="Delete Trip" 
              submitVariant="danger" 
              loading={isLoading} 
            />
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Trips;