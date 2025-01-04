"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface SparklesCoreProps {
  id?: string;
  className?: string;
}

export const SparklesCore = ({ id = "tsparticles", className = "" }: SparklesCoreProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesConfig: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      color: {
        value: ["#2D4739", "#FF7F5C"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  };

  if (!init) return null;

  return (
    <Particles
      id={id}
      className={className}
      options={particlesConfig}
    />
  );
};