# 🚀 Démarrage Rapide

## Option 1 : Avec Docker Desktop (Plus simple !)

### Prérequis
- Docker Desktop installé et démarré

### Étapes
```bash
# 1. Extraire le projet
unzip devops-cicd-project.zip
cd devops-cicd-project

# 2. Démarrer avec Docker
docker-compose up --build
```

✅ C'est tout ! Accédez à http://localhost:3000

## Option 2 : Installation manuelle

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (nouveau terminal)
cd frontend
npm install
npm start
```

## Configuration GitHub

### 1. Créer le repository

1. Ouvrir GitHub Desktop
2. File > Add Local Repository
3. Publier sur GitHub.com

### 2. Créer la branche dev

1. Current Branch > New Branch
2. Nom : `dev`
3. Publish branch

### 3. Configurer les secrets

Sur GitHub.com :
1. Settings > Secrets > Actions
2. New repository secret

**DOCKER_USERNAME** : Votre nom Docker Hub
**DOCKER_PASSWORD** : Token Docker Hub

Pour créer le token :
- hub.docker.com > Account Settings > Security > New Access Token

## Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Créer une release

1. Sur GitHub.com : Releases > Draft new release
2. Tag : `v1.0.0`
3. Publish
4. Le pipeline CI/CD se déclenche automatiquement !

## Documentation complète

- 📘 [Guide GitHub Desktop](GUIDE-GITHUB-DESKTOP.md)
- 🐳 [Guide Docker Desktop](GUIDE-DOCKER-DESKTOP.md)
- 📖 [README complet](README.md)
