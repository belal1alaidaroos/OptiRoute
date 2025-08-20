import React, { useEffect, useState } from 'react';
import {
  CogIcon,
  GlobeIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  CheckIcon,
  SaveIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const GeneralSettings = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [currency, setCurrency] = useState('USD');
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/general-settings');
        if (data) {
          setTimezone(data.timezone || 'UTC');
          setDateFormat(data.dateFormat || 'MM/DD/YYYY');
          setTimeFormat(data.timeFormat || '12h');
          setCurrency(data.currency || 'USD');
          setDefaultLanguage(data.defaultLanguage || 'en');
        }
      } catch (err) {
        console.error('Failed to load general settings', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const timezones = [
    'UTC',
    'GMT',
    'EST',
    'PST',
    'CET',
    'IST',
    'JST',
    'AEST'
  ];

  const dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY/MM/DD',
    'MMMM D, YYYY',
    'D MMMM YYYY'
  ];

  const timeFormats = ['12h', '24h'];

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'SAR', name: 'Saudi Riyal' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const saveSettings = async () => {
    try {
      setLoading(true);
      await apiClient.put('/general-settings', {
        timezone,
        dateFormat,
        timeFormat,
        currency,
        defaultLanguage
      });
      alert('General settings saved successfully!');
    } catch (err) {
      console.error('Failed to save general settings', err);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
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
          color: '#1F2937',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CogIcon size={24} color="#3B82F6" />
          General Settings
        </h2>
        {loading && <span style={{color:'#6B7280'}}>Saving/Loading...</span>}
        {error && <span style={{color:'#EF4444'}}>{error}</span>}
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        {/* Timezone Setting */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <GlobeIcon size={18} color="#6B7280" />
            Timezone
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '12px' 
          }}>
            {timezones.map(tz => (
              <button
                key={tz}
                onClick={() => setTimezone(tz)}
                style={{
                  padding: '12px 16px',
                  background: timezone === tz ? '#F3F4F6' : 'white',
                  border: timezone === tz ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: timezone === tz ? '#3B82F6' : '#4B5563',
                  fontWeight: '500',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {tz}
                {timezone === tz && <CheckIcon size={18} color="#3B82F6" />}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time Format */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CalendarIcon size={18} color="#6B7280" />
              Date Format
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dateFormats.map(format => (
                <button
                  key={format}
                  onClick={() => setDateFormat(format)}
                  style={{
                    padding: '12px 16px',
                    background: dateFormat === format ? '#F3F4F6' : 'white',
                    border: dateFormat === format ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: dateFormat === format ? '#3B82F6' : '#4B5563',
                    fontWeight: '500',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {format}
                  {dateFormat === format && <CheckIcon size={18} color="#3B82F6" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ClockIcon size={18} color="#6B7280" />
              Time Format
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {timeFormats.map(format => (
                <button
                  key={format}
                  onClick={() => setTimeFormat(format)}
                  style={{
                    padding: '12px 16px',
                    background: timeFormat === format ? '#F3F4F6' : 'white',
                    border: timeFormat === format ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: timeFormat === format ? '#3B82F6' : '#4B5563',
                    fontWeight: '500',
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {format === '12h' ? '12-hour' : '24-hour'}
                  {timeFormat === format && <CheckIcon size={18} color="#3B82F6" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Currency & Language */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CurrencyDollarIcon size={18} color="#6B7280" />
              Default Currency
            </h3>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#4B5563',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.name} ({curr.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1F2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <LanguageIcon size={18} color="#6B7280" />
              Default Language
            </h3>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: '#4B5563',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          borderTop: '1px solid #E5E7EB',
          paddingTop: '24px'
        }}>
          <button
            onClick={saveSettings}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <SaveIcon size={18} color="white" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;