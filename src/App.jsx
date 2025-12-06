// src/App.jsx - Consolidated structure for a single-file environment

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, MessageSquare, Loader2, ImageIcon, Layout } from 'lucide-react';


import { PosterDisplay } from './components/PosterDisplay';



import TemplateSelector from '../src/components/TemplateSelector'
import { useFirebase } from './hooks/useFirebase';
import { fetchWithBackoff, generateImage, generateText } from './api/gemini';

// --- 3. Configuration (from src/config/templates.js) ---



// --- 4. API Services (from src/api/gemini.js) ---

/**
 * Executes a fetch request with exponential backoff for retries.
 */

// --- 5. Custom Hook (from src/hooks/useFirebase.js) ---



// --- 7. Component: Poster Display (from src/components/PosterDisplay.jsx) ---
<PosterDisplay/>

    // Default Fallback Template
   
// --- 8. Main App Component ---
export default function App() {
    // Phase 1: Custom Hook for Firebase/Auth/Logo
    const { userId, isAuthReady, logoUrl } = useFirebase();

    // Application State
    const [prompt, setPrompt] = useState('An innovative product launch for a new sustainable coffee brand.');
    const [imageStyle,setImageStyle]=useState('')
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [generatedContent, setGeneratedContent] = useState({
        headline: 'Discover the Future of Coffee',
        body: 'Ethically sourced, low carbon footprint, and amazingly delicious. Join the movement.',
        cta: 'Shop Now & Get 10% Off',
        imageUrl: 'https://placehold.co/1024x576/4f46e5/ffffff?text=AI+Image+Placeholder',
    });
    

    // Phase 3 & 5: Core Generation Logic
    const handleGeneratePoster = useCallback(async () => {
        if (!prompt) {
            setError("Please enter a prompt to generate the poster.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            // 3a. Generate Text
            const textPromise = await generateText(prompt);

            // 3b. Generate Image (Runs in parallel with text generation)
            const imagePromise = await generateImage(prompt, imageStyle);

            const [textResult, imageResult] = await Promise.all([textPromise, imagePromise]);
            

            // Phase 4: Data Assembly and State Update
            setGeneratedContent({
                headline: textResult.headline,
                body: textResult.body,
                cta: textResult.cta,
                imageUrl: imageResult,
            });

        } catch (err) {
            console.error("Poster generation failed:", err);
            setError("An error occurred during AI generation. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    // Wait for auth to be ready before showing main content
    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mr-2" />
                <p className="text-gray-600">Initializing App and Authenticating...</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-indigo-700">AI Poster Studio</h1>
                <p className="text-gray-500 mt-1">Template: name</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Left Panel: Controls --- */}
                <div className="lg:col-span-1 space-y-8 bg-white p-6 rounded-xl shadow-lg h-fit">
                    
                    {/* User ID / Auth Status */}
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-2">User Status</h3>
                        <p className="text-sm break-all">
                            <span className="font-medium text-gray-600">User ID:</span> 
                            <span className="ml-2 text-indigo-600">{userId || 'N/A'}</span>
                        </p>
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                             <ImageIcon className="w-4 h-4 mr-1 text-pink-500" />
                            <span className="font-medium">Logo Status:</span> 
                            <span className="ml-2 truncate max-w-[200px]">{logoUrl ? 'Loaded' : 'Placeholder'}</span>
                        </div>
                    </div>

                    {/* Template Selector Component */}
                    <TemplateSelector
                        selected={selectedTemplate}
                        onSelect={setSelectedTemplate}
                    />

                    {/* Prompt Input & Buttons */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">2. Define Content</h3>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                            rows="4"
                            placeholder="e.g., Grand opening for a new gym focusing on cross-fit classes."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                        />
                        <h3 className="text-xl font-semibold text-gray-800">3. Define Style</h3>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                            rows="4"
                            placeholder="e.g., Realistic setting of a rehab environment."
                            value={imageStyle}
                            onChange={(e) => setImageStyle(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleGeneratePoster}
                            disabled={isLoading || !prompt}
                            className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg transition duration-200 
                                ${isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed flex items-center justify-center' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Generating Poster...
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="w-5 h-5 inline mr-2" />
                                    Generate New Poster
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleGeneratePoster} // Same action for regeneration
                            disabled={isLoading || !prompt}
                            className="w-full py-2 px-4 rounded-xl font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition duration-200 flex items-center justify-center"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Regenerate Content Only
                        </button>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
                            {error}
                        </div>
                    )}
                </div>

                {/* --- Right Panel: Poster Preview --- */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">3. Poster Preview</h2>
                    {/* Poster Display Component */}
                    <PosterDisplay
                        templateId={selectedTemplate}
                        content={generatedContent}
                        logoUrl={logoUrl}
                    />

                    {/* Generated Content Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Generated Content Details</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-600">Headline:</span> {generatedContent.headline}</p>
                            <p><span className="font-medium text-gray-600">Body:</span> {generatedContent.body}</p>
                            <p><span className="font-medium text-gray-600">CTA:</span> {generatedContent.cta}</p>
                            <p><span className="font-medium text-gray-600">Image Status:</span> {isLoading ? 'Generating...' : 'Ready (Base64 URL)'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}