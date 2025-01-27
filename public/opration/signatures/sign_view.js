function viewSignature(wrapper, signatureData) {
    var canvas = document.getElementById(wrapper);
    var ctx = canvas.getContext("2d");

    if (signatureData != '') {
        var imageUrl = signatureData;
        var image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        image.src = imageUrl;
    }
}

// function viewSignaturedemo(wrapper, signatureData) {
//     const canvas = document.getElementById(wrapper);
//     const ctx = canvas.getContext('2d');

//     const img = new Image();
//     img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(signatureData);
//     img.onload = function() {
//         ctx.drawImage(img, 0, 0);
//     };
// }

function viewSignaturedemo(wrapper, signatureData) {
    const canvas = document.getElementById(wrapper);

    // Check if the canvas element exists
    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Proceed if the context is obtained successfully
        if (ctx) {
            const img = new Image();
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(signatureData);
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            };
        } else {
            console.error(`Failed to get context for element with ID "${wrapper}".`);
        }
    }
}
