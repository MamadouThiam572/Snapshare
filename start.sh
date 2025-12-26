#!/bin/bash
echo "Lancement du serveur SnapShare..."

# Lancer le serveur Node.js en arrière-plan et capturer son PID
node app.js &
SERVER_PID=$!

echo "Attente de quelques secondes pour le démarrage du serveur..."
sleep 5

echo "Ouverture de SnapShare dans votre navigateur par défaut..."
# Utiliser xdg-open pour Linux, ou open pour macOS
if command -v xdg-open > /dev/null; then
  xdg-open http://localhost:3000
elif command -v open > /dev/null; then
  open http://localhost:3000
else
  echo "Impossible d'ouvrir le navigateur automatiquement. Veuillez ouvrir http://localhost:3000 manuellement."
fi

echo "Le serveur est en cours d'exécution (PID: $SERVER_PID)."
echo "Pour l'arrêter, ouvrez un terminal et tuez le processus avec : kill $SERVER_PID"
echo "Ou en utilisant 'killall node'"
