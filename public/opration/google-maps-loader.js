let googleMapsLoaded = false; // Track if Google Maps script is loaded

// Load Google Maps Script
function loadGoogleMapsScript(callback, GOOGLE_MAPS_API_KEY) {
    // Check if the script has already been loaded
    if (!localStorage.getItem('googleMapsLoaded')) {
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callback}&loading=async`;

            script.async = true;
            script.defer = true;

            // Mark script as loaded once it successfully loads
            script.onload = () => {
                localStorage.setItem('googleMapsLoaded', 'true'); // Store the flag in localStorage
                if (callback && typeof window[callback] === "function") {
                    window[callback]();
                }
            };
            console.log('Google Maps script is loaded');
            // Append script to the document
            document.head.appendChild(script);
        }
    } else if (callback && typeof window[callback] === "function") {
        console.log('Google Maps script already loaded');
        window[callback]();
    }
}
