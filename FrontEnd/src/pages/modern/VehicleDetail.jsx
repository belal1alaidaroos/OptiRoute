import React, { useState } from 'react';
import { 
  PageContainer,
  StatusBadge,
  StatsGrid,
  StatCard,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast
} from '@/components/shared/UnifiedDesignComponents';
import { 
  DetailHeader ,
  DocumentCard,
  Timeline
} from '@/components/shared/UnifiedDesignComponents2';
import { 
  CarIcon, 
  GasIcon, 
  SpeedometerIcon, 
  CalendarIcon, 
  WrenchIcon,
  DocumentIcon,
  EditIcon,
  CheckCircleIcon
} from '@/components/icons/SVGIcons';

const VehicleDetail = ({ vehicleId }) => {
  // Vehicle data
  const [vehicle, setVehicle] = useState({
    id: vehicleId,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    vin: 'JT2BF22K1W0123456',
    licensePlate: 'ABC123',
    fuelType: 'Gasoline',
    currentMileage: 45230,
    status: 'Active',
    lastService: '2023-05-15',
    nextService: '2023-08-20',
    avgFuelConsumption: 8.5,
    serviceHistory: [
      { 
        id: 1, 
        date: '2023-05-15', 
        type: 'Oil Change', 
        workshop: 'Central Workshop',
        cost: 120,
        mileage: 44210
      },
      { 
        id: 2, 
        date: '2023-02-10', 
        type: 'Tire Rotation', 
        workshop: 'Northern Workshop',
        cost: 85,
        mileage: 41250
      }
    ],
    documents: [
      { 
        id: 1, 
        name: 'Registration', 
        expiry: '2024-01-31',
        type: 'PDF',
        size: '1.2MB'
      },
      { 
        id: 2, 
        name: 'Insurance', 
        expiry: '2023-12-15',
        type: 'PDF',
        size: '850KB'
      }
    ],
    specifications: {
      engine: '2.5L 4-cylinder',
      transmission: 'Automatic',
      fuelCapacity: '60L',
      weight: '1550kg'
    }
  });

  // State management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Stats for the vehicle
  const stats = {
    services: vehicle.serviceHistory.length,
    cost: vehicle.serviceHistory.reduce((sum, service) => sum + service.cost, 0),
    fuel: vehicle.avgFuelConsumption,
    mileage: vehicle.currentMileage
  };

  // Handle edit modal
  const handleEdit = () => {
    setFormData({
      currentMileage: vehicle.currentMileage,
      status: vehicle.status,
      nextService: vehicle.nextService
    });
    setIsEditModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicle({
      ...vehicle,
      ...formData
    });
    setToast({ message: 'Vehicle details updated', type: 'success' });
    setIsEditModalOpen(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle document actions
  const handleDocumentAction = (action, document) => {
    if (action === 'view') {
      setSelectedDocument(document);
      setToast({ message: `Viewing ${document.name} document`, type: 'info' });
    } else if (action === 'renew') {
      setToast({ message: `Renewal started for ${document.name}`, type: 'success' });
    }
  };

  return (
    <PageContainer>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
          duration={3000} 
        />
      )}
      
      <DetailHeader 
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        subtitle={`VIN: ${vehicle.vin} | License: ${vehicle.licensePlate}`}
        status={<StatusBadge status={vehicle.status} variant="success" />}
        actions={
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <EditIcon className="w-5 h-5" /> Edit Details
          </button>
        }
      />
      
      <StatsGrid>
        <StatCard 
          title="Mileage" 
          value={`${vehicle.currentMileage.toLocaleString()} mi`} 
          icon={SpeedometerIcon}
          variant="info"
        />
        <StatCard 
          title="Fuel Consumption" 
          value={`${vehicle.avgFuelConsumption} L/100km`} 
          icon={GasIcon}
          variant="warning"
        />
        <StatCard 
          title="Service Count" 
          value={vehicle.serviceHistory.length} 
          icon={WrenchIcon}
          variant="secondary"
        />
        <StatCard 
          title="Total Service Cost" 
          value={`$${stats.cost}`} 
          icon={CheckCircleIcon}
          variant="success"
        />
      </StatsGrid>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-blue-600" /> Service History
            </h2>
            <span className="text-sm text-gray-500">
              {vehicle.serviceHistory.length} records
            </span>
          </div>
          
          <Timeline 
            items={vehicle.serviceHistory.map(service => ({
              date: service.date,
              title: service.type,
              description: `Mileage: ${service.mileage.toLocaleString()} mi`,
              details: `Cost: $${service.cost} | Workshop: ${service.workshop}`
            }))}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <DocumentIcon className="w-6 h-6 text-blue-600" /> Documents
            </h2>
            <span className="text-sm text-gray-500">
              {vehicle.documents.length} documents
            </span>
          </div>
          
          <div className="space-y-4">
            {vehicle.documents.map((doc) => (
              <DocumentCard 
                key={doc.id}
                title={doc.name}
                subtitle={`Expires: ${doc.expiry}`}
                meta={[
                  `Type: ${doc.type}`,
                  `Size: ${doc.size}`
                ]}
                status={new Date(doc.expiry) > new Date() ? 'valid' : 'expired'}
                onAction={(action) => handleDocumentAction(action, doc)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Engine</h3>
            <p className="text-lg font-medium">{vehicle.specifications.engine}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Transmission</h3>
            <p className="text-lg font-medium">{vehicle.specifications.transmission}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Fuel Capacity</h3>
            <p className="text-lg font-medium">{vehicle.specifications.fuelCapacity}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Weight</h3>
            <p className="text-lg font-medium">{vehicle.specifications.weight}</p>
          </div>
        </div>
      </div>
      
      <UnifiedModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Vehicle Details"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormField
              label="Current Mileage"
              name="currentMileage"
              type="number"
              value={formData.currentMileage || ''}
              onChange={handleInputChange}
              required
            />
            
            <FormField
              label="Next Service Date"
              name="nextService"
              type="date"
              value={formData.nextService || ''}
              onChange={handleInputChange}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex space-x-4">
                {['Active', 'In Maintenance', 'Out of Service'].map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <StatusBadge status={status} variant={status.toLowerCase().replace(' ', '-')} />
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <FormButtons
            onCancel={() => setIsEditModalOpen(false)}
            submitText="Update Vehicle"
            className="mt-6"
          />
        </form>
      </UnifiedModal>
    </PageContainer>
  );
};

export default VehicleDetail;