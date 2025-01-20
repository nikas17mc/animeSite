// Define the required packages
require('dotenv').config();
const http = require('http');
const app = require("../app");
const fs = require('fs');

// Define the requiered variables
// var options = {
//   key: fs.readFileSync('./ssl/server-key.pem'),
//   cert: fs.readFileSync('./ssl/server-cert.pem')
// }


// Create the server
const server = http.createServer(app);

// Define extra modules for development mode
// const pm2 = require('pm2');
// const { exec } = require('child_process');


// Functions to handle the server
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'Pipe: ' + addr : 'Port: ' + addr.port;
  console.log('\x1b[34m%s\x1b[33m%s\x1b[0m', 'Listening on ', bind);
}

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof envPORT === 'string' ? 'pipe' + envPORT : 'port' + envPORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
};

// Define the variables
const envPORT = process.env.PORT || '3000';
const port = normalizePort(envPORT);


// Set the port
app.set('port', port);

// Listen on the port
const start = async () => {
  try {
    // await connectDB(MONGO_URL);
    server.listen(port);
    server.on('listening', onListening);
    if ((process.env.NODE_ENV || '').trim() === 'development') {
      console.log('Development Mode');
      /* 
        Create debPM logs if we are in DEV Mode and
        make sure everything get deleted if we push STRG + C. 
      */
      // debPM2();
    }
  }
  catch (error) {
    server.on('error', onError(error));
    console.error(error);
  }
}
start();

// ------------------------------------------------------
// For Development Mode
function debPM2() {

  // Funktion zum Überprüfen, ob PM2-Anwendungen laufen
  function isPM2Running() {
    return new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) {
          return resolve(false); // PM2 ist nicht aktiv
        }
        pm2.list((err, processList) => {
          pm2.disconnect(); // Verbindung zu PM2 trennen
          if (err) return resolve(false); // Fehler beim Abrufen der Liste
          resolve(processList.length > 0); // Prozesse gefunden oder nicht
        });
      });
    });
  }

  // PM2-Prozesse beenden und Logs leeren
  function stopPM2Processes() {
    return new Promise((resolve, reject) => {
      exec('pm2 stop all && pm2 flush', (err, stdout, stderr) => {
        if (err) {
          reject(new Error(`Error stopping PM2 processes: ${err.message}`));
        } else {
          resolve(stdout || stderr);
        }
      });
    });
  }

  // Hook für SIGINT (z. B. STRG + C)
  let isShuttingDown = false; // Flag, um mehrfaches Beenden zu verhindern
  process.on('SIGINT', async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log('SIGINT signal received. Checking if PM2 is running...');
    try {
      const isRunning = await isPM2Running();
      if (isRunning) {
        console.log('Stopping PM2 processes and flushing logs...');
        const result = await stopPM2Processes();
        console.log(result);
      } else {
        console.log('PM2 is not running. Exiting without actions.');
      }
    } catch (error) {
      console.error(`Error during shutdown: ${error.message}`);
    } finally {
      process.exit(0); // Prozess sicher beenden
    }
  });

  // Normales Starten des PM2-Prozesses
  console.log('PM2 application is running. Press CTRL+C to stop and flush logs.');
  // ------------------------------------------------------
}