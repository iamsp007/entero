function initialize() {
    initAddress();  
}

var onlyAddressField;
var onlyAddressesField;
var onlyCityStateZip;
var latituteField;
var longitudeField;
var lastet_emergency_address_field;
var onlyAddress1Field;
var addressInserviceField;
var onlyCityField;


let autocompleteInstances = {};
let googleMapsLoaded = false; // Track if Google Maps script is loaded

// Load Google Maps Script
function loadGoogleMapsScript(callback, GOOGLE_MAPS_API_KEY) {
    if (!googleMapsLoaded) {
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callback}&loading=async`;
            script.async = true;
            script.defer = true;

            // Onload callback when the script is loaded successfully
            script.onload = () => {
                googleMapsLoaded = true;
                console.log('Google Maps script loaded');
                if (callback && typeof window[callback] === "function") {
                    window[callback](); // Call the initialize function
                }
            };

            // Handle error in loading
            script.onerror = () => {
                console.error("Error loading Google Maps script.");
            };

            // Append script to document head
            document.head.appendChild(script);
        }
    } else if (callback && typeof window[callback] === "function") {
        // If script already loaded, directly call the callback
        console.log('Google Maps script already loaded');
        window[callback](); // Call initialize function directly
    }
}

// Main initialization function
window.initialize = function () {
    // Configuration for all fields
    const fieldsConfig = [
        { id: "#address1", zip: "#zipcode", city: "#city", state: "#state", county: "#county", country: "",instanceKey: "autocomplete1" },
        { id: "#secondAddress1", zip: "#secondZipcode", city: "#secondCity", county: "#secondCounty", country: "", state: "#secondState", instanceKey: "autocomplete2" },
        { id: "#thirdAddress1", zip: "#thirdZipcode", city: "#thirdCity", state: "#thirdState", county: "#thirdCounty", country: "", instanceKey: "autocomplete3" },
        { id: "#forthAddress1", zip: "#forthZipcode", city: "#forthCity", state: "#forthState", county: "#forthCounty", country: "#forthCountry", instanceKey: "autocomplete4" },
        { id: "#fiveAddress1", zip: "#fiveZipcode", city: "#fiveCity", state: "#fiveState", county: "#fiveCountry", country: "", instanceKey: "autocomplete5" },
        { id: "#caregiverAddress1", zip: "#caregiverZipcode", city: "#caregiverCity", state: "#caregiverState", county: "#caregiverCounty", country: "", instanceKey: "autocomplete6" },     
    ];

    // Initialize the address fields for autocomplete
    fieldsConfig.forEach(config => {
        initAddressAutocomplete(config.id, config.zip, config.city, config.state, config.county, config.country, config.instanceKey);
    });
};

// Initialize autocomplete for a specific address field
function initAddressAutocomplete(addressSelector, zipSelector, citySelector, stateSelector, countySelector, countrySelector, instanceKey) {
    const addressField = document.querySelector(addressSelector);
    const zipField = document.querySelector(zipSelector);
    const cityField = document.querySelector(citySelector);
    const stateField = document.querySelector(stateSelector);
    const countyField = document.querySelector(countySelector);
    const countryField = countrySelector ? document.querySelector(countrySelector) : null;
    
    if (!addressField) return;

    addressField.addEventListener("keyup", function () {
        // if (addressField.value.length >= 3) {
            if (!autocompleteInstances[instanceKey]) {
                setupAutocomplete(addressField, zipField, cityField, stateField, countyField, countryField, instanceKey);
            }
        // }
    });
}

// Setup Google Maps autocomplete for a field
function setupAutocomplete(addressField, zipField, cityField, stateField, countyField, countryField, instanceKey) {
   
    const autocomplete = new google.maps.places.Autocomplete(addressField, {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });

    autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        let address1 = "";
        console.log(place.address_components);
        // Parse address components and populate fields
        place.address_components.forEach(component => {
            const type = component.types[0];
            
            switch (type) {
                case "street_number":
                    address1 = `${component.long_name} ${address1}`;
                    break;
                case "route":
                    address1 += component.short_name;
                    break;
                case "postal_code":
                    if (zipField) zipField.value = component.long_name;
                    break;
                case "locality":
                    if (cityField) cityField.value = component.long_name;
                    break;
                case "sublocality_level_1":
                    if (cityField) cityField.value = component.long_name;
                    break;
                case "sublocality":
                    if (cityField) cityField.value = component.long_name;
                    break;                    
                case "administrative_area_level_1":
                    if (stateField) stateField.value = component.short_name;
                    break;
                case "administrative_area_level_2":
                    if (countyField) countyField.value = component.short_name;
                    break;
                case "country":
                    console.log(component.short_name);
                    console.log(countryField);
                    if (countryField) countryField.value = component.short_name;
                    break;
            }
        });

        addressField.value = address1.trim();
    });

    // Store the instance
    autocompleteInstances[instanceKey] = autocomplete;
}

function initAddress() {    
    if ($('#lastet_emergency_address').length) {
        lastet_emergency_address_field = document.querySelector('#lastet_emergency_address');
        lastet_emergency_address = document.querySelector("#fiveAddress2");

        autocomplete8 = new google.maps.places.Autocomplete(lastet_emergency_address_field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
        });

        autocomplete8.addListener("place_changed", fillSixAddress);
    }

    if ($('#onlyAddress').length) {
        onlyAddressField = document.querySelector('#onlyAddress');
        latituteField = document.querySelector('#latitute');
        longitudeField = document.querySelector('#longitude');
        onlyCityField = document.querySelector('#onlyCity');

        autocomplete6 = new google.maps.places.Autocomplete(onlyAddressField, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry", "address_components"],
            types: ["address"],
        });

        onlyAddressField.focus();
        autocomplete6.addListener("place_changed", fillOnlyAddress);
    }

    if ($('#onlyAddresses').length) {

        onlyAddressesField = document.querySelector('#onlyAddresses');
        onlyCityStateZip = document.querySelector("#onlyCityStateZip");

        autocomplete7 = new google.maps.places.Autocomplete(onlyAddressesField, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["address_components"],
            types: ["address"],
        });

        onlyAddressesField.focus();
        autocomplete7.addListener("place_changed", fillOnlyCityStateZip);
    }

    if ($('#onlyAddress1').length) {
        onlyAddress1Field = document.querySelector('#onlyAddress1');

        autocomplete9 = new google.maps.places.Autocomplete(onlyAddress1Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress1Field.focus();
        autocomplete9.addListener("place_changed", fillOnlyAddres1);
    }

    if ($('#onlyAddress2').length) {
        onlyAddress2Field = document.querySelector('#onlyAddress2');

        autocomplete10 = new google.maps.places.Autocomplete(onlyAddress2Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress2Field.focus();
        autocomplete10.addListener("place_changed", fillOnlyAddres2);
    }

    if ($('#onlyAddress3').length) {
        onlyAddress3Field = document.querySelector('#onlyAddress3');

        autocomplete11 = new google.maps.places.Autocomplete(onlyAddress3Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress3Field.focus();
        autocomplete11.addListener("place_changed", fillOnlyAddres3);
    }

    if ($('#onlyAddress4').length) {
        onlyAddress4Field = document.querySelector('#onlyAddress4');

        autocomplete12 = new google.maps.places.Autocomplete(onlyAddress4Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress4Field.focus();
        autocomplete12.addListener("place_changed", fillOnlyAddres4);
    }

    if ($('#onlyAddress5').length) {
        onlyAddress5Field = document.querySelector('#onlyAddress5');

        autocomplete13 = new google.maps.places.Autocomplete(onlyAddress5Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress5Field.focus();
        autocomplete13.addListener("place_changed", fillOnlyAddres5);
    }

    if ($('#onlyAddress6').length) {
        onlyAddress6Field = document.querySelector('#onlyAddress6');

        autocomplete14 = new google.maps.places.Autocomplete(onlyAddress6Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress6Field.focus();
        autocomplete14.addListener("place_changed", fillOnlyAddres6);
    }

    if ($('#onlyAddress7').length) {
        onlyAddress7Field = document.querySelector('#onlyAddress7');

        autocomplete15 = new google.maps.places.Autocomplete(onlyAddress7Field, {
            componentRestrictions: { country: ["us", "ca"] },
            fields: ["formatted_address", "geometry"],
            types: ["address"],
        });

        onlyAddress7Field.focus();
        autocomplete15.addListener("place_changed", fillOnlyAddres7);
    }
}

function fillOnlyAddress() {
    const place5 = autocomplete6.getPlace();

    onlyAddressField.value = place5.formatted_address;
    if ($('#latitute').length) {
        latituteField.value = place5.geometry.location.lat();
    }
    if ($('#longitude').length) {
        longitudeField.value = place5.geometry.location.lng();
    }

    let onlyCity = "";
    let sublocality1 = "";
    let sublocality2 = "";
    let sublocality3 = "";

    for (const component5 of place5.address_components) {
        const componentType5 = component5.types[0];

        switch (componentType5) {
            case "locality":
                onlyCity = component5.long_name;
                break;
            case "sublocality_level_1":
                if ($('#onlyCity').length) {
                    sublocality1 = component5.long_name;
                    if (!onlyCity && sublocality1) {
                        onlyCity = sublocality1;
                    }
                }
                break;
            case "sublocality":
                if ($('#onlyCity').length) {
                    sublocality2 = component5.long_name;
                    if (!onlyCity && !sublocality1 && sublocality2) {
                        onlyCity = sublocality2;
                    }
                }
                break;
            case "political":
                if ($('#onlyCity').length) {
                    sublocality3 = component5.long_name;
                    if (!onlyCity && !sublocality1 && !sublocality2 && sublocality3) {
                        onlyCity = sublocality3;
                    }
                }
                break;
        }
    }

    onlyCityField.value = onlyCity.replace(/^The\s/, '');

    $("#onlyCity").removeClass('error');
    $("#onlyCity-error").css({"display" : "none"});
}

function fillOnlyAddres1() {
    const place5 = autocomplete9.getPlace();
    onlyAddress1Field.value = place5.formatted_address;
}

function fillOnlyAddres2() {
    const place5 = autocomplete10.getPlace();
    onlyAddress2Field.value = place5.formatted_address;
}

function fillOnlyAddres3() {
    const place5 = autocomplete11.getPlace();
    onlyAddress3Field.value = place5.formatted_address;
}

function fillOnlyAddres4() {
    const place5 = autocomplete12.getPlace();
    onlyAddress4Field.value = place5.formatted_address;
}

function fillOnlyAddres5() {
    const place5 = autocomplete13.getPlace();
    onlyAddress5Field.value = place5.formatted_address;
}

function fillOnlyAddres6() {
    const place5 = autocomplete14.getPlace();
    onlyAddress6Field.value = place5.formatted_address;
}

function fillOnlyAddres7() {
    const place5 = autocomplete15.getPlace();
    onlyAddress7Field.value = place5.formatted_address;
}

function fillOnlyCityStateZip() {
    const place6 = autocomplete7.getPlace();
    let address1 = "";
    let secondaddress = "";

    for (const component6 of place6.address_components) {
        const componentType6 = component.types[0];

        switch (componentType6) {
            case "street_number":
                address1 = `${component6.long_name} ${address1}`;
                break;
            case "route":
                address1 += component6.short_name;
                break;
            case "locality":
                secondaddress = `${component6.long_name} ${secondaddress}`;
                break;
            case "administrative_area_level_1":
                secondaddress +=  component.short_name;
                break;
            case "postal_code":
                secondaddress +=  component.long_name;
                break;
        }
    }

    onlyAddressesField.value = address1;
    onlyCityStateZip.value = secondaddress;
}

function fillSixAddress() {
    const place7 = autocomplete8.getPlace();
    let lastet_emergency_address = "";

    for (const component7 of place7.address_components) {
        const componentType7 = component7.types[0];
        switch (componentType7) {
            case "street_number":
                lastet_emergency_address = `${component7.long_name} ${lastet_emergency_address}`;
                break;
            case "route":
                lastet_emergency_address += component7.short_name;
                break;
            case "postal_code":
                document.querySelector("#lastet_emergency_zipcode").value = component7.long_name;
                $("#lastet_emergency_zipcode").removeClass('error');
                $("#lastet_emergency_zipcode-error").css({"display" : "none"});
                break;
            case "locality":
                document.querySelector("#fiveCity").value = component7.long_name;
                $("#lastet_emergency_city").removeClass('error');
                $("#lastet_emergency_city-error").css({"display" : "none"});
                break;
            case "sublocality_level_1":
                if ($('#lastet_emergency_city').length) {
                    document.querySelector("#lastet_emergency_city").value = component7.long_name;
                    $("#lastet_emergency_city").removeClass('error');
                    $("#lastet_emergency_city-error").css({"display" : "none"});
                }
                break;
        }
    }

    lastet_emergency_address_field.value = lastet_emergency_address;
}
