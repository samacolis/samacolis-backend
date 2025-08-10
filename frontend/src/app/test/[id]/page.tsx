"use client";

import { useParams } from 'next/navigation';
import React from 'react';

export default function TestPage() {
  const params = useParams();
  const id = params.id as string;
  console.log(`TestPage loaded with ID: ${id}`);

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl font-bold mb-8">Page de Test Dynamique</h1>
      <p>L&apos;ID de la page est : {id}</p>
    </div>
  );
}
