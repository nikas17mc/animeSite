const path = require("path");

module.exports = {
  apps: [
    {
      name: "www",
      script: "./bin/www.js",
      exec_mode: "cluster",
      instances: "max", // Max Anzahl an Instanzen
    //   shutdown_with_cleanup: true,
    //   autorestart: false,
      env: {
        NODE_ENV: "development",
      },
      // Logs werden relativ zu __dirname gespeichert
      log: path.join(__dirname, "logs", "combined.log"), // stdout + stderr
      log_date_format: "YYYY-MM-DD HH:mm Z",
      watch: true
    }
  ]
};
