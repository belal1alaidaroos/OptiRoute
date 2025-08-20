import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Car, 
  Package, 
  Route, 
  MapPin, 
  History, 
  Wrench, 
  Building, 
  Fuel, 
  Settings, 
  LogOut,
  Globe,
  UserCog,
  Building2,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout, hasPermission } = useAuth();
  const { t, language, changeLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  const menuItems = [
    {
      title: t('dashboard'),
      icon: LayoutDashboard,
      path: '/dashboard',
      permission: 'Driver'
    },
    {
      title: t('fleet'),
      icon: Truck,
      permission: 'Dispatcher',
      children: [
        { title: t('drivers'), icon: Users, path: '/fleet/drivers', permission: 'Dispatcher' },
        { title: t('vehicles'), icon: Car, path: '/fleet/vehicles', permission: 'Dispatcher' }
      ]
    },
    {
      title: t('operations'),
      icon: Package,
      permission: 'Dispatcher',
      children: [
        { title: t('shipments'), icon: Package, path: '/operations/shipments', permission: 'Dispatcher' },
        { title: t('trips'), icon: Route, path: '/operations/trips', permission: 'Dispatcher' },
        { title: t('routeOptimize'), icon: Route, path: '/operations/optimize', permission: 'Dispatcher' }
      ]
    },
    {
      title: t('tracking'),
      icon: MapPin,
      permission: 'Dispatcher',
      children: [
        { title: t('live'), icon: MapPin, path: '/tracking/live', permission: 'Dispatcher' },
        { title: t('historical'), icon: History, path: '/tracking/historical', permission: 'Dispatcher' }
      ]
    },
    {
      title: t('maintenance'),
      icon: Wrench,
      permission: 'Driver',
      children: [
        { title: t('workshops'), icon: Building, path: '/maintenance/workshops', permission: 'Manager' },
        { title: t('maintenance'), icon: Wrench, path: '/maintenance/requests', permission: 'Driver' }
      ]
    },
    {
      title: t('fuel'),
      icon: Fuel,
      path: '/fuel',
      permission: 'Driver'
    }
  ];

  const adminMenuItems = [
    {
      title: t('settings'),
      icon: Settings,
      permission: 'Admin',
      children: [
        { title: t('integrations'), icon: Settings, path: '/settings/integrations', permission: 'Admin' },
        { title: t('smsTemplates'), icon: MessageSquare, path: '/settings/sms-templates', permission: 'Admin' }
      ]
    },
    {
      title: t('users'),
      icon: UserCog,
      path: '/users',
      permission: 'Admin'
    }
  ];

  const superAdminMenuItems = [
    {
      title: t('tenants'),
      icon: Building2,
      path: '/tenants',
      permission: 'SuperAdmin'
    }
  ];

  const renderMenuItem = (item, index) => {
    if (!hasPermission(item.permission)) return null;

    if (item.children) {
      return (
        <div key={index} className="space-y-1">
          <div className={`flex items-center px-3 py-2 text-sm font-medium text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <item.icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            {!collapsed && item.title}
          </div>
          {!collapsed && (
            <div className={`space-y-1 ${isRTL ? 'pr-6' : 'pl-6'}`}>
              {item.children.map((child, childIndex) => (
                hasPermission(child.permission) && (
                  <NavLink
                    key={childIndex}
                    to={child.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      } ${isRTL ? 'flex-row-reverse' : ''}`
                    }
                  >
                    <child.icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    {child.title}
                  </NavLink>
                )
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={index}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          } ${isRTL ? 'flex-row-reverse' : ''}`
        }
      >
        <item.icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        {!collapsed && item.title}
      </NavLink>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="bg-blue-600 p-2 rounded-lg">
            <Truck className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className={`${isRTL ? 'mr-3' : 'ml-3'}`}>
              <h1 className="text-lg font-bold text-gray-900">OptiRoute360</h1>
              <p className="text-xs text-gray-500">{user?.tenant?.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map(renderMenuItem)}
          
          {hasPermission('Admin') && (
            <>
              <Separator className="my-4" />
              {adminMenuItems.map(renderMenuItem)}
            </>
          )}
          
          {hasPermission('SuperAdmin') && (
            <>
              <Separator className="my-4" />
              {superAdminMenuItems.map(renderMenuItem)}
            </>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {!collapsed && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {!collapsed && t('logout')}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

