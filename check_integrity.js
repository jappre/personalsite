const fs = require('fs');
const path = require('path');

function checkFileExists(filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`[PASS] File exists: ${filePath}`);
        return true;
    } else {
        console.error(`[FAIL] File missing: ${filePath}`);
        return false;
    }
}

function checkContent(filePath, patterns) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let allPass = true;
        patterns.forEach(pattern => {
            if (content.match(pattern)) {
                console.log(`[PASS] Found pattern in ${path.basename(filePath)}: ${pattern}`);
            } else {
                console.error(`[FAIL] Missing pattern in ${path.basename(filePath)}: ${pattern}`);
                allPass = false;
            }
        });
        return allPass;
    } catch (e) {
        console.error(`[FAIL] Could not read ${filePath}: ${e.message}`);
        return false;
    }
}

let passed = true;

// Check structure
passed &= checkFileExists('index.html');
passed &= checkFileExists('css/style.css');
passed &= checkFileExists('js/main.js');

// Check HTML content
passed &= checkContent('index.html', [
    /<title>Geek Engineer/,
    /<div class="crt-overlay">/,
    /id="typing-text"/,
    /id="toggle-theme"/,
    /id="modal-overlay"/
]);

// Check CSS content
passed &= checkContent('css/style.css', [
    /--font-heading: 'Press Start 2P'/,
    /image-rendering: pixelated/,
    /.crt-overlay \{/
]);

// Check JS content
passed &= checkContent('js/main.js', [
    /document.getElementById\('typing-text'\)/,
    /konamiCode/,
    /e.key.toLowerCase\(\) ===/
]);

if (passed) {
    console.log("All checks passed!");
    process.exit(0);
} else {
    console.error("Some checks failed!");
    process.exit(1);
}
