"use client"
// app/locations/layout.tsx (Nested Layout for Locations)

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      {children}
    </div>
  );
}
