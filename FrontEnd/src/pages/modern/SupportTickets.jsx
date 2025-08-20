import React, { useState } from 'react';
import { 
  BellIcon, 
  PlusIcon, 
  MessageSquareIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  EyeIcon,
  EditIcon,
  SearchIcon 
} from '../../components/icons/SVGIcons';

const SupportTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tickets = [
    {
      id: 'TKT-001',
      title: 'Vehicle tracking not updating',
      description: 'GPS location for vehicle ABC-123 has not updated for the past 2 hours',
      priority: 'High',
      status: 'Open',
      category: 'Technical',
      submittedBy: 'Ahmed Al-Rashid',
      assignedTo: 'Support Team',
      createdAt: '2024-01-15 09:30:00',
      updatedAt: '2024-01-15 10:45:00',
      responses: 3,
      tenant: 'Al-Rashid Logistics'
    },
    {
      id: 'TKT-002',
      title: 'Unable to generate monthly reports',
      description: 'Getting error when trying to export monthly vehicle usage reports',
      priority: 'Medium',
      status: 'In Progress',
      category: 'Bug Report',
      submittedBy: 'Sarah Mohammed',
      assignedTo: 'Dev Team',
      createdAt: '2024-01-15 08:15:00',
      updatedAt: '2024-01-15 10:30:00',
      responses: 5,
      tenant: 'Desert Transport Co.'
    },
    {
      id: 'TKT-003',
      title: 'Request for additional user accounts',
      description: 'Need to add 5 more driver accounts to our current plan',
      priority: 'Low',
      status: 'Resolved',
      category: 'Feature Request',
      submittedBy: 'Omar Hassan',
      assignedTo: 'Sales Team',
      createdAt: '2024-01-14 16:20:00',
      updatedAt: '2024-01-15 09:15:00',
      responses: 2,
      tenant: 'Gulf Shipping LLC'
    },
    {
      id: 'TKT-004',
      title: 'SMS notifications not working',
      description: 'Drivers are not receiving SMS notifications for new trip assignments',
      priority: 'High',
      status: 'Open',
      category: 'Technical',
      submittedBy: 'Fatima Ali',
      assignedTo: 'Support Team',
      createdAt: '2024-01-15 07:45:00',
      updatedAt: '2024-01-15 08:30:00',
      responses: 1,
      tenant: 'Express Delivery Services'
    },
    {
      id: 'TKT-005',
      title: 'Training request for new features',
      description: 'Need training session for route optimization features',
      priority: 'Low',
      status: 'Scheduled',
      category: 'Training',
      submittedBy: 'Mohammed Khalil',
      assignedTo: 'Training Team',
      createdAt: '2024-01-14 14:30:00',
      updatedAt: '2024-01-15 09:00:00',
      responses: 4,
      tenant: 'City Logistics'
    }
  ];

  const priorities = ['all', 'High', 'Medium', 'Low'];
  const statuses = ['all', 'Open', 'In Progress', 'Resolved', 'Scheduled'];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'Medium': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Low': return { bg: '#DBEAFE', text: '#1D4ED8' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'In Progress': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Resolved': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Scheduled': return { bg: '#E0E7FF', text: '#3730A3' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Support Tickets
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage customer support requests and technical issues
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Total Tickets
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {tickets.length}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BellIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Open Tickets
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {tickets.filter(t => t.status === 'Open').length}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangleIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Resolved Today
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {tickets.filter(t => t.status === 'Resolved').length}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircleIcon size={24} color="white" />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Avg Response Time
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                2.5h
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ClockIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
              <SearchIcon style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '130px'
              }}
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '130px'
              }}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
          
          <button
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusIcon size={16} />
            New Ticket
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {filteredTickets.map((ticket) => {
          const priorityColors = getPriorityColor(ticket.priority);
          const statusColors = getStatusColor(ticket.status);
          
          return (
            <div key={ticket.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#6B7280',
                      fontFamily: 'monospace'
                    }}>
                      {ticket.id}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                      {ticket.title}
                    </h3>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      backgroundColor: priorityColors.bg,
                      color: priorityColors.text
                    }}>
                      {ticket.priority}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      backgroundColor: statusColors.bg,
                      color: statusColors.text
                    }}>
                      {ticket.status}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, marginBottom: '16px', lineHeight: '1.5' }}>
                    {ticket.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Category</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {ticket.category}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Submitted By</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                          {ticket.submittedBy}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Assigned To</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {ticket.assignedTo}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Tenant</span>
                      <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                        {ticket.tenant}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Created</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ClockIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#1F2937' }}>
                          {ticket.createdAt}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Responses</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MessageSquareIcon size={14} color="#6B7280" />
                        <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                          {ticket.responses}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button style={{
                    background: 'none',
                    border: '1px solid #D1D5DB',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <EyeIcon size={16} />
                    View
                  </button>
                  <button style={{
                    background: 'none',
                    border: '1px solid #D1D5DB',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#374151',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <EyeIcon size={16} />
                    Update
                  </button>
                  <button style={{
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <MessageSquareIcon size={16} />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportTickets;

