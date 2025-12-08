import React from "react";
import { Layers, Calendar, Newspaper, Sparkles, ImageIcon } from "lucide-react";
import Footer from "./Footer";

/**
 * Renders the generated poster using a specific template layout.
 * @param {string} templateId - The ID of the selected template.
 * @param {object} content - {headline, body, cta, imageUrl} from AI generation.
 * @param {string} logoUrl - The user's logo URL from Firestore.
 */
export const PosterDisplay = ({ templateId, content }) => {

  const handleDownload = async () => {
    const input = document.getElementById('poster-to-download');

    if (!input) {
        console.error("Target element 'poster-to-download' not found.");
        return;
    }

    try {
        // 1. Capture the DIV and convert it to a Canvas
        const canvas = await html2canvas(input, {
            // Options for better quality and handling of external images
            useCORS: true, // Important for background/logo images from external sources (like Firebase/AI API)
            scale: 2, // Increase scale for higher resolution download
        });

        // 2. Convert Canvas to PNG data URL
        const image = canvas.toDataURL('image/png');

        // 3. Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = image;
        link.download = 'ai-poster-design.png'; // Suggested file name
        
        // 4. Simulate a click on the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the temporary element
        
    } catch (error) {
        console.error("Failed to generate or download image:", error);
        setError("Download failed. Check console for details.");
    }
};
  const { headline, body, cta, imageUrl } = content;
  

  // Base poster container styles: Fixed aspect ratio, maximum desktop size, responsive on mobile
// Example: 400px wide by 500px tall (a 4:5 ratio)
const baseContainerStyle = "w-[400px] h-[500px] rounded-xl shadow-2xl overflow-hidden relative flex transition-all duration-500 mx-auto my-4 font-sans";    
const logoUrl="./HM-logo2.png"
  // Fallback image source on load error
  const onErrorFallback = (e) =>
    (e.target.src =
      "https://placehold.co/1024x768/CCCCCC/333333?text=Image+Load+Error");

  // Logo Component Helper - Defines base styles for the logo image
  const Logo = ({ className = "absolute top-4 left-4 w-12 h-12" }) =>
    logoUrl ? (
      <img style={{width:'100px'}}
        src={logoUrl}
        alt="User Logo"
        className={`object-contain p-1  transition-transform hover:scale-105`}
        onError={onErrorFallback}
      />
    ) : null;

    // Assume these components are defined elsewhere and available:
// const PrimaryLogo = () => <img src="./OQ.png" width="60px" alt="Primary Logo" />;
// const SecondaryLogo = ({ className }) => <Logo className={className} />;
// The original code seems to use `Logo` for the secondary brand, so I'll stick to the original component names for minimal disruption:
// Logo (the secondary component) and a direct image tag for the primary one (./OQ.png).
// I will ensure both are present in all 14 templates in logical, distinct locations.


if (templateId === "1") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>
      <img
        src={imageUrl}
        alt="Generated Poster Visual"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />

      <div className="relative z-10 p-6 flex flex-col justify-between w-full h-full"> {/* p-6 for tighter padding */}

        {/* Top Left Branding - PRIMARY Logo (using ./OQ.png) */}
        <div className="flex items-center">
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller Logo */}
          <h1 className="text-md font-bold ml-2">
             {/* Removed h1 content to ensure space for the logo image */}
          </h1>
        </div>

        {/* Middle Content - Centered for balance */}
        <div className="text-left my-auto"> {/* my-auto centers content vertically in remaining space */}
          <h2 className="font-extrabold uppercase mb-2 drop-shadow-xl leading-snug text-md md:text-2xl">
            {headline} {/* Reduced font size to text-3xl */}
          </h2>
          <p className="text-sm font-light mb-4 opacity-90 drop-shadow-md italic">
            {body} {/* Reduced font size to text-sm */}
          </p>

          <span className="inline-block py-2 px-5 bg-indigo-600 rounded-full text-md font-bold shadow-xl">
            {cta} {/* Reduced font size to text-md */}
          </span>
        </div>

        {/* Bottom Right Secondary Logo - SECONDARY Logo (using Logo component) */}
        <div className="flex justify-between items-end">
          <Footer /> {/* Footer placed at the bottom left */}
          <Logo className="w-14 h-14 bg-white p-1 rounded-lg shadow-xl" /> {/* Smaller Logo */}
        </div>
      </div>
    </div>
  );
}


if (templateId === "2") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>
      <img
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />

      <div className="relative z-10 p-6 flex flex-col justify-between w-full h-full"> {/* p-6 for tighter padding */}

        {/* Center Top PRIMARY Logo (using ./OQ.png) */}
        <div className="flex justify-center items-center pt-4"> {/* Added pt-4 */}
          <img src="./OQ.png" width="60px" alt="Primary Logo" />
          <h1 className="text-md font-bold ml-3">
             {/* Removed h1 content */}
          </h1>
        </div>

        {/* Secondary Logo Top Right - SECONDARY Logo (using Logo component) */}
        <div className="absolute right-6 top-6">
          <Logo className="w-12 h-12 bg-white p-1 rounded-lg shadow-xl" /> {/* Smaller Logo */}
        </div>

        {/* Content - Adjusted mt-32 to use my-auto for better distribution */}
        <div className="text-center my-auto">
          <h2 className="font-black uppercase mb-3 drop-shadow-xl text-3xl">
            {headline} {/* Reduced font size to text-3xl */}
          </h2>
          <p className="text-base mb-6 drop-shadow-md italic opacity-90">{body}</p>
          <span className="py-2 px-5 bg-indigo-600 rounded-full text-md font-bold shadow-xl">{cta}</span> {/* Reduced font size to text-md */}
        </div>

        <Footer />
      </div>
    </div>
  );
}


if (templateId === "3") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" onError={onErrorFallback}/>

      <div className="relative z-10 flex h-full">
        
        {/* Left Vertical Bar (Containing BOTH Logos) */}
        <div className="w-20 bg-black/50 flex flex-col items-center justify-between py-6"> {/* Narrower bar, py-6 for spacing */}
          {/* PRIMARY Logo (using ./OQ.png) */}
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller Logo */}
          {/* SECONDARY Logo (using Logo component) */}
          <Logo className="w-12 h-12 bg-white p-1 rounded-lg shadow-xl" /> {/* Smaller Logo */}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-center text-left"> {/* p-6 for padding */}
          <h2 className="font-black uppercase drop-shadow-xl mb-2 leading-snug text-3xl">
            {headline} {/* Reduced font size to text-3xl */}
          </h2>
          <p className="text-base opacity-90 mb-4 italic drop-shadow-md">{body}</p>
          <span className="inline-block py-2 px-5 bg-indigo-600 text-md rounded-full">{cta}</span> {/* Reduced font size to text-md */}
        </div>
      </div>

      <Footer /> {/* Footer position moved to be part of the main flex context if possible, or adjust based on your Footer component implementation */}
    </div>
  );
}

if (templateId === "4") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-70" onError={onErrorFallback} />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full"> {/* p-6 for padding */}

        {/* Top Right Logos (Containing BOTH Logos) */}
        <div className="flex justify-end space-x-2 pt-4" style={{display:'flex',alignItems:'center', flexDirection:'column'}}> {/* Adjusted spacing and padding */}
          {/* PRIMARY Logo (using ./OQ.png) */}
          <img src="./OQ.png" width={"50px"} alt="Primary Logo"/> 
          {/* SECONDARY Logo (using Logo component) */}
          <Logo className="w-14 h-14 bg-white p-1 rounded-lg shadow-xl"/> {/* Smaller Logo */}
        </div>

        {/* Bottom Heavy Text */}
        <div className="text-left mb-8"> {/* Reduced mb-16 to mb-8 */}
          <h2 className="font-black uppercase mb-2 drop-shadow-xl leading-snug text-3xl">
            {headline} {/* Reduced font size to text-3xl */}
          </h2>
          <p className="text-base italic mb-4 opacity-90">{body}</p> {/* Reduced margin */}
          <span className="py-2 px-5 bg-indigo-600 text-md font-bold rounded-full shadow-xl">{cta}</span> {/* Reduced font size to text-md */}
        </div>

        <Footer />
      </div>
    </div>
  );
}


if(templateId === "5") { return (
  <div id="poster-to-download" className={`${baseContainerStyle} bg-neutral-800 text-white`}>
    <img
      src={imageUrl}
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      onError={onErrorFallback}
    />

    <div className="relative z-10 p-6 flex flex-col h-full justify-between"> {/* p-6 for padding */}

      {/* Top Right Secondary Logo - PRIMARY Logo (using ./OQ.png) */}
      <div className="flex justify-end pt-4">
        <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller Logo */}
      </div>

      {/* Center Content for balance */}
      <div className="text-center my-auto"> {/* Use my-auto to center vertically */}
        <h2 className="text-3xl font-bold leading-tight">{headline}</h2> {/* Reduced font size to text-3xl */}
        <p className="mt-3 opacity-90 italic text-base">{body}</p>
        <span className="mt-4 inline-block py-2 px-5 bg-orange-600 text-md rounded-full">
          {cta} {/* Reduced font size to text-md */}
        </span>
      </div>

      {/* Bottom Center - SECONDARY Logo (using Logo component) */}
      <div className="pb-4"> {/* Added padding bottom */}
        <Logo className="w-16 h-16 bg-white p-1 rounded-lg shadow mx-auto" /> {/* Smaller Logo */}
      </div>

      <Footer />
    </div>
  </div>
)}


if(templateId === "6") { 
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-white text-black`}>
      <img
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />

      <div className="relative z-10 h-full flex">

        {/* Left Content (Containing SECONDARY Logo) - 50% width */}
        <div className="w-1/2 p-6 flex flex-col justify-center bg-white/80 backdrop-blur-sm"> {/* Added background for readability */}
          {/* SECONDARY Logo (using Logo component) */}
          <Logo className="w-12 h-12 bg-white shadow rounded mb-4" /> {/* Smaller logo, less margin */}
          <h2 className="text-3xl font-bold leading-snug">{headline}</h2> {/* Tighter leading, smaller font */}
          <p className="opacity-85 italic mt-2 text-sm">{body}</p> {/* Smaller body font */}
          <span className="mt-4 inline-block py-2 px-5 bg-purple-600 text-white rounded text-md">
            {cta} {/* Smaller CTA font */}
          </span>
        </div>

        {/* Right Logo (Containing PRIMARY Logo) - 50% width */}
        <div className="w-1/2 flex justify-end items-start p-6">
          {/* PRIMARY Logo (using ./OQ.png) */}
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller logo */}
        </div>

      </div>

      <Footer />
    </div>
  )
}

if(templateId === "7") { 
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>

      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Background Visual" />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full"> {/* Tighter padding: p-6 */}

        {/* Top Left - SECONDARY Logo (using Logo component) */}
        <Logo className="w-12 h-12 bg-white p-1 rounded" /> {/* Smaller logo, removed mb-4 to use space */}

        <div className="my-auto text-center"> {/* Use my-auto for better vertical center */}
          <h2 className="text-3xl font-bold leading-snug">{headline}</h2> {/* Smaller font */}
          <p className="mt-2 italic opacity-85 text-base">{body}</p>
          <span className="mt-4 inline-block bg-teal-600 py-2 px-5 rounded-full text-md">
            {cta} {/* Smaller CTA font */}
          </span>
        </div>

        {/* Bottom Right - PRIMARY Logo (using ./OQ.png) */}
        <div className="flex justify-end">
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller logo */}
        </div>

        <Footer />
      </div>
    </div>
  )
}

if(templateId === "8") { 
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-white text-black`}>

      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-65" alt="Background Visual" />

      <div className="relative z-10 flex h-full">

        <div className="w-1/2 p-6 flex flex-col justify-between bg-white/70 backdrop-blur-sm"> {/* Added background for readability */}
          {/* Top Left - SECONDARY Logo (using Logo component) */}
          <Logo className="w-12 h-12 bg-white p-1 rounded shadow" /> {/* Smaller logo */}

          <div className="my-auto"> {/* Centered content vertically */}
            <h2 className="text-2xl font-extrabold leading-snug">{headline}</h2> {/* Smaller font: text-2xl */}
            <p className="mt-2 italic opacity-80 text-sm">{body}</p> {/* Smaller body font */}
          </div>

          <span className="inline-block bg-red-600 text-white py-2 px-5 rounded text-md">
            {cta} {/* Smaller CTA font */}
          </span>
        </div>

        {/* Bottom Right - PRIMARY Logo (using ./OQ.png) */}
        <div className="w-1/2 flex justify-end items-end p-6">
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller logo */}
        </div>

      </div>

      <Footer />
    </div>
  )
}

if(templateId === "9") { 
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>

      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-65" alt="Background Visual" />

      <div className="relative z-10 p-6 flex flex-col h-full justify-between"> {/* Tighter padding: p-6 */}

        {/* Top Logos (Containing BOTH Logos) */}
        <div className="flex justify-between pt-4"> {/* Added padding top */}
          {/* PRIMARY Logo (using ./OQ.png) */}
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller logo */}
          {/* SECONDARY Logo (using Logo component) */}
          <Logo className="w-14 h-14 bg-white p-1 rounded shadow" /> {/* Smaller logo */}
        </div>

        <div className="my-auto text-center"> {/* Centered content vertically */}
          <h2 className="text-3xl font-bold leading-snug">{headline}</h2> {/* Smaller font */}
          <p className="italic mt-2 text-base">{body}</p>
        </div>

        <span className="inline-block mx-auto mb-4 bg-yellow-600 text-white py-2 px-6 rounded-full text-md"> {/* Reduced margin bottom to mb-4 */}
          {cta}
        </span>

        <Footer />
      </div>
    </div>
  )
}

if (templateId === "10") {
  return(
    <div id="poster-to-download" className={`${baseContainerStyle} bg-neutral-900 text-white`}>

      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Background Visual" />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full"> {/* Tighter padding: p-6 */}

        {/* Top Center Logos (Containing BOTH Logos) */}
        <div className="flex justify-center space-x-3 pt-4"> {/* Adjusted spacing and added padding top */}
          {/* SECONDARY Logo (using Logo component) */}
          <Logo className="w-12 h-12 bg-white p-1 rounded shadow" /> {/* Smaller logo */}
          {/* PRIMARY Logo (using ./OQ.png) */}
          <img src="./OQ.png" width="50px" alt="Primary Logo" /> {/* Smaller logo */}
        </div>

        <div className="text-center my-auto"> {/* Centered content vertically */}
          <h2 className="text-3xl font-bold leading-snug">{headline}</h2> {/* Smaller font */}
          <p className="opacity-90 italic mt-2 text-base">{body}</p>
          <span className="mt-4 inline-block py-2 px-6 rounded-full bg-blue-600 text-white text-md">
            {cta} {/* Smaller CTA font */}
          </span>
        </div>

        <Footer />
      </div>
    </div>
  )
}


  // --- Template 11: Minimalist Focus (Image Top, Text Center) ---
 // PosterDisplay Component Logic (Updated Templates 11-14)

if (templateId === "11") {
  return (
    <div
      id="poster-to-download" className={`${baseContainerStyle} flex-col bg-white border border-gray-200`}
    >
      <div className="w-full h-2/3 relative">
        {/* Image Section */}
        <img
          src={imageUrl}
          alt="Generated Poster Visual"
          className="object-cover w-full h-full"
          onError={onErrorFallback}
        />
        {/* Logo Placement 1: Top Left - SECONDARY Logo (using Logo component) */}
        <Logo className="absolute top-3 left-3 w-10 h-10 bg-white p-1 rounded-full shadow-lg" /> {/* Tighter sizing */}
        
        {/* NEW: Primary Logo - Top Right */}
        <img src="./OQ.png" width="35px" alt="Primary Logo" className="absolute top-3 right-3" /> {/* Tighter sizing */}
      </div>

      <div className="w-full h-1/3 p-4 flex flex-col justify-center text-center"> {/* Reduced padding to p-4 */}
        <h1 className="font-extrabold text-gray-900 leading-snug mb-2 text-2xl">
          {headline} {/* Reduced font size to text-2xl */}
        </h1>
        <p className="text-xs text-gray-600 mb-2 line-clamp-3"> {/* Smaller text-xs, line-clamp-3 for control */}
          {body}
        </p>
        <div className="text-md font-bold text-indigo-600 border-t pt-2 mt-auto"> {/* Reduced CTA font to text-md */}
          {cta}
        </div>
        <Footer /> {/* Assuming Footer goes outside main content block */}
      </div>
    </div>
  );
}

// --- Template 12: Bold & Blocky (Text Top/Bottom, Image Background) ---
if (templateId === "12") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-black text-white`}>
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Generated Poster Visual"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />
      {/* Content Overlay */}
      <div className="relative z-10 p-6 flex flex-col justify-between w-full h-full"> {/* Reduced padding to p-6 */}
        <div className="flex justify-between items-center pt-4"> {/* Added padding top */}
          {/* PRIMARY Logo (using ./OQ.png) - Top Left */}
          <div className="flex items-center">
              <img src="./OQ.png" width={"50px"} alt="Primary Logo" /> {/* Reduced logo size */}
              <h1 className="text-md font-bold ml-2"></h1> {/* Tighter h1 style */}
          </div>
          {/* SECONDARY Logo (using Logo component) - Top Right */}
          <Logo className="w-14 h-14 object-contain bg-white p-1 rounded-lg shadow-xl relative" /> {/* Reduced logo size */}
        </div>

        <div className="text-center my-auto"> {/* Replaced hardcoded margin-top with my-auto for better centering */}
          <h2 className=" font-black uppercase mb-2 drop-shadow-xl leading-snug text-3xl"> {/* Reduced font size to text-3xl */}
            {headline}
          </h2>
          <p className="text-sm font-light mb-4 opacity-90 italic drop-shadow-md"> {/* Reduced font size to text-sm and margin */}
            {body}
          </p>
          <span className="inline-block py-2 px-5 bg-indigo-600 text-white font-bold text-md rounded-full shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105"> {/* Reduced CTA font to text-md */}
            {cta}
          </span>
          
        </div>
        <div><Footer/></div>
      </div>
    </div>
  );
}

// --- Template 13: Magazine Cover Style (Image Left, Text Right) ---
if (templateId === "13") {
  return (
    <div id="poster-to-download" className={`${baseContainerStyle} bg-white text-gray-900 flex-row`}>
      {/* Image Section (Left 60%) */}
      <div className="w-[60%] relative">
        <img
          src={imageUrl}
          alt="Magazine Cover Image"
          className="object-cover w-full h-full"
          onError={onErrorFallback}
        />
        {/* SECONDARY Logo (using Logo component) - Bottom Left, partially transparent */}
        <Logo className="absolute bottom-3 left-3 w-14 h-14 bg-white/90 p-1 rounded-full shadow-xl" /> {/* Tighter sizing */}
      </div>
      {/* Text Section (Right 40%) */}
      <div className="w-[40%] p-4 flex flex-col justify-center border-l-4 border-red-600"> {/* Reduced padding to p-4 */}
        <div className="flex justify-between items-center mb-3"> {/* Reduced margin bottom */}
            {/* Primary Logo (using ./OQ.png) - Top Right Corner of Text Block */}
          <img src="./OQ.png" width="35px" alt="Primary Logo" /> {/* Tighter sizing */}
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wider flex items-center"> {/* Smaller text-xs */}
            {/* Assuming Newspaper is available: */}
            {/* <Newspaper className="w-3 h-3 mr-1" /> */} Exclusive
          </div>
        </div>
        <h1 className="text-2xl font-black leading-snug mb-2"> {/* Reduced font size to text-2xl */}
          {headline}
        </h1>
        <p className="text-xs text-gray-700 mb-4 line-clamp-5">{body}</p> {/* Smaller text-xs, line-clamp-5 for control */}
        <div className="mt-auto pt-2 border-t border-gray-200"> {/* Reduced padding top */}
          <span className="inline-block py-1 px-3 bg-gray-900 text-white font-semibold text-xs rounded-md hover:bg-gray-700 transition"> {/* Smaller CTA font and padding */}
            Read More: {cta}
          </span>
        </div>
        <Footer /> {/* Assuming Footer goes outside main content block */}
      </div>
    </div>
  );
}

// --- Template 14: Event Schedule (Text Heavy, Image Accent) ---
if (templateId === "14") {
  return (
    <div
      id="poster-to-download" className={`${baseContainerStyle} flex-col bg-gray-50 text-gray-800`}
    >
      <div className="p-4 w-full flex-grow flex flex-col justify-start"> {/* Reduced padding to p-4 */}
        <div className="flex justify-between items-center mb-4"> {/* Reduced margin bottom */}
          <h1 className="text-md font-black text-indigo-700 tracking-wide uppercase flex items-center"> {/* Reduced font size to text-md */}
            {/* Assuming Sparkles is available: */}
            {/* <Sparkles className="w-5 h-5 mr-2 text-yellow-500" /> */} Grand Opening Event
          </h1>
          {/* Logo Placement 4: Top Center/Right - SECONDARY Logo (using Logo component) */}
          <Logo className="w-8 h-8 object-contain bg-white p-1 rounded-full shadow-md relative" /> {/* Tighter sizing */}
        </div>

        {/* NEW: Primary Logo - Near Secondary Logo */}
        <div className="flex justify-end -mt-4 mb-2"> {/* Tighter spacing */}
            <img src="./OQ.png" width="40px" alt="Primary Logo" /> {/* Tighter sizing */}
        </div>
        
        <h2 className="text-4xl font-extrabold leading-tight mb-3"> {/* Reduced font size to text-4xl and leading */}
          {headline}
        </h2>
        <p className="text-sm text-gray-700 mb-4">{body}</p> {/* Reduced font size to text-sm and margin */}

        <div className="mt-auto pt-3 border-t border-gray-200"> {/* Reduced padding top */}
          <span className="text-md font-bold text-red-600 block mb-1"> {/* Reduced font size to text-md and margin */}
            {cta}
          </span>
          <div className="flex items-center text-xs text-gray-500"> {/* Smaller text-xs */}
            {/* Assuming Calendar is available: */}
            {/* <Calendar className="w-3 h-3 mr-2" /> */}
            Full details on our site.
          </div>
        </div>
      </div>

      {/* Image Accent (Bottom Strip) */}
      <div className="w-full h-16 relative overflow-hidden"> {/* Reduced height to h-16 */}
        <img
          src={imageUrl}
          alt="Event Visual Accent"
          className="object-cover w-full h-full opacity-50"
          onError={onErrorFallback}
        />
        <div className="absolute inset-0 bg-indigo-800/80 flex items-center justify-center text-white text-base font-bold tracking-widest"> {/* Reduced font size to text-base */}
          {cta}
        </div>
      </div>
      <Footer /> {/* Assuming Footer goes outside main content block */}
    </div>
  );
}

  // Default Fallback Template (in case templateId is unknown)
  return (
   <>
      <div
        className={`${baseContainerStyle} flex-col justify-center items-center bg-gray-900 text-white p-8 text-center`}
      >
        <div className="text-sm font-light text-indigo-400 mb-2">
          Template ID: {templateId}
        </div>
        {(
          <Logo className="w-10 h-10 object-contain bg-white p-1 rounded-full mb-4 relative" />
        )}
       
        <h1 className="text-md font-extrabold mb-3">{headline}</h1>
        <p className="text-md text-gray-300 mb-4">{body}</p>
        <div className="text-md font-semibold text-indigo-300">{cta}</div>
        <div className="mt-4 text-xs text-gray-500">
          Selected template is not yet implemented.
        </div>
        
      </div>
       
   </>
    
  );
};
