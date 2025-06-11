import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Demos() {
  // Demo data
  const demos = [
    {
      title: 'k-Space Line-by-Line Reconstruction',
      description: 'Interactive visualization of MRI k-space reconstruction showing how different acquisition patterns affect image quality. Demonstrates truncation artifacts, blurring, and the importance of central k-space lines.',
      path: '/demos/k-space-reconstruction.html',
    },
    {
      title: 'Larmor Precession Visualization',
      description: 'Explore the quantum mechanical behavior of nuclear spins in a magnetic field. Visualize individual spins, precession, and how temperature and field strength affect the population difference.',
      path: '/demos/larmor-precession-viz.html',
    },
    {
      title: '2D k-Space MRI Spin Visualization',
      description: 'Interactive demonstration of how spatial frequencies in k-space relate to image features. Manipulate kx and ky values to see how they affect spin phase patterns and signal formation.',
      path: '/demos/spin-k-space-viz.html',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Demos Section */}
      <section className="pt-32 py-24 bg-black">
        <div className="container-custom">
          <h2 className="text-5xl font-medium mb-6 text-center text-white">MRI Demos</h2>
          <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Interactive visualizations demonstrating key concepts in magnetic resonance imaging.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3">{demo.title}</h3>
                  <p className="text-gray-600 mb-4">{demo.description}</p>
                  <Link 
                    href={demo.path}
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Launch Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
