import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  SearchIcon, 
  CalendarIcon,
  WrenchIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  FuelIcon
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
  SelectField
} from '../../components/shared/UnifiedDesignComponents';

const PreventiveMaintenance = () => {
  // Mock data services
  const mockDataService = {
    getVehicles: () => [
      { id: 1, plateNumber: 'ABC-123', make: 'Mercedes', model: 'Actros' },
      { id: 2, plateNumber: 'XYZ-456', make: 'Volvo', model: 'FH16' },
      { id: 3, plateNumber: 'DEF-789', make: 'MAN', model: 'TGX' }
    ],
    getMaintenanceTypes: () => [
      { id: 1, name: 'Oil Change', category: 'Fluids' },
      { id: 2, name: 'Tire Rotation', category: 'Tires' },
      { id: 3, name: 'Brake Inspection', category: 'Safety' }
    ]
  };

  // State management
  const [schedules, setSchedules] = useState([
    { 
      id: 1, 
      vehicleId: 1, 
      maintenanceTypeId: 1,
      intervalType: 'mileage', 
      intervalValue: 5000,
      lastPerformed: '2023-05-15',
      nextDue: '2023-08-20',
      status: 'active',
      notes: 'Use synthetic oil'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [toast, setToast] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);

  // Load lookup data
  useEffect(() => {
    setVehicles(mockDataService.getVehicles());
    setMaintenanceTypes(mockDataService.getMaintenanceTypes());
  }, []);

  // CRUD operations
  const handleAddSchedule = (formData) => {
    const newSchedule = {
      id: schedules.length + 1,
      ...formData,
      status: 'active',
      vehicleId: Number(formData.vehicleId),
      maintenanceTypeId: Number(formData.maintenanceTypeId),
      intervalValue: Number(formData.intervalValue)
    };
    setSchedules([...schedules, newSchedule]);
    setToast({ message: 'Maintenance schedule added', type: 'success' });
    setShowAddModal(false);
  };

  const handleEditSchedule = (formData) => {
    const updated = schedules.map(s => 
      s.id === currentSchedule.id ? { 
        ...s, 
        ...formData,
        vehicleId: Number(formData.vehicleId),
        maintenanceTypeId: Number(formData.maintenanceTypeId),
        intervalValue: Number(formData.intervalValue)
      } : s
    );
    setSchedules(updated);
    setToast({ message: 'Schedule updated', type: 'success' });
    setShowAddModal(false);
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    setToast({ message: 'Schedule deleted', type: 'success' });
  };

  // Filter schedules
  const filteredSchedules = schedules.filter(schedule => {
    const vehicle = vehicles.find(v => v.id === schedule.vehicleId);
    const maintenanceType = maintenanceTypes.find(m => m.id === schedule.maintenanceTypeId);
    
    const matchesSearch = vehicle?.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        maintenanceType?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || schedule.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer>
      <PageHeader 
        title="Preventive Maintenance" 
        subtitle="Schedule and manage recurring vehicle maintenance"
        icon={<CalendarIcon />}
      />

      <StatsGrid>
        <StatCard 
          title="Active Schedules" 
          value={schedules.filter(s => s.status === 'active').length.toString()} 
          icon={CheckCircleIcon} 
          gradient="linear-gradient(135deg, #10B981, #059669)"
        />
        <StatCard 
          title="Due This Month" 
          value="12" 
          icon={ClockIcon} 
          gradient="linear-gradient(135deg, #F59E0B, #D97706)"
        />
        <StatCard 
          title="Overdue" 
          value="3" 
          icon={AlertTriangleIcon} 
          gradient="linear-gradient(135deg, #EF4444, #DC2626)"
        />
        <StatCard 
          title="Total Vehicles" 
          value={vehicles.length.toString()} 
          icon={TruckIcon} 
          gradient="linear-gradient(135deg, #3B82F6, #1D4ED8)"
        />
      </StatsGrid>

      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setCurrentSchedule(null);
          setShowAddModal(true);
        }}
        addButtonText="Add Schedule"
        searchPlaceholder="Search by vehicle or type..."
        additionalControls={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="overdue">Overdue</option>
          </select>
        }
      />

      <TableContainer>
        <UnifiedTable
          headers={['Vehicle', 'Maintenance Type', 'Interval', 'Last Performed', 'Next Due', 'Status', 'Actions']}
        >
          {filteredSchedules.map((schedule) => {
            const vehicle = vehicles.find(v => v.id === schedule.vehicleId);
            const maintenanceType = maintenanceTypes.find(m => m.id === schedule.maintenanceTypeId);
            
            return (
              <tr key={schedule.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <TruckIcon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{vehicle?.plateNumber || 'N/A'}</div>
                      <div className="text-xs text-gray-500">
                        {vehicle?.make} {vehicle?.model}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">
                  {maintenanceType?.name || 'N/A'}
                  <div className="text-xs text-gray-500">
                    {maintenanceType?.category}
                  </div>
                </td>
                <td>
                  Every {schedule.intervalValue} {schedule.intervalType}
                </td>
                <td>
                  {schedule.lastPerformed || 'Never'}
                </td>
                <td>
                  <div className="font-medium">
                    {schedule.nextDue}
                  </div>
                  <div className="text-xs text-gray-500">
                    {schedule.status === 'overdue' ? 'Overdue' : 'Due soon'}
                  </div>
                </td>
                <td>
                  <StatusBadge 
                    status={schedule.status} 
                    variant={schedule.status} 
                  />
                </td>
                <td>
                  <ActionButtons
                    onView={() => console.log('View', schedule.id)}
                    onEdit={() => {
                      setCurrentSchedule(schedule);
                      setShowAddModal(true);
                    }}
                    onDelete={() => handleDeleteSchedule(schedule.id)}
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
          setCurrentSchedule(null);
        }}
        title={currentSchedule ? 'Edit Maintenance Schedule' : 'Add New Schedule'}
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          currentSchedule ? handleEditSchedule(formData) : handleAddSchedule(formData);
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SelectField
              label="Vehicle *"
              name="vehicleId"
              defaultValue={currentSchedule?.vehicleId || ''}
              options={vehicles.map(v => ({
                value: v.id,
                label: `${v.plateNumber} (${v.make} ${v.model})`
              }))}
              required
            />
            
            <SelectField
              label="Maintenance Type *"
              name="maintenanceTypeId"
              defaultValue={currentSchedule?.maintenanceTypeId || ''}
              options={maintenanceTypes.map(m => ({
                value: m.id,
                label: `${m.name} (${m.category})`
              }))}
              required
            />
            
            <SelectField
              label="Interval Type *"
              name="intervalType"
              defaultValue={currentSchedule?.intervalType || 'mileage'}
              options={[
                { value: 'mileage', label: 'Mileage' },
                { value: 'days', label: 'Days' },
                { value: 'months', label: 'Months' }
              ]}
              required
            />
            
            <FormField
              label="Interval Value *"
              name="intervalValue"
              type="number"
              defaultValue={currentSchedule?.intervalValue || ''}
              required
            />
            
            <FormField
              label="Last Performed"
              name="lastPerformed"
              type="date"
              defaultValue={currentSchedule?.lastPerformed || ''}
            />
            
            <FormField
              label="Next Due *"
              name="nextDue"
              type="date"
              defaultValue={currentSchedule?.nextDue || ''}
              required
            />
            
            <SelectField
              label="Status"
              name="status"
              defaultValue={currentSchedule?.status || 'active'}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'overdue', label: 'Overdue' }
              ]}
            />
          </div>
          
          <FormField
            label="Notes"
            name="notes"
            type="textarea"
            defaultValue={currentSchedule?.notes || ''}
          />
          
          <FormButtons
            onCancel={() => setShowAddModal(false)}
            submitText={currentSchedule ? 'Update Schedule' : 'Add Schedule'}
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

export default PreventiveMaintenance;