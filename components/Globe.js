"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe({ className, focus, markers }) {
  const canvasRef = useRef();
  const focusRef = useRef(focus);
  const markersRef = useRef(markers);
  const r = useRef(0);

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
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [],
      onRender: (state) => {
        // Update markers from ref
        state.markers = markersRef.current || [];

        // Smooth rotation logic
        if (!focusRef.current) {
             phi += 0.005;
        } else {
             const targetPhi = -(focusRef.current[1] * Math.PI) / 180;
             const dist = targetPhi - phi;
             phi += dist * 0.05;
        }

        state.phi = phi + r.current;
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
