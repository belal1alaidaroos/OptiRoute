import React, { useState } from 'react';
import { 
  PageContainer,
  PageHeader,
  StatsGrid,
  StatCard,
  ControlsBar,
  UnifiedTable,
  StatusBadge,
  UnifiedModal,
  FormField,
  FormButtons,
  Toast
} from '@/components/shared/UnifiedDesignComponents';
import { 
  WrenchIcon, 
  CheckCircleIcon, 
  ClockIcon,
  EditIcon,
  TrashIcon,
  PaperClipIcon,
  ThumbsUpIcon,
  ThumbsDownIcon
} from '@/components/icons/SVGIcons';

 

const ServicesRequest = () => {
  // Lookup data
  const [vehicles] = useState(['Toyota Camry', 'Honda Civic', 'Ford F-150', 'Tesla Model 3']);
  const [workshops] = useState(['Downtown Garage', 'Westside Auto', 'Premium Care']);
  const [providers] = useState(['John Mechanic', 'Sarah Tech', 'Mike Specialist']);
  const [cities] = useState(['New York', 'Los Angeles', 'Chicago', 'Houston']);

  // State management
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      serviceType: 'Oil Change', 
      vehicle: 'Toyota Camry', 
      workshop: 'Downtown Garage',
      provider: 'John Mechanic',
      date: '2023-06-15', 
      status: 'Pending', 
      cost: 120,
      customer: 'John Doe',
      contact: '555-1234',
      address: '123 Main St',
      city: 'New York',
      mileage: 45000,
      priority: 'Medium',
      notes: 'Full synthetic oil',
      attachments: [
        { id: 1, name: 'engine.jpg', type: 'image/jpeg', size: '2.4MB' },
        { id: 2, name: 'invoice.pdf', type: 'application/pdf', size: '1.1MB' }
      ]
    },
    // ...other requests
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    serviceType: '',
    vehicle: '',
    workshop: '',
    provider: '',
    date: new Date(),
    status: 'Pending',
    cost: '',
    customer: '',
    contact: '',
    address: '',
    city: '',
    mileage: '',
    priority: 'Medium',
    notes: '',
    attachments: []
  });
  const [toast, setToast] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [attachments, setAttachments] = useState([]);

  // Calculate statistics
  const stats = {
    total: requests.length,
    completed: requests.filter(r => r.status === 'Completed').length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    revenue: requests.filter(r => r.status === 'Completed').reduce((sum, r) => sum + r.cost, 0)
  };

  // Filter requests
  const filteredRequests = requests.filter(request => 
    request.status.toLowerCase().includes(searchTerm.toLowerCase()) || 
    request.id.toString().includes(searchTerm) ||
    request.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };

  // Remove attachment
  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestData = {
      ...formData,
      attachments: [...formData.attachments, ...attachments],
      date: formData.date.toISOString().split('T')[0],
      cost: Number(formData.cost) || 0
    };
    
    if (isEditing) {
      // Update existing request
      setRequests(requests.map(r => 
        r.id === formData.id ? requestData : r
      ));
      setToast({ message: 'Request updated', type: 'success' });
    } else {
      // Create new request
      const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
      setRequests([
        ...requests,
        {
          ...requestData,
          id: newId
        }
      ]);
      setToast({ message: 'Request created', type: 'success' });
    }
    
    resetForm();
    setIsModalOpen(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    setRequests(requests.filter(r => r.id !== id));
    setToast({ message: 'Request deleted', type: 'success' });
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    ));
    setToast({ message: `Status updated to ${newStatus}`, type: 'success' });
  };

  // Prepare edit form
  const handleEdit = (request) => {
    setFormData({
      ...request,
      date: new Date(request.date)
    });
    setAttachments(request.attachments || []);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      serviceType: '',
      vehicle: '',
      workshop: '',
      provider: '',
      date: new Date(),
      status: 'Pending',
      cost: '',
      customer: '',
      contact: '',
      address: '',
      city: '',
      mileage: '',
      priority: 'Medium',
      notes: '',
      attachments: []
    });
    setAttachments([]);
    setIsEditing(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const variants = {
      Completed: 'success',
      'In Progress': 'warning',
      Pending: 'secondary',
      Scheduled: 'info',
      Approved: 'primary',
      Rejected: 'danger'
    };
    return <StatusBadge status={status} variant={variants[status]} />;
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
      
      <PageHeader
        title="Service Management"
        subtitle="Track and manage all service requests"
        breadcrumbs={[
          { name: 'Dashboard', href: '/' },
          { name: 'Services', href: '/services' }
        ]}
      />
      
      <StatsGrid>
        <StatCard 
          title="Total Requests" 
          value={stats.total} 
          icon={WrenchIcon}
          trend="up"
          trendValue="+12%"
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          icon={CheckCircleIcon}
          variant="success"
        />
        <StatCard 
          title="Pending" 
          value={stats.pending} 
          icon={ClockIcon}
          variant="warning"
        />
        <StatCard 
          title="Approved" 
          value={stats.approved} 
          icon={ThumbsUpIcon}
          variant="primary"
        />
        <StatCard 
          title="Revenue" 
          value={`$${stats.revenue}`} 
          icon={CheckCircleIcon}
          variant="success"
        />
      </StatsGrid>
      
      <ControlsBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        addButtonText="New Request"
        searchPlaceholder="Search requests..."
        filters={
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
        }
      />
      
      <UnifiedTable
        headers={['ID', 'Customer', 'Vehicle', 'Workshop', 'Date', 'Status', 'Cost', 'Actions']}
        className="mt-6"
      >
        {filteredRequests
          .filter(r => selectedStatus === 'all' || r.status === selectedStatus)
          .map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 font-medium text-gray-900">#{request.id}</td>
              <td className="py-4 px-6">
                <div className="font-medium">{request.customer}</div>
                <div className="text-sm text-gray-500">{request.contact}</div>
              </td>
              <td className="py-4 px-6">
                <div>{request.vehicle}</div>
                <div className="text-sm text-gray-500">{request.mileage} miles</div>
              </td>
              <td className="py-4 px-6">
                <div>{request.workshop}</div>
                <div className="text-sm text-gray-500">{request.city}</div>
              </td>
              <td className="py-4 px-6">{request.date}</td>
              <td className="py-4 px-6">{getStatusBadge(request.status)}</td>
              <td className="py-4 px-6 font-medium">${request.cost}</td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(request)}
                    className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
                    title="Edit request"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(request.id, 'Completed')}
                    className="p-2 rounded-full hover:bg-green-100 text-green-600"
                    title="Mark as completed"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(request.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    title="Delete request"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </UnifiedTable>
      
      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={isEditing ? "Edit Service Request" : "Create New Service Request"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
            />
            
            <FormField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              placeholder="555-1234"
            />
            
            <FormField
              label="Vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleInputChange}
              required
              type="select"
              options={vehicles}
            />
            
            <FormField
              label="Workshop"
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              required
              type="select"
              options={workshops}
            />
            
            <FormField
              label="Service Provider"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              type="select"
              options={providers}
            />
            
            <FormField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              type="select"
              options={cities}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Date
              </label>
              <input
                type="date"
                value={formData.date.toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, date: new Date(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Cost ($)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="120"
                min="0"
                step="0.01"
              />
            </div>
            
            <FormField
              label="Mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              type="number"
              placeholder="45000"
              min="0"
            />
            
            <FormField
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              type="select"
              options={['Low', 'Medium', 'High']}
            />
          </div>
          
          <FormField
            label="Service Type"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            required
            placeholder="Oil Change, Tire Rotation, etc."
          />
          
          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="123 Main St"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Additional details about the service..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="flex items-center">
              <input
                type="file"
                multiple
                onChange={handleAttachmentUpload}
                className="hidden"
                id="attachment-upload"
              />
              <label 
                htmlFor="attachment-upload"
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center"
              >
                <PaperClipIcon className="w-4 h-4 mr-2" />
                Add Files
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {attachments.length} file(s) selected
              </span>
            </div>
            
            {attachments.length > 0 && (
              <div className="mt-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                {attachments.map(att => (
                  <div key={att.id} className="flex justify-between items-center py-1">
                    <div className="flex items-center">
                      <PaperClipIcon className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm">{att.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({att.size})</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <FormButtons 
            onCancel={() => {
              setIsModalOpen(false);
              resetForm();
            }}
            submitText={isEditing ? "Update Request" : "Create Request"} 
          />
        </form>
      </UnifiedModal>
    </PageContainer>
  );
};

export default ServicesRequest;