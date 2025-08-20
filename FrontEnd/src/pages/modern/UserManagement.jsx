import React, { useState, useEffect } from 'react';
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
  KeyIcon,
  PencilIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('all');
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
    status: 'Active',
    permissions: []
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const availablePermissions = [
    'Full Access', 
    'Fleet Management', 
    'Reports', 
    'Vehicle Access', 
    'Route Planning', 
    'Tracking'
  ];

  const roles = ['all', 'Admin', 'Manager', 'Driver', 'Dispatcher'];

  // Initialize users from backend
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await apiClient.get('/users');
        const mapped = (data || []).map(u => ({
          id: u.id,
          name: u.fullName || u.name,
          email: u.email,
          phone: u.phone,
          role: u.role || 'User',
          status: u.isActive ? 'Active' : 'Inactive',
          lastLogin: u.lastLogin,
          permissions: u.permissions || [],
          avatar: (u.fullName || u.name || 'U').charAt(0).toUpperCase()
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    load();
  }, []);

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

  const openViewModal = (user) => {
    setViewUser(user);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      permissions: [...user.permissions]
    });
  };

  const openAddModal = () => {
    setShowAddModal(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Admin',
      status: 'Active',
      permissions: []
    });
    setErrors({});
  };

  const closeModals = () => {
    setShowAddModal(false);
    setViewUser(null);
    setEditUser(null);
    setShowDeleteConfirm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      return { ...prev, permissions: newPermissions };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (showAddModal) {
      apiClient.post('/users', {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.status === 'Active'
      }).then(async () => {
        const { data } = await apiClient.get('/users');
        setUsers((data || []).map(u => ({
          id: u.id,
          name: u.fullName || u.name,
          email: u.email,
          phone: u.phone,
          role: u.role || 'User',
          status: u.isActive ? 'Active' : 'Inactive',
          lastLogin: u.lastLogin,
          permissions: u.permissions || [],
          avatar: (u.fullName || u.name || 'U').charAt(0).toUpperCase()
        })));
      });
    } else if (editUser) {
      apiClient.put(`/users/${editUser.id}`, {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.status === 'Active',
        permissions: formData.permissions
      }).then(async () => {
        const { data } = await apiClient.get('/users');
        setUsers((data || []).map(u => ({
          id: u.id,
          name: u.fullName || u.name,
          email: u.email,
          phone: u.phone,
          role: u.role || 'User',
          status: u.isActive ? 'Active' : 'Inactive',
          lastLogin: u.lastLogin,
          permissions: u.permissions || [],
          avatar: (u.fullName || u.name || 'U').charAt(0).toUpperCase()
        })));
      });
    }
    
    closeModals();
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiClient.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh', position: 'relative' }}>
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
            onClick={openAddModal}
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
                    {/* User Details */}
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

                    {/* Contact Info */}
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

                    {/* Role & Permissions */}
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

                    {/* Status & Activity */}
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

                    {/* Actions */}
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => openViewModal(user)}
                          style={{
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
                        <button 
                          onClick={() => openEditModal(user)}
                          style={{
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
                        <button 
                          onClick={() => setShowDeleteConfirm(user.id)}
                          style={{
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

      {/* View User Modal */}
      {viewUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={closeModals}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <XIcon size={24} />
            </button>
            
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>
              User Details
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                {viewUser.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  {viewUser.name}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                  ID: {viewUser.id}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '12px' }}>
                  Contact Information
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MailIcon size={16} color="#6B7280" />
                  <span style={{ fontSize: '14px', color: '#1F2937' }}>{viewUser.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneIcon size={16} color="#6B7280" />
                  <span style={{ fontSize: '14px', color: '#1F2937' }}>{viewUser.phone}</span>
                </div>
              </div>
              
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '12px' }}>
                  Account Information
                </h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    backgroundColor: getRoleColor(viewUser.role).bg,
                    color: getRoleColor(viewUser.role).color,
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {viewUser.role}
                  </span>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    backgroundColor: viewUser.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                    color: viewUser.status === 'Active' ? '#065F46' : '#DC2626',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {viewUser.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
                  Last login: {viewUser.lastLogin}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280', marginBottom: '12px' }}>
                Permissions
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {viewUser.permissions.map(permission => (
                  <span key={permission} style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#E5E7EB',
                    color: '#1F2937',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {permission}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => openEditModal(viewUser)}
                style={{
                  background: '#F3F4F6',
                  color: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#F3F4F6'}
              >
                <PencilIcon size={16} />
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {(showAddModal || editUser) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={closeModals}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <XIcon size={24} />
            </button>
            
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1F2937' }}>
              {editUser ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.name ? '#EF4444' : '#D1D5DB'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {errors.name && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.email ? '#EF4444' : '#D1D5DB'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {errors.email && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.phone ? '#EF4444' : '#D1D5DB'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {errors.phone && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Driver">Driver</option>
                    <option value="Dispatcher">Dispatcher</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Permissions
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {availablePermissions.map(permission => (
                    <div key={permission} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        id={permission}
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        style={{ marginRight: '8px' }}
                      />
                      <label htmlFor={permission} style={{ fontSize: '14px', color: '#1F2937' }}>
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={closeModals}
                  style={{
                    background: '#F3F4F6',
                    color: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.9'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  <PlusIcon size={16} />
                  {editUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={closeModals}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <XIcon size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <TrashIcon size={32} color="#EF4444" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                Delete User
              </h3>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.5' }}>
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={closeModals}
                style={{
                  background: '#F3F4F6',
                  color: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#F3F4F6'}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                style={{
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#DC2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#EF4444'}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;