import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/apiClient';
import { 
  PaletteIcon,
  SunIcon,
  MoonIcon,
  ContrastIcon,
  FontIcon,
  LayoutIcon,
  CheckIcon,
  ChevronDownIcon
} from '../../components/icons/SVGIcons';

const AppearanceSettings = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [layoutMode, setLayoutMode] = useState('fluid');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
  ];

  const fontOptions = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Noto Sans Arabic', value: 'Noto Sans Arabic' },
  ];

  const layoutOptions = [
    { name: 'Fluid', value: 'fluid' },
    { name: 'Boxed', value: 'boxed' },
    { name: 'Compact', value: 'compact' },
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/appearance-settings');
        if (res.data) {
          setTheme(res.data.theme || 'light');
          setPrimaryColor(res.data.primaryColor || '#3B82F6');
          setFontFamily(res.data.fontFamily || 'Inter');
          setLayoutMode(res.data.layoutMode || 'fluid');
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const applySettings = async () => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);
    setSaving(true);
    try {
      await apiClient.put('/appearance-settings', {
        theme,
        primaryColor,
        fontFamily,
        layoutMode
      });
    } catch {}
    setSaving(false);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1F2937' 
        }}>
          Appearance Settings
        </h2>
        {loading && <span style={{ color: '#6B7280', fontSize: '14px' }}>Loading...</span>}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <button
          onClick={() => setActiveTab('theme')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'theme' ? '#F3F4F6' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'theme' ? primaryColor : '#6B7280',
            fontWeight: '500',
            borderBottom: activeTab === 'theme' ? `2px solid ${primaryColor}` : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PaletteIcon size={18} />
            Theme
          </div>
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'typography' ? '#F3F4F6' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'typography' ? primaryColor : '#6B7280',
            fontWeight: '500',
            borderBottom: activeTab === 'typography' ? `2px solid ${primaryColor}` : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontIcon size={18} />
            Typography
          </div>
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'layout' ? '#F3F4F6' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeTab === 'layout' ? primaryColor : '#6B7280',
            fontWeight: '500',
            borderBottom: activeTab === 'layout' ? `2px solid ${primaryColor}` : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutIcon size={18} />
            Layout
          </div>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {activeTab === 'theme' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#1F2937' 
              }}>
                Color Scheme
              </h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setTheme('light')}
                  style={{
                    padding: '12px 16px',
                    background: theme === 'light' ? `${primaryColor}10` : '#F3F4F6',
                    border: theme === 'light' ? `1px solid ${primaryColor}` : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme === 'light' ? primaryColor : '#6B7280',
                    fontWeight: '500'
                  }}
                >
                  <SunIcon size={18} />
                  Light Mode
                  {theme === 'light' && <CheckIcon size={18} style={{ marginLeft: '8px' }} />}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  style={{
                    padding: '12px 16px',
                    background: theme === 'dark' ? `${primaryColor}10` : '#F3F4F6',
                    border: theme === 'dark' ? `1px solid ${primaryColor}` : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme === 'dark' ? primaryColor : '#6B7280',
                    fontWeight: '500'
                  }}
                >
                  <MoonIcon size={18} />
                  Dark Mode
                  {theme === 'dark' && <CheckIcon size={18} style={{ marginLeft: '8px' }} />}
                </button>
                <button
                  onClick={() => setTheme('system')}
                  style={{
                    padding: '12px 16px',
                    background: theme === 'system' ? `${primaryColor}10` : '#F3F4F6',
                    border: theme === 'system' ? `1px solid ${primaryColor}` : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme === 'system' ? primaryColor : '#6B7280',
                    fontWeight: '500'
                  }}
                >
                  <ContrastIcon size={18} />
                  System Default
                  {theme === 'system' && <CheckIcon size={18} style={{ marginLeft: '8px' }} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#1F2937' 
              }}>
                Primary Color
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPrimaryColor(color.value)}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: color.value,
                      borderRadius: '8px',
                      border: primaryColor === color.value ? '2px solid white' : '2px solid transparent',
                      boxShadow: primaryColor === color.value ? `0 0 0 2px ${color.value}` : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {primaryColor === color.value && <CheckIcon size={16} color="white" />}
                  </button>
                ))}
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #ff0000, #ff9900, #33cc33, #3399ff, #cc66ff, #ff0066)',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronDownIcon size={16} color="#6B7280" />
                </button>
              </div>
              {showColorPicker && (
                <div style={{ marginTop: '16px' }}>
                  <input 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#1F2937' 
              }}>
                Font Family
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '12px' 
              }}>
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => setFontFamily(font.value)}
                    style={{
                      padding: '12px 16px',
                      background: fontFamily === font.value ? `${primaryColor}10` : '#F3F4F6',
                      border: fontFamily === font.value ? `1px solid ${primaryColor}` : '1px solid #E5E7EB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: font.value,
                      color: fontFamily === font.value ? primaryColor : '#6B7280',
                      fontWeight: '500',
                      textAlign: 'left'
                    }}
                  >
                    {font.name}
                    {fontFamily === font.value && (
                      <div style={{ float: 'right' }}>
                        <CheckIcon size={18} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#1F2937' 
              }}>
                Layout Mode
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '12px' 
              }}>
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.value}
                    onClick={() => setLayoutMode(layout.value)}
                    style={{
                      padding: '12px 16px',
                      background: layoutMode === layout.value ? `${primaryColor}10` : '#F3F4F6',
                      border: layoutMode === layout.value ? `1px solid ${primaryColor}` : '1px solid #E5E7EB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: layoutMode === layout.value ? primaryColor : '#6B7280',
                      fontWeight: '500',
                      textAlign: 'left'
                    }}
                  >
                    {layout.name}
                    {layoutMode === layout.value && (
                      <div style={{ float: 'right' }}>
                        <CheckIcon size={18} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={applySettings}
            style={{
              padding: '12px 24px',
              background: saving ? '#93C5FD' : primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px'
            }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Apply & Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;