import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#A656A6] text-white mt-12">
      <div className="container mx-auto px-8 py-10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div>
          <p className="text-lg font-semibold">Smiles Culture</p>
          <p>© {new Date().getFullYear()} Smiles Culture. All Rights Reserved.</p>
        </div>

        <div className="mt-4 sm:mt-0">
          <p>Contact Us:</p>
          <a href="tel:+254719217121" className="text-white underline hover:text-purple-200">
            +254 719 217 121
          </a>
        </div>
      </div>
    </footer>
  )
}
