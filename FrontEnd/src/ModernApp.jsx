import React, { useState } from 'react';
import ModernDashboard from './pages/ModernDashboard';
import { 
  TruckIcon, 
  GlobeIcon, 
  EyeIcon, 
  EyeOffIcon, 
  LogOutIcon,
  UserIcon,
  ShieldIcon
} from './components/icons/SVGIcons';

const ModernApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);

  const isRTL = language === 'ar';

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
      welcome: 'Welcome',
      logout: 'Sign Out',
      demoCredentials: 'Demo Credentials:',
      superAdmin: 'Super Admin',
      manager: 'Manager',
      dispatcher: 'Dispatcher',
      driver: 'Driver',
      invalidCredentials: 'Invalid credentials. Please try admin/admin123',
      secureLogin: 'Secure Login',
      enterpriseGrade: 'Enterprise-grade security'
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
      welcome: 'مرحباً',
      logout: 'تسجيل الخروج',
      demoCredentials: 'بيانات تجريبية:',
      superAdmin: 'مدير عام',
      manager: 'مدير',
      dispatcher: 'موزع',
      driver: 'سائق',
      invalidCredentials: 'بيانات غير صحيحة. جرب admin/admin123',
      secureLogin: 'تسجيل دخول آمن',
      enterpriseGrade: 'أمان على مستوى المؤسسات'
    }
  };

  const t = (key) => translations[language][key] || key;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple credential check
    const validCredentials = {
      'admin': 'admin123',
      'manager': 'manager123',
      'dispatcher': 'dispatcher123',
      'driver': 'driver123'
    };

    if (validCredentials[username] === password) {
      setIsLoggedIn(true);
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
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Additional SVG Icons for modern design
  const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (isLoggedIn) {
    return (
      <div style={{ direction: isRTL ? 'rtl' : 'ltr', minHeight: '100vh', backgroundColor: '#fafbfc' }}>
        {/* Modern Header */}
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e1e5e9',
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              backgroundColor: '#0066cc',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TruckIcon size={24} color="white" />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: '700',
                color: '#1a1a1a',
                letterSpacing: '-0.025em'
              }}>
                {t('title')}
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Fleet Management
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={toggleLanguage}
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e1e5e9',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#374151',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f1f3f4';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
            >
              <GlobeIcon size={14} color="#6b7280" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '8px 16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e1e5e9'
            }}>
              <div style={{
                backgroundColor: '#0066cc',
                padding: '6px',
                borderRadius: '50%'
              }}>
                <UserIcon size={14} color="white" />
              </div>
              <div>
                <p style={{ 
                  margin: 0, 
                  fontSize: '13px', 
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}>
                  {username}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '11px', 
                  color: '#6b7280'
                }}>
                  Administrator
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#ffffff',
                color: '#dc2626',
                border: '1px solid #fecaca',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fef2f2';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
              }}
            >
              <LogOutIcon size={14} color="#dc2626" />
              {t('logout')}
            </button>
          </div>
        </div>
        
        <div style={{ 
          height: 'calc(100vh - 64px)', 
          overflow: 'hidden'
        }}>
          <ModernDashboard />
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fafbfc',
      display: 'flex',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        backgroundColor: '#0066cc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '64px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />
        
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: '24px',
            borderRadius: '20px',
            marginBottom: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            <TruckIcon size={64} color="white" />
          </div>
          
          <h1 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '42px', 
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.025em',
            lineHeight: '1.1'
          }}>
            {t('title')}
          </h1>
          
          <p style={{ 
            margin: '0 0 32px 0', 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '500',
            lineHeight: '1.5'
          }}>
            {t('subtitle')}
          </p>
          
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <ShieldIcon />
              <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                {t('enterpriseGrade')}
              </span>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '13px', 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.4'
            }}>
              Advanced security protocols and enterprise-level data protection for your fleet operations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Language Toggle */}
          <div style={{ 
            display: 'flex', 
            justifyContent: isRTL ? 'flex-start' : 'flex-end',
            marginBottom: '32px'
          }}>
            <button
              onClick={toggleLanguage}
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e1e5e9',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#374151',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f1f3f4';
                e.target.style.borderColor = '#d1d5db';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.borderColor = '#e1e5e9';
              }}
            >
              <GlobeIcon size={16} color="#6b7280" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          {/* Login Header */}
          <div style={{ marginBottom: '40px', textAlign: isRTL ? 'right' : 'left' }}>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '28px', 
              fontWeight: '700',
              color: '#1a1a1a',
              letterSpacing: '-0.025em'
            }}>
              {t('welcomeBack')}
            </h2>
            <p style={{ 
              margin: 0, 
              fontSize: '16px', 
              color: '#6b7280',
              fontWeight: '500'
            }}>
              {t('signInMessage')}
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '14px',
                fontWeight: '500',
                textAlign: isRTL ? 'right' : 'left'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#374151',
                fontWeight: '600',
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
                  padding: '14px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                  direction: isRTL ? 'rtl' : 'ltr',
                  fontWeight: '500',
                  backgroundColor: '#ffffff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0066cc';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#374151',
                fontWeight: '600',
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
                    padding: '14px 16px',
                    paddingRight: isRTL ? '16px' : '48px',
                    paddingLeft: isRTL ? '48px' : '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    direction: isRTL ? 'rtl' : 'ltr',
                    fontWeight: '500',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0066cc';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
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
                    color: '#6b7280',
                    padding: '8px',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#9ca3af' : '#0066cc',
                color: 'white',
                padding: '16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.025em'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#0052a3';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#0066cc';
                }
              }}
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e5e9'
          }}>
            <p style={{ 
              margin: '0 0 12px 0', 
              fontWeight: '600', 
              color: '#374151', 
              fontSize: '14px',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              {t('demoCredentials')}
            </p>
            <div style={{ 
              fontSize: '13px', 
              color: '#6b7280',
              lineHeight: '1.6',
              fontWeight: '500',
              textAlign: isRTL ? 'right' : 'left'
            }}>
              <p style={{ margin: '0' }}>
                <strong style={{ color: '#1a1a1a' }}>{t('superAdmin')}:</strong> admin / admin123<br/>
                <strong style={{ color: '#1a1a1a' }}>{t('manager')}:</strong> manager / manager123<br/>
                <strong style={{ color: '#1a1a1a' }}>{t('dispatcher')}:</strong> dispatcher / dispatcher123<br/>
                <strong style={{ color: '#1a1a1a' }}>{t('driver')}:</strong> driver / driver123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernApp;

