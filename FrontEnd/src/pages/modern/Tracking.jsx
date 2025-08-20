import React, { useState, useEffect } from 'react';
import '../../components/styles/TrackingPage.css';


import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapIcon,
  XIcon,
  FilterIcon
} from '../../components/icons/SVGIcons';
import apiClient from '../../lib/apiClient';

const TrackingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    hub: 'All hubs',
    period: 'All periods',
    driver: 'All drivers',
    trip: 'All trips'
  });
  
  const [tripsOnMap, setTripsOnMap] = useState([]);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [expandedTrip, setExpandedTrip] = useState(null);

  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const { data } = await apiClient.get('/trips');
        const mapped = (data || []).map(t => ({
          id: t.id,
          status: (t.status || '').toLowerCase().replace(' ', '-'),
          progress: t.status === 'Completed' ? 100 : t.status === 'In Progress' ? 50 : 0,
          driver: t.driverName,
          hub: t.startHubName,
          period: 'AM',
          startTime: t.startDate ? new Date(t.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          endTime: t.endDate ? new Date(t.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          isLive: t.status === 'In Progress',
          deliveredPackages: 0,
          totalPackages: 0,
          locations: []
        }));
        setAllTrips(mapped);
        setFilteredTrips(mapped);
      } catch (err) {
        console.error('Failed to load trips', err);
      }
    };
    loadTrips();
  }, []);

  // دالة تطبيق الفلاتر
  const handleFilterApply = () => {
    let trips = [...allTrips];

    if (filters.hub !== 'All hubs') {
      trips = trips.filter(trip => trip.hub === filters.hub);
    }
    if (filters.period !== 'All periods') {
      trips = trips.filter(trip => trip.period === filters.period);
    }
    if (filters.driver !== 'All drivers') {
      trips = trips.filter(trip => trip.driver === filters.driver);
    }
    if (filters.trip !== 'All trips') {
      const tripId = filters.trip.split(' ')[1];
      trips = trips.filter(trip => trip.id === tripId);
    }
    
    setFilteredTrips(trips);
  };

  // تطبيق الفلاتر عند تحميل الصفحة
  useEffect(() => {
    handleFilterApply();
  }, [allTrips]);

  const handleMapToggle = (tripId) => {
    setTripsOnMap(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId) 
        : [...prev, tripId]
    );
  };

  return (
    <div className="tracking-container">
      {/* منطقة الفلاتر مع زر Apply Filters */}
      <div className="tracking-filters">
        <div className="filter-group">
          <label>Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          />
        </div>

        <div className="filter-group">
          <label>Hub</label>
          <select
            value={filters.hub}
            onChange={(e) => setFilters({...filters, hub: e.target.value})}
          >
            <option>All hubs</option>
            <option>Hub A</option>
            <option>Hub B</option>
            <option>Hub C</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Period</label>
          <select
            value={filters.period}
            onChange={(e) => setFilters({...filters, period: e.target.value})}
          >
            <option>All periods</option>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Driver</label>
          <select
            value={filters.driver}
            onChange={(e) => setFilters({...filters, driver: e.target.value})}
          >
            <option>All drivers</option>
            <option>Mohammed Ali</option>
            <option>Ahmed Hassan</option>
            <option>Sami Omar</option>
            <option>Ali Mohammed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Trip</label>
          <select
            value={filters.trip}
            onChange={(e) => setFilters({...filters, trip: e.target.value})}
          >
            <option>All trips</option>
            <option>Trip A</option>
            <option>Trip M</option>
            <option>Trip X</option>
            <option>Trip G</option>
          </select>
        </div>

        {/* زر تطبيق الفلاتر */}
        <div className="filter-actions">
          <button className="apply-filters-btn" onClick={handleFilterApply}>
            <FilterIcon className="icon" />
            Apply Filters
          </button>
        </div>
      </div>

      <div className="tracking-content">
        {/* الشريط الجانبي */}
        <div className={`tracking-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>

          {!sidebarCollapsed && (
            <>
              <div className="sidebar-header">
                <h3>Trips</h3>
                <span>{filteredTrips.length} trips found</span>
              </div>

              <div className="trips-list">
                {filteredTrips.length > 0 ? filteredTrips.map(trip => (
                  <div 
                    key={trip.id} 
                    className={`trip-card ${trip.status} ${expandedTrip === trip.id ? 'expanded' : ''} ${tripsOnMap.includes(trip.id) ? 'selected' : ''}`}
                  >
                    <div 
                      className="trip-header" 
                      onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                    >
                      <button className="toggle-expand-btn">
                        {expandedTrip === trip.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </button>
                      <div className="trip-main-info">
                        <span className="trip-id">Trip {trip.id}</span>
                        <span className={`trip-status ${trip.status}`}>
                          {trip.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${trip.progress}%` }} />
                      </div>
                    </div>

                    {expandedTrip === trip.id && (
                      <div className="trip-details">
                        <div className="detail-row">
                          <span>Driver:</span>
                          <span>{trip.driver}</span>
                        </div>
                        <div className="detail-row">
                          <span>Hub:</span>
                          <span>{trip.hub}</span>
                        </div>
                        <div className="detail-row">
                          <span>Time:</span>
                          <span>{trip.startTime} - {trip.endTime}</span>
                        </div>
                        
                        <div className="delivery-stats">
                          <div className="stats-grid">
                            <div className="stat-item">
                              <span>Delivered:</span>
                              <span className="stat-value">{trip.deliveredPackages}/{trip.totalPackages}</span>
                            </div>
                            <div className="stat-item">
                              <span>Progress:</span>
                              <span className="stat-value">{trip.progress}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="map-btn-container">
                          <button
                            className={`map-btn ${tripsOnMap.includes(trip.id) ? 'on-map' : trip.isLive ? 'live' : 'completed'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMapToggle(trip.id);
                            }}
                          >
                            {tripsOnMap.includes(trip.id) ? (
                              <>
                                <XIcon className="icon" />
                                Remove from Map
                              </>
                            ) : trip.isLive ? (
                              <>
                                <MapIcon className="icon" />
                                Live Tracking
                              </>
                            ) : (
                              <>
                                <MapIcon className="icon" />
                                View on Map
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="no-trips-found">
                    <p>No trips match the current filters.</p>
                    <p>Try adjusting your filter criteria.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Maps Boxes */}
        <div className="map-area">
          {tripsOnMap.length > 0 ? (
            <div className="map-container">
              <div className="map-header">
                <h3>Active Trips: {tripsOnMap.length}</h3>
                {tripsOnMap.some(id => filteredTrips.find(t => t.id === id)?.isLive) && (
                  <div className="live-control">
                    <span className="live-badge">LIVE</span>
                    <label className="auto-update">
                      <input
                        type="checkbox"
                        checked={liveUpdate}
                        onChange={() => setLiveUpdate(!liveUpdate)}
                      />
                      Auto-Update
                    </label>
                  </div>
                )}
              </div>

              <div className="maps-grid">
                {tripsOnMap.map(tripId => {
                  const trip = filteredTrips.find(t => t.id === tripId);
                  if (!trip) return null; // في حالة عدم وجود الرحلة في القائمة المفلترة
                  
                  return (
                    <div key={tripId} className="map-view">
                      <div className="map-title-controls">
                        <h4>Trip {tripId} - {trip.status.replace('-', ' ')}</h4>
                        <div className="status-controls">
                          {trip.isLive ? (
                            <>
                              <span className="live-badge">LIVE</span>
                              <label className="auto-update-toggle">
                                <input
                                  type="checkbox"
                                  checked={liveUpdate}
                                  onChange={() => setLiveUpdate(!liveUpdate)}
                                />
                                Auto-Update
                              </label>
                            </>
                          ) : (
                            <span className="history-badge">RECORDED</span>
                          )}
                        </div>
                      </div>

                      <div className="map-placeholder">
                        <div className="path-line">
                          {trip.locations.map((loc, idx) => (
                            <div 
                              key={idx}
                              className={`location-point ${idx === trip.locations.length - 1 ? 'current' : ''}`}
                              style={{
                                left: `${20 + (idx * 25)}%`,
                                top: `${30 + (idx * 15)}%`
                              }}
                            >
                              <div className="point-info">
                                <strong>{loc.name}</strong>
                                <div>{loc.timestamp}</div>
                                {loc.speed && <div>{loc.speed}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="no-map-selected">
              <MapIcon className="map-icon" />
              <p>No trips selected for map view</p>
              <p>Click "View on Map" to display trips</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
