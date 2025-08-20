import React, { useState } from 'react';
import { 
  FuelIcon, 
  PlusIcon, 
  SearchIcon, 
  WrenchIcon,
  XIcon,
  TrashIcon,
  TruckIcon,
  CalendarIcon,
  TrendingUpIcon
} from '../../components/icons/SVGIcons';

const FuelManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    vehiclePlate: '',
    driverName: '',
    fuelStation: '',
    fuelType: 'Diesel',
    quantity: '',
    pricePerLiter: '',
    totalCost: '',
    mileage: '',
    date: '',
    time: '',
    location: '',
    receiptNumber: '',
    notes: '',
    paymentMethod: 'Cash',
    approved: false
  });

  const [fuelRecords, setFuelRecords] = useState([
    {
      id: 1,
      vehiclePlate: 'ABC-123',
      driverName: 'Ahmed Al-Rashid',
      fuelStation: 'ARAMCO Station - King Fahd Road',
      fuelType: 'Diesel',
      quantity: '120 L',
      pricePerLiter: '1.45 SAR',
      totalCost: '174.00 SAR',
      mileage: '45000 km',
      date: '2024-07-15',
      time: '08:30',
      location: 'Riyadh',
      receiptNumber: 'RC-2024-001',
      notes: 'Full tank before long trip',
      paymentMethod: 'Company Card',
      approved: true,
      efficiency: '8.5 km/L',
      createdDate: '2024-07-15'
    },
    {
      id: 2,
      vehiclePlate: 'XYZ-456',
      driverName: 'Mohammed Hassan',
      fuelStation: 'ADNOC Station - Highway 40',
      fuelType: 'Diesel',
      quantity: '85 L',
      pricePerLiter: '1.42 SAR',
      totalCost: '120.70 SAR',
      mileage: '52000 km',
      date: '2024-07-14',
      time: '14:15',
      location: 'Dammam',
      receiptNumber: 'RC-2024-002',
      notes: 'Regular refuel',
      paymentMethod: 'Cash',
      approved: true,
      efficiency: '9.2 km/L',
      createdDate: '2024-07-14'
    },
    {
      id: 3,
      vehiclePlate: 'DEF-789',
      driverName: 'Khalid Ibrahim',
      fuelStation: 'Shell Station - Commercial District',
      fuelType: 'Diesel',
      quantity: '95 L',
      pricePerLiter: '1.48 SAR',
      totalCost: '140.60 SAR',
      mileage: '68000 km',
      date: '2024-07-13',
      time: '11:45',
      location: 'Jeddah',
      receiptNumber: 'RC-2024-003',
      notes: 'Emergency refuel',
      paymentMethod: 'Company Card',
      approved: false,
      efficiency: '7.8 km/L',
      createdDate: '2024-07-13'
    }
  ]);

  const filteredRecords = fuelRecords.filter(record => 
    record.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fuelStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!formData.vehiclePlate || !formData.driverName || !formData.quantity || !formData.pricePerLiter) {
      alert('Please fill in all required fields');
      return;
    }

    const totalCost = (parseFloat(formData.quantity) * parseFloat(formData.pricePerLiter)).toFixed(2);
    
    const newRecord = {
      id: fuelRecords.length + 1,
      ...formData,
      totalCost: totalCost + ' SAR',
      quantity: formData.quantity + ' L',
      pricePerLiter: formData.pricePerLiter + ' SAR',
      mileage: formData.mileage + ' km',
      efficiency: '8.0 km/L',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setFuelRecords([...fuelRecords, newRecord]);
    setShowAddModal(false);
    resetForm();
    alert('Fuel record added successfully!');
  };

  const handleEditRecord = (e) => {
    e.preventDefault();
    if (!formData.vehiclePlate || !formData.driverName || !formData.quantity || !formData.pricePerLiter) {
      alert('Please fill in all required fields');
      return;
    }

    const totalCost = (parseFloat(formData.quantity) * parseFloat(formData.pricePerLiter)).toFixed(2);

    setFuelRecords(fuelRecords.map(record => 
      record.id === selectedRecord.id 
        ? { 
            ...record, 
            ...formData,
            totalCost: totalCost + ' SAR',
            quantity: formData.quantity + ' L',
            pricePerLiter: formData.pricePerLiter + ' SAR',
            mileage: formData.mileage + ' km'
          }
        : record
    ));
    setShowEditModal(false);
    setSelectedRecord(null);
    alert('Fuel record updated successfully!');
  };

  const handleDeleteRecord = () => {
    setFuelRecords(fuelRecords.filter(record => record.id !== selectedRecord.id));
    setShowDeleteModal(false);
    setSelectedRecord(null);
    alert('Fuel record deleted successfully!');
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setFormData({
      vehiclePlate: record.vehiclePlate,
      driverName: record.driverName,
      fuelStation: record.fuelStation,
      fuelType: record.fuelType,
      quantity: record.quantity.replace(' L', ''),
      pricePerLiter: record.pricePerLiter.replace(' SAR', ''),
      totalCost: record.totalCost.replace(' SAR', ''),
      mileage: record.mileage.replace(' km', ''),
      date: record.date,
      time: record.time,
      location: record.location,
      receiptNumber: record.receiptNumber,
      notes: record.notes,
      paymentMethod: record.paymentMethod,
      approved: record.approved
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (record) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      vehiclePlate: '',
      driverName: '',
      fuelStation: '',
      fuelType: 'Diesel',
      quantity: '',
      pricePerLiter: '',
      totalCost: '',
      mileage: '',
      date: '',
      time: '',
      location: '',
      receiptNumber: '',
      notes: '',
      paymentMethod: 'Cash',
      approved: false
    });
  };

  // Statistics
  const totalFuelCost = fuelRecords.reduce((sum, record) => sum + parseFloat(record.totalCost.replace(' SAR', '')), 0);
  const totalFuelQuantity = fuelRecords.reduce((sum, record) => sum + parseFloat(record.quantity.replace(' L', '')), 0);
  const avgEfficiency = fuelRecords.reduce((sum, record) => sum + parseFloat(record.efficiency.replace(' km/L', '')), 0) / fuelRecords.length;
  const recordsThisMonth = fuelRecords.length;

  // Modal Components
  const AddFuelModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Add Fuel Record</h2>
          <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleAddRecord}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Vehicle Plate *</label>
            <input
              type="text"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Driver Name *</label>
            <input
              type="text"
              value={formData.driverName}
              onChange={(e) => setFormData({...formData, driverName: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Fuel Station</label>
            <input
              type="text"
              value={formData.fuelStation}
              onChange={(e) => setFormData({...formData, fuelStation: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Quantity (L) *</label>
            <input
              type="number"
              step="0.1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Price per Liter (SAR) *</label>
            <input
              type="number"
              step="0.01"
              value={formData.pricePerLiter}
              onChange={(e) => setFormData({...formData, pricePerLiter: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Mileage (km)</label>
            <input
              type="number"
              value={formData.mileage}
              onChange={(e) => setFormData({...formData, mileage: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Receipt Number</label>
            <input
              type="text"
              value={formData.receiptNumber}
              onChange={(e) => setFormData({...formData, receiptNumber: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Cash">Cash</option>
              <option value="Company Card">Company Card</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={formData.approved}
              onChange={(e) => setFormData({...formData, approved: e.target.checked})}
              style={{ marginRight: '8px' }}
            />
            <label style={{ fontWeight: '500' }}>Approved</label>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: '#3B82F6',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const EditFuelModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Edit Fuel Record</h2>
          <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleEditRecord}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Vehicle Plate *</label>
            <input
              type="text"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Driver Name *</label>
            <input
              type="text"
              value={formData.driverName}
              onChange={(e) => setFormData({...formData, driverName: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Fuel Station</label>
            <input
              type="text"
              value={formData.fuelStation}
              onChange={(e) => setFormData({...formData, fuelStation: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Quantity (L) *</label>
            <input
              type="number"
              step="0.1"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Price per Liter (SAR) *</label>
            <input
              type="number"
              step="0.01"
              value={formData.pricePerLiter}
              onChange={(e) => setFormData({...formData, pricePerLiter: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Mileage (km)</label>
            <input
              type="number"
              value={formData.mileage}
              onChange={(e) => setFormData({...formData, mileage: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Receipt Number</label>
            <input
              type="text"
              value={formData.receiptNumber}
              onChange={(e) => setFormData({...formData, receiptNumber: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="Cash">Cash</option>
              <option value="Company Card">Company Card</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={formData.approved}
              onChange={(e) => setFormData({...formData, approved: e.target.checked})}
              style={{ marginRight: '8px' }}
            />
            <label style={{ fontWeight: '500' }}>Approved</label>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: '#10B981',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const DeleteConfirmModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '400px'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Confirm Delete</h2>
        <p style={{ margin: '0 0 20px 0', color: '#6B7280' }}>
          Are you sure you want to delete fuel record for vehicle "{selectedRecord?.vehiclePlate}"? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setShowDeleteModal(false)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRecord}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: '#EF4444',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700', color: '#1F2937' }}>
          Fuel Management
        </h1>
        <p style={{ margin: 0, color: '#6B7280', fontSize: '16px' }}>
          Track fuel consumption, costs, and efficiency across your fleet
        </p>
      </div>

      {/* Statistics Cards - HORIZONTAL LAYOUT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '24px' 
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Total Fuel Cost
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#EF4444' }}>
                {totalFuelCost.toFixed(2)} SAR
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FuelIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Total Fuel Quantity
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#3B82F6' }}>
                {totalFuelQuantity.toFixed(0)} L
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TruckIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Avg Efficiency
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#10B981' }}>
                {avgEfficiency.toFixed(1)} km/L
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUpIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                Records This Month
              </p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#8B5CF6' }}>
                {recordsThisMonth}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CalendarIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <SearchIcon 
              size={20} 
              color="#6B7280" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search by vehicle, driver, station, or receipt number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon size={16} />
            Add Record
          </button>
        </div>
      </div>

      {/* Fuel Records Table */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Vehicle & Driver</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Fuel Details</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Cost & Efficiency</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Date & Location</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <TruckIcon size={20} color="white" />
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1F2937' }}>{record.vehiclePlate}</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>{record.driverName}</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>{record.mileage}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#1F2937' }}>{record.quantity} {record.fuelType}</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>{record.fuelStation}</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Receipt: {record.receiptNumber}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1F2937' }}>{record.totalCost}</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>{record.pricePerLiter}/L</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#10B981' }}>{record.efficiency}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#1F2937' }}>{record.date}</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#4B5563' }}>{record.time}</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>{record.location}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: record.approved ? '#D1FAE5' : '#FEF3C7',
                        color: record.approved ? '#065F46' : '#92400E'
                      }}>
                        {record.approved ? 'Approved' : 'Pending'}
                      </span>
                      <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>{record.paymentMethod}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <button
                        onClick={() => openEditModal(record)}
                        style={{
                          padding: '6px',
                          background: '#F3F4F6',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Edit Record"
                      >
                        <WrenchIcon size={16} color="#6B7280" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(record)}
                        style={{
                          padding: '6px',
                          background: '#FEE2E2',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete Record"
                      >
                        <TrashIcon size={16} color="#EF4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddFuelModal />}
      {showEditModal && <EditFuelModal />}
      {showDeleteModal && <DeleteConfirmModal />}
    </div>
  );
};

export default FuelManagement;