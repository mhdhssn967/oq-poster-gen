import React from "react";
import { Layers, Calendar, Newspaper, Sparkles } from "lucide-react";
import Footer from "./Footer";

/**
 * Renders the generated poster using a specific template layout.
 * @param {string} templateId - The ID of the selected template.
 * @param {object} content - {headline, body, cta, imageUrl} from AI generation.
 * @param {string} logoUrl - The user's logo URL from Firestore.
 */
export const PosterDisplay = ({ templateId, content, logoUrl }) => {
  const { headline, body, cta, imageUrl } = content;
  

  // Base poster container styles: Fixed aspect ratio, maximum desktop size, responsive on mobile
  const baseContainerStyle = "w-full max-w-lg aspect-[1/1.4] rounded-xl shadow-2xl overflow-hidden relative flex transition-all duration-500 mx-auto my-4 font-sans";
    

  // Fallback image source on load error
  const onErrorFallback = (e) =>
    (e.target.src =
      "https://placehold.co/1024x768/CCCCCC/333333?text=Image+Load+Error");

  // Logo Component Helper - Defines base styles for the logo image
  const Logo = ({ className = "absolute top-4 left-4 w-12 h-12" }) =>
    logoUrl ? (
      <img
        src={logoUrl}
        alt="User Logo"
        className={`${className} object-contain bg-white p-1 rounded-full shadow-lg transition-transform hover:scale-105`}
        onError={onErrorFallback}
      />
    ) : null;

    if (templateId === "1") {
  return (
    <div className={`${baseContainerStyle} bg-black text-white`}>
      <img
        src={imageUrl}
        alt="Generated Poster Visual"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />

      <div className="relative z-10 p-8 flex flex-col justify-between w-full h-full">

        {/* Top Left Branding */}
        <div className="flex items-center">
          <img src="./OQ.png" width="60px" alt="" />
          <h1 style={{ fontSize: '30px', fontWeight: '700', marginLeft: '5px' }}>
            Oqulix Pvt Ltd
          </h1>
        </div>

        {/* Middle Content */}
        <div className="text-left mt-32">
          <h2 className="font-black uppercase mb-3 drop-shadow-xl leading-tight" style={{ fontSize: '32px' }}>
            {headline}
          </h2>
          <p className="text-base font-light mb-6 opacity-90 drop-shadow-md italic">
            {body}
          </p>

          <span className="inline-block py-2 px-6 bg-indigo-600 rounded-full text-xl font-bold shadow-xl">
            {cta}
          </span>
        </div>

        {/* Bottom Right Secondary Logo */}
        <div className="flex justify-end mb-4">
          <Logo className="w-16 h-16 bg-white p-2 rounded-lg shadow-xl" />
        </div>

        <Footer />
      </div>
    </div>
  );
}


if (templateId === "2") {
  return (
    <div className={`${baseContainerStyle} bg-black text-white`}>
      <img
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onError={onErrorFallback}
      />

      <div className="relative z-10 p-8 flex flex-col justify-between w-full h-full">

        {/* Center Top Logo */}
        <div className="flex justify-center items-center">
          <img src="./OQ.png" width="70px" alt="" />
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginLeft: '10px' }}>
            Oqulix Pvt Ltd
          </h1>
        </div>

        {/* Secondary Logo Top Right */}
        <div className="absolute right-6 top-6">
          <Logo className="w-14 h-14 bg-white p-2 rounded-lg shadow-xl" />
        </div>

        {/* Content */}
        <div className="text-center mt-32">
          <h2 className="font-black uppercase mb-3 drop-shadow-xl" style={{ fontSize: '30px' }}>
            {headline}
          </h2>
          <p className="text-base mb-6 drop-shadow-md italic opacity-90">{body}</p>
          <span className="py-2 px-6 bg-indigo-600 rounded-full text-xl font-bold shadow-xl">{cta}</span>
        </div>

        <Footer />
      </div>
    </div>
  );
}


if (templateId === "3") {
  return (
    <div className={`${baseContainerStyle} bg-black text-white`}>
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" onError={onErrorFallback}/>

      <div className="relative z-10 flex h-full">
        
        {/* Left Vertical Bar */}
        <div className="w-24 bg-black/50 flex flex-col items-center justify-between py-8">
          <img src="./OQ.png" width="60px" alt="" />
          <Logo className="w-14 h-14 bg-white p-2 rounded-lg shadow-xl" />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col justify-center text-left">
          <h2 className="font-black uppercase drop-shadow-xl mb-3" style={{ fontSize: '32px' }}>
            {headline}
          </h2>
          <p className="text-base opacity-90 mb-6 italic drop-shadow-md">{body}</p>
          <span className="inline-block py-2 px-6 bg-indigo-600 text-xl rounded-full">{cta}</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

if (templateId === "4") {
  return (
    <div className={`${baseContainerStyle} bg-black text-white`}>
      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-70" onError={onErrorFallback} />

      <div className="relative z-10 p-8 flex flex-col justify-between h-full">

        {/* Top Right Logos */}
        <div className="flex justify-end space-x-3">
          <img src="./OQ.png" width="60px" alt=""/>
          <Logo className="w-16 h-16 bg-white p-2 rounded-lg shadow-xl"/>
        </div>

        {/* Bottom Heavy Text */}
        <div className="text-left mb-16">
          <h2 className="font-black uppercase mb-3 drop-shadow-xl" style={{ fontSize: '34px' }}>
            {headline}
          </h2>
          <p className="text-base italic mb-6 opacity-90">{body}</p>
          <span className="py-2 px-6 bg-indigo-600 text-xl font-bold rounded-full shadow-xl">{cta}</span>
        </div>

        <Footer />
      </div>
    </div>
  );
}


if(templateId === "5") { return (
  <div className={`${baseContainerStyle} bg-neutral-800 text-white`}>
    <img
      src={imageUrl}
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      onError={onErrorFallback}
    />

    <div className="relative z-10 p-8 flex flex-col h-full justify-between">

      {/* Top Right Secondary Logo */}
      <div className="flex justify-end">
        <img src="./OQ.png" width="60px" />
      </div>

      {/* Bottom Content */}
      <div className="text-center mb-24">
        <h2 className="text-4xl font-bold">{headline}</h2>
        <p className="mt-3 opacity-90 italic">{body}</p>
        <span className="mt-4 inline-block py-2 px-6 bg-orange-600 text-lg rounded-full">
          {cta}
        </span>
      </div>

      <Logo className="w-20 h-20 bg-white p-2 rounded-lg shadow mx-auto" />

      <Footer />
    </div>
  </div>
)}


if(templateId === "6") { return (
  <div className={`${baseContainerStyle} bg-white text-black`}>
    <img
      src={imageUrl}
      className="absolute inset-0 w-full h-full object-cover opacity-70"
      onError={onErrorFallback}
    />

    <div className="relative z-10 h-full flex">

      {/* Left Content */}
      <div className="w-1/2 p-6 flex flex-col justify-center">
        <Logo className="w-14 h-14 bg-white shadow rounded mb-6" />
        <h2 className="text-3xl font-bold">{headline}</h2>
        <p className="opacity-85 italic mt-2">{body}</p>
        <span className="mt-4 inline-block py-2 px-5 bg-purple-600 text-white rounded">
          {cta}
        </span>
      </div>

      {/* Right Logo */}
      <div className="w-1/2 flex justify-end items-start p-6">
        <img src="./OQ.png" width="60px" />
      </div>

    </div>

    <Footer />
  </div>
)}

if(templateId === "7") { return (
  <div className={`${baseContainerStyle} bg-black text-white`}>

    <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" />

    <div className="relative z-10 p-8 flex flex-col justify-between h-full">

      <Logo className="w-12 h-12 bg-white p-2 rounded mb-4" />

      <div className="mt-32 text-center">
        <h2 className="text-4xl font-bold">{headline}</h2>
        <p className="mt-2 italic opacity-85">{body}</p>
        <span className="mt-5 inline-block bg-teal-600 py-2 px-5 rounded-full">
          {cta}
        </span>
      </div>

      <div className="flex justify-end">
        <img src="./OQ.png" width="55px" />
      </div>

      <Footer />
    </div>
  </div>
)}

if(templateId === "8") { return (
  <div className={`${baseContainerStyle} bg-white text-black`}>

    <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-65" />

    <div className="relative z-10 flex h-full">

      <div className="w-1/2 p-6 flex flex-col justify-between">
        <Logo className="w-14 h-14 bg-white p-2 rounded shadow" />

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold">{headline}</h2>
          <p className="mt-2 italic opacity-80">{body}</p>
        </div>

        <span className="inline-block bg-red-600 text-white py-2 px-5 rounded">
          {cta}
        </span>
      </div>

      <div className="w-1/2 flex justify-end items-end p-6">
        <img src="./OQ.png" width="60px" />
      </div>

    </div>

    <Footer />
  </div>
)}

if(templateId === "9") { return (
  <div className={`${baseContainerStyle} bg-black text-white`}>

    <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-65" />

    <div className="relative z-10 p-6 flex flex-col h-full justify-between">

      <div className="flex justify-between">
        <img src="./OQ.png" width="60px" />
        <Logo className="w-16 h-16 bg-white p-2 rounded shadow" />
      </div>

      <div className="mt-40 text-center">
        <h2 className="text-4xl font-bold">{headline}</h2>
        <p className="italic mt-2">{body}</p>
      </div>

      <span className="inline-block mx-auto mb-16 bg-yellow-600 text-white py-2 px-6 rounded-full text-lg">
        {cta}
      </span>

      <Footer />
    </div>

  </div>
)}

if (templateId === "10") {
  return(
  <div className={`${baseContainerStyle} bg-neutral-900 text-white`}>

    <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" />

    <div className="relative z-10 p-8 flex flex-col justify-between h-full">

      <div className="flex justify-center space-x-4">
        <Logo className="w-14 h-14 bg-white p-2 rounded shadow" />
        <img src="./OQ.png" width="55px" />
      </div>

      <div className="text-center mt-16">
        <h2 className="text-4xl font-bold">{headline}</h2>
        <p className="opacity-90 italic mt-2">{body}</p>
        <span className="mt-4 inline-block py-2 px-6 rounded-full bg-blue-600 text-white">
          {cta}
        </span>
      </div>

      <Footer />
    </div>
  </div>
);}


  // --- Template 1: Minimalist Focus (Image Top, Text Center) ---
  if (templateId === "11") {
    return (
      <div
        className={`${baseContainerStyle} flex-col bg-white border border-gray-200`}
      >
        <div className="w-full h-2/3 relative">
          {/* Image Section */}
          <img
            src={imageUrl}
            alt="Generated Poster Visual"
            className="object-cover w-full h-full"
            onError={onErrorFallback}
          />
          {/* Logo Placement 1: Top Left */}
          <Logo />
        </div>
        <div className="w-full h-1/3 p-6 md:p-10 flex flex-col justify-center text-center">
          <h1 className="font-extrabold text-gray-900 leading-tight mb-2" style={{fontSize:'30px'}}>
            {headline}
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
            {body}
          </p>
          <div className="text-lg md:text-2xl font-bold text-indigo-600 border-t pt-2 mt-auto">
            {cta}
          </div>
        </div>
      </div>
    );
  }

  // --- Template 2: Bold & Blocky (Text Top/Bottom, Image Background) ---
  if (templateId === "12") {
    return (
      <div className={`${baseContainerStyle} bg-black text-white`}>
        {/* Background Image */}
        <img
          src={imageUrl}
          alt="Generated Poster Visual"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          onError={onErrorFallback}
        />
        {/* Content Overlay */}
        <div className="relative z-10 p-8 flex flex-col justify-between w-full h-full ">
          <div className="flex  items-start" style={{display:'flex',alignItems:'center'}}>
            {/* Logo Placement 2: Top Right */}
            <img src="./OQ.png" width={"60px"} alt="" /><h1 style={{fontSize:'30px',fontWeight:'700',marginLeft:'5px'}}>Oqulix Pvt Ltd</h1>
            <Logo className="w-16 h-16 object-contain bg-white p-2 rounded-lg shadow-xl relative" />
          </div>

          <div className="text-center" style={{marginTop:'180px'}}>
            <h2 className=" font-black uppercase mb-3 drop-shadow-xl leading-tight" style={{fontSize:'30px'}}>
              {headline}
            </h2>
            <p className="text-base font-light mb-6 opacity-90 italic drop-shadow-md">
              {body}
            </p>
            <span className="inline-block py-2 px-6 bg-indigo-600 text-white font-bold text-xl rounded-full shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105">
              {cta}
            </span>
            
          </div>
          <div style={{margin:'-30px',}}><Footer/></div>
        </div>
      </div>
    );
  }

  // --- Template 3: Magazine Cover Style (Image Left, Text Right) ---
  if (templateId === "13") {
    return (
      <div className={`${baseContainerStyle} bg-white text-gray-900 flex-row`}>
        {/* Image Section (Left 60%) */}
        <div className="w-[60%] relative">
          <img
            src={imageUrl}
            alt="Magazine Cover Image"
            className="object-cover w-full h-full"
            onError={onErrorFallback}
          />
          {/* Logo Placement 3: Bottom Left, partially transparent */}
          <Logo className="absolute bottom-4 left-4 w-16 h-16 bg-white/90 p-2 rounded-full shadow-xl" />
        </div>
        {/* Text Section (Right 40%) */}
        <div className="w-[40%] p-6 md:p-8 flex flex-col justify-center border-l-4 border-red-600">
          <div className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-2 flex items-center">
            <Newspaper className="w-4 h-4 mr-1" /> Exclusive
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-snug mb-4">
            {headline}
          </h1>
          <p className="text-sm text-gray-700 mb-6 line-clamp-4">{body}</p>
          <div className="mt-auto pt-4 border-t border-gray-200">
            <span className="inline-block py-2 px-4 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-700 transition">
              Read More: {cta}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- Template 4: Event Schedule (Text Heavy, Image Accent) ---
  if (templateId === "14") {
    return (
      <div
        className={`${baseContainerStyle} flex-col bg-gray-50 text-gray-800`}
      >
        <div className="p-8 w-full flex-grow flex flex-col justify-start">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-indigo-700 tracking-wide uppercase flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500" /> Grand
              Opening Event
            </h1>
            {/* Logo Placement 4: Top Center/Right */}
            <Logo className="w-10 h-10 object-contain bg-white p-1 rounded-full shadow-md relative" />
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-none mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{body}</p>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <span className="text-xl font-bold text-red-600 block mb-2">
              {cta}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              Full details on our site.
            </div>
          </div>
        </div>

        {/* Image Accent (Bottom Strip) */}
        <div className="w-full h-24 relative overflow-hidden">
          <img
            src={imageUrl}
            alt="Event Visual Accent"
            className="object-cover w-full h-full opacity-50"
            onError={onErrorFallback}
          />
          <div className="absolute inset-0 bg-indigo-800/80 flex items-center justify-center text-white text-xl font-bold tracking-widest">
            {cta}
          </div>
        </div>
      </div>
    );
  }

  // Default Fallback Template (in case templateId is unknown)
  return (
    <div
      className={`${baseContainerStyle} flex-col justify-center items-center bg-gray-900 text-white p-8 text-center`}
    >
      <div className="text-sm font-light text-indigo-400 mb-2">
        Template ID: {templateId}
      </div>
      {logoUrl && (
        <Logo className="w-10 h-10 object-contain bg-white p-1 rounded-full mb-4 relative" />
      )}
      <h1 className="text-4xl font-extrabold mb-3">{headline}</h1>
      <p className="text-lg text-gray-300 mb-4">{body}</p>
      <div className="text-xl font-semibold text-indigo-300">{cta}</div>
      <div className="mt-4 text-xs text-gray-500">
        Selected template is not yet implemented.
      </div>
    </div>
  );
};
