import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    fleet: 'Fleet',
    drivers: 'Drivers',
    vehicles: 'Vehicles',
    operations: 'Operations',
    shipments: 'Shipments',
    trips: 'Trips',
    routeOptimize: 'Route Optimization',
    tracking: 'Tracking',
    live: 'Live',
    historical: 'Historical',
    maintenance: 'Maintenance',
    workshops: 'Workshops',
    fuel: 'Fuel',
    settings: 'Settings',
    integrations: 'Integrations',
    tenants: 'Tenants',
    users: 'Users',
    smsTemplates: 'SMS Templates',
    
    // Common
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    role: 'Role',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    update: 'Update',
    search: 'Search',
    filter: 'Filter',
    actions: 'Actions',
    loading: 'Loading...',
    noData: 'No data available',
    profile: 'Profile',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    totalVehicles: 'Total Vehicles',
    activeTrips: 'Active Trips',
    pendingShipments: 'Pending Shipments',
    maintenanceRequests: 'Maintenance Requests',
    
    // Fleet
    driverCode: 'Driver Code',
    licenseNumber: 'License Number',
    licenseExpiry: 'License Expiry',
    emergencyContact: 'Emergency Contact',
    vehicleCode: 'Vehicle Code',
    plateNumber: 'Plate Number',
    make: 'Make',
    model: 'Model',
    year: 'Year',
    vehicleType: 'Vehicle Type',
    capacity: 'Capacity',
    fuelType: 'Fuel Type',
    
    // Operations
    shipmentCode: 'Shipment Code',
    customerName: 'Customer Name',
    customerPhone: 'Customer Phone',
    pickupAddress: 'Pickup Address',
    deliveryAddress: 'Delivery Address',
    weight: 'Weight',
    volume: 'Volume',
    priority: 'Priority',
    scheduledDate: 'Scheduled Date',
    timeWindow: 'Time Window',
    tripCode: 'Trip Code',
    plannedDate: 'Planned Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    
    // Maintenance
    workshopName: 'Workshop Name',
    contactPerson: 'Contact Person',
    address: 'Address',
    specialization: 'Specialization',
    requestType: 'Request Type',
    description: 'Description',
    cost: 'Cost',
    
    // Fuel
    litres: 'Litres',
    pricePerLitre: 'Price per Litre',
    location: 'Location',
    odometer: 'Odometer',
    fuelDate: 'Fuel Date',
    
    // Messages
    loginSuccess: 'Login successful',
    loginFailed: 'Login failed',
    logoutSuccess: 'Logged out successfully',
    saveSuccess: 'Saved successfully',
    updateSuccess: 'Updated successfully',
    deleteSuccess: 'Deleted successfully',
    createSuccess: 'Created successfully',
    errorOccurred: 'An error occurred',
    confirmDelete: 'Are you sure you want to delete this item?',
    
    // Roles
    superAdmin: 'Super Admin',
    admin: 'Admin',
    manager: 'Manager',
    dispatcher: 'Dispatcher',
    driver: 'Driver',
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    fleet: 'الأسطول',
    drivers: 'السائقون',
    vehicles: 'المركبات',
    operations: 'العمليات',
    shipments: 'الشحنات',
    trips: 'الرحلات',
    routeOptimize: 'تحسين المسار',
    tracking: 'التتبع',
    live: 'مباشر',
    historical: 'تاريخي',
    maintenance: 'الصيانة',
    workshops: 'الورش',
    fuel: 'الوقود',
    settings: 'الإعدادات',
    integrations: 'التكاملات',
    tenants: 'المستأجرون',
    users: 'المستخدمون',
    smsTemplates: 'قوالب الرسائل',
    
    // Common
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    email: 'البريد الإلكتروني',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phoneNumber: 'رقم الهاتف',
    role: 'الدور',
    status: 'الحالة',
    active: 'نشط',
    inactive: 'غير نشط',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    create: 'إنشاء',
    update: 'تحديث',
    search: 'بحث',
    filter: 'تصفية',
    actions: 'الإجراءات',
    loading: 'جاري التحميل...',
    noData: 'لا توجد بيانات متاحة',
    profile: 'الملف الشخصي',
    
    // Dashboard
    welcomeBack: 'مرحباً بعودتك',
    totalVehicles: 'إجمالي المركبات',
    activeTrips: 'الرحلات النشطة',
    pendingShipments: 'الشحنات المعلقة',
    maintenanceRequests: 'طلبات الصيانة',
    
    // Fleet
    driverCode: 'رمز السائق',
    licenseNumber: 'رقم الرخصة',
    licenseExpiry: 'انتهاء الرخصة',
    emergencyContact: 'جهة الاتصال الطارئة',
    vehicleCode: 'رمز المركبة',
    plateNumber: 'رقم اللوحة',
    make: 'الصانع',
    model: 'الطراز',
    year: 'السنة',
    vehicleType: 'نوع المركبة',
    capacity: 'السعة',
    fuelType: 'نوع الوقود',
    
    // Operations
    shipmentCode: 'رمز الشحنة',
    customerName: 'اسم العميل',
    customerPhone: 'هاتف العميل',
    pickupAddress: 'عنوان الاستلام',
    deliveryAddress: 'عنوان التسليم',
    weight: 'الوزن',
    volume: 'الحجم',
    priority: 'الأولوية',
    scheduledDate: 'التاريخ المجدول',
    timeWindow: 'النافذة الزمنية',
    tripCode: 'رمز الرحلة',
    plannedDate: 'التاريخ المخطط',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    
    // Maintenance
    workshopName: 'اسم الورشة',
    contactPerson: 'الشخص المسؤول',
    address: 'العنوان',
    specialization: 'التخصص',
    requestType: 'نوع الطلب',
    description: 'الوصف',
    cost: 'التكلفة',
    
    // Fuel
    litres: 'اللترات',
    pricePerLitre: 'السعر لكل لتر',
    location: 'الموقع',
    odometer: 'عداد المسافة',
    fuelDate: 'تاريخ التزود بالوقود',
    
    // Messages
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    loginFailed: 'فشل تسجيل الدخول',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    saveSuccess: 'تم الحفظ بنجاح',
    updateSuccess: 'تم التحديث بنجاح',
    deleteSuccess: 'تم الحذف بنجاح',
    createSuccess: 'تم الإنشاء بنجاح',
    errorOccurred: 'حدث خطأ',
    confirmDelete: 'هل أنت متأكد من حذف هذا العنصر؟',
    
    // Roles
    superAdmin: 'مدير عام',
    admin: 'مدير',
    manager: 'مدير قسم',
    dispatcher: 'موزع',
    driver: 'سائق',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [isRTL, setIsRTL] = useState(language === 'ar');

  useEffect(() => {
    localStorage.setItem('language', language);
    setIsRTL(language === 'ar');
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (newLanguage !== language && translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    isRTL,
    t,
    changeLanguage,
    availableLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

