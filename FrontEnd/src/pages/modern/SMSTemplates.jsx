import React, { useState } from 'react';
import { 
  MessageSquareIcon, 
  PlusIcon, 
  SendIcon,
  TrashIcon,
  CopyIcon,
  EyeIcon,
  SearchIcon 
} from '../../components/icons/SVGIcons';

const SMSTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Delivery Notification',
      category: 'Delivery',
      content: 'Your package #{ORDER_ID} is out for delivery. Expected arrival: {ETA}. Track: {TRACKING_URL}',
      variables: ['ORDER_ID', 'ETA', 'TRACKING_URL'],
      usage: 245,
      lastUsed: '2024-01-15 10:30',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Pickup Reminder',
      category: 'Pickup',
      content: 'Reminder: Your pickup is scheduled for {DATE} at {TIME}. Address: {ADDRESS}',
      variables: ['DATE', 'TIME', 'ADDRESS'],
      usage: 189,
      lastUsed: '2024-01-14 16:45',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Delay Alert',
      category: 'Alert',
      content: 'Alert: Delivery delay for order #{ORDER_ID}. New ETA: {NEW_ETA}. Reason: {REASON}',
      variables: ['ORDER_ID', 'NEW_ETA', 'REASON'],
      usage: 67,
      lastUsed: '2024-01-12 09:20',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Completion Confirmation',
      category: 'Delivery',
      content: 'Delivered! Your order #{ORDER_ID} has been successfully delivered to {ADDRESS}',
      variables: ['ORDER_ID', 'ADDRESS'],
      usage: 312,
      lastUsed: '2024-01-15 14:15',
      status: 'Active'
    }
  ]);

  const categories = ['all', 'Delivery', 'Pickup', 'Alert', 'General'];

  // CRUD Operations
  const handleCreate = () => {
    alert('Create new template functionality would be implemented here');
  };

  const handlePreview = (template) => {
    alert(`Preview: ${template.content}`);
  };

  const handleEdit = (template) => {
    alert(`Editing template: ${template.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          SMS Templates
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage SMS notification templates with dynamic variables
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
                Total Templates
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {templates.length}
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
              <MessageSquareIcon size={24} color="white" />
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
                Messages Sent
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {templates.reduce((sum, t) => sum + t.usage, 0).toLocaleString()}
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
              <SendIcon size={24} color="white" />
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
                Active Templates
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {templates.filter(t => t.status === 'Active').length}
              </p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <EyeIcon size={24} color="white" />
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
                Categories
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {categories.length - 1}
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
              <CopyIcon size={24} color="white" />
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
                placeholder="Search templates..."
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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleCreate}
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
            New Template
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {filteredTemplates.map((template) => (
          <div key={template.id} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                    {template.name}
                  </h3>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '20px',
                    backgroundColor: template.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                    color: template.status === 'Active' ? '#065F46' : '#DC2626'
                  }}>
                    {template.status}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '16px',
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8'
                  }}>
                    {template.category}
                  </span>
                </div>
                
                <div style={{
                  background: '#F8FAFC',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  border: '1px solid #E5E7EB'
                }}>
                  <p style={{ fontSize: '14px', color: '#1F2937', margin: 0, lineHeight: '1.5' }}>
                    {template.content}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Variables</span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {template.variables.map((variable, index) => (
                        <span key={index} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          borderRadius: '12px',
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          fontFamily: 'monospace'
                        }}>
                          {`{${variable}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Usage Count</span>
                    <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                      {template.usage.toLocaleString()} messages
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#9CA3AF', display: 'block' }}>Last Used</span>
                    <span style={{ fontSize: '14px', color: '#1F2937' }}>
                      {template.lastUsed}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                <button 
                  onClick={() => handlePreview(template)}
                  style={{
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
                  }}
                >
                  <EyeIcon size={16} />
                  Preview
                </button>
                <button 
                  onClick={() => handleEdit(template)}
                  style={{
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
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(template.id)}
                  style={{
                    background: 'none',
                    border: '1px solid #D1D5DB',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#EF4444',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <TrashIcon size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SMSTemplates;