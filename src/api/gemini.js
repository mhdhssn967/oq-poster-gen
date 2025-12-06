// src/api/gemini.js

// API key is expected to be provided by the runtime environment
const apiKey = "AIzaSyDQznyHVIOoQzsTuJtdBGmg3_Yr6lTIPxk"; 

/**
 * Executes a fetch request with exponential backoff for retries.
 */
export const fetchWithBackoff = async (url, options, maxRetries = 5, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status !== 429 || i === maxRetries - 1) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }
                console.warn(`Attempt ${i + 1} failed (Rate Limit). Retrying in ${delay}ms...`);
            } else {
                return await response.json();
            }
        } catch (error) {
            if (i === maxRetries - 1) {
                console.error("Max retries reached. Final error:", error);
                throw error;
            }
            console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; 
    }
};

/**
 * Generates structured marketing text using Gemini 2.5 Flash.
 */
export const generateText = async (prompt) => {
    
    const systemPrompt = "You are a witty, concise marketing copywriter. Generate a headline (10 words max), a descriptive body paragraph (5 bullet points), and a clear call-to-action (5 words max) for a poster based on the user's request.";
    const userQuery = `Generate marketing text for a poster about: ${prompt}`;

    const responseSchema = {
        type: "OBJECT",
        properties: {
            "headline": { "type": "STRING", "description": "A catchy, short title." },
            "body": { "type": "STRING", "description": "The main descriptive message" },
            "cta": { "type": "STRING", "description": "A strong call-to-action." }
        },
        required: ["headline", "body", "cta"]
    };

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    try {
        const result = await fetchWithBackoff(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const jsonString = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        throw new Error("Text generation failed to return structured JSON.");

    } catch (error) {
        console.error("Error in generateText:", error);
        return {
            headline: "AI Text Error",
            body: "Content generation failed. Check console.",
            cta: "Regenerate"
        };
    }
};
/**
 * Generates an image using Imagen 4.0.
 */
export const generateImage = async (prompt, imageStyle) => {
    
    
    const userPrompt = `
A realistic, vibrant image to be used as a background like ${imageStyle}.VERY REALISTIC, SUITABLE FOR THE SETTING FOR THE PROMPT GIVEN.IMAGE SHOULD LOOK LIKE IT WAS PHOTOGRAPHED IN THE REAL WORLD. WITHOUT ANY TEXT, LOGOS, OR WATERMARKS.Make sure there are no sci-fi or unrealistic elements`;

    
    // SWITCHING MODEL to a more reliable alternative
    const modelName = "gemini-2.5-flash-image-preview";

    // SWITCHING PAYLOAD STRUCTURE to use the standard generateContent endpoint
    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
            // Request the image modality in the response
            responseModalities: ['TEXT', 'IMAGE'] 
        },
    };
    
    // Correct URL for the Gemini Flash model using the 'generateContent' endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        // fetchWithBackoff is assumed to be defined in your App.jsx
        // ADJUSTING BACKOFF PARAMETERS TO BE MORE AGGRESSIVE (7 retries, starting at 2000ms delay)
        const result = await fetchWithBackoff(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }, 7, 2000); // <-- CHANGES HERE

        // CRITICAL: Extract the image data from the 'inlineData' part (standard for generateContent)
        const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        
        if (base64Data) {
            return `data:image/png;base64,${base64Data}`;
        }
        
        // Throw error if data is missing from an otherwise successful response
        // throw new Error(`Image generation failed. Response missing image data.`);
        
    } catch (error) {
        console.error("Error in generateImage:", error);
        // Fallback placeholder image on failure
        return `https://placehold.co/1024x576/333333/FFFFFF?text=Image+Gen+Error`;
    }
};