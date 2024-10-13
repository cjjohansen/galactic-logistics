"use client";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"

import { Badge } from "@/app/(shared)/components/ui/badge"
import { Button } from "@/app/(shared)/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/(shared)/components/ui/drawer"
import { Input } from "@/app/(shared)/components/ui/input"
import { Label } from "@/app/(shared)/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(shared)/components/ui/select"
import { Textarea } from "@/app/(shared)/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/app/(shared)/components/ui/tooltip"

import MapComponent  from "@/app/(shared)/components/Map"

import { useState } from "react";
import LocationForm, { LocationFormData } from './components/LocationForm';
import ContextMenu from "./components/ContextMenu";
import LocationList from "./components/LocationList";


export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."

  interface Coordinates {
    longitude: number;
    latitude: number;
  }


  const locations = [
    {
      longitude: -74.5,
      latitude: 40,
      locationType: 'Marker',
      name: 'New York'
    },
    // Add more locations as needed
  ];


export default function Locations() {

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; coordinates: Coordinates } | null>(null);
  const [formCoordinates, setFormCoordinates] = useState<Coordinates | null>(null);
  const [formPosition, setFormPosition] = useState<{ x: number; y: number } | null>(null);
  const [locations, setLocations] = useState<LocationFormData[]>([
    { name: 'Test Location', locationType: 'warehouse', longitude: -100, latitude: 40 }
  ]);
  

  const handleRightClick = (coords: Coordinates, event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      coordinates: coords,
    });
  };

  const openForm = () => {
    if (contextMenu) {
      console.log('Opening form at coordinates:', contextMenu.coordinates);
      console.log('Form position:', contextMenu.x, contextMenu.y);
      setFormCoordinates(contextMenu.coordinates);
      setFormPosition({ x: contextMenu.x, y: contextMenu.y });
      setContextMenu(null); // Close the context menu after opening the form
    }
  };

  const saveLocation = (newLocation: LocationFormData) => {
    const updatedLocations = [
      ...locations,
      { ...newLocation, longitude: newLocation.longitude, latitude: newLocation.latitude },
    ].sort((a, b) => a.name.localeCompare(b.name));
    setLocations(updatedLocations);
    setFormCoordinates(null); // Close the form after saving
    setFormPosition(null); // Clear the form position
  };

  const cancelForm = () => {
    setFormCoordinates(null); // Close the form without saving
    setFormPosition(null); // Clear the form position
  };

  console.log(locations);

  return (
     <>
    <div className="map-container">
      <MapComponent onRightClick={handleRightClick} locations={locations} />

      {/* Render context menu on right-click */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAddLocation={openForm}
        />
      )}

      {formCoordinates && formPosition && (
        <LocationForm
          coordinates={formCoordinates}
          onSave={saveLocation}
          onCancel={cancelForm}
          top={formPosition.y}
          left={formPosition.x}
        />
      )}


      {/* Location List Component */}
      <LocationList locations={locations} />
    </div>

    </>
  )
}
