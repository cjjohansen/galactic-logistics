import React from 'react';
import './LocationList.css'; // Import the CSS file

interface Location {
  longitude: number;
  latitude: number;
  locationType: string;
  name: string;
}

interface LocationListProps {
  locations: Location[];
}

const LocationList = ({ locations } : LocationListProps) => {
  return (
    <div className="location-list">
      <h4>Locations</h4>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            {location.name} - {location.locationType} ({location.longitude.toFixed(2)}, {location.latitude.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
