import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-black border-t mt-12">
      <div className="container mx-auto px-40 py-20 text-sm sm:text-base lg:text-lg font-weight-bold text-green-600">
        <div className="flex justify-between">
          <div>
            <p className="font-weight-semibold">Smiles Culture</p>
            <p>© {new Date().getFullYear()} Smiles Culture</p>
          </div>
          <div>
            <p>Contact</p>
            <p className="mt-1">Call, Text or WhatsApp: <a href="tel:+254719217121" className="text-brand">+254 719 217 121</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
