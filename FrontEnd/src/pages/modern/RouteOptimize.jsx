import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // <-- THIS IS THE MISSING IMPORT
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/RouteOptimization.css';
import { FiChevronDown, FiChevronUp, FiMapPin, FiTruck, FiPackage } from 'react-icons/fi';

const RouteOptimize = () => {
  // State management
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState('08:00');
  const [toTime, setToTime] = useState('17:00');
  const [selectedHub, setSelectedHub] = useState('');
  const [period, setPeriod] = useState('AM');
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optimizedRoutes, setOptimizedRoutes] = useState(null);
  const [activeTrip, setActiveTrip] = useState(null);
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState([]);
  const [shipmentsUploaded, setShipmentsUploaded] = useState(false);
  const [expandedTrips, setExpandedTrips] = useState({});
  const [mapObjects, setMapObjects] = useState([]);
  
  const mapRef = useRef(null);
  const sidebarRef = useRef(null);
  const hereApiKey = 'ZZjZ2g0GrZ_hBPX_F6iO_NVfDXS81gSK8XnOhtbR8KI';
  const hereAppId = 'HywlLJ2c8yN88vg5Ypv6';

  // Color palette for trips
  const tripColors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
  ];

  // Initialize map
  useEffect(() => {
    if (!window.H) {
      console.error('HERE Maps API not loaded');
      return;
    }

    const platform = new window.H.service.Platform({
      apikey: hereApiKey,
      app_id: hereAppId
    });

    const defaultLayers = platform.createDefaultLayers();
    const newMap = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 24.7136, lng: 46.6753 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(newMap));
    window.H.ui.UI.createDefault(newMap, defaultLayers);

    setMap(newMap);
    loadHubs();

    return () => {
      if (newMap) {
        newMap.dispose();
      }
    };
  }, []);

  // Generate sample points (200 points in An Nahdah district)
  const generateSamplePoints = () => {
    const center = { lat: 24.7136, lng: 46.6753 };
    const newPoints = [];
    
    for (let i = 0; i < 200; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.03;
      const offsetLng = (Math.random() - 0.5) * 0.03;
      
      newPoints.push({
        lat: center.lat + offsetLat,
        lng: center.lng + offsetLng,
        id: `point-${i}`,
        address: `Location ${i + 1}, An Nahdah District`,
        status: ['pending', 'in-transit', 'delivered'][Math.floor(Math.random() * 3)],
        weight: Math.floor(Math.random() * 50) + 1
      });
    }
    
    return newPoints;
  };

  const loadHubs = async () => {
    const mockHubs = [
      { id: 'hub-1', name: 'Main Hub - An Nahdah' },
      { id: 'hub-2', name: 'North Distribution Center' },
      { id: 'hub-3', name: 'South Distribution Center' },
      { id: 'hub-4', name: 'East Distribution Center' },
      { id: 'hub-5', name: 'West Distribution Center' }
    ];
    setHubs(mockHubs);
    setSelectedHub(mockHubs[0].id);
  };

  const clearMap = () => {
    if (!map) return;
    map.getObjects().forEach(obj => map.removeObject(obj));
    setMapObjects([]);
  };

  const uploadShipments = () => {
    setLoading(true);
    setTimeout(() => {
      const uploadedPoints = generateSamplePoints();
      setPoints(uploadedPoints);
      
      // Show points on map
      clearMap();
      const markers = uploadedPoints.map(point => {
        return new window.H.map.Marker(
          { lat: point.lat, lng: point.lng },
          { 
            data: point,
            icon: new window.H.map.Icon(
              `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#3498db" />
              </svg>`
            )
          }
        );
      });
      
      markers.forEach(marker => map.addObject(marker));
      setMapObjects(markers);
      
      // Zoom to show all points
      const bbox = uploadedPoints.reduce((box, point) => {
        box.latMin = Math.min(box.latMin, point.lat);
        box.latMax = Math.max(box.latMax, point.lat);
        box.lngMin = Math.min(box.lngMin, point.lng);
        box.lngMax = Math.max(box.lngMax, point.lng);
        return box;
      }, { latMin: 90, latMax: -90, lngMin: 180, lngMax: -180 });
      
      map.getViewModel().setLookAtData({
        bounds: new window.H.geo.Rect(
          bbox.latMin,
          bbox.lngMin,
          bbox.latMax,
          bbox.lngMax
        ),
        padding: { top: 50, right: 50, bottom: 50, left: 50 }
      });
      
      setShipmentsUploaded(true);
      setLoading(false);
    }, 1000);
  };

 // In the optimizeRoutes function, update the routePoints creation:
 /*
const optimizeRoutes = async () => {
  setLoading(true);
  try {
    // Clear existing points from map
    clearMap();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock optimized routes
    const mockOptimizedRoutes = {
      status: 'success',
      routes: Array.from({ length: 10 }, (_, i) => {
        const waypoints = points.slice(i * 20, (i + 1) * 20)
          .map((p, idx) => ({ ...p, order: idx + 1 }));
        
        // Create proper LineString for the route
        const lineString = new window.H.geo.LineString();
        waypoints.forEach(point => {
          lineString.pushPoint(new window.H.geo.Point(point.lat, point.lng));
        });
        
        return {
          id: `trip-${i}`,
          name: `Trip ${i + 1}`,
          waypoints: waypoints,
          lineString: lineString,
          distance: `${(15 + Math.random() * 10).toFixed(1)} km`,
          duration: `${(40 + Math.random() * 30).toFixed(0)} mins`,
          driver: `Driver ${i + 1}`,
          vehicle: `Vehicle ${String.fromCharCode(65 + i)}`,
          startTime: '08:00',
          endTime: '12:00',
          totalWeight: waypoints.reduce((sum, p) => sum + p.weight, 0),
          color: tripColors[i % tripColors.length]
        }
      })
    };
    
    setOptimizedRoutes(mockOptimizedRoutes);
    visualizeAllTrips(mockOptimizedRoutes);
  } catch (error) {
    console.error('Error optimizing routes:', error);
  } finally {
    setLoading(false);
  }
};

 */
 
 
 
 
 const optimizeRoutes = async () => {
  setLoading(true);
  try {
    // 1. First try HERE API
    try {
      const departureDate = new Date(fromDate);
      if (isNaN(departureDate.getTime())) {
        throw new Error('Invalid date selected');
      }

      const [hours, minutes] = fromTime.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid time format (use HH:MM 24-hour format)');
      }

      const departureDateTime = new Date(departureDate);
      departureDateTime.setHours(hours, minutes, 0, 0);
      const timezoneOffset = departureDateTime.getTimezoneOffset() * 60000;
      const localISOTime = new Date(departureDateTime - timezoneOffset).toISOString();

      const requestData = {
        id: `route-${Date.now()}`,
        departureTime: localISOTime,
        stops: [
          {
            id: "depot",
            lat: 24.7136,
            lng: 46.6753,
            plannedDepartureTime: localISOTime
          },
          ...points.map((p, index) => ({
            id: p.id || `stop-${index}`,
            lat: parseFloat(p.lat) || 0,
            lng: parseFloat(p.lng) || 0
          }))
        ],
        fleet: {
          types: [{
            id: "delivery-truck",
            profile: "normal",
            costs: { distance: 0.5, time: 0.2 },
            capacity: [2000],
            vehicle: {
              grossWeight: 3500,
              axleCount: 2,
              dimensions: {
                length: 6.5,
                width: 2.3,
                height: 2.8
              }
            }
          }]
        },
        options: {
          traffic: "live",
          currency: "SAR"
        }
      };

      const hereResponse = await axios.post(
        'https://tourplanning.hereapi.com/v3/routes',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hereApiKey}`
          },
          timeout: 10000
        }
      );

      if (hereResponse?.data?.routes) {
        const transformedRoutes = hereResponse.data.routes.map((route, index) => ({
          id: route.id || `trip-${index}`,
          name: `Trip ${index + 1}`,
          waypoints: route.sections.flatMap(section => 
            section.arrival?.place ? [{
              lat: section.arrival.place.lat,
              lng: section.arrival.place.lng,
              id: section.id || `point-${index}`,
              address: section.arrival.place.address?.label || 'Unknown address',
              status: 'pending',
              weight: Math.floor(Math.random() * 50) + 1
            }] : []
          ),
          distance: `${(route.summary?.length ? (route.summary.length / 1000).toFixed(1) : '0.0')} km`,
          duration: `${(route.summary?.duration ? (route.summary.duration / 60).toFixed(0) : '0')} mins`,
          driver: `Driver ${index + 1}`,
          vehicle: `Vehicle ${String.fromCharCode(65 + index)}`,
          startTime: fromTime,
          endTime: calculateEndTime(fromTime, route.summary?.duration ? route.summary.duration/60 : 60),
          totalWeight: waypoints.reduce((sum, p) => sum + (p.weight || 0), 0),
          color: tripColors[index % tripColors.length],
          isRealData: true,
          serviceUsed: 'HERE'
        }));

        setOptimizedRoutes({ routes: transformedRoutes });
        visualizeAllTrips({ routes: transformedRoutes });
        return;
      }
    } catch (hereError) {
      console.warn('HERE API failed, trying ORS fallback:', hereError);
    }

    // 2. Fallback to OpenRouteService
    try {
      const orsResponse = await axios.post(
        'https://api.openrouteservice.org/optimization',
        {
          jobs: points.map((p, i) => ({
            id: i,
            location: [parseFloat(p.lng) || 0, parseFloat(p.lat) || 0],
            service: 300
          })),
          vehicles: [{
            id: 1,
            profile: 'driving-car',
            start: [46.6753, 24.7136],
            end: [46.6753, 24.7136]
          }],
          options: { g: true }
        },
        {
          headers: {
            'Authorization': '5b3ce3597851110001cf6248xxxxxxxx', // Replace with your key
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 15000
        }
      );

      const orsRoute = orsResponse.data.routes[0];
      const transformedRoutes = [{
        id: 'ors-route-1',
        name: 'ORS Optimized Route',
        waypoints: orsRoute.steps.map(step => ({
          lat: step.location[1],
          lng: step.location[0],
          id: `point-${step.id}`,
          address: step.name || 'Unknown location',
          status: 'pending',
          weight: Math.floor(Math.random() * 50) + 1
        })),
        distance: `${(orsRoute.summary.distance / 1000).toFixed(1)} km`,
        duration: `${(orsRoute.summary.duration / 60).toFixed(0)} mins`,
        driver: 'Driver 1',
        vehicle: 'Vehicle A',
        startTime: fromTime,
        endTime: calculateEndTime(fromTime, orsRoute.summary.duration / 60),
        totalWeight: points.reduce((sum, p) => sum + (p.weight || 0), 0),
        color: tripColors[0],
        isRealData: true,
        serviceUsed: 'ORS'
      }];

      setOptimizedRoutes({ routes: transformedRoutes });
      visualizeAllTrips({ routes: transformedRoutes });
      return;
    } catch (orsError) {
      console.error('ORS also failed:', orsError);
      throw new Error('Both routing services failed');
    }
  } catch (error) {
    console.error('Routing error:', error);
    
    // 3. Final fallback to mock data
    const availablePoints = points.length > 0 ? points : generateSamplePoints();
    const routeCount = Math.min(5, Math.ceil(availablePoints.length / 4));
    
    const mockOptimizedRoutes = {
      routes: Array.from({ length: routeCount }, (_, i) => {
        const waypoints = availablePoints
          .slice(i * 4, (i + 1) * 4)
          .map((p, idx) => ({
            ...p,
            order: idx + 1,
            weight: p.weight || Math.floor(Math.random() * 50) + 1
          }));

        const lineString = new window.H.geo.LineString();
        lineString.pushPoint(new window.H.geo.Point(24.7136, 46.6753));
        waypoints.forEach(point => {
          lineString.pushPoint(new window.H.geo.Point(point.lat, point.lng));
        });
        lineString.pushPoint(new window.H.geo.Point(24.7136, 46.6753));

        const durationMinutes = 30 + Math.random() * 60;
        
        return {
          id: `mock-trip-${i}`,
          name: `Optimized Trip ${i + 1}`,
          waypoints,
          lineString,
          distance: `${(5 + Math.random() * 15).toFixed(1)} km`,
          duration: `${Math.round(durationMinutes)} mins`,
          driver: `Driver ${i + 1}`,
          vehicle: `Vehicle ${String.fromCharCode(65 + i)}`,
          startTime: fromTime,
          endTime: calculateEndTime(fromTime, durationMinutes),
          totalWeight: waypoints.reduce((sum, p) => sum + (p.weight || 0), 0),
          color: tripColors[i % tripColors.length],
          isMockData: true
        };
      }),
      warning: 'Simulated routes shown - service unavailable'
    };
    
    setOptimizedRoutes(mockOptimizedRoutes);
    visualizeAllTrips(mockOptimizedRoutes);
    
    showNotification(
      'Using simulated data - all routing services unavailable',
      'error'
    );
  } finally {
    setLoading(false);
  }
};

// Helper function remains the same
const calculateEndTime = (startTime, durationMinutes) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + Math.round(durationMinutes);
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMins = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
};
















const optimizeWithORS = async (points) => {
  try {
    // Prepare ORS request payload
    const payload = {
      jobs: points.map((p, i) => ({
        id: i,
        location: [parseFloat(p.lng) || 0, parseFloat(p.lat) || 0],
        service: 300 // 5 minutes per stop
      })),
      vehicles: [{
        id: 1,
        profile: 'driving-car',
        start: [46.6753, 24.7136], // Hub location
        end: [46.6753, 24.7136]    // Return to hub
      }],
      options: {
        g: true // Include geometry
      }
    };

    // Temporary CORS workaround
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/optimization',
      payload,
      {
        headers: {
          'Authorization': '5b3ce3597851110001cf6248xxxxxxxx', // Replace with your ORS key
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 15000
      }
    );

    // Transform ORS response to match your format
    return {
      routes: [{
        id: 'ors-route-1',
        summary: {
          distance: response.data.routes[0].summary.distance,
          duration: response.data.routes[0].summary.duration
        },
        waypoints: response.data.routes[0].steps.map(step => ({
          lat: step.location[1],
          lng: step.location[0],
          address: step.name || 'Unknown location'
        }))
      }]
    };
  } catch (error) {
    console.error('ORS request failed:', error);
    throw error;
  }
};


/*
const optimizeRoutes = async () => {
  setLoading(true);
  try {
    // 1. تحضير الوقت والتاريخ بشكل صحيح
    const date = new Date(fromDate);
    const timeParts = fromTime.split(':');
    date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0);
    const departureTime = date.toISOString();

    // 2. إنشاء بيانات الطلب مع التحقق من الصحة
    const requestData = {
      start: { lat: 24.7136, lng: 46.6753 },
      shipments: points.map((p, index) => {
        return {
          id: p.id || 'point-' + index,
          pickup: {
            lat: Number(p.lat),
            lng: Number(p.lng)
          }
        };
      }),
      options: {
        departureTime: departureTime,
        traffic: 'enabled'
      }
    };

    // 3. إرسال الطلب
    const response = await axios.post(
      'https://cors-anywhere.herokuapp.com/https://tourplanning.hereapi.com/v3/routes',
      requestData,
      {
        params: { apikey: hereApiKey },
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );

    // 4. معالجة الاستجابة
    if (response.data && response.data.routes) {
      setOptimizedRoutes(response.data);
      visualizeAllTrips(response.data);
    }

  } catch (error) {
    console.error('حدث خطأ:', error);
    
    // 5. البيانات الاحتياطية
    const mockResponse = {
      routes: [
        {
          id: 'route-1',
          waypoints: points.slice(0, 10),
          distance: '15 كم',
          duration: '45 دقيقة'
        }
      ]
    };
    
    setOptimizedRoutes(mockResponse);
    visualizeAllTrips(mockResponse);
  } finally {
    setLoading(false);
  }
};
*/

// دالة لعرض المسارات
/*const visualizeAllTrips = (data) => {
  if (!window.H || !map) return;

  // مسح جميع العناصر الحالية
  map.getObjects().forEach(obj => map.removeObject(obj));

  data.routes.forEach((route, index) => {
    const color = ['#FF0000', '#00FF00', '#0000FF'][index % 3];
    const lineString = new window.H.geo.LineString();

    route.waypoints.forEach(wp => {
      lineString.pushPoint(new window.H.geo.Point(wp.lat, wp.lng));
    });

    map.addObject(new window.H.map.Polyline(lineString, {
      style: { strokeColor: color, lineWidth: 5 }
    }));
  });
};
*/

// Update the visualizeAllTrips function:
const visualizeAllTrips = (tripsData) => {
  if (!map || !tripsData) return;
  
  clearMap();
  const newMapObjects = [];
  
  tripsData.routes.forEach((trip) => {
    // Create polyline using the pre-built LineString
    const polyline = new window.H.map.Polyline(
      trip.lineString,
      { 
        style: { 
          lineWidth: 6, 
          strokeColor: trip.color,
          opacity: 0.8
        },
        data: { tripId: trip.id, type: 'route' }
      }
    );
    
    map.addObject(polyline);
    newMapObjects.push(polyline);
    
    // Add markers with order numbers
    trip.waypoints.forEach((point, idx) => {
      const marker = new window.H.map.Marker(
        { lat: point.lat, lng: point.lng },
        {
          data: { ...point, tripId: trip.id, type: 'point' },
          icon: new window.H.map.Icon(
            `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="14" fill="${trip.color}" />
              <text x="15" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${idx + 1}</text>
            </svg>`
          )
        }
      );
      map.addObject(marker);
      newMapObjects.push(marker);
    });
  });

  setMapObjects(newMapObjects);
  zoomToAllTrips(tripsData.routes);
  setActiveTrip(null);
};

// Update the visualizeSingleTrip function:
const visualizeSingleTrip = (trip) => {
  if (!map) return;
  
  clearMap();
  const newMapObjects = [];
  
  // Create polyline using the pre-built LineString
  const polyline = new window.H.map.Polyline(
    trip.lineString,
    { 
      style: { 
        lineWidth: 6, 
        strokeColor: trip.color,
        opacity: 1
      },
      data: { tripId: trip.id, type: 'route' }
    }
  );
  
  map.addObject(polyline);
  newMapObjects.push(polyline);
  
  // Add markers with order numbers
  trip.waypoints.forEach((point, idx) => {
    const marker = new window.H.map.Marker(
      { lat: point.lat, lng: point.lng },
      {
        data: { ...point, tripId: trip.id, type: 'point' },
        icon: new window.H.map.Icon(
          `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14" fill="${trip.color}" />
            <text x="15" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${idx + 1}</text>
          </svg>`
        )
      }
    );
    map.addObject(marker);
    newMapObjects.push(marker);
  });
  
  
  
setMapObjects(newMapObjects);
  
  // Zoom to this trip
  const boundingBox = trip.waypoints.reduce((box, point) => {
    box.latMin = Math.min(box.latMin, point.lat);
    box.latMax = Math.max(box.latMax, point.lat);
    box.lngMin = Math.min(box.lngMin, point.lng);
    box.lngMax = Math.max(box.lngMax, point.lng);
    return box;
  }, { latMin: 90, latMax: -90, lngMin: 180, lngMax: -180 });
  
    
map.getViewModel().setLookAtData({
    bounds: new window.H.geo.Rect(
      boundingBox.latMin,
      boundingBox.lngMin,
      boundingBox.latMax,
      boundingBox.lngMax
    ),
    padding: { top: 50, right: 50, bottom: 50, left: 50 }
  });
};

  const zoomToAllTrips = (trips) => {
    const boundingBox = trips.reduce((box, trip) => {
      trip.waypoints.forEach(point => {
        box.latMin = Math.min(box.latMin, point.lat);
        box.latMax = Math.max(box.latMax, point.lat);
        box.lngMin = Math.min(box.lngMin, point.lng);
        box.lngMax = Math.max(box.lngMax, point.lng);
      });
      return box;
    }, { latMin: 90, latMax: -90, lngMin: 180, lngMax: -180 });
    
    map.getViewModel().setLookAtData({
      bounds: new window.H.geo.Rect(
        boundingBox.latMin,
        boundingBox.lngMin,
        boundingBox.latMax,
        boundingBox.lngMax
      ),
      padding: { top: 50, right: 50, bottom: 50, left: 50 }
    });
  };

  const toggleTripExpansion = (tripId) => {
    setExpandedTrips(prev => ({
      ...prev,
      [tripId]: !prev[tripId]
    }));
  };

  const toggleTripVisibility = (trip) => {
    if (activeTrip === trip.id) {
      visualizeAllTrips(optimizedRoutes);
      setActiveTrip(null);
    } else {
      visualizeSingleTrip(trip);
      setActiveTrip(trip.id);
    }
  };

  const createTrips = () => {
    alert('Trips created and drivers assigned successfully!');
  };

  return (
    <div className="route-optimization-container">
      <div className="header">
        <h1>Route Optimization</h1>
        <div className="controls">
          <button 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="toggle-btn"
          >
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {filtersVisible && (
        <div className="filters-section">
          <div className="filter-group">
            <label>From Date:</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
          </div>

          <div className="filter-group">
            <label>To Date:</label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
              minDate={fromDate}
            />
          </div>

          <div className="filter-group">
            <label>From Time:</label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="time-input"
            />
          </div>

          <div className="filter-group">
            <label>To Time:</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="time-input"
            />
          </div>

          <div className="filter-group">
            <label>Hub:</label>
            <select
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="hub-select"
            >
              {hubs.map(hub => (
                <option key={hub.id} value={hub.id}>{hub.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Period:</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="period-select"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {!shipmentsUploaded ? (
            <button
              onClick={uploadShipments}
              disabled={loading}
              className="upload-btn"
            >
              {loading ? 'Uploading...' : 'Upload Shipments'}
            </button>
          ) : (
            !optimizedRoutes && (
              <button
                onClick={optimizeRoutes}
                disabled={loading}
                className="optimize-btn"
              >
                {loading ? 'Optimizing...' : 'Optimize Routes'}
              </button>
            )
          )}
        </div>
      )}

      <div className="main-content">
        <div className="map-container" ref={mapRef}></div>
        
		
		
		
		
		
		
        {loading ? (
  <div className="loading-message">
    <div className="spinner"></div>
    <p>Optimizing routes...</p>
  </div>
) : optimizedRoutes?.routes?.length > 0 ? (
  <div className="trips-sidebar" ref={sidebarRef}>
    <div className="sidebar-header">
      <h3>Optimized Trips</h3>
      <button 
        onClick={() => {
          visualizeAllTrips(optimizedRoutes);
          setActiveTrip(null);
        }}
        className="show-all-btn"
      >
        Show All
      </button>
    </div>
    
    <div className="trips-list">
      {optimizedRoutes.routes.map((trip, index) => (
        <div 
          key={trip.id} 
          className={`trip-card ${activeTrip === trip.id ? 'active' : ''}`}
          style={{ borderLeft: `4px solid ${trip.color || tripColors[index % tripColors.length]}` }}
        >
          <div 
            className="trip-summary"
            onClick={() => toggleTripExpansion(trip.id)}
          >
            <div className="trip-info">
              <span className="trip-name">{trip.name}</span>
              <span className="trip-stats">
                {trip.waypoints.length} stops • {trip.distance} • {trip.duration}
              </span>
            </div>
            {expandedTrips[trip.id] ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          
          {expandedTrips[trip.id] && (
            <div className="trip-details">
              <div className="detail-row">
                <FiTruck className="detail-icon" />
                <span>{trip.driver} • {trip.vehicle}</span>
              </div>
              <div className="detail-row">
                <FiMapPin className="detail-icon" />
                <span>{trip.startTime} - {trip.endTime}</span>
              </div>
              <div className="detail-row">
                <FiPackage className="detail-icon" />
                <span>Total Weight: {trip.totalWeight} kg</span>
              </div>
              
              <button
                onClick={() => toggleTripVisibility(trip)}
                className={`toggle-trip-btn ${activeTrip === trip.id ? 'active' : ''}`}
              >
                {activeTrip === trip.id ? 'Hide on Map' : 'Show on Map'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    
    <button
      onClick={createTrips}
      className="create-trips-btn"
    >
      Create Trips & Assign Drivers
    </button>
  </div>
) : optimizedRoutes ? (
  <div className="no-routes-message">
    <FiPackage size={24} />
    <p>No routes found for the selected criteria</p>
  </div>
) : null}
		
		
		
		
		
		
      </div>
    </div>
  );
};

export default RouteOptimize;

