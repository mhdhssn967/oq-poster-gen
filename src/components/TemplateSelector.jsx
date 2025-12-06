// src/components/TemplateSelector.jsx

import React from 'react';
import { Layout } from 'lucide-react';
// import { POSTER_TEMPLATES } from '../config/templates'; // Note: Requires templates.js
const POSTER_TEMPLATES = [
  { id: '1', name: 'Modern Clean', layout: 'Dual Logos Top, Centered Text' },
  { id: '2', name: 'Left Spotlight', layout: 'Logos Left, Text Right' },
  { id: '3', name: 'Center Glow', layout: 'Centered Logos & Text' },
  { id: '4', name: 'Dual Corner Logos', layout: 'Opposite Corner Logos, Left Text' },
  { id: '5', name: 'Bottom Stack', layout: 'Secondary Logo Top, Primary Logo Bottom' },
  { id: '6', name: 'Right Panel', layout: 'Split Layout, Text Left, Logo Right' },
  { id: '7', name: 'Minimal Frame', layout: 'Clean Center Text, Bottom Right Logo' },
  { id: '8', name: 'Vertical Split', layout: 'Half Text Left, Logo Bottom Right' },
  { id: '9', name: 'Bottom Overlay', layout: 'Top Logos, Bottom CTA' },
  { id: '10', name: 'Full Centered', layout: 'Centered Logos & CTA' },
  { id: '11', name: 'Minimalist Focus', layout: 'Image Top, Text Center' },
  { id: '12', name: 'Bold & Blocky', layout: 'Text Top/Bottom, Image Background' },
  { id: '13', name: 'Magazine Cover Style', layout: 'Image Left, Text Right' },
  { id: '14', name: 'Event Schedule', layout: 'Text Heavy, Image Accent' },
];



export const TemplateSelector = ({ selected, onSelect }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">1. Select Template</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POSTER_TEMPLATES.map((template) => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.id)}
                    className={`
                        p-4 rounded-xl shadow-lg transition-all border-2 flex flex-col 
                        items-center justify-center text-center cursor-pointer
                        ${selected === template.id
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-200'
                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-700'
                        }
                    `}
                >
                    <Layout className="w-6 h-6 mb-2" />
                    <span className="font-medium text-sm">{template.name}</span>
                    <span className="text-xs text-gray-500 mt-1">{template.layout}</span>
                </button>
            ))}
        </div>
    </div>
);

export default TemplateSelector;