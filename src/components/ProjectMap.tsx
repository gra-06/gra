
'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import type { Project } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

interface ProjectMapProps {
  projects: Project[];
}

export function ProjectMap({ projects }: ProjectMapProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 120,
        center: [0, 20],
      }}
      className="w-full h-full"
    >
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-background stroke-muted-foreground stroke-[0.5px] outline-none"
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {projects.map((project) => (
          <Marker
            key={project._id}
            coordinates={[project.location.lng, project.location.lat]}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/projects/${project.slug}`}>
                  <circle
                    r={4}
                    className="fill-primary/70 stroke-primary stroke-2 animate-pulse"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">
                  <p className="font-bold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.categories.map((c) => c.title).join(', ')}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
}
