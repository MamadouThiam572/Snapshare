const express = require('express');
const multer = require('multer');
const path = require('path');
const os = require('os');
const router = express.Router();

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Le dossier 'uploads' doit exister à la racine du projet
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Conserver le nom de fichier d'origine pour la simplicité
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');

// Route GET pour lister les fichiers
router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    // Si le dossier n'existe pas, on considère qu'il n'y a pas de fichiers
    if (err && err.code === 'ENOENT') {
      return res.json([]);
    }
    // Pour toute autre erreur, on log et on renvoie une erreur 500
    if (err) {
      console.error("Impossible de lire le dossier uploads:", err);
      return res.status(500).send("Erreur interne du serveur.");
    }
    
    // On s'assure de ne renvoyer que les fichiers et pas des sous-dossiers
    const fileNames = files.filter(file => {
        try {
            return fs.statSync(path.join(uploadsDir, file)).isFile();
        } catch (e) {
            return false;
        }
    });
    
    res.json(fileNames);
  });
});

// Route pour obtenir des informations sur le serveur, comme l'IP
router.get('/info', (req, res) => {
    const nets = os.networkInterfaces();
    let localIp = '127.0.0.1'; // fallback

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // On cherche une adresse IPv4 externe (non-interne)
            if (net.family === 'IPv4' && !net.internal) {
                localIp = net.address;
                break;
            }
        }
        if(localIp !== '127.0.0.1') break;
    }
    res.json({ ip: localIp });
});

// Définition de la route POST pour l'upload
// Le nom 'file' dans upload.single('file') doit correspondre au `name` de l'input dans le formulaire HTML
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier n\'a été téléversé.');
  }
  
  // Renvoyer une page simple de succès
  res.send(`
    <h1>Transfert réussi !</h1>
    <p>Le fichier <strong>${req.file.originalname}</strong> a bien été téléversé.</p>
    <a href="/">Retour à l'accueil</a>
  `);
});

// Route GET pour télécharger un fichier
router.get('/download/:filename', (req, res) => {
  // Le nom de fichier est automatiquement décodé par Express
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  // res.download s'occupe de définir les bons headers pour forcer le téléchargement
  res.download(filePath, filename, (err) => {
    if (err) {
      // Gère le cas où le fichier n'est pas trouvé
      if (err.code === "ENOENT") {
        console.log(`Tentative de téléchargement d'un fichier non trouvé: ${filename}`);
        return res.status(404).send('Fichier non trouvé.');
      }
      // Pour les autres erreurs possibles
      console.error("Erreur lors du téléchargement du fichier:", err);
      if (!res.headersSent) {
        return res.status(500).send('Erreur serveur lors du téléchargement.');
      }
    }
  });
});

// Route DELETE pour supprimer un fichier
router.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;

    // Sécurité de base : refuser les noms de fichiers contenant des slashes ou ".." pour éviter le Path Traversal
    if (filename.includes('/') || filename.includes('..')) {
        return res.status(400).send('Nom de fichier invalide.');
    }

    const filePath = path.join(__dirname, '../uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            // Si le fichier n'existe pas, c'est une "réussite" du point de vue de l'utilisateur qui voulait qu'il disparaisse.
            if (err.code === 'ENOENT') {
                return res.status(404).send('Fichier déjà supprimé ou non trouvé.');
            }
            // Pour toute autre erreur
            console.error(`Erreur lors de la suppression de ${filename}:`, err);
            return res.status(500).send('Erreur serveur.');
        }
        res.status(200).json({ message: `Fichier ${filename} supprimé avec succès.` });
    });
});

module.exports = router;
