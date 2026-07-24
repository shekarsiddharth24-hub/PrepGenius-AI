import Tilt from "react-parallax-tilt";

interface GlassTiltCardProps {
  children: React.ReactNode;
}

export default function GlassTiltCard({
  children,
}: GlassTiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1200}
      transitionSpeed={1200}
      glareEnable={false}
      scale={1.02}
    >
      {children}
    </Tilt>
  );
}