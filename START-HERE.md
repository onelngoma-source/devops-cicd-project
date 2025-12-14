# ⚡ DÉMARRAGE EXPRESS - 5 minutes chrono !

> Guide ultra-rapide pour GitHub Desktop + Docker Desktop

## ✅ Avant de commencer

- [ ] Docker Desktop installé et **démarré** (icône verte)
- [ ] GitHub Desktop installé
- [ ] Compte GitHub actif
- [ ] Compte Docker Hub actif

---

## 🚀 PARTIE 1 : Démarrer l'application (2 minutes)

### Étape 1 : Extraire et installer
```bash
# 1. Extraire le ZIP
📁 Extraire devops-cicd-project.zip

# 2. Installer les dépendances (IMPORTANT !)
cd devops-cicd-project/backend
npm install
cd ../frontend
npm install
cd ..

# ✅ Cela crée les package-lock.json nécessaires pour GitHub Actions
```

### Étape 2 : Lancer avec Docker Desktop
```bash
docker-compose up --build
```

**Attendez de voir :**
```
✅ devops-backend  | Server running on port 3001
✅ devops-frontend | webpack compiled successfully
```

### Étape 3 : Tester
Ouvrir dans le navigateur :
- ✅ http://localhost:3000 (Application)
- ✅ http://localhost:3001/health (API)

**🎉 Ça marche ? Passez à la partie 2 !**

Pour arrêter : `Ctrl+C` puis `docker-compose down`

---

## 📤 PARTIE 2 : Publier sur GitHub (3 minutes)

### Étape 1 : Ouvrir dans GitHub Desktop

1. **Ouvrir GitHub Desktop**
2. **File** > **Add Local Repository**
3. **Choose** > Sélectionner le dossier `devops-cicd-project`
4. **Add Repository**

### Étape 2 : Premier commit

1. En bas à gauche :
   - **Summary** : `feat: initial commit`
2. **Commit to main**
3. **Publish repository** (en haut)
4. Décocher "Keep this code private"
5. **Publish Repository**

✅ Votre code est maintenant sur GitHub !

### Étape 3 : Créer la branche dev

1. **Current Branch** (en haut) > **New Branch**
2. **Name** : `dev`
3. **Create Branch**
4. **Publish branch**

✅ Vous avez main ET dev !

---

## 🔐 PARTIE 3 : Configurer les secrets (3 minutes)

### Étape 1 : Créer un token Docker Hub

1. Aller sur https://hub.docker.com
2. Se connecter
3. **Account Settings** (en haut à droite)
4. **Security** (menu gauche)
5. **New Access Token**
6. Description : `github-actions`
7. Permissions : **Read, Write, Delete**
8. **Generate**
9. **📋 COPIER LE TOKEN** (important !)

### Étape 2 : Ajouter les secrets sur GitHub

1. Aller sur votre repository GitHub.com
2. **Settings** > **Secrets and variables** > **Actions**
3. **New repository secret**

**Secret 1 :**
- Name : `DOCKER_USERNAME`
- Secret : VOTRE-NOM-DOCKERHUB
- **Add secret**

**Secret 2 :**
- Name : `DOCKER_PASSWORD`
- Secret : COLLER-LE-TOKEN-COPIÉ
- **Add secret**

✅ Les secrets sont configurés !

---

## 🎯 PARTIE 4 : Tester le pipeline (2 minutes)

### Option A : Faire un commit de test

Dans **GitHub Desktop** :

1. Modifier un fichier (ex: README.md, ajouter une ligne)
2. **Commit** avec message : `test: verify CI pipeline`
3. **Push origin**
4. Aller sur GitHub.com > **Actions**
5. Voir le workflow en cours ! 🎉

### Option B : Créer une release

Sur **GitHub.com** :

1. **Releases** (à droite) > **Draft a new release**
2. **Choose a tag** : taper `v1.0.0` > **Create new tag**
3. **Title** : `Version 1.0.0`
4. **Description** : `Première release !`
5. **Publish release**
6. Aller dans **Actions** > Voir les 2 workflows se lancer ! 🚀

---

## 📊 VÉRIFIER QUE TOUT FONCTIONNE

### Dans Docker Desktop
- Onglet **Containers** : 2 conteneurs verts
- Cliquer sur `devops-backend` pour voir les logs

### Dans GitHub
- Onglet **Actions** : workflows verts ✅
- Onglet **Packages** : image Docker publiée (après release)

### Dans le navigateur
- http://localhost:3000 : Interface qui fonctionne
- Ajouter un item, le modifier, le supprimer

---

## 🆘 Problèmes ?

### Docker dit "is not running"
➡️ Ouvrir Docker Desktop et attendre qu'il soit vert

### Port 3000 déjà utilisé
```bash
docker-compose down
# Puis relancer
docker-compose up
```

### GitHub Desktop ne voit pas les modifications
➡️ Menu > Repository > Refresh

### Les workflows échouent
➡️ Vérifier que les secrets sont bien configurés

---

## 📚 Documentation complète

Pour en savoir plus :

- 📘 **GUIDE-GITHUB-DESKTOP.md** : Guide complet GitHub Desktop
- 🐳 **GUIDE-DOCKER-DESKTOP.md** : Guide complet Docker Desktop
- 📖 **README.md** : Documentation complète du projet
- ⚡ **QUICKSTART.md** : Guide de démarrage détaillé

---

## 🎉 FÉLICITATIONS !

Vous avez :
- ✅ Une application qui tourne
- ✅ Un repository GitHub
- ✅ Un pipeline CI/CD fonctionnel
- ✅ Des workflows automatiques

**🚀 Votre projet DevOps est opérationnel !**

---

## 📝 Prochaines étapes

### Développer une fonctionnalité

1. Dans GitHub Desktop : **Current Branch** > **New Branch**
2. Name : `feature/ma-feature`
3. Coder votre fonctionnalité
4. **Commit** régulièrement
5. **Push origin**
6. Sur GitHub.com : Créer une **Pull Request**
7. Attendre que les checks passent
8. **Merge** !

### Créer une nouvelle release

1. Merger vos PR dans `main`
2. Sur GitHub.com : **Releases** > **Draft new release**
3. Tag : `v1.1.0`
4. **Publish**
5. Le pipeline build et deploy automatiquement ! 🎉

---

**Temps total : ~15 minutes** ⏱️

**Questions ?** Ouvrez une issue sur GitHub !
