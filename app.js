const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

console.time('Server startup'); // Mesure de temps

// Middleware pour servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importer et utiliser les routes pour les fichiers
const fileRoutes = require('./routes/files');
app.use('/api/files', fileRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.timeEnd('Server startup'); // Fin de la mesure de temps
  console.log(`🚀 Serveur SnapShare démarré.`);
  console.log(`Accès via le navigateur sur http://localhost:${PORT}`);
  console.log(`Sur le réseau local, utilisez l'adresse IP de cette machine.`);
});
