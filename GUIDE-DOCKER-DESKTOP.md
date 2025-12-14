# 🐳 Guide Docker Desktop - Pas à pas

Ce guide vous accompagne pour utiliser Docker Desktop avec ce projet DevOps.

## 📥 Installation de Docker Desktop

1. **Télécharger** : [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. **Installer** l'application
3. **Démarrer** Docker Desktop
4. **Accepter** les conditions d'utilisation
5. **Attendre** que Docker soit prêt (icône verte dans la barre des tâches)

### Vérifier l'installation

Ouvrir un terminal et taper :
```bash
docker --version
docker-compose --version
```

Vous devriez voir les versions installées.

## 🎯 Interface Docker Desktop

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────┐
│  Docker Desktop                          🔍  ⚙️   │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Containers  ← Vos applications en cours            │
│ Images      ← Vos images Docker                    │
│ Volumes     ← Stockage persistant                  │
│ Builds      ← Historique des builds                │
│          │                                          │
│          │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Containers (Conteneurs)

**C'est l'onglet le plus important !**

Vous verrez ici :
- 🟢 Conteneurs en cours d'exécution (Running)
- ⚪ Conteneurs arrêtés (Stopped)
- ❌ Conteneurs en erreur (Exited)

Pour chaque conteneur :
- **Nom** : ex. `devops-backend`
- **Image** : ex. `node:18-alpine`
- **Status** : Running / Stopped
- **Ports** : ex. `3001:3001`

### Images

Toutes les images Docker téléchargées ou construites.

### Volumes

Stockage persistant pour les données.

## 🚀 Démarrer le projet

### Méthode 1 : Avec l'interface Docker Desktop (Facile)

1. **Ouvrir Docker Desktop** (assurez-vous qu'il est démarré)

2. **Aller dans l'onglet Containers**

3. **En haut à droite**, cliquer sur le bouton de recherche
   - Ne rien mettre, juste ouvrir le menu

4. **Malheureusement, il faut utiliser le terminal** pour la première fois

### Méthode 2 : Avec le terminal (Recommandé)

```bash
# 1. Aller dans le dossier du projet
cd devops-cicd-project

# 2. Démarrer tout
docker-compose up --build
```

**Que se passe-t-il ?**
```
1. Docker lit le fichier docker-compose.yml
2. Télécharge les images nécessaires (node:18-alpine)
3. Build les images de votre projet
4. Crée et démarre les conteneurs
5. Affiche les logs en temps réel
```

**Voir dans Docker Desktop** :
1. Ouvrir Docker Desktop
2. Onglet **Containers**
3. Vous verrez un groupe : `devops-cicd-project`
4. Cliquer pour déplier et voir :
   - `devops-backend` (port 3001)
   - `devops-frontend` (port 3000)

## 🎮 Gérer les conteneurs

### Démarrer

**Dans Docker Desktop** :
1. Onglet **Containers**
2. Trouver votre conteneur
3. Cliquer sur le bouton ▶️ **Play**

**En terminal** :
```bash
docker-compose up
# OU pour un seul conteneur
docker start devops-backend
```

### Arrêter

**Dans Docker Desktop** :
1. Cliquer sur le bouton ⏸️ **Stop** à côté du conteneur

**En terminal** :
```bash
# Ctrl+C dans le terminal où docker-compose tourne
# PUIS
docker-compose down
```

### Redémarrer

**Dans Docker Desktop** :
1. Cliquer sur le bouton 🔄 **Restart**

**En terminal** :
```bash
docker-compose restart
```

### Supprimer

**Dans Docker Desktop** :
1. Arrêter le conteneur d'abord
2. Cliquer sur le bouton 🗑️ **Delete**
3. Confirmer

**En terminal** :
```bash
docker-compose down
# Pour supprimer aussi les volumes
docker-compose down -v
```

## 📊 Voir les logs

### Dans Docker Desktop

1. Onglet **Containers**
2. Cliquer sur votre conteneur
3. Les logs s'affichent automatiquement en temps réel

**Vous verrez** :
```
devops-backend  | Server running on port 3001
devops-frontend | webpack compiled successfully
```

### Filtrer les logs

En haut de la fenêtre de logs :
- 🔍 Barre de recherche pour filtrer
- 📋 Bouton pour copier les logs
- 🗑️ Bouton pour effacer les logs

### En terminal

```bash
# Voir les logs
docker-compose logs

# Voir les logs en temps réel
docker-compose logs -f

# Logs d'un seul service
docker-compose logs backend
docker-compose logs frontend
```

## 🌐 Accéder à l'application

### Depuis Docker Desktop

1. Onglet **Containers**
2. À côté de votre conteneur, vous verrez les ports :
   ```
   3001:3001  ← Cliquer ici !
   ```
3. Cela ouvre automatiquement votre navigateur

### Manuellement

Dans votre navigateur :
- Frontend : http://localhost:3000
- Backend : http://localhost:3001
- Health check : http://localhost:3001/health

## 💻 Ouvrir un terminal dans le conteneur

Parfois utile pour déboguer !

### Dans Docker Desktop

1. Onglet **Containers**
2. Cliquer sur votre conteneur
3. Onglet **"Exec"** (en haut)
4. Vous avez un terminal à l'intérieur du conteneur !

**Commandes utiles** :
```bash
# Voir les fichiers
ls -la

# Voir les processus
ps aux

# Tester une commande
node --version

# Lire un fichier
cat package.json
```

### En terminal

```bash
# Backend
docker exec -it devops-backend sh

# Frontend
docker exec -it devops-frontend sh

# Pour sortir
exit
```

## 🔄 Rebuild les images

Quand vous modifiez le code, vous devez rebuild.

### Méthode complète

```bash
# Arrêter tout
docker-compose down

# Rebuild et redémarrer
docker-compose up --build
```

### Rebuild sans cache

Si quelque chose ne fonctionne pas :

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 🖼️ Gérer les images

### Voir les images

**Dans Docker Desktop** :
1. Onglet **Images**
2. Vous verrez toutes vos images :
   - `devops-cicd-project-backend`
   - `devops-cicd-project-frontend`
   - `node:18-alpine`
   - etc.

Pour chaque image :
- **Nom et tag**
- **Taille**
- **Date de création**

### Supprimer une image

**Dans Docker Desktop** :
1. Onglet **Images**
2. Cliquer sur l'image
3. Bouton **"Delete"** (en haut à droite)

**En terminal** :
```bash
docker rmi nom-de-limage
```

### Nettoyer les images non utilisées

```bash
# Supprimer les images "dangling" (sans tag)
docker image prune

# Supprimer TOUTES les images non utilisées
docker image prune -a
```

## 📦 Gérer les volumes

### Voir les volumes

**Dans Docker Desktop** :
1. Onglet **Volumes**
2. Vous verrez les volumes utilisés

### Supprimer les volumes

```bash
# Avec docker-compose
docker-compose down -v

# Manuellement
docker volume rm nom-du-volume

# Nettoyer tous les volumes non utilisés
docker volume prune
```

## 🧹 Nettoyage complet

Si vous voulez tout nettoyer :

### Dans Docker Desktop

1. Icône ⚙️ (Paramètres) en haut à droite
2. **"Troubleshoot"**
3. **"Clean / Purge data"**
4. Confirmer

### En terminal

```bash
# Arrêter tous les conteneurs
docker stop $(docker ps -aq)

# Supprimer tous les conteneurs
docker rm $(docker ps -aq)

# Supprimer toutes les images
docker rmi $(docker images -q)

# Nettoyer tout
docker system prune -a --volumes
```

⚠️ **Attention** : Cela supprime TOUT ! Images, conteneurs, volumes...

## 🎯 Workflow quotidien

### Commencer à travailler

```bash
# 1. Ouvrir Docker Desktop (doit être vert dans la barre des tâches)

# 2. Dans un terminal
cd devops-cicd-project
docker-compose up

# 3. Attendre que tout démarre
# ✅ Quand vous voyez "webpack compiled successfully"

# 4. Ouvrir http://localhost:3000
```

### Pendant le développement

**Les modifications sont appliquées automatiquement !**
- Backend : Nodemon redémarre automatiquement
- Frontend : Hot reload activé

**Voir les changements** :
- Dans Docker Desktop > Containers > Logs
- Vous verrez les messages de restart

### Fin de journée

```bash
# Dans le terminal où docker-compose tourne
Ctrl+C

# Puis
docker-compose down
```

## 🐛 Déboguer avec Docker Desktop

### Le conteneur ne démarre pas

1. **Voir les logs** :
   - Containers > Cliquer sur le conteneur
   - Lire les erreurs dans les logs

2. **Vérifier l'image** :
   - Images > Vérifier que l'image existe

3. **Rebuild** :
   ```bash
   docker-compose up --build
   ```

### Le port est déjà utilisé

**Erreur** :
```
Error: bind: address already in use
```

**Solution** :

**Dans Docker Desktop** :
1. Containers > Chercher un autre conteneur sur le même port
2. L'arrêter ou le supprimer

**En terminal** :
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### L'application ne répond pas

1. **Vérifier le statut** :
   - Docker Desktop > Containers
   - Le conteneur est-il en "Running" ?

2. **Voir les logs** :
   - Chercher les erreurs

3. **Redémarrer** :
   - Bouton Restart dans Docker Desktop

### Consommation de ressources

**Voir l'utilisation** :
1. Docker Desktop > Containers
2. En haut, vous verrez CPU, Memory

**Limiter les ressources** :
1. ⚙️ Settings
2. Resources
3. Ajuster CPU et Memory

## 🔍 Inspecter un conteneur

### Informations détaillées

**Dans Docker Desktop** :
1. Containers > Cliquer sur le conteneur
2. Onglet **"Inspect"**
3. Vous verrez toute la configuration JSON

**En terminal** :
```bash
docker inspect devops-backend
```

### Stats en temps réel

**En terminal** :
```bash
docker stats

# Pour un seul conteneur
docker stats devops-backend
```

Vous verrez :
- CPU %
- Memory usage
- Network I/O
- Block I/O

## 📚 Commandes Docker utiles

### Gestion des conteneurs

```bash
# Lister les conteneurs en cours
docker ps

# Lister tous les conteneurs (même arrêtés)
docker ps -a

# Démarrer un conteneur
docker start <nom>

# Arrêter un conteneur
docker stop <nom>

# Redémarrer
docker restart <nom>

# Supprimer
docker rm <nom>

# Logs
docker logs <nom>
docker logs -f <nom>  # temps réel
```

### Gestion des images

```bash
# Lister les images
docker images

# Supprimer une image
docker rmi <image>

# Pull une image
docker pull <image>

# Build une image
docker build -t mon-image .
```

### Docker Compose

```bash
# Démarrer
docker-compose up

# Démarrer en arrière-plan
docker-compose up -d

# Arrêter
docker-compose down

# Rebuild
docker-compose up --build

# Voir les logs
docker-compose logs
docker-compose logs -f
docker-compose logs <service>

# Lister les services
docker-compose ps
```

### Nettoyage

```bash
# Supprimer les conteneurs arrêtés
docker container prune

# Supprimer les images non utilisées
docker image prune

# Supprimer les volumes non utilisés
docker volume prune

# Tout nettoyer
docker system prune -a --volumes
```

## 💡 Astuces et conseils

### ✅ Bonnes pratiques

1. **Toujours démarrer Docker Desktop en premier**
2. **Utiliser docker-compose pour le dev**
3. **Regarder les logs en cas de problème**
4. **Faire du nettoyage régulièrement**
5. **Donner des noms explicites aux conteneurs**

### ⚡ Raccourcis

- Les ports sont cliquables dans Docker Desktop
- Drag & drop des fichiers dans les conteneurs
- Copier/coller dans les terminaux des conteneurs

### 🎯 Optimisations

**Réduire la taille des images** :
- Utiliser des images Alpine
- Multi-stage builds
- .dockerignore

**Accélérer les builds** :
- Mettre les dépendances en cache
- Ordonner les commandes du Dockerfile

## 🆘 Problèmes courants

### Docker Desktop ne démarre pas
➡️ Redémarrer l'ordinateur
➡️ Réinstaller Docker Desktop

### "Docker is not running"
➡️ Ouvrir Docker Desktop et attendre qu'il soit vert

### Erreur de mémoire
➡️ Settings > Resources > Augmenter la RAM

### Conteneur en boucle de restart
➡️ Voir les logs pour identifier l'erreur
➡️ Corriger le code et rebuild

### Image trop grosse
➡️ Utiliser des images Alpine
➡️ Nettoyer le cache npm

## 📖 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Vous maîtrisez maintenant Docker Desktop ! 🐳**
