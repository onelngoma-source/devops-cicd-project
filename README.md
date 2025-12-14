# 🚀 DevOps CI/CD Project

[![CI/CD Pipeline](https://github.com/VOTRE-USERNAME/devops-cicd-project/actions/workflows/ci.yml/badge.svg)](https://github.com/VOTRE-USERNAME/devops-cicd-project/actions/workflows/ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://hub.docker.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Pipeline CI/CD complet avec GitHub Actions - Optimisé pour GitHub Desktop et Docker Desktop

## 📖 Description

Application web full-stack (Node.js + React) avec pipeline DevOps automatisé comprenant :
- ✅ Intégration Continue (CI)
- ✅ Tests automatiques
- ✅ Build Docker automatique
- ✅ Déploiement automatique
- ✅ Scan de sécurité

## 🎯 Objectifs du TP réalisés

- [x] **Tâche 1** : Projet GitHub avec branches main et dev
- [x] **Tâche 2** : Workflow CI automatique
- [x] **Tâche 3** : Application Dockerisée
- [x] **Tâche 4** : Publication Docker Hub automatique
- [x] **Tâche 5** : Déploiement automatique (CD)
- [x] **Tâche 6 (Bonus)** : Protection branches, tests avancés, badges

## 🛠️ Technologies

- **Backend** : Node.js + Express
- **Frontend** : React
- **Tests** : Jest + Supertest
- **Container** : Docker + Docker Compose
- **CI/CD** : GitHub Actions
- **Déploiement** : GitHub Pages, Docker Hub

## 📋 Prérequis

✅ **GitHub Desktop** installé ([Télécharger](https://desktop.github.com/))
✅ **Docker Desktop** installé ([Télécharger](https://www.docker.com/products/docker-desktop/))
✅ **Node.js 18+** installé ([Télécharger](https://nodejs.org/))
✅ Un compte **GitHub** ([Créer](https://github.com/join))
✅ Un compte **Docker Hub** ([Créer](https://hub.docker.com/signup))

## 🚀 Installation rapide

### Option 1 : Avec Docker Desktop (Recommandé) 🐳

C'est la méthode la plus simple !

```bash
# 1. Ouvrir Docker Desktop (assurez-vous qu'il est démarré)

# 2. Dans un terminal, aller dans le dossier du projet
cd devops-cicd-project

# 3. Démarrer tout avec Docker Compose
docker-compose up --build

# ✅ C'est tout ! L'application démarre automatiquement
```

**Accéder à l'application** :
- Frontend : http://localhost:3000
- Backend API : http://localhost:3001
- Health Check : http://localhost:3001/health

**Voir dans Docker Desktop** :
1. Ouvrir Docker Desktop
2. Onglet **"Containers"**
3. Vous verrez `devops-cicd-project` avec 2 conteneurs :
   - `devops-backend` (Node.js API)
   - `devops-frontend` (React App)

**Arrêter l'application** :
- Dans le terminal : `Ctrl+C` puis `docker-compose down`
- OU dans Docker Desktop : cliquer sur le bouton **Stop**

### Option 2 : Installation manuelle (développeurs)

<details>
<summary>Cliquez pour voir les instructions détaillées</summary>

#### Backend

```bash
cd backend
npm install
npm run dev
```

Le backend sera sur http://localhost:3001

#### Frontend

```bash
cd frontend
npm install
npm start
```

Le frontend sera sur http://localhost:3000

</details>

## 📁 Structure du projet

```
devops-cicd-project/
├── .github/
│   └── workflows/           # Workflows GitHub Actions
│       ├── ci.yml          # Pipeline CI (tests automatiques)
│       ├── docker-publish.yml  # Publication Docker
│       ├── deploy.yml      # Déploiement automatique
│       └── pr-checks.yml   # Vérifications Pull Request
├── backend/                # API Node.js/Express
│   ├── src/
│   │   ├── server.js      # Serveur Express
│   │   └── routes.js      # Routes API
│   ├── tests/
│   │   └── api.test.js    # Tests unitaires
│   ├── package.json
│   └── .env               # Configuration backend
├── frontend/               # Application React
│   ├── src/
│   │   ├── App.js         # Composant principal
│   │   ├── App.css        # Styles
│   │   └── App.test.js    # Tests
│   ├── public/
│   └── package.json
├── docker-compose.yml      # Configuration Docker Compose
├── Dockerfile              # Image Docker production
├── Makefile               # Commandes raccourcies
└── README.md              # Ce fichier
```

## 🎮 Utilisation

### Avec GitHub Desktop

#### 1️⃣ Premier commit

1. Ouvrir **GitHub Desktop**
2. **File** > **Add Local Repository**
3. Sélectionner le dossier `devops-cicd-project`
4. En bas à gauche, écrire le message : `feat: initial commit`
5. Cliquer **"Commit to main"**
6. Cliquer **"Publish repository"** en haut
7. Choisir un nom et cliquer **"Publish"**

#### 2️⃣ Créer la branche dev

1. Dans GitHub Desktop, cliquer **"Current Branch: main"**
2. Cliquer **"New Branch"**
3. Nom : `dev`
4. Cliquer **"Create Branch"**
5. Cliquer **"Publish branch"**

#### 3️⃣ Développer une nouvelle fonctionnalité

1. **Créer une branche feature** :
   - **Current Branch** > **New Branch**
   - Nom : `feature/ma-fonctionnalite`
   - Basée sur : `dev`

2. **Faire vos modifications** dans votre éditeur de code

3. **Commit** :
   - GitHub Desktop détecte automatiquement les changements
   - Écrire un message : `feat: add ma fonctionnalite`
   - Cliquer **"Commit"**

4. **Push** :
   - Cliquer **"Push origin"**

5. **Créer une Pull Request** :
   - Cliquer **"Create Pull Request"** dans GitHub Desktop
   - Cela ouvre GitHub.com
   - Remplir le formulaire et créer la PR

6. **Attendre les checks automatiques** ✅

7. **Merger** la PR sur GitHub.com une fois approuvée

### Avec Docker Desktop

#### Voir vos conteneurs

1. Ouvrir **Docker Desktop**
2. Onglet **"Containers"**
3. Vous verrez tous vos conteneurs actifs

#### Voir les logs

1. Dans **Docker Desktop** > **Containers**
2. Cliquer sur votre conteneur
3. Les logs s'affichent en temps réel

#### Gérer les images

1. Onglet **"Images"**
2. Vous verrez toutes vos images Docker
3. Cliquer sur une image pour voir les détails

## 🧪 Tests

```bash
# Tester le backend
cd backend
npm test

# Tester le frontend
cd frontend
npm test

# Tous les tests avec couverture
npm test -- --coverage
```

## 🐳 Commandes Docker utiles

```bash
# Démarrer l'application
docker-compose up

# Démarrer en arrière-plan
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Rebuild les images
docker-compose up --build

# Nettoyer tout
docker-compose down -v
```

## 🔧 Configuration GitHub (Important !)

### Sur GitHub.com

1. **Aller sur votre repository** sur GitHub.com

2. **Configurer les secrets** :
   - **Settings** > **Secrets and variables** > **Actions**
   - Cliquer **"New repository secret"**
   
   **Secret 1 - DOCKER_USERNAME** :
   - Name : `DOCKER_USERNAME`
   - Secret : Votre nom d'utilisateur Docker Hub
   
   **Secret 2 - DOCKER_PASSWORD** :
   - Name : `DOCKER_PASSWORD`
   - Secret : Votre token Docker Hub (voir ci-dessous)

3. **Créer un token Docker Hub** :
   - Aller sur [hub.docker.com](https://hub.docker.com)
   - **Account Settings** > **Security**
   - **New Access Token**
   - Description : `github-actions`
   - Permissions : **Read, Write, Delete**
   - **Generate** et copier le token
   - Utiliser ce token comme `DOCKER_PASSWORD`

4. **Activer GitHub Pages** (optionnel) :
   - **Settings** > **Pages**
   - Source : **GitHub Actions**
   - Save

### Protection des branches (Important pour le TP)

1. **Settings** > **Branches**
2. **Add branch protection rule**
3. Branch name pattern : `main`
4. Cocher :
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
5. **Create**

Répéter pour la branche `dev`.

## 🔄 Workflows GitHub Actions

### CI Pipeline (automatique)

Se déclenche à chaque push sur `dev` ou `main` :
- ✅ Installation des dépendances
- ✅ Linting du code
- ✅ Tests unitaires
- ✅ Build de l'application
- ✅ Upload des artefacts

### Docker Build & Push (sur release)

Se déclenche quand vous créez une release :
- ✅ Build de l'image Docker
- ✅ Push sur Docker Hub
- ✅ Push sur GitHub Container Registry
- ✅ Scan de sécurité Trivy

### Deploy (après Docker build)

Se déclenche après le build Docker :
- ✅ Déploiement sur GitHub Pages
- ✅ Notifications

### PR Checks (sur Pull Request)

Se déclenche sur chaque PR :
- ✅ Vérification de la qualité du code
- ✅ Test de build Docker
- ✅ Audit de sécurité
- ✅ Commentaire automatique

## 📊 Voir les workflows en action

1. Aller sur votre repository GitHub.com
2. Cliquer sur l'onglet **"Actions"**
3. Vous verrez tous les workflows en cours et terminés
4. Cliquer sur un workflow pour voir les détails

## 🚀 Créer une release

### Sur GitHub.com

1. Aller sur votre repository
2. Cliquer sur **"Releases"** (à droite)
3. Cliquer **"Draft a new release"**
4. Cliquer **"Choose a tag"**
5. Taper `v1.0.0` et cliquer **"Create new tag"**
6. Title : `Version 1.0.0`
7. Description : Décrire les nouveautés
8. Cliquer **"Publish release"**

🎉 **Le pipeline complet se déclenche automatiquement !**

## 🎯 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Status de l'API |
| GET | `/api/items` | Liste tous les items |
| GET | `/api/items/:id` | Récupère un item |
| POST | `/api/items` | Crée un item |
| PUT | `/api/items/:id` | Met à jour un item |
| DELETE | `/api/items/:id` | Supprime un item |
| GET | `/api/stats` | Statistiques |

## 📖 Documentation complète

- 📘 [QUICKSTART.md](QUICKSTART.md) - Guide de démarrage rapide
- 📙 [GUIDE-GITHUB-DESKTOP.md](GUIDE-GITHUB-DESKTOP.md) - Guide GitHub Desktop
- 📕 [GUIDE-DOCKER-DESKTOP.md](GUIDE-DOCKER-DESKTOP.md) - Guide Docker Desktop
- 📗 [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution
- 📔 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Architecture du pipeline
- 📓 [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) - Dépannage
- 📋 [CHECKLIST.md](CHECKLIST.md) - Liste de vérification

## 🎨 Captures d'écran

### Application Frontend
Interface moderne et responsive avec gestion CRUD complète.

### Docker Desktop
Tous vos conteneurs visibles et gérables facilement.

### GitHub Actions
Pipeline CI/CD en action avec tous les checks.

## 🆘 Problèmes courants

### Docker Desktop dit "Docker is not running"
➡️ Cliquer sur l'icône Docker dans la barre des tâches et attendre qu'il démarre

### Port déjà utilisé (3000 ou 3001)
➡️ Arrêter les conteneurs dans Docker Desktop ou changer le port dans `.env`

### GitHub Desktop ne voit pas les modifications
➡️ Menu > Repository > Refresh

### Les tests échouent
➡️ Assurez-vous d'avoir lancé `npm install` dans backend/ et frontend/

Plus de solutions dans [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 🤝 Contribution

1. Forker le projet
2. Créer une branche (`feature/amazing-feature`)
3. Commit vos changements (`feat: add amazing feature`)
4. Push vers la branche
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📜 Licence

MIT License - voir [LICENSE](LICENSE)

## 👥 Auteurs

- Votre Nom - [GitHub](https://github.com/VOTRE-USERNAME)

## 🙏 Remerciements

- GitHub Actions pour le CI/CD
- Docker pour la containerisation
- La communauté Node.js et React

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous a aidé !**

🐛 **Trouvé un bug ?** [Créer une issue](https://github.com/VOTRE-USERNAME/devops-cicd-project/issues)

📧 **Questions ?** Ouvrez une discussion sur GitHub
