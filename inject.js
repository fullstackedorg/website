const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'out', 'index.html');

function injectHtml() {
    if (!fs.existsSync(indexPath)) {
        console.error(`File not found: ${indexPath}`);
        return;
    }

    let html = fs.readFileSync(indexPath, 'utf-8');

    const outDir = path.join(__dirname, 'out');
    const files = fs.readdirSync(outDir);
    const pngFile = files.find(f => f.endsWith('.png'));

    // Array of HTML fragments to inject into the <head> section
    // You can easily add more meta tags or other elements here
    const headFragments = [
        '<title>v1 | FullStacked</title>',
        '<script defer data-domain="v1.fullstacked.org" src="https://plausible.cplepage.com/js/script.js"></script>',
        '<meta name="description" content="The single environment to run and share JavaScript projects. Build locally, share directly with users, and run everything on-device without any cloud infrastructure.">',
        '<meta name="author" content="FullStacked">',
        '<meta property="og:title" content="v1 | FullStacked">',
        '<meta property="og:description" content="The single environment to run and share JavaScript projects.">',
        '<meta property="og:type" content="website">',
        '<meta property="og:image" content="https://v1.fullstacked.org/fullstacked-v1-cover.jpg">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:site" content="@fullstacked">',
        '<meta name="twitter:creator" content="@fullstacked">',
        '<meta name="twitter:title" content="v1 | FullStacked">',
        '<meta name="twitter:description" content="The single environment to run and share JavaScript projects.">',
        '<meta name="twitter:image" content="https://v1.fullstacked.org/fullstacked-v1-cover.jpg">',
    ];

    if (pngFile) {
        headFragments.push(`<link rel="icon" type="image/png" href="${pngFile}" />`);
    } else {
        console.warn('No PNG file found in the out directory for the favicon.');
    }

    // Handle copying the cover image to the out directory
    const coverImageName = 'fullstacked-v1-cover.jpg';
    const coverImageSrcPath = path.join(__dirname, coverImageName);
    const coverImageDestPath = path.join(outDir, coverImageName);

    if (fs.existsSync(coverImageSrcPath)) {
        fs.copyFileSync(coverImageSrcPath, coverImageDestPath);
    } else {
        console.warn(`Cover image not found: ${coverImageSrcPath}`);
    }

    // Optional: add body fragments if needed later
    // const bodyFragments = [];

    // Check if the title already exists to prevent duplicate injections
    if (html.includes('<title>v1 | FullStacked</title>')) {
        console.log('The HTML fragments have already been injected.');
        return;
    }

    // Insert the fragments right before the closing </head> tag
    const headInjectString = headFragments.join('\n\t\t') + '\n\t';
    html = html.replace('</head>', headInjectString + '</head>');

    fs.writeFileSync(indexPath, html);
    console.log('Successfully updated out/index.html with the new HTML fragments.');
}

injectHtml();
