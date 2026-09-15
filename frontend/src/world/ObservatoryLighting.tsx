import React from 'react';

export const ObservatoryLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#0E1320" />
      <directionalLight position={[10, 20, 15]} intensity={1.2} color="#F4C95D" castShadow />
      <directionalLight position={[-15, -10, -10]} intensity={0.8} color="#8B7CFF" />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#F4C95D" distance={15} decay={2} />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#35D6C5" distance={20} decay={2} />
    </>
  );
};
