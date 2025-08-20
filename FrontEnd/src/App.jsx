import React, { useState } from 'react';
import { 
  TruckIcon, 
  GlobeIcon, 
  EyeIcon, 
  EyeOffIcon, 
  LogOutIcon,
  UserIcon,
  DashboardIcon,
  RouteIcon,
  PackageIcon,
  MapPinIcon,
  WrenchIcon,
  FuelIcon,
  SettingsIcon,
  UsersIcon,
  BuildingIcon,
  MessageSquareIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  // New icons for additional groups
  ChartBarIcon,
  CogIcon,
  LocationMarkerIcon,
  DocumentTextIcon,
  BellIcon,
  SupportIcon,
  DriverIcon,
  CalendarIcon,
  ClipboardListIcon
} from './components/icons/SVGIcons';
 
// Import all page components
import ModernDashboard from './pages/modern/Dashboard';
import FleetManagement from './pages/modern/FleetManagement';
//import Operations from './pages/modern/Operations';
import Tracking from './pages/modern/Tracking';
import Maintenance from './pages/modern/Maintenance';
import Workshops from './pages/modern/Workshops';
import FuelManagement from './pages/modern/FuelManagement';
import Settings from './pages/modern/Settings';
import UserManagement from './pages/modern/UserManagement';
import TenantManagement from './pages/modern/TenantManagement';
import SMSTemplates from './pages/modern/SMSTemplates';
import Drivers from './pages/modern/Drivers';
import Vehicles from './pages/modern/Vehicles';
import Shipments from './pages/modern/Shipments';
import Trips from './pages/modern/Trips';
import RouteOptimize from './pages/modern/RouteOptimize';
import UserProfile from './pages/modern/UserProfile';
import Integrations from './pages/modern/Integrations';
import Attachments from './pages/modern/Attachments';
import GlobalNotifications from './pages/modern/GlobalNotifications';
import UsageDashboard from './pages/modern/UsageDashboard';
import PermissionMatrix from './pages/modern/PermissionMatrix';
import NotificationsCenter from './pages/modern/NotificationsCenter';
import AuditLogs from './pages/modern/AuditLogs';
import ErrorLogs from './pages/modern/ErrorLogs';
import SupportTickets from './pages/modern/SupportTickets';
// Import additional pages for new groups
import VehiclesMake from './pages/modern/VehiclesMake';
import VehiclesModel from './pages/modern/VehiclesModel';
import VehiclesType from './pages/modern/VehiclesType';
import MaintenancesType from './pages/modern/MaintenancesType';
import FuelsType from './pages/modern/FuelsType';
import UnitsMeasure from './pages/modern/UnitsMeasure';
import GeoZones from './pages/modern/GeoZones';
import SLAsProfiles from './pages/modern/SLAsProfiles';
import Countries from './pages/modern/Countries';
import Regions from './pages/modern/Regions';
import Cities from './pages/modern/Cities';
import Customers from './pages/modern/Customers';
import NotificationSettings from './pages/modern/NotificationSettings';
import GeneralSettings from './pages/modern/GeneralSettings';
import SecuritySettings from './pages/modern/SecuritySettings';
import AppearanceSettings from './pages/modern/AppearanceSettings';

const CompleteApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  
  const [expandedGroups, setExpandedGroups] = useState({
    monitoring: false,
    //operations: false,
    fleet: false,
    config: false,
    location: false,
    admin: false,
    notifications: false,
    settings: false,
    support: false
  });

  const isRTL = language === 'ar';
  const fontFamily = isRTL 
    ? '"Noto Sans Arabic", "Tajawal", sans-serif' 
    : '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const translations = {
    en: {
      title: 'OptiRoute360',
      subtitle: 'Enterprise Fleet & Route Optimization Platform',
      welcomeBack: 'Welcome Back',
      signInMessage: 'Sign in to your account to continue',
      username: 'Username',
      password: 'Password',
      login: 'Sign In',
      loading: 'Signing in...',
      logout: 'Sign Out',
      dashboard: 'Dashboard',
      fleet: 'Fleet Management',
      //operations: 'Operations',
      tracking: 'Tracking',
      maintenance: 'Maintenance',
      fuel: 'Fuel Management',
      settings: 'Settings',
      users: 'User Management',
      tenants: 'Tenant Management',
      smsTemplates: 'SMS Templates',
      drivers: 'Drivers',
      vehicles: 'Vehicles',
      shipments: 'Shipments',
      trips: 'Trips',
      routeOptimize: 'Route Optimization',
      liveTracking: 'Live Tracking',
      historicalTracking: 'Historical Tracking',
      workshops: 'Workshops',
      maintenanceSchedule: 'Maintenance Schedule',
      invalidCredentials: 'Invalid credentials. Please try again.',
      // New translations for groups
      monitoringAnalytics: 'Monitoring & Analytics',
      coreOperations: 'Core Operations',
      fleetManagement: 'Fleet Management',
      configSetup: 'Configuration & Setup',
      locationGeo: 'Location & Geography',
      administration: 'Administration',
      notificationsComms: 'Notifications & Comms',
      systemSettings: 'System Settings',
      support: 'Support',
      // New page translations
      usageDashboard: 'Usage Dashboard',
      permissionMatrix: 'Permission Matrix',
      globalNotifications: 'Global Notifications',
      notificationsCenter: 'Notifications Center',
      auditLogs: 'Audit Logs',
      errorLogs: 'Error Logs',
      supportTickets: 'Support Tickets',
      userProfile: 'User Profile',
      integrations: 'Integrations',
      attachments: 'Attachments',
      vehiclesMake: 'Vehicles Make',
      vehiclesModel: 'Vehicles Model',
      vehiclesType: 'Vehicles Type',
      maintenancesType: 'Maintenance Types',
      fuelsType: 'Fuel Types',
      unitsMeasure: 'Units of Measure',
      geoZones: 'Geo Zones',
      slasProfiles: 'SLA Profiles',
      countries: 'Countries',
      regions: 'Regions',
      cities: 'Cities',
      customers: 'Customers',
      notificationSettings: 'Notification Settings',
      generalSettings: 'General Settings',
      securitySettings: 'Security Settings',
      appearanceSettings: 'Appearance Settings'
    },
    ar: {
      title: 'أوبتي روت 360',
      subtitle: 'منصة تحسين الأسطول والمسارات للمؤسسات',
      welcomeBack: 'مرحباً بعودتك',
      signInMessage: 'سجل دخولك إلى حسابك للمتابعة',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      loading: 'جاري تسجيل الدخول...',
      logout: 'تسجيل الخروج',
      dashboard: 'لوحة التحكم',
      fleet: 'إدارة الأسطول',
      //operations: 'العمليات',
      tracking: 'التتبع',
      maintenance: 'الصيانة',
      fuel: 'إدارة الوقود',
      settings: 'الإعدادات',
      users: 'إدارة المستخدمين',
      tenants: 'إدارة المستأجرين',
      smsTemplates: 'قوالب الرسائل',
      drivers: 'السائقين',
      vehicles: 'المركبات',
      shipments: 'الشحنات',
      trips: 'الرحلات',
      routeOptimize: 'تحسين المسار',
      liveTracking: 'التتبع المباشر',
      historicalTracking: 'التتبع التاريخي',
      workshops: 'الورش',
      maintenanceSchedule: 'جدولة الصيانة',
      invalidCredentials: 'بيانات غير صحيحة. يرجى المحاولة مرة أخرى.',
      // New translations for groups
      monitoringAnalytics: 'المراقبة والتحليلات',
      coreOperations: 'العمليات الأساسية',
      fleetManagement: 'إدارة الأسطول',
      configSetup: 'الإعدادات والتكوين',
      locationGeo: 'الموقع والجغرافيا',
      administration: 'الإدارة',
      notificationsComms: 'الإشعارات والاتصالات',
      systemSettings: 'إعدادات النظام',
      support: 'الدعم',
      // New page translations
      usageDashboard: 'لوحة استخدام البيانات',
      permissionMatrix: 'مصفوفة الصلاحيات',
      globalNotifications: 'الإشعارات العامة',
      notificationsCenter: 'مركز الإشعارات',
      auditLogs: 'سجلات التدقيق',
      errorLogs: 'سجلات الأخطاء',
      supportTickets: 'تذاكر الدعم',
      userProfile: 'ملف المستخدم',
      integrations: 'التكاملات',
      attachments: 'المرفقات',
      vehiclesMake: 'ماركات المركبات',
      vehiclesModel: 'نماذج المركبات',
      vehiclesType: 'أنواع المركبات',
      maintenancesType: 'أنواع الصيانة',
      fuelsType: 'أنواع الوقود',
      unitsMeasure: 'وحدات القياس',
      geoZones: 'المناطق الجغرافية',
      slasProfiles: 'ملفات SLA',
      countries: 'الدول',
      regions: 'المناطق',
      cities: 'المدن',
      customers: 'العملاء',
      notificationSettings: 'إعدادات الإشعارات',
      generalSettings: 'الإعدادات العامة',
      securitySettings: 'إعدادات الأمان',
      appearanceSettings: 'إعدادات المظهر'
    }
  };

  const t = (key) => translations[language][key] || key;

  // Base menu items visible to all roles
  const baseMenuItems = [
    // Monitoring & Analytics
    {
      id: 'monitoring',
      label: t('monitoringAnalytics'),
      icon: ChartBarIcon,
      color: '#3B82F6',
      subItems: [
        { id: 'dashboard', label: t('dashboard'), icon: DashboardIcon },
        { id: 'usage-dashboard', label: t('usageDashboard'), icon: DashboardIcon },
      ]
    },
    
    // Core Operations
    {
      id: 'operations',
      label: t('coreOperations'),
      icon: RouteIcon,
      color: '#F59E0B',
      subItems: [
       // { id: 'operations', label: t('operations'), icon: RouteIcon },
        { id: 'shipments', label: t('shipments'), icon: PackageIcon },
        { id: 'trips', label: t('trips'), icon: CalendarIcon },
        { id: 'route-optimize', label: t('routeOptimize'), icon: MapPinIcon },
        { id: 'tracking', label: t('tracking'), icon: MapPinIcon },
      ]
    },
    
    // Fleet Management
    {
      id: 'fleet',
      label: t('fleetManagement'),
      icon: TruckIcon,
      color: '#10B981',
      subItems: [
        { id: 'fleet', label: t('fleet'), icon: TruckIcon },
        { id: 'vehicles', label: t('vehicles'), icon: TruckIcon },
        { id: 'drivers', label: t('drivers'), icon: DriverIcon },
        { id: 'workshops', label: t('workshops'), icon: BuildingIcon },
        { id: 'maintenance', label: t('maintenance'), icon: WrenchIcon },
        { id: 'fuel', label: t('fuel'), icon: FuelIcon },
      ]
    },
    
    // Configuration & Setup
    {
      id: 'config',
      label: t('configSetup'),
      icon: CogIcon,
      color: '#8B5CF6',
      subItems: [
        { id: 'vehicles-make', label: t('vehiclesMake'), icon: TruckIcon },
        { id: 'vehicles-model', label: t('vehiclesModel'), icon: TruckIcon },
        { id: 'vehicles-type', label: t('vehiclesType'), icon: TruckIcon },
        { id: 'maintenances-type', label: t('maintenancesType'), icon: WrenchIcon },
        { id: 'fuels-type', label: t('fuelsType'), icon: FuelIcon },
        { id: 'units-measure', label: t('unitsMeasure'), icon: ClipboardListIcon },
        { id: 'geo-zones', label: t('geoZones'), icon: MapPinIcon },
        { id: 'slas-profiles', label: t('slasProfiles'), icon: DocumentTextIcon },
      ]
    },
    
    // Location & Geography
    {
      id: 'location',
      label: t('locationGeo'),
      icon: LocationMarkerIcon,
      color: '#EF4444',
      subItems: [
        { id: 'countries', label: t('countries'), icon: MapPinIcon },
        { id: 'regions', label: t('regions'), icon: MapPinIcon },
        { id: 'cities', label: t('cities'), icon: MapPinIcon },
      ]
    },
  ];

  // Admin-specific menu items
  const adminMenuItems = [
    // Administration
    {
      id: 'administration',
      label: t('administration'),
      icon: UsersIcon,
      color: '#EC4899',
      subItems: [
        { id: 'users', label: t('users'), icon: UsersIcon },
        { id: 'tenants', label: t('tenants'), icon: BuildingIcon },
        { id: 'permission-matrix', label: t('permissionMatrix'), icon: SettingsIcon },
        { id: 'customers', label: t('customers'), icon: UserIcon },
      ]
    },
    
    // Notifications & Comms
    {
      id: 'notifications',
      label: t('notificationsComms'),
      icon: BellIcon,
      color: '#84CC16',
      subItems: [
        { id: 'notifications-center', label: t('notificationsCenter'), icon: BellIcon },
        { id: 'global-notifications', label: t('globalNotifications'), icon: BellIcon },
        { id: 'sms-templates', label: t('smsTemplates'), icon: MessageSquareIcon },
        { id: 'notification-settings', label: t('notificationSettings'), icon: SettingsIcon },
      ]
    },
    
    // System Settings
    {
      id: 'system-settings',
      label: t('systemSettings'),
      icon: SettingsIcon,
      color: '#6B7280',
      subItems: [
        { id: 'general-settings', label: t('generalSettings'), icon: SettingsIcon },
        { id: 'security-settings', label: t('securitySettings'), icon: SettingsIcon },
        { id: 'appearance-settings', label: t('appearanceSettings'), icon: SettingsIcon },
        { id: 'integrations', label: t('integrations'), icon: SettingsIcon },
        { id: 'attachments', label: t('attachments'), icon: DocumentTextIcon },
      ]
    },
    
    // Support
    {
      id: 'support',
      label: t('support'),
      icon: SupportIcon,
      color: '#7C3AED',
      subItems: [
        { id: 'support-tickets', label: t('supportTickets'), icon: MessageSquareIcon },
        { id: 'audit-logs', label: t('auditLogs'), icon: EyeIcon },
        { id: 'error-logs', label: t('errorLogs'), icon: XIcon },
        { id: 'user-profile', label: t('userProfile'), icon: UserIcon },
      ]
    }
  ];

  // Combine menu items based on user role
  const menuItems = userRole === 'admin' 
    ? [...baseMenuItems, ...adminMenuItems] 
    : baseMenuItems;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const validCredentials = {
      'admin': 'admin123',
      'manager': 'manager123',
      'dispatcher': 'dispatcher123',
      'driver': 'driver123'
    };

    if (validCredentials[username] === password) {
      setIsLoggedIn(true);
      setUserRole(username);
    } else {
      setError(t('invalidCredentials'));
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
    setCurrentPage('dashboard');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <ModernDashboard />;
      case 'drivers': return <Drivers />;
      case 'vehicles': return <Vehicles />;
      case 'fleet': return <FleetManagement activeTab={currentPage} />;
      case 'shipments': return <Shipments />;
      case 'trips': return <Trips />;
      case 'route-optimize': return <RouteOptimize />;
    //  case 'operations': return <Operations activeTab={currentPage} />;
      case 'live-tracking':
      case 'historical-tracking':
      case 'tracking': return <Tracking activeTab={currentPage} />;
      case 'workshops': return <Workshops />;
      case 'maintenance-schedule':
      case 'maintenance': return <Maintenance activeTab={currentPage} />;
      case 'fuel': return <FuelManagement />;
      case 'settings': return <Settings />;
      case 'users': return <UserManagement />;
      case 'tenants': return <TenantManagement />;
      case 'sms-templates': return <SMSTemplates />;
      case 'user-profile': return <UserProfile />;
      case 'integrations': return <Integrations />;
      case 'attachments': return <Attachments />;
      case 'global-notifications': return <GlobalNotifications />;
      case 'usage-dashboard': return <UsageDashboard />;
      case 'audit-logs': return <AuditLogs />;
      case 'error-logs': return <ErrorLogs />;
      case 'support-tickets': return <SupportTickets />;
      case 'notifications-center': return <NotificationsCenter />;
      case 'permission-matrix': return <PermissionMatrix />;
      // New pages
      case 'vehicles-make': return <VehiclesMake />;
      case 'vehicles-model': return <VehiclesModel />;
      case 'vehicles-type': return <VehiclesType />;
      case 'maintenances-type': return <MaintenancesType />;
      case 'fuels-type': return <FuelsType />;
      case 'units-measure': return <UnitsMeasure />;
      case 'geo-zones': return <GeoZones />;
      case 'slas-profiles': return <SLAsProfiles />;
      case 'countries': return <Countries />;
      case 'regions': return <Regions />;
      case 'cities': return <Cities />;
      case 'customers': return <Customers />;
      case 'notification-settings': return <NotificationSettings />;
      case 'general-settings': return <GeneralSettings />;
      case 'security-settings': return <SecuritySettings />;
      case 'appearance-settings': return <AppearanceSettings />;
      default: return <ModernDashboard />;
    }
  };

  const getCurrentPageTitle = () => {
    // First try to find in top-level items
    const currentItem = menuItems.find(item => item.id === currentPage);
    if (currentItem) return currentItem.label;
    
    // Then search in subItems
    for (const group of menuItems) {
      if (group.subItems) {
        const subItem = group.subItems.find(sub => sub.id === currentPage);
        if (subItem) return subItem.label;
      }
    }
    
    return t('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: isRTL ? 'rtl' : 'ltr',
        fontFamily: fontFamily
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          padding: '48px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          margin: '20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}>
              <TruckIcon size={40} color="white" />
            </div>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: isRTL ? '26px' : '28px', 
              fontWeight: '700',
              color: '#1F2937',
              letterSpacing: isRTL ? 'normal' : '-0.5px'
            }}>
              {t('title')}
            </h1>
            <p style={{ 
              margin: '0 0 32px 0', 
              color: '#6B7280',
              fontSize: '14px'
            }}>
              {t('subtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                background: '#FEE2E2',
                color: '#DC2626',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '24px',
                fontSize: '14px',
                border: '1px solid #FECACA'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#374151',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {t('username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('username')}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: isRTL ? 'right' : 'left',
                  fontFamily: fontFamily
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#374151',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {t('password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('password')}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: isRTL ? '16px' : '48px',
                    paddingLeft: isRTL ? '48px' : '16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                    direction: isRTL ? 'rtl' : 'ltr',
                    textAlign: isRTL ? 'right' : 'left',
                    fontFamily: fontFamily
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: isRTL ? 'auto' : '12px',
                    left: isRTL ? '12px' : 'auto',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '14px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                fontFamily: fontFamily
              }}
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: '1px solid #E5E7EB',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                fontFamily: fontFamily
              }}
            >
              <GlobeIcon size={16} />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          <div style={{ marginTop: '24px', fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
            Demo: admin/admin123, manager/manager123, dispatcher/dispatcher123, driver/driver123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      direction: isRTL ? 'rtl' : 'ltr', 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB',
      fontFamily: fontFamily
    }}>
      {/* Modern Sidebar */}
      <div style={{
        position: 'fixed',
        left: isRTL ? 'auto' : 0,
        right: isRTL ? 0 : 'auto',
        top: 0,
        width: sidebarCollapsed ? '80px' : '280px',
        height: '100vh',
        background: 'white',
        borderRight: isRTL ? 'none' : '1px solid #E5E7EB',
        borderLeft: isRTL ? '1px solid #E5E7EB' : 'none',
        transition: 'width 0.3s ease',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '8px',
                borderRadius: '12px'
              }}>
                <TruckIcon size={24} color="white" />
              </div>
              <div>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#1F2937',
                  letterSpacing: isRTL ? 'normal' : '-0.3px'
                }}>
                  {t('title')}
                </h2>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: '#6B7280',
                  fontFamily: fontFamily
                }}>
                  Fleet Management
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: '#6B7280'
            }}
          >
            <MenuIcon size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <div style={{ 
          padding: '16px 0', 
          height: 'calc(100vh - 160px)', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {menuItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleGroup(item.id);
                  } else {
                    setCurrentPage(item.id);
                  }
                }}
                style={{
                  width: '100%',
                  padding: sidebarCollapsed ? '12px' : '12px 24px',
                  background: currentPage === item.id ? '#F3F4F6' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: currentPage === item.id ? item.color : '#6B7280',
                  fontSize: isRTL ? '15px' : '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  fontFamily: fontFamily,
                  letterSpacing: isRTL ? 'normal' : '0.2px',
                  marginBottom: '4px'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.background = '#F9FAFB';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <item.icon size={20} color={currentPage === item.id ? item.color : '#6B7280'} />
                {!sidebarCollapsed && (
                  <>
                    <span style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                      {item.label}
                    </span>
                    {item.subItems && (
                      <ChevronDownIcon 
                        size={16} 
                        style={{ 
                          transform: expandedGroups[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          color: '#9CA3AF'
                        }} 
                      />
                    )}
                  </>
                )}
              </button>
              
              {/* Sub-items */}
              {item.subItems && !sidebarCollapsed && expandedGroups[item.id] && (
                <div style={isRTL ? { paddingRight: '16px' } : { paddingLeft: '16px' }}>
                  <div style={{
                    borderLeft: isRTL ? 'none' : `2px solid ${item.color}20`,
                    borderRight: isRTL ? `2px solid ${item.color}20` : 'none',
                    padding: isRTL ? '0 16px 0 0' : '0 0 0 16px',
                    margin: isRTL ? '0 0 8px 16px' : '0 16px 8px 0',
                    borderRadius: '4px'
                  }}>
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setCurrentPage(subItem.id)}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          background: currentPage === subItem.id ? `${item.color}10` : 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: currentPage === subItem.id ? item.color : '#6B7280',
                          fontSize: isRTL ? '14px' : '13px',
                          fontWeight: '400',
                          transition: 'all 0.2s',
                          fontFamily: fontFamily,
                          marginBottom: '2px'
                        }}
                        onMouseOver={(e) => {
                          if (currentPage !== subItem.id) {
                            e.target.style.background = '#F9FAFB';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (currentPage !== subItem.id) {
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        <subItem.icon size={16} color={currentPage === subItem.id ? item.color : '#6B7280'} />
                        <span>{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 24px',
          borderTop: '1px solid #E5E7EB',
          background: 'white'
        }}>
          {!sidebarCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserIcon size={16} color="white" />
                </div>
                <div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#1F2937',
                    fontFamily: fontFamily
                  }}>
                    {username}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    color: '#6B7280',
                    fontFamily: fontFamily
                  }}>
                    {userRole}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  color: '#6B7280'
                }}
              >
                <LogOutIcon size={16} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  color: '#6B7280'
                }}
              >
                <LogOutIcon size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? '80px' : '280px'),
        marginRight: isRTL ? (sidebarCollapsed ? '80px' : '280px') : 0,
        transition: 'margin 0.3s ease'
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'white',
          padding: '16px 32px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#1F2937',
              fontFamily: fontFamily
            }}>
              {getCurrentPageTitle()}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: '1px solid #E5E7EB',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: fontFamily
              }}
            >
              <GlobeIcon size={16} />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '32px' }}>
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default CompleteApp;