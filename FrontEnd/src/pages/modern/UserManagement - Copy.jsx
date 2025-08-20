import React, { useState } from 'react';
import { 
  UserIcon, 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  WrenchIcon,
  TrashIcon,
  ShieldIcon,
  MailIcon,
  PhoneIcon,
  CheckCircleIcon,
  XIcon,
  KeyIcon
} from '../../components/icons/SVGIcons';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@optiroute360.com',
      phone: '+966 50 123 4567',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15 10:30',
      permissions: ['Full Access'],
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Sarah Mohammed',
      email: 'sarah@optiroute360.com',
      phone: '+966 55 234 5678',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-01-15 09:15',
      permissions: ['Fleet Management', 'Reports'],
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Omar Hassan',
      email: 'omar@optiroute360.com',
      phone: '+966 56 345 6789',
      role: 'Driver',
      status: 'Inactive',
      lastLogin: '2024-01-14 16:45',
      permissions: ['Vehicle Access'],
      avatar: 'O'
    },
    {
      id: 4,
      name: 'Fatima Ali',
      email: 'fatima@optiroute360.com',
      phone: '+966 54 456 7890',
      role: 'Dispatcher',
      status: 'Active',
      lastLogin: '2024-01-15 11:20',
      permissions: ['Route Planning', 'Tracking'],
      avatar: 'F'
    }
  ];

  const roles = ['all', 'Admin', 'Manager', 'Driver', 'Dispatcher'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return { bg: '#FEE2E2', color: '#DC2626' };
      case 'Manager': return { bg: '#DBEAFE', color: '#2563EB' };
      case 'Driver': return { bg: '#D1FAE5', color: '#059669' };
      case 'Dispatcher': return { bg: '#FEF3C7', color: '#D97706' };
      default: return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          User Management
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage system users, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
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
                Total Users
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {users.length}
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
              <UserIcon size={24} color="white" />
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
                Active Users
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {users.filter(u => u.status === 'Active').length}
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
                Admins
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {users.filter(u => u.role === 'Admin').length}
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
              <ShieldIcon size={24} color="white" />
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
                Online Now
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                3
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
              <KeyIcon size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
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
                placeholder="Search users..."
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
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              />
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
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
              gap: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#F8FAFC' }}>
              <tr>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  User Details
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Contact Info
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Role & Permissions
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Status & Activity
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const roleColors = getRoleColor(user.role);
                return (
                  <tr key={user.id} style={{
                    borderBottom: index < filteredUsers.length - 1 ? '1px solid #F3F4F6' : 'none'
                  }}>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <MailIcon size={14} color="#6B7280" />
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {user.email}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <PhoneIcon size={14} color="#6B7280" />
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '20px',
                          backgroundColor: roleColors.bg,
                          color: roleColors.color,
                          marginBottom: '8px'
                        }}>
                          {user.role}
                        </span>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          {user.permissions.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '20px',
                            backgroundColor: user.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                            color: user.status === 'Active' ? '#065F46' : '#DC2626'
                          }}>
                            {user.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          Last login: {user.lastLogin}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#3B82F6',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#EFF6FF'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <EyeIcon size={16} />
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#10B981',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ECFDF5'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <WrenchIcon size={16} />
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#EF4444',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

