document.addEventListener('DOMContentLoaded', () => {
  const fileListContainer = document.getElementById('file-list');
  const ipContainer = document.getElementById('server-ip');

  // Fonction pour récupérer et afficher l'IP du serveur
  const fetchServerIp = () => {
    fetch('/api/files/info')
      .then(response => {
        if (!response.ok) throw new Error('Réponse négative du serveur pour l\'IP');
        return response.json();
      })
      .then(data => {
        ipContainer.textContent = `${data.ip}:3000`;
      })
      .catch(error => {
        console.error("Impossible de récupérer l'IP du serveur:", error);
        ipContainer.textContent = "Non disponible";
      });
  };

  // Fonction pour récupérer et afficher la liste des fichiers
  const fetchFileList = () => {
    fileListContainer.innerHTML = '<p>Chargement de la liste des fichiers...</p>';
    fetch('/api/files')
      .then(response => {
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return response.json();
      })
      .then(files => {
        fileListContainer.innerHTML = '';
        if (files.length === 0) {
          fileListContainer.innerHTML = '<p>Aucun fichier sur le serveur pour le moment.</p>';
          return;
        }
        const ul = document.createElement('ul');
        files.forEach(file => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = file;
          a.href = `/api/files/download/${encodeURIComponent(file)}`;

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Supprimer';
          deleteBtn.className = 'delete-btn';
          
          deleteBtn.onclick = () => {
            if (confirm(`Êtes-vous sûr de vouloir supprimer "${file}" ?`)) {
              fetch(`/api/files/delete/${encodeURIComponent(file)}`, { method: 'DELETE' })
                .then(response => {
                  if (!response.ok) {
                    // Si le statut est 404, le fichier est déjà parti, pas besoin d'alerte.
                    if (response.status !== 404) {
                      alert('La suppression a échoué.');
                    }
                  }
                  // Le polling automatique rafraîchira la liste, donc pas d'action supplémentaire nécessaire.
                })
                .catch(error => {
                  console.error('Erreur de suppression:', error);
                  alert('Une erreur est survenue lors de la suppression.');
                });
            }
          };
          
          li.appendChild(a);
          li.appendChild(deleteBtn);
          ul.appendChild(li);
        });
        fileListContainer.appendChild(ul);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fichiers:', error);
        fileListContainer.innerHTML = '<p style="color: red;">Impossible de charger la liste des fichiers.</p>';
      });
  };

  // Lancement des deux fonctions au chargement de la page
  fetchServerIp();
  // Lancement initial de la liste des fichiers et mise à jour toutes les 5 secondes
  fetchFileList();
  setInterval(fetchFileList, 5000); // Rafraîchit toutes les 5 secondes
});
