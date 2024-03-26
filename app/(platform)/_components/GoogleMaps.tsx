'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const containerStyle = {
  width: '100%',
  height: window.innerHeight - 100,
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

export default function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [directionRoutePoints, setDirectionRoutePoints] = useState<any>([]);

  const { pickup, setPickup } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    // map.panTo({
    //   lat: pickup.lat,
    //   lng: pickup.lng,
    // });
    setCenter({
      lat: pickup.lat,
      lng: pickup.lng,
    });
    directionsRoute();
  }, [pickup]);

  useEffect(() => {
    // map.panTo({
    //   lat: pickup.lat,
    //   lng: pickup.lng,
    // });
    setCenter({
      lat: pickup.lat,
      lng: pickup.lng,
    });
    directionsRoute();
  }, [destination]);

  const directionsRoute = () => {
    const DirectionService = new google.maps.DirectionsService();

    DirectionService.route(
      {
        origin: new google.maps.LatLng(pickup.lat, pickup.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {pickup ? (
        <MarkerF position={{ lat: pickup.lat, lng: pickup.lng }}>
          <OverlayViewF
            position={{ lat: pickup.lat, lng: pickup.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{pickup.name}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {destination ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.name}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 4,
          },
          suppressMarkers: true,
        }}
      />
      <></>
    </GoogleMap>
  );
}
