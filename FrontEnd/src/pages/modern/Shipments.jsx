import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  PackageIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  TrashIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  UserIcon,
  RouteIcon,
  CalendarIcon,
  ClockIcon as TimeIcon,
  MapIcon,
  PhoneIcon,
  CheckCircleIcon,
  InfoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  UploadIcon
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
  StatusBadge,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast,
  Avatar
} from '../../components/shared/UnifiedDesignComponents';

import Pagination 
  from '../../components/shared/Pagination';

const Shipments = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [hubFilter, setHubFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');
  const [tripFilter, setTripFilter] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lookup data (would normally come from API)
  const [hubs] = useState(['Riyadh Hub', 'Jeddah Hub', 'Dammam Hub', 'Mecca Hub']);
  const [trips] = useState(['TRP-2024-001', 'TRP-2024-002', 'TRP-2024-003', 'TRP-2024-004']);
  const [drivers] = useState([
    { id: 1, name: 'Mohammed Ali', mobile: '0551234567' },
    { id: 2, name: 'Ahmed Hassan', mobile: '0557654321' }
  ]);

  const shipmentTypes = ['Service', 'Shipment'];
  const periods = ['AM', 'PM'];
  const statusOptions = ['pending', 'in-transit', 'delivered', 'cancelled', 'returned'];

  const shipments = [
    {
      id: 1,
      shipmentNumber: 'SH-2024-001',
      customerName: 'Ahmed Trading Co.',
      pickupAddress: 'Riyadh Industrial Area',
      deliveryAddress: 'Jeddah Port',
      pickupDate: '2024-01-15',
      status: 'in-transit',
      weight: '2.5 tons',
      value: '15,000 SAR',
      notes: 'Fragile items, handle with care',
      type: 'Shipment',
      period: 'AM',
      startTime: '08:30',
      endTime: '14:45',
      duration: 375, // minutes
      pickupLat: 24.7136,
      pickupLong: 46.6753,
      deliveryLat: 21.5433,
      deliveryLong: 39.1728,
      mainMobile: '0551234567',
      secondaryMobile: '0551112222',
      driver: { id: 1, name: 'Mohammed Ali', mobile: '0551234567' },
      trip: 'TRP-2024-001',
      hub: 'Riyadh Hub',
      createdDate: '2024-01-10',
      updatedDate: '2024-01-15'
    },
    // Add more sample data as needed...
    {
      id: 2,
      shipmentNumber: 'SH-2024-002',
      customerName: 'Al-Noor Electronics',
      pickupAddress: 'Dammam Warehouse',
      deliveryAddress: 'Riyadh Mall',
      pickupDate: '2024-01-16',
      status: 'delivered',
      weight: '500 kg',
      value: '8,500 SAR',
      notes: 'Electronics equipment',
      type: 'Shipment',
      period: 'PM',
      startTime: '13:00',
      endTime: '18:30',
      duration: 330,
      pickupLat: 26.4207,
      pickupLong: 50.0888,
      deliveryLat: 24.7136,
      deliveryLong: 46.6753,
      mainMobile: '0557654321',
      secondaryMobile: '0553334444',
      driver: { id: 2, name: 'Ahmed Hassan', mobile: '0557654321' },
      trip: 'TRP-2024-002',
      hub: 'Dammam Hub',
      createdDate: '2024-01-11',
      updatedDate: '2024-01-16'
    },
    // Add 8 more sample shipments to demonstrate pagination
      ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 3,
	  shipmentNumber: `SH-2024-${String(i + 3).padStart(3, '0')}`,
	  customerName: `Customer ${i + 1}`,
	  pickupAddress: `Pickup Location ${i + 1}`,
	  deliveryAddress: `Delivery Location ${i + 1}`,
	  pickupDate: `2024-01-${String(17 + i).padStart(2, '0')}`,
	  status: ['pending', 'in-transit', 'delivered'][i % 3],
	  weight: `${500 + (i * 100)} kg`,
	  value: `${5000 + (i * 1000)} SAR`,  // Fixed: removed comma
	  notes: `Sample notes for shipment ${i + 3}`,
	  type: shipmentTypes[i % 2],
	  period: periods[i % 2],
      startTime: `${8 + i}:${i % 2 === 0 ? '00' : '30'}`,
      endTime: `${12 + i}:${i % 2 === 0 ? '45' : '15'}`,
      duration: 240 + (i * 30),
      pickupLat: 24.7136 + (i * 0.1),
      pickupLong: 46.6753 + (i * 0.1),
      deliveryLat: 21.5433 + (i * 0.1),
      deliveryLong: 39.1728 + (i * 0.1),
      mainMobile: `055${1000000 + (i * 111111)}`,
      secondaryMobile: `055${2000000 + (i * 111111)}`,
      driver: drivers[i % 2],
      trip: `TRP-2024-${String(i + 3).padStart(3, '0')}`,
      hub: hubs[i % hubs.length],
      createdDate: `2024-01-${String(10 + i).padStart(2, '0')}`,
      updatedDate: `2024-01-${String(15 + i).padStart(2, '0')}`
    }))
  ];

  // Filter shipments based on filters
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        shipment.driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || shipment.status === statusFilter;
    const matchesHub = !hubFilter || shipment.hub === hubFilter;
    const matchesDate = !dateFilter || shipment.pickupDate === dateFilter;
    const matchesPeriod = !periodFilter || shipment.period === periodFilter;
    const matchesTrip = !tripFilter || shipment.trip === tripFilter;
    
    return matchesSearch && matchesStatus && matchesHub && matchesDate && matchesPeriod && matchesTrip;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShipments = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Excel Export Function
  const handleExportExcel = () => {
    // Create a worksheet from the shipments data
    const worksheet = XLSX.utils.json_to_sheet(filteredShipments.map(shipment => ({
      'Shipment Number': shipment.shipmentNumber,
      'Customer Name': shipment.customerName,
      'Pickup Address': shipment.pickupAddress,
      'Delivery Address': shipment.deliveryAddress,
      'Pickup Date': shipment.pickupDate,
      'Status': shipment.status,
      'Type': shipment.type,
      'Period': shipment.period,
      'Weight': shipment.weight,
      'Value': shipment.value,
      'Driver': shipment.driver.name,
      'Driver Mobile': shipment.driver.mobile,
      'Start Time': shipment.startTime,
      'End Time': shipment.endTime,
      'Duration (min)': shipment.duration,
      'Hub': shipment.hub,
      'Trip': shipment.trip,
      'Main Mobile': shipment.mainMobile,
      'Secondary Mobile': shipment.secondaryMobile,
      'Notes': shipment.notes
    })));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shipments");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save the file
    saveAs(data, `shipments_export_${new Date().toISOString().slice(0,10)}.xlsx`);
    
    setToast({ message: 'Excel export completed successfully', type: 'success' });
  };

  // Excel Import Function
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Get first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Process the imported data
      console.log('Imported data:', jsonData);
      setToast({ message: `${jsonData.length} shipments imported successfully`, type: 'success' });
      
      // Here you would typically send the data to your API
      // api.importShipments(jsonData).then(...)
    };
    reader.readAsArrayBuffer(file);
  };

  const handleView = (shipment) => {
    setSelectedShipment(shipment);
    setShowViewModal(true);
  };

  const handleAddShipment = (formData) => {
    // Logic to add new shipment
    setToast({ message: 'Shipment added successfully', type: 'success' });
    setShowAddModal(false);
  };

  const handleEditShipment = (id) => {
    // Logic to edit shipment
    setToast({ message: 'Shipment updated successfully', type: 'success' });
  };

  const handleDeleteShipment = (id) => {
    // Logic to delete shipment
    setToast({ message: 'Shipment deleted successfully', type: 'success' });
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'in-transit': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'returned': return 'secondary';
      default: return 'secondary';
    }
  };

  // Generate Google Maps link
  const getMapLink = (lat, long) => {
    return `https://www.google.com/maps?q=${lat},${long}`;
  };

  return (
    <PageContainer>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} duration={3000} />
      )}

      {/* Page Header */}
      <PageHeader 
        title="Shipments Management" 
        subtitle="Manage and track all shipments with advanced analytics and real-time monitoring" 
      />

      {/* Statistics Cards */}
      <StatsGrid>
        <StatCard 
          title="Total Shipments" 
          value={filteredShipments.length.toString()} 
          icon={PackageIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
        <StatCard 
          title="Delivered" 
          value={filteredShipments.filter(s => s.status === 'delivered').length.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="In Transit" 
          value={filteredShipments.filter(s => s.status === 'in-transit').length.toString()} 
          icon={TruckIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Total Value" 
          value={`${filteredShipments.reduce((sum, s) => sum + parseInt(s.value.replace(/[^0-9]/g, '')), 0).toLocaleString()} SAR`} 
          icon={DollarSignIcon} 
          gradient="linear-gradient(135deg, #667EEA, #764BA2)"
        />
      </StatsGrid>

      {/* Filters Bar */}
      <div style={{ 
        background: '#FFF', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <FormField
          type="select"
          label="Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // Reset to first page when filter changes
          }}
          options={[
            { value: '', label: 'All Statuses' },
            ...statusOptions.map(status => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
            }))
          ]}
        />
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
        <FormField
          type="date"
          label="Date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FormField
          type="select"
          label="Period"
          value={periodFilter}
          onChange={(e) => {
            setPeriodFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Periods' },
            ...periods.map(period => ({ value: period, label: period }))
          ]}
        />
        <FormField
          type="select"
          label="Trip"
          value={tripFilter}
          onChange={(e) => {
            setTripFilter(e.target.value);
            setCurrentPage(1);
          }}
          options={[
            { value: '', label: 'All Trips' },
            ...trips.map(trip => ({ value: trip, label: trip }))
          ]}
        />
      </div>

      {/* Controls */}
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Shipment"
        searchPlaceholder="Search shipments..."
        additionalControls={
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Import Button */}
            <label style={{
              padding: '10px 16px',
              background: '#F3F4F6',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500'
            }}>
              <UploadIcon size={16} />
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleImportExcel} 
                style={{ display: 'none' }} 
              />
              Import
            </label>
            
            {/* Export Button */}
            <button
              onClick={handleExportExcel}
              style={{
                padding: '10px 16px',
                background: '#EFF6FF',
                color: '#1D4ED8',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '500'
              }}
            >
              <DownloadIcon size={16} />
              Export
            </button>
          </div>
        }
      />

      {/* Shipments Table */}
      <TableContainer>
        <UnifiedTable
          headers={['Shipment Details', 'Driver', 'Route', 'Time Info', 'Status', 'Actions']}
          striped
          hover
        >
          {currentShipments.map((shipment) => (
            <tr key={shipment.id}>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {shipment.shipmentNumber}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px', marginBottom: '4px' }}>
                    {shipment.customerName}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                    <span style={{ color: '#6B7280' }}>{shipment.weight}</span>
                    <span style={{ color: '#6B7280' }}>•</span>
                    <span style={{ fontWeight: '500' }}>{shipment.value}</span>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar icon={UserIcon} size="sm" />
                  <div>
                    <div style={{ fontWeight: '600' }}>{shipment.driver.name}</div>
                    <div style={{ color: '#6B7280', fontSize: '13px' }}>
                      {shipment.driver.mobile}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {shipment.pickupAddress}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '13px', marginBottom: '4px' }}>
                    → {shipment.deliveryAddress}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a 
                      href={getMapLink(shipment.pickupLat, shipment.pickupLong)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontSize: '13px' }}
                    >
                      <MapPinIcon size={14} /> Pickup
                    </a>
                    <a 
                      href={getMapLink(shipment.deliveryLat, shipment.deliveryLong)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontSize: '13px' }}
                    >
                      <MapPinIcon size={14} /> Delivery
                    </a>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#6B7280' }}>Start:</span>
                    <span style={{ fontWeight: '500' }}>{shipment.startTime}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#6B7280' }}>End:</span>
                    <span style={{ fontWeight: '500' }}>{shipment.endTime}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#6B7280' }}>Duration:</span>
                    <span style={{ fontWeight: '500' }}>{Math.floor(shipment.duration / 60)}h {shipment.duration % 60}m</span>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <StatusBadge 
                  status={shipment.status.replace('-', ' ')} 
                  variant={getStatusVariant(shipment.status)} 
                />
                <div style={{ marginTop: '8px', color: '#6B7280', fontSize: '13px' }}>
                  {shipment.type} • {shipment.period}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <ActionButtons
                  onView={() => handleView(shipment)}
                  onEdit={() => handleEditShipment(shipment.id)}
                  onDelete={() => handleDeleteShipment(shipment.id)}
                />
              </td>
            </tr>
          ))}
        </UnifiedTable>
      </TableContainer>

      {/* Pagination */}
      {filteredShipments.length > itemsPerPage && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Add Shipment Modal */}
      <UnifiedModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Shipment"
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddShipment(new FormData(e.target));
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <FormField
              label="Shipment Number"
              type="text"
              name="shipmentNumber"
              required
            />
            <FormField
              label="Customer Name"
              type="text"
              name="customerName"
              required
            />
            <FormField
              label="Type"
              type="select"
              name="type"
              options={shipmentTypes.map(type => ({ value: type, label: type }))}
              required
            />
            <FormField
              label="Period"
              type="select"
              name="period"
              options={periods.map(period => ({ value: period, label: period }))}
              required
            />
            <FormField
              label="Pickup Address"
              type="text"
              name="pickupAddress"
              required
            />
            <FormField
              label="Delivery Address"
              type="text"
              name="deliveryAddress"
              required
            />
            <FormField
              label="Pickup Date"
              type="date"
              name="pickupDate"
              required
            />
            <FormField
              label="Status"
              type="select"
              name="status"
              options={statusOptions.map(status => ({
                value: status,
                label: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
              }))}
              required
            />
            <FormField
              label="Driver"
              type="select"
              name="driver"
              options={drivers.map(driver => ({
                value: driver.id,
                label: `${driver.name} (${driver.mobile})`
              }))}
              required
            />
            <FormField
              label="Trip"
              type="select"
              name="trip"
              options={trips.map(trip => ({ value: trip, label: trip }))}
            />
            <FormField
              label="Hub"
              type="select"
              name="hub"
              options={hubs.map(hub => ({ value: hub, label: hub }))}
              required
            />
            <FormField
              label="Weight"
              type="text"
              name="weight"
              placeholder="e.g., 2.5 tons"
              required
            />
            <FormField
              label="Value"
              type="text"
              name="value"
              placeholder="e.g., 15,000 SAR"
              required
            />
            <FormField
              label="Pickup Latitude"
              type="number"
              step="0.000001"
              name="pickupLat"
              placeholder="24.7136"
              required
            />
            <FormField
              label="Pickup Longitude"
              type="number"
              step="0.000001"
              name="pickupLong"
              placeholder="46.6753"
              required
            />
            <FormField
              label="Delivery Latitude"
              type="number"
              step="0.000001"
              name="deliveryLat"
              placeholder="21.5433"
              required
            />
            <FormField
              label="Delivery Longitude"
              type="number"
              step="0.000001"
              name="deliveryLong"
              placeholder="39.1728"
              required
            />
            <FormField
              label="Start Time"
              type="time"
              name="startTime"
              required
            />
            <FormField
              label="End Time"
              type="time"
              name="endTime"
              required
            />
            <FormField
              label="Main Mobile"
              type="tel"
              name="mainMobile"
              placeholder="0551234567"
              required
            />
            <FormField
              label="Secondary Mobile"
              type="tel"
              name="secondaryMobile"
              placeholder="0551112222"
            />
          </div>
          <FormField
            label="Notes"
            type="textarea"
            name="notes"
            placeholder="Additional notes..."
          />
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            onSubmit={() => {}}
            submitText="Save Shipment"
          />
        </form>
      </UnifiedModal>

      {/* View Shipment Modal */}
      <UnifiedModal 
        isOpen={showViewModal} 
        onClose={() => setShowViewModal(false)} 
        title={`Shipment Details - ${selectedShipment?.shipmentNumber}`} 
        size="lg"
      >
        {selectedShipment && (
          <div>
            {/* Header Section */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#F3F4F6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PackageIcon size={32} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '18px', color: '#1F2937' }}>
                    {selectedShipment.customerName}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <StatusBadge 
                      status={selectedShipment.type} 
                      variant={selectedShipment.type === 'Service' ? 'info' : 'primary'} 
                    />
                    <StatusBadge 
                      status={selectedShipment.period} 
                      variant={selectedShipment.period === 'AM' ? 'warning' : 'secondary'} 
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
                    <CalendarIcon size={16} />
                    <span>{selectedShipment.pickupDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
                    <TimeIcon size={16} />
                    <span>{selectedShipment.startTime} - {selectedShipment.endTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
                    <ClockIcon size={16} />
                    <span>{Math.floor(selectedShipment.duration / 60)}h {selectedShipment.duration % 60}m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Details Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                    Shipment Information
                  </h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Shipment Number:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.shipmentNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Status:</span>
                      <StatusBadge 
                        status={selectedShipment.status.replace('-', ' ')} 
                        variant={getStatusVariant(selectedShipment.status)} 
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Weight:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.weight}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Value:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.value}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Hub:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.hub}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                    Driver Information
                  </h3>
                  <div style={{ 
                    background: '#F9FAFB', 
                    borderRadius: '8px', 
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Avatar icon={UserIcon} size="lg" />
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {selectedShipment.driver.name}
                      </div>
                      <div style={{ color: '#6B7280', marginBottom: '4px' }}>
                        {selectedShipment.driver.mobile}
                      </div>
                      <div style={{ color: '#6B7280' }}>
                        Trip: {selectedShipment.trip || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                    Route Information
                  </h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ color: '#6B7280', marginBottom: '4px' }}>Pickup:</div>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                        {selectedShipment.pickupAddress}
                      </div>
                      <a 
                        href={getMapLink(selectedShipment.pickupLat, selectedShipment.pickupLong)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontSize: '14px' }}
                      >
                        <MapPinIcon size={14} /> View on Map
                      </a>
                    </div>
                    <div>
                      <div style={{ color: '#6B7280', marginBottom: '4px' }}>Delivery:</div>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                        {selectedShipment.deliveryAddress}
                      </div>
                      <a 
                        href={getMapLink(selectedShipment.deliveryLat, selectedShipment.deliveryLong)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3B82F6', fontSize: '14px' }}
                      >
                        <MapPinIcon size={14} /> View on Map
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                    Contact Information
                  </h3>
                  <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#6B7280' }}>Main Mobile:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.mainMobile}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Secondary Mobile:</span>
                      <span style={{ fontWeight: '500' }}>{selectedShipment.secondaryMobile || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>
                Additional Notes
              </h3>
              <div style={{ 
                background: '#F9FAFB', 
                borderRadius: '8px', 
                padding: '16px', 
                minHeight: '80px' 
              }}>
                {selectedShipment.notes || 'No additional notes provided.'}
              </div>
            </div>

            {/* Export Button in View Modal */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => {
                  handleExportExcel([selectedShipment]);
                  setShowViewModal(false);
                }}
                style={{
                  padding: '10px 16px',
                  background: '#EFF6FF',
                  color: '#1D4ED8',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500'
                }}
              >
                <DownloadIcon size={16} />
                Export This Shipment
              </button>
            </div>
          </div>
        )}
      </UnifiedModal>
    </PageContainer>
  );
};

export default Shipments;