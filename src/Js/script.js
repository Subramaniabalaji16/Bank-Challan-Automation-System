const urlParams = new URLSearchParams(window.location.search);
const bank = urlParams.get('bank');
const language = urlParams.get('language');

if (bank && language) {
    console.log(`Selected Bank: ${bank} and Selected Language: ${language}`);
} else {
    console.log('Please select an option');
}

let scannedData = '';
let audio; // Declare audio variable outside the if block

if (language === "Tamil") {
    audio = new Audio('../audio/உங்களுக்கு தேவையான த (1).mp3');  // Ensure the audio file path is correct
} else if (language === "English") {
    audio = new Audio('../audio/english.mp3'); 
}
 else if(language==="Hindi"){
    audio = new Audio('../audio/Hindi.mp3');
}
else if (language === "Telugu") {
    audio = new Audio('../audio/Telugu.mp3'); 
} else if (language === "Malayalam") {
    audio = new Audio('../audio/Malayalam.mp3'); 
}




function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            video.onloadedmetadata = () => {
                startScanning();
            };
        })
        .catch(err => {
            console.error('Error accessing camera: ', err);
            result.textContent = "Camera access denied.";
        });
}

function startScanning() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });  // Updated line

    function scanQRCode() {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            const code = jsQR(imageData.data, canvas.width, canvas.height, {
                inversionAttempts: 'dontInvert',
            });

            if (code) {
                scannedData = code.data;
                result.textContent = "Successfully scanned!";
                output.textContent = "Playing audio...";
                output.classList.add('status');
                loader.classList.remove('hidden');

                // Play the audio after QR code scan
                audio.play();

                // Start speech recognition only after audio finishes playing
                audio.onended = () => {
                    output.textContent = "Listening for amount...";
                    startSpeechRecognition();
                };
            } else {
                result.textContent = "Scanning... Please hold the QR code steady.";
                requestAnimationFrame(scanQRCode);
            }
        } else {
            result.textContent = "Loading video...";
            setTimeout(startScanning, 500);
        }
    }

    scanQRCode();
}

function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            
            // Set language based on selected language
            if (language === "Tamil") {
                recognition.lang = 'ta-IN'; // Tamil language
            } else if (language === "English") {
                recognition.lang = 'en-US'; // English language
            } else if (language === "Hindi") {
                recognition.lang = 'hi-IN'; // Hindi language
            } else if (language === "Telugu") {
                recognition.lang = 'te-IN'; // Telugu language
            } else if (language === "Malayalam") {
                recognition.lang = 'ml-IN'; // Malayalam language
            }
            else {
                output.textContent = 'Language not supported.';
                return;
            }
    
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
    
            recognition.start();
    
            recognition.onresult = (event) => {
                if (event.results.length > 0) {
                    const transcript = event.results[0][0].transcript;
                    output.textContent = `You said: ${transcript}`;
                    
                    const amount = parseFloat(transcript.replace(/[^0-9.]/g, ''));
                    
                    // Create URL with scanned data and amount
                    const url = new URL('src/Html/challan.html', window.location.origin);
                    url.searchParams.set('scannedData', encodeURIComponent(scannedData));
                    url.searchParams.set('amount', amount);
                    window.open(url.toString(), '_blank');
                } else {
                    output.textContent = 'No results detected. Please speak clearly.';
                }
            };
    
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                output.textContent = `Error: ${event.error}`;
            };
        } else {
            output.textContent = 'Speech Recognition API is not supported in this browser.';
        }
    }
    
// Manual input button event handler
if (manualInput) {
    manualInput.addEventListener('click', () => {
        const userInput = prompt("Enter QR Code Data:");
        if (userInput) {
            scannedData = userInput;
            output.textContent = "Playing audio...";
            audio.play();

            audio.onended = () => {
                output.textContent = "Listening for amount...";
                startSpeechRecognition();
            };
        }
    });
} else {
    console.warn('Manual input button not found.');
}

window.onload = initCamera;
