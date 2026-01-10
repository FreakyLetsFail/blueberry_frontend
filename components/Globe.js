"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe({ className, focus, markers }) {
  const canvasRef = useRef();
  const focusRef = useRef(focus);
  const markersRef = useRef(markers);
  const r = useRef(0);
  const thetaRef = useRef(0.3);
  const baseSpin = 0.003;
  const phiOffsetDeg = 60; // shift so Europe centers naturally without over-rotation

  // Update refs when props change so onRender can access latest values
  useEffect(() => {
    focusRef.current = focus;
    markersRef.current = markers;
  }, [focus, markers]);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    if (!canvasRef.current) return;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (width === 0) {
        // Fallback or retry if width is 0 (hidden element)
        width = 600;
    }

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 32000,
      mapBrightness: 8,
      baseColor: [0.18, 0.18, 0.18],
      markerColor: [0.2, 0.8, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [],
      onRender: (state) => {
        // Expand markers to allow halo/outline for countries
        const m = markersRef.current || [];
        state.markers = (m || []).map((marker) => ({
          ...marker,
          size: marker.size ?? 0.15,
          color: marker.color || [0.2, 0.8, 1],
        }));

        // Smooth rotation logic for longitude (phi) and latitude (theta)
        if (!focusRef.current) {
          thetaRef.current += (0.3 - thetaRef.current) * 0.05;
        } else {
          const [lat, lon] = focusRef.current;
          const targetPhi = -((lon + phiOffsetDeg) * Math.PI) / 180;
          const targetTheta = (lat * Math.PI) / 180;
          phi += (targetPhi - phi) * 0.12;
          thetaRef.current += (targetTheta - thetaRef.current) * 0.12;
        }

        // Always apply base spin so auto-rotation keeps going
        phi += baseSpin;

        state.phi = phi + r.current;
        state.theta = thetaRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []); // Empty dependency array to avoid recreating globe

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
