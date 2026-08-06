🏦Bank Challan Automation System

>A web-based banking assistant that helps rural and non-technical users perform cash withdrawals at bank counters using QR codes, voice commands, and multilingual audio guidance — no registration required.

📌 Overview

The Bank Challan Automation System streamlines the cash withdrawal process at bank counters. Customers generate a personal QR code with their account details, and bank staff scan it, speak the amount in their preferred language, and instantly get a print-ready bilingual withdrawal slip — all in seconds.


✨ Features

📲 QR Code Generation — Customers generate a QR code with their account number, name, and phone number
🔍 Live QR Code Scanning — Bank staff scan the QR via device camera in real time
🎙️ Voice Amount Input — After scanning, staff speak the withdrawal amount using the Web Speech API
🔊 Multilingual Audio Prompts — Supports English, Hindi, Tamil, Telugu, and Malayalam
🧾 Auto-Print Challan — A bilingual cash withdrawal slip is generated and printed automatically
🏦 Multi-Bank Support — Indian Bank, State Bank of India (SBI), Tamilnad Mercantile Bank
📧 Contact Form — Email support powered by Node.js + Nodemailer (Gmail SMTP)
📴 Offline-Capable Core — Local Bootstrap copy ensures the scanner/challan flow works with limited connectivity


🖥️ Pages

| Page | Description |
|------|-------------|
| Home.html | Landing page with hero section and navigation |
| BankSet.html | Bank staff setup — select bank and preferred language |
| qrcode.html | Customer QR code generator |
| qrscan.html | Staff-facing live QR camera scanner |
| challan.html | Auto-generated printable cash withdrawal slip |
| about.html | About the project and its mission |
| contact.html | Contact form with email support |



🌐 Multilingual Support

| Language | Audio Prompt | Speech Recognition Locale |
|----------|-------------|--------------------------|
| English | english.mp3 | en-US |
| Hindi | Hindi.mp3 | hi-IN |
| Tamil | Tamil.mp3 | ta-IN |
| Telugu | Telugu.mp3 | te-IN |
| Malayalam | Malayalam.mp3 | ml-IN |


🛠️ Tech Stack

Frontend
- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5.3.3
- jQuery 3.6.0
- Google Fonts — Quintessential
- Font Awesome 6.0.0-beta3
- QRCode — QR code generation
- jsQR — QR code decoding from camera frames
- Web Speech API — voice input
- MediaDevices API (getUserMedia) — camera access
- localStorage — bank/language persistence

Backend
- Node.js
- Express.js
- Nodemailer (Gmail SMTP)
- dotenv
- CORS


⚙️ Setup & Installation

Prerequisites
- [Node.js](https://nodejs.org/) v14+
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) enabled

1. Clone the repository

git clone https://github.com/Subramaniabalaji16/Bank-Challan-Automation-System.git
cd Bank-Challan-Automation-System


2. Install backend dependencies

cd src/Js
npm install


3. Configure environment variables

Create a '.env' file inside 'src/Js/':
EMAIL=your_gmail@gmail.com
PASSWORD=your_gmail_app_password


4. Start the backend server

node server.js

The server runs on 'http://localhost:3000'

5. Open the app
Open 'src/Html/Home.html' in your browser directly, or serve it using a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).


📋 How to Use

As a Customer
1. Open qrcode.html
2. Enter your Account Number, Name, and Phone Number
3. Click Generate QR Code
4. Print or save the QR code to show at the bank counter

As Bank Staff
1. Open BankSet.html
2. Select your Bank and Preferred Language
3. Click Proceed — you'll be taken to the QR scanner
4. Point the camera at the customer's QR code
5. Listen to the audio prompt and speak the withdrawal amount
6. The withdrawal slip (challan) auto-opens and prints



🏦 Supported Banks

| Bank
| Indian Bank 
| State Bank of India (SBI) 
| Tamilnad Mercantile Bank (TMB) 



🔑 Key Design Decisions

- No database or user accounts — all data flows through QR codes and URL parameters; `localStorage` only stores bank/language selection
- Print-first challan — auto-prints on load with amount converted to English words (e.g., "Five Hundred")
- Accessible for rural users — multilingual audio + voice input removes the need for staff to type anything
- Offline-capable core — local Bootstrap ensures scanner and challan work with limited internet connectivity


👨‍💻 Author

Subramaniabalaji S
GitHub: [@Subramaniabalaji16](https://github.com/Subramaniabalaji16)

> Built with ❤️ to bridge the gap between rural communities and modern banking.
