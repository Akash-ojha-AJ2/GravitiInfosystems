import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox CSS
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "your-mapbox-token";

const MapView = ({ coordinates }) => {
  const backend = import.meta.env.VITE_BACKEND
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!coordinates || !mapContainer.current) return;

    // Map initialization
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 12,
      pitch: 0,
      bearing: 0,
      interactive: true,
      dragPan: true,
      scrollZoom: true,
      touchZoomRotate: true,
      doubleClickZoom: true,
      keyboard: false,
      boxZoom: false,
      maxBounds: [
        [coordinates[0] - 0.5, coordinates[1] - 0.5], // Southwest coordinates
        [coordinates[0] + 0.5, coordinates[1] + 0.5]  // Northeast coordinates
      ]
    });

    mapRef.current = map;

    // Disable rotation completely
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    // Add navigation controls (only zoom buttons)
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true,
      visualizePitch: false
    }), 'top-right');

    // Add marker
    new mapboxgl.Marker({
      color: "#dc3545",
      draggable: false
    })
      .setLngLat(coordinates)
      .addTo(map);

    // Add click event to prevent default touch behavior
    map.on('click', (e) => {
      e.preventDefault();
    });

    // Prevent context menu
    mapContainer.current.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Handle touch events specifically
    map.on('touchstart', (e) => {
      if (e.originalEvent.touches.length > 1) {
        e.preventDefault();
      }
    });

    map.on('touchmove', (e) => {
      e.preventDefault();
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coordinates]);

  // Add some inline styles for better control
  const containerStyle = {
    width: '100%',
    height: '350px',
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'none' // This is important to prevent scrolling
  };

  return (
    <div style={containerStyle}>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default MapView;