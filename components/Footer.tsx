import React from 'react';
import { Link as LinkIcon, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-300">
                <Globe size={24} />
              </a>
              <a href="#" className="hover:text-blue-300">
                <LinkIcon size={24} />
              </a>
              <a href="#" className="hover:text-blue-300">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="text-lg font-bold mb-4">Filters</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300">
                  All
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Electronics
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 pt-8 text-center text-sm">
          <p>&copy; 2026 American. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
