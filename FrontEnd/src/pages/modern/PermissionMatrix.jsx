// src/components/PermissionMatrix.jsx
import React, { useState, useEffect } from 'react';
import { 
  ShieldIcon, 
  UserIcon, 
  CheckCircleIcon, 
  XIcon,
  SaveIcon,
  RefreshIcon,
  PlusIcon,
  TrashIcon,
  KeyIcon,
  BuildingOfficeIcon
} from '../../components/icons/SVGIcons';
// BuildingOfficeIcon component
 

const PermissionMatrix = () => {
  const [selectedRole, setSelectedRole] = useState('Manager');
  const [permissionsConfig, setPermissionsConfig] = useState({});
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [initialPermissions, setInitialPermissions] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState('SuperAdmin'); // 'SuperAdmin' or 'TenantAdmin'

  // Define roles with tenant-specific permissions
  const roles = [
    { name: 'SuperAdmin', isSystemRole: true, description: 'Full system access, can create tenants and tenant admins' },
    { name: 'TenantAdmin', isSystemRole: true, description: 'Manages a specific tenant, can create tenant users' },
    { name: 'Admin', isSystemRole: false },
    { name: 'Manager', isSystemRole: false },
    { name: 'Driver', isSystemRole: false },
    { name: 'Dispatcher', isSystemRole: false }
  ];
  
  const permissions = [
    { module: 'Dashboard', permissions: ['View', 'Export'] },
    { module: 'Fleet Management', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { module: 'Operations', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { module: 'Tracking', permissions: ['View', 'Real-time Access'] },
    { module: 'Maintenance', permissions: ['View', 'Schedule', 'Update'] },
    { module: 'User Management', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { module: 'Settings', permissions: ['View', 'Edit'] },
    { module: 'Reports', permissions: ['View', 'Generate', 'Export'] },
    { module: 'Tenant Management', permissions: ['View', 'Create', 'Edit', 'Delete'] }
  ];

  // Initialize permissions configuration
  useEffect(() => {
    const config = {
      'SuperAdmin': {
        'Dashboard': ['View', 'Export'],
        'Fleet Management': ['View', 'Create', 'Edit', 'Delete'],
        'Operations': ['View', 'Create', 'Edit', 'Delete'],
        'Tracking': ['View', 'Real-time Access'],
        'Maintenance': ['View', 'Schedule', 'Update'],
        'User Management': ['View', 'Create', 'Edit', 'Delete'],
        'Settings': ['View', 'Edit'],
        'Reports': ['View', 'Generate', 'Export'],
        'Tenant Management': ['View', 'Create', 'Edit', 'Delete']
      },
      'TenantAdmin': {
        'Dashboard': ['View', 'Export'],
        'Fleet Management': ['View', 'Create', 'Edit'],
        'Operations': ['View', 'Create', 'Edit'],
        'Tracking': ['View', 'Real-time Access'],
        'Maintenance': ['View', 'Schedule'],
        'User Management': ['View', 'Create', 'Edit'],
        'Settings': ['View'],
        'Reports': ['View', 'Generate', 'Export'],
        'Tenant Management': []
      },
      'Admin': {
        'Dashboard': ['View', 'Export'],
        'Fleet Management': ['View', 'Create', 'Edit', 'Delete'],
        'Operations': ['View', 'Create', 'Edit', 'Delete'],
        'Tracking': ['View', 'Real-time Access'],
        'Maintenance': ['View', 'Schedule', 'Update'],
        'User Management': ['View'],
        'Settings': ['View'],
        'Reports': ['View', 'Generate', 'Export'],
        'Tenant Management': []
      },
      'Manager': {
        'Dashboard': ['View', 'Export'],
        'Fleet Management': ['View', 'Create', 'Edit'],
        'Operations': ['View', 'Create', 'Edit'],
        'Tracking': ['View', 'Real-time Access'],
        'Maintenance': ['View', 'Schedule'],
        'User Management': ['View'],
        'Settings': ['View'],
        'Reports': ['View', 'Generate', 'Export'],
        'Tenant Management': []
      },
      'Driver': {
        'Dashboard': ['View'],
        'Fleet Management': ['View'],
        'Operations': ['View'],
        'Tracking': ['View'],
        'Maintenance': ['View'],
        'User Management': [],
        'Settings': [],
        'Reports': ['View'],
        'Tenant Management': []
      },
      'Dispatcher': {
        'Dashboard': ['View'],
        'Fleet Management': ['View', 'Edit'],
        'Operations': ['View', 'Create', 'Edit'],
        'Tracking': ['View', 'Real-time Access'],
        'Maintenance': ['View'],
        'User Management': [],
        'Settings': [],
        'Reports': ['View', 'Generate'],
        'Tenant Management': []
      }
    };
    
    setPermissionsConfig(config);
    setInitialPermissions(JSON.parse(JSON.stringify(config)));
  }, []);

  const togglePermission = (module, permission) => {
    // Don't allow editing of system roles for non-super admins
    if (currentUserRole !== 'SuperAdmin' && roles.find(r => r.name === selectedRole)?.isSystemRole) {
      return;
    }
    
    setPermissionsConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev)); // Deep clone
      const rolePerms = [...(newConfig[selectedRole][module] || [])];
      
      const permissionIndex = rolePerms.indexOf(permission);
      
      if (permissionIndex !== -1) {
        // Remove permission
        rolePerms.splice(permissionIndex, 1);
      } else {
        // Add permission
        rolePerms.push(permission);
      }
      
      newConfig[selectedRole][module] = rolePerms;
      return newConfig;
    });
  };

  const hasPermission = (module, permission) => {
    return permissionsConfig[selectedRole]?.[module]?.includes(permission) || false;
  };

  const handleSaveChanges = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setInitialPermissions(JSON.parse(JSON.stringify(permissionsConfig)));
      setSaveStatus('saved');
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    }, 1000);
  };

  const handleResetChanges = () => {
    setPermissionsConfig(JSON.parse(JSON.stringify(initialPermissions)));
  };

  const handleAddNewRole = () => {
    if (!newRoleName) return;
    
    setPermissionsConfig(prev => {
      const newConfig = { ...prev };
      // Initialize with no permissions
      newConfig[newRoleName] = permissions.reduce((acc, perm) => {
        acc[perm.module] = [];
        return acc;
      }, {});
      
      return newConfig;
    });
    
    setSelectedRole(newRoleName);
    setNewRoleName('');
    setShowAddRoleModal(false);
  };

  const handleDeleteRole = (roleName) => {
    setPermissionsConfig(prev => {
      const newConfig = { ...prev };
      delete newConfig[roleName];
      return newConfig;
    });
    
    // If we're deleting the currently selected role, switch to the first role
    if (roleName === selectedRole) {
      setSelectedRole(Object.keys(permissionsConfig)[0]);
    }
    
    setShowDeleteConfirm(null);
  };

  // Check if changes have been made
  const hasChanges = JSON.stringify(permissionsConfig) !== JSON.stringify(initialPermissions);

  // Filter permissions based on current user role
  const filteredPermissions = currentUserRole === 'SuperAdmin' 
    ? permissions 
    : permissions.filter(perm => perm.module !== 'Tenant Management');

  return (
    <div style={{ padding: '32px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
          Permission Matrix
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage user roles and permissions across system modules
        </p>
        
        {/* User Role Selector */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
          <button
            onClick={() => setCurrentUserRole('SuperAdmin')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: currentUserRole === 'SuperAdmin' ? '#3B82F6' : '#E5E7EB',
              color: currentUserRole === 'SuperAdmin' ? 'white' : '#4B5563',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <KeyIcon size={16} />
            Super Admin
          </button>
          <button
            onClick={() => setCurrentUserRole('TenantAdmin')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: currentUserRole === 'TenantAdmin' ? '#10B981' : '#E5E7EB',
              color: currentUserRole === 'TenantAdmin' ? 'white' : '#4B5563',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BuildingOfficeIcon size={16} />
            Tenant Admin
          </button>
        </div>
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
                Total Roles
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {Object.keys(permissionsConfig).length}
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
                Total Modules
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {filteredPermissions.length}
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
                Active Permissions
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                {Object.values(permissionsConfig[selectedRole] || {}).flat().length}
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
              <CheckCircleIcon size={24} color="white" />
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
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Select Role to Configure
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  minWidth: '200px'
                }}
              >
                {Object.keys(permissionsConfig).map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Add Role Button */}
            {currentUserRole === 'SuperAdmin' && (
              <button
                onClick={() => setShowAddRoleModal(true)}
                style={{
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-end',
                  height: '42px'
                }}
              >
                <PlusIcon size={16} />
                Add Role
              </button>
            )}
            
            {/* Delete Role Button */}
            {currentUserRole === 'SuperAdmin' && 
              !roles.find(r => r.name === selectedRole)?.isSystemRole && (
              <button
                onClick={() => setShowDeleteConfirm(selectedRole)}
                style={{
                  background: '#FEE2E2',
                  color: '#B91C1C',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-end',
                  height: '42px'
                }}
              >
                <TrashIcon size={16} />
                Delete Role
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges}
              style={{
                background: hasChanges 
                  ? 'linear-gradient(135deg, #10B981, #059669)' 
                  : '#E5E7EB',
                color: hasChanges ? 'white' : '#9CA3AF',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <SaveIcon size={16} />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleResetChanges}
              disabled={!hasChanges}
              style={{
                background: hasChanges ? '#F3F4F6' : '#E5E7EB',
                color: hasChanges ? '#374151' : '#9CA3AF',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: hasChanges ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshIcon size={16} />
              Reset
            </button>
          </div>
        </div>
        
        {saveStatus === 'saved' && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#D1FAE5',
            borderRadius: '8px',
            color: '#065F46',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircleIcon size={16} color="#065F46" />
            Permissions updated successfully
          </div>
        )}
      </div>

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
                  minWidth: '200px'
                }}>
                  Module
                </th>
                {filteredPermissions[0]?.permissions.map(permission => (
                  <th key={permission} style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    minWidth: '120px'
                  }}>
                    {permission}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPermissions.map((permModule, index) => (
                <tr key={permModule.module} style={{
                  borderBottom: index < filteredPermissions.length - 1 ? '1px solid #F3F4F6' : 'none'
                }}>
                  <td style={{ 
                    padding: '20px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1F2937'
                  }}>
                    {permModule.module}
                  </td>
                  {permModule.permissions.map(permission => {
                    const hasPerm = hasPermission(permModule.module, permission);
                    const isSystemRole = roles.find(r => r.name === selectedRole)?.isSystemRole;
                    const canEdit = currentUserRole === 'SuperAdmin' || !isSystemRole;
                    
                    return (
                      <td 
                        key={permission} 
                        style={{ 
                          padding: '20px 24px',
                          textAlign: 'center',
                          cursor: canEdit ? 'pointer' : 'default'
                        }}
                        onClick={() => canEdit && togglePermission(permModule.module, permission)}
                      >
                        {hasPerm ? (
                          <div style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: canEdit ? '#D1FAE5' : '#E5E7EB'
                          }}>
                            <CheckCircleIcon size={20} color={canEdit ? "#10B981" : "#9CA3AF"} />
                          </div>
                        ) : (
                          <div style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: canEdit ? '#FEE2E2' : '#E5E7EB'
                          }}>
                            <XIcon size={20} color={canEdit ? "#EF4444" : "#9CA3AF"} />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginTop: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
          Role Description: {selectedRole}
        </h3>
        <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
          {roles.find(r => r.name === selectedRole)?.description || (
            selectedRole === 'SuperAdmin' 
              ? 'Full system access with all permissions. Can create tenants and tenant admins.' 
              : selectedRole === 'TenantAdmin'
                ? 'Manages a specific tenant. Can create tenant users but cannot create other tenants or modify system settings.'
                : 'Custom role with configurable permissions.'
          )}
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRoleModal && (
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
            padding: '32px',
            width: '100%',
            maxWidth: '500px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowAddRoleModal(false)}
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
              Add New Role
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Role Name *
              </label>
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setShowAddRoleModal(false)}
                style={{
                  background: '#F3F4F6',
                  color: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewRole}
                disabled={!newRoleName}
                style={{
                  background: !newRoleName ? '#E5E7EB' : 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  color: !newRoleName ? '#9CA3AF' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: !newRoleName ? 'not-allowed' : 'pointer'
                }}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Role Confirmation */}
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
            padding: '32px',
            width: '100%',
            maxWidth: '500px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowDeleteConfirm(null)}
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
                Delete Role
              </h3>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.5' }}>
                Are you sure you want to delete the <strong>{showDeleteConfirm}</strong> role? 
                This action cannot be undone.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                style={{
                  background: '#F3F4F6',
                  color: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRole(showDeleteConfirm)}
                style={{
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionMatrix;