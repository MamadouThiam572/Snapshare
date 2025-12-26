@echo off
title SnapShare Server
echo.
echo ===========================================
echo      Lancement du serveur SnapShare
echo ===========================================
echo.

rem Lancer le serveur Node.js dans une nouvelle fenêtre de console
start "SnapShare Server Console" cmd /k node app.js

echo Attente de quelques secondes pour le démarrage du serveur...
timeout /t 5 /nobreak > NUL

echo Ouverture de SnapShare dans votre navigateur par défaut...
start http://localhost:3000

echo.
echo Le serveur est en cours d'exécution dans une autre fenêtre.
echo Pour l'arrêter, fermez la fenêtre intitulée "SnapShare Server Console".
echo.
pause
