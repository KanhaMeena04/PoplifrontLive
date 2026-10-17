import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MapPin, Sparkles, TrendingUp, Users } from 'lucide-react';

interface CityNode {
  id: string;
  name: string;
  lat: number; // Latitude (-90 to 90)
  lon: number; // Longitude (-180 to 180)
  creators: number;
  views: string;
  color: string;
}

const CITIES: CityNode[] = [
  { id: 'bhilwara', name: 'Bhilwara', lat: 25.3407, lon: 74.6313, creators: 145, views: '850K+', color: '#e62484' },
  { id: 'jaipur', name: 'Jaipur', lat: 26.9124, lon: 75.7873, creators: 520, views: '3.2M+', color: '#fbc343' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lon: 72.8777, creators: 1280, views: '8.5M+', color: '#31b7d6' },
  { id: 'delhi', name: 'Delhi NCR', lat: 28.7041, lon: 77.1025, creators: 980, views: '6.4M+', color: '#e62484' },
  { id: 'lucknow', name: 'Lucknow', lat: 26.8467, lon: 80.9462, creators: 340, views: '1.9M+', color: '#fbc343' },
  { id: 'varanasi', name: 'Varanasi', lat: 25.3176, lon: 82.9739, creators: 290, views: '1.4M+', color: '#31b7d6' },
  { id: 'indore', name: 'Indore', lat: 22.7196, lon: 75.8577, creators: 410, views: '2.1M+', color: '#e62484' },
  { id: 'kota', name: 'Kota', lat: 25.2138, lon: 75.8648, creators: 210, views: '980K+', color: '#fbc343' },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.9716, lon: 77.5946, creators: 850, views: '5.1M+', color: '#31b7d6' },
  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lon: 88.3639, creators: 620, views: '3.8M+', color: '#e62484' },
];

interface ArcConnection {
  from: CityNode;
  to: CityNode;
  progress: number;
  speed: number;
}

const GlobeReachGraphic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCity, setActiveCity] = useState<CityNode | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});

  const rotationRef = useRef<number>(0.8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Build connections between cities
    const arcs: ArcConnection[] = [
      { from: CITIES[0], to: CITIES[1], progress: 0.1, speed: 0.008 }, // Bhilwara -> Jaipur
      { from: CITIES[1], to: CITIES[3], progress: 0.4, speed: 0.006 }, // Jaipur -> Delhi
      { from: CITIES[0], to: CITIES[2], progress: 0.7, speed: 0.007 }, // Bhilwara -> Mumbai
      { from: CITIES[3], to: CITIES[4], progress: 0.2, speed: 0.009 }, // Delhi -> Lucknow
      { from: CITIES[4], to: CITIES[5], progress: 0.5, speed: 0.008 }, // Lucknow -> Varanasi
      { from: CITIES[2], to: CITIES[6], progress: 0.3, speed: 0.007 }, // Mumbai -> Indore
      { from: CITIES[6], to: CITIES[7], progress: 0.8, speed: 0.009 }, // Indore -> Kota
      { from: CITIES[2], to: CITIES[8], progress: 0.6, speed: 0.006 }, // Mumbai -> Bengaluru
      { from: CITIES[3], to: CITIES[9], progress: 0.9, speed: 0.005 }, // Delhi -> Kolkata
      { from: CITIES[5], to: CITIES[9], progress: 0.15, speed: 0.008 }, // Varanasi -> Kolkata
    ];

    // Pre-generate static globe dots grid
    const globeDots: { lat: number; lon: number }[] = [];
    const step = 10;
    for (let lat = -80; lat <= 80; lat += step) {
      const radiusAtLat = Math.cos((lat * Math.PI) / 180);
      const dotsInRow = Math.max(6, Math.floor(36 * radiusAtLat));
      for (let i = 0; i < dotsInRow; i++) {
        const lon = (i * 360) / dotsInRow - 180;
        globeDots.push({ lat, lon });
      }
    }

    const globeCenter = { x: width / 2, y: height / 2 + 10 };
    let globeRadius = Math.min(width, height) * 0.38;

    // Helper 3D projection
    const project3D = (lat: number, lon: number, rotationY: number, alt = 0) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon * (Math.PI / 180)) + rotationY;
      const r = globeRadius + alt;

      const x3d = r * Math.sin(phi) * Math.cos(theta);
      const y3d = -r * Math.cos(phi);
      const z3d = r * Math.sin(phi) * Math.sin(theta);

      // Perspective scale factor
      const fov = 600;
      const scale = fov / (fov + z3d);

      return {
        x: globeCenter.x + x3d * scale,
        y: globeCenter.y + y3d * scale,
        z: z3d,
        scale,
        visible: z3d > -globeRadius * 0.35,
      };
    };

    let rippleTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      globeRadius = Math.min(width, height) * 0.38;
      globeCenter.x = width / 2;
      globeCenter.y = height / 2 + 10;

      rotationRef.current += 0.003;
      rippleTime += 0.04;

      // 1. Atmosphere Glow Rim (Outer Aura)
      const auraGradient = ctx.createRadialGradient(
        globeCenter.x,
        globeCenter.y,
        globeRadius * 0.85,
        globeCenter.x,
        globeCenter.y,
        globeRadius * 1.35
      );
      auraGradient.addColorStop(0, 'rgba(230, 36, 132, 0.15)');
      auraGradient.addColorStop(0.5, 'rgba(49, 183, 214, 0.12)');
      auraGradient.addColorStop(0.8, 'rgba(251, 195, 67, 0.05)');
      auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(globeCenter.x, globeCenter.y, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Main 3D Dark Sphere Base with Subtle Shading
      const sphereGradient = ctx.createRadialGradient(
        globeCenter.x - globeRadius * 0.3,
        globeCenter.y - globeRadius * 0.3,
        globeRadius * 0.1,
        globeCenter.x,
        globeCenter.y,
        globeRadius
      );
      sphereGradient.addColorStop(0, '#1a102b');
      sphereGradient.addColorStop(0.6, '#0f081d');
      sphereGradient.addColorStop(1, '#05020a');

      ctx.save();
      ctx.beginPath();
      ctx.arc(globeCenter.x, globeCenter.y, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Subtle Outer Rim Highlight Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 3. Draw 3D Dot Grid Mesh (Globe Texture Points)
      globeDots.forEach((pt) => {
        const proj = project3D(pt.lat, pt.lon, rotationRef.current);
        if (proj.visible) {
          const alpha = Math.max(0.1, Math.min(0.8, (proj.z + globeRadius) / (globeRadius * 2)));
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.2 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Draw Latitude/Longitude Grid Ring Lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 10) {
          const proj = project3D(lat, lon, rotationRef.current);
          if (proj.visible) {
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Track screen coords of cities for react DOM tooltips
      const newScreenCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {};

      // 5. Draw Animated Arc Connections (Trajectories)
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;

        const pStart = project3D(arc.from.lat, arc.from.lon, rotationRef.current);
        const pEnd = project3D(arc.to.lat, arc.to.lon, rotationRef.current);

        // Draw arc if both or either start/end is facing front
        if (pStart.z > -globeRadius * 0.5 || pEnd.z > -globeRadius * 0.5) {
          const pointsCount = 30;
          const arcPoints: { x: number; y: number; z: number; scale: number }[] = [];

          for (let i = 0; i <= pointsCount; i++) {
            const t = i / pointsCount;
            // Interpolate latitude and longitude
            const lat = arc.from.lat + (arc.to.lat - arc.from.lat) * t;
            const lon = arc.from.lon + (arc.to.lon - arc.from.lon) * t;
            // Parabolic altitude arc lift
            const alt = Math.sin(t * Math.PI) * (globeRadius * 0.28);

            const proj = project3D(lat, lon, rotationRef.current, alt);
            arcPoints.push(proj);
          }

          // Draw Glowing Arc Path Line
          ctx.beginPath();
          ctx.moveTo(arcPoints[0].x, arcPoints[0].y);
          for (let i = 1; i < arcPoints.length; i++) {
            ctx.lineTo(arcPoints[i].x, arcPoints[i].y);
          }

          const arcGradient = ctx.createLinearGradient(
            arcPoints[0].x,
            arcPoints[0].y,
            arcPoints[arcPoints.length - 1].x,
            arcPoints[arcPoints.length - 1].y
          );
          arcGradient.addColorStop(0, 'rgba(230, 36, 132, 0.2)');
          arcGradient.addColorStop(0.5, 'rgba(251, 195, 67, 0.9)');
          arcGradient.addColorStop(1, 'rgba(49, 183, 214, 0.2)');

          ctx.strokeStyle = arcGradient;
          ctx.lineWidth = 2.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Moving Light Pulse Particle along the Arc
          const particleIndex = Math.floor(arc.progress * (arcPoints.length - 1));
          const pParticle = arcPoints[particleIndex];

          if (pParticle && pParticle.z > -globeRadius * 0.2) {
            // Glow behind particle
            ctx.beginPath();
            ctx.arc(pParticle.x, pParticle.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 195, 67, 0.4)';
            ctx.fill();

            // Core bright particle dot
            ctx.beginPath();
            ctx.arc(pParticle.x, pParticle.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }
      });

      // 6. Draw City Nodes & Concentric Pulsating Target Rings
      CITIES.forEach((city) => {
        const proj = project3D(city.lat, city.lon, rotationRef.current);

        newScreenCoords[city.id] = { x: proj.x, y: proj.y, visible: proj.z > 0 };

        if (proj.z > -globeRadius * 0.1) {
          const alpha = Math.min(1, (proj.z + globeRadius * 0.2) / (globeRadius * 0.6));

          // Concentric Ripple Target Rings
          for (let r = 1; r <= 3; r++) {
            const ringRadius = ((rippleTime * 15 + r * 12) % 36) * proj.scale;
            const ringAlpha = (1 - ringRadius / (36 * proj.scale)) * alpha * 0.7;

            ctx.beginPath();
            ctx.arc(proj.x, proj.y, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `${city.color}${Math.floor(ringAlpha * 255)
              .toString(16)
              .padStart(2, '0')}`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Outer Glow Circle
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 9 * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `${city.color}44`;
          ctx.fill();

          // City Solid Marker Node
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 4.5 * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = city.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // City Label Text
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
          ctx.fillText(city.name, proj.x + 12, proj.y + 4);
        }
      });

      setScreenCoords(newScreenCoords);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[600px] glass-card rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(230,36,132,0.15)] flex flex-col justify-between p-6 md:p-8 bg-dark/80">
      {/* Top Banner Stats Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary animate-pulse">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-display font-bold text-white flex items-center gap-2">
              Popli Creator Reach Map
            </h3>
            <p className="text-xs md:text-sm text-white/60">Live Video Views & Creator Earnings Network</p>
          </div>
        </div>

        {/* Live Reach Metric Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/90">
            <TrendingUp size={14} className="text-[#fbc343]" />
            <span><strong>15.4M+</strong> Total Views</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold">
            <Users size={14} />
            <span>120+ Cities Live</span>
          </div>
        </div>
      </div>

      {/* 3D Globe Canvas Center */}
      <div className="relative flex-1 w-full h-full my-2">
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />

        {/* Floating Tooltips overlay for cities */}
        <AnimatePresence>
          {CITIES.map((city) => {
            const coords = screenCoords[city.id];
            if (!coords || !coords.visible) return null;
            const isHovered = hoveredCity?.id === city.id || activeCity?.id === city.id;

            if (!isHovered) return null;

            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 5 }}
                style={{
                  left: coords.x,
                  top: coords.y - 20,
                  transform: 'translate(-50%, -100%)',
                }}
                className="absolute z-30 pointer-events-none"
              >
                <div className="bg-dark/95 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl shadow-2xl shadow-primary/30 min-w-[160px] text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={16} style={{ color: city.color }} />
                    <span className="font-bold text-white text-base">{city.name}</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-white/80 flex justify-between gap-4">
                      <span>Active Creators:</span>
                      <strong className="text-white font-bold">{city.creators}</strong>
                    </p>
                    <p className="text-white/80 flex justify-between gap-4">
                      <span>Video Views:</span>
                      <strong className="text-[#fbc343] font-bold">{city.views}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Interactive Legend */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/70">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-white/90 flex items-center gap-1.5">
            <Eye size={14} className="text-[#31b7d6]" /> Key Hubs:
          </span>
          {CITIES.slice(0, 5).map((city) => (
            <button
              key={city.id}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => setActiveCity(activeCity?.id === city.id ? null : city)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: city.color }} />
              <span>{city.name}</span>
            </button>
          ))}
        </div>

        <div className="text-white/50 text-[11px]">
          * Animated Reach Trajectories & Verified Views Network
        </div>
      </div>
    </div>
  );
};

export default GlobeReachGraphic;
