import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LocationForm.css';

export interface LocationFormData {
  name: string;
  locationType: string;
  longitude: number;
  latitude: number;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface LocationFormProps {
  coordinates: Coordinates;
  onSave: (location: LocationFormData) => void;
  onCancel: () => void;
  top: number; // New prop for positioning
  left: number; // New prop for positioning
}

const LocationForm: React.FC<LocationFormProps> = ({ coordinates, onSave, onCancel, top, left }) => {
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<LocationFormData>();

  // Set focus to the "Location Name" input when the form loads
  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit: SubmitHandler<LocationFormData> = (data) => {
    onSave({ ...data, longitude: coordinates.longitude, latitude: coordinates.latitude });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="location-form"
      style={{ top: `${top}px`, left: `${left}px`, position: 'absolute' }} // Apply absolute positioning
    >
      <h3>Add New Location</h3>
      <p>Coordinates: {coordinates.longitude}, {coordinates.latitude}</p>

      <label>
        Location Name:
        <input
          {...register('name', { required: 'Location name is required' })}
          type="text"
          placeholder="Enter location name"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label>
        Location Type:
        <select {...register('locationType', { required: 'Location type is required' })}>
          <option value="warehouse">Warehouse</option>
          <option value="terminal">Terminal</option>
          <option value="freight">Freight Location</option>
        </select>
        {errors.locationType && <p className="error">{errors.locationType.message}</p>}
      </label>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="submit">Add Location</button>
      </div>
    </form>
  );
};

export default LocationForm;
