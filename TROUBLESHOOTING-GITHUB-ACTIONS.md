# 🔧 Dépannage GitHub Actions

## ❌ Erreur : "unable to cache dependencies"

### Problème
```
Error: Some specified paths were not resolved, unable to cache dependencies
```

### Cause
Les fichiers `package-lock.json` sont manquants dans votre repository.

### Solution rapide

**Sur votre machine locale :**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**Avec GitHub Desktop :**
1. Les fichiers `package-lock.json` apparaissent
2. Commit : `chore: add package-lock.json files`
3. Push origin
4. Retester le workflow ✅

### Explication
GitHub Actions utilise le cache npm pour accélérer les builds. Le cache nécessite que les `package-lock.json` existent dans le repository.

**Note** : Le workflow a été mis à jour pour utiliser `npm install` au lieu de `npm ci`, ce qui fonctionne même sans `package-lock.json`. Mais il est **fortement recommandé** de les ajouter pour :
- ✅ Versions exactes des dépendances
- ✅ Builds reproductibles
- ✅ Cache plus rapide

➡️ **Voir SETUP-INITIAL.md pour plus de détails**

---

## ❌ Erreur : "deprecated version of actions/upload-artifact: v3"

### Problème
```
Error: This request has been automatically failed because it uses a 
deprecated version of `actions/upload-artifact: v3`
```

### Solution
Le workflow `ci.yml` a été corrigé pour utiliser `v4`.

**Actions à faire :**

1. **Récupérer la dernière version** du fichier `ci.yml`
2. **Remplacer** votre `.github/workflows/ci.yml` actuel
3. **Commit et push**

**Avec GitHub Desktop :**
```
1. Copier le nouveau ci.yml
2. GitHub Desktop détecte le changement
3. Commit : "fix: update to upload-artifact v4"
4. Push origin
```

### Vérification
- ✅ Le workflow CI devrait maintenant passer
- ✅ Les artefacts seront uploadés avec la version v4

---

## ❌ Erreur : "invalid tag" dans Docker Build

### Problème
```
ERROR: invalid tag "/devops-app:latest": invalid reference format
```

### Solution
Le workflow `docker-publish.yml` a été corrigé. Le problème venait d'une mauvaise configuration des tags Docker.

**Actions à faire :**

1. **Récupérer la dernière version du fichier** depuis ce projet
2. **Remplacer** votre `.github/workflows/docker-publish.yml` actuel
3. **Commit et push** le changement

**Avec GitHub Desktop :**
```
1. Copier le nouveau docker-publish.yml
2. GitHub Desktop détecte le changement
3. Commit : "fix: correct docker tags format"
4. Push origin
```

### Vérification
Le workflow devrait maintenant :
- ✅ Construire l'image correctement
- ✅ Pusher sur Docker Hub avec le tag : `VOTRE-USERNAME/devops-app:latest`
- ✅ Pusher sur GHCR avec le tag : `ghcr.io/VOTRE-USERNAME/devops-app:latest`

---

## ❌ Erreur : "secrets.DOCKER_USERNAME" is empty

### Problème
Les secrets ne sont pas configurés correctement.

### Solution

1. **Aller sur GitHub.com** > Votre repository
2. **Settings** > **Secrets and variables** > **Actions**
3. **Vérifier que vous avez :**
   - `DOCKER_USERNAME` (sans espaces)
   - `DOCKER_PASSWORD` (doit être un token, pas le mot de passe)

4. **Si manquants, les créer :**
   - **DOCKER_USERNAME** : votre nom d'utilisateur Docker Hub
   - **DOCKER_PASSWORD** : token depuis hub.docker.com > Account Settings > Security > New Access Token

---

## ❌ Erreur : "denied: requested access to the resource is denied"

### Problème
Le token Docker Hub n'a pas les bonnes permissions.

### Solution

1. **Créer un nouveau token** sur hub.docker.com
2. **Permissions requises** : Read, Write, Delete
3. **Remplacer** le secret `DOCKER_PASSWORD` sur GitHub avec le nouveau token

---

## ❌ Le workflow CI échoue sur les tests

### Problème
```
npm ERR! ENOENT: no such file or directory
```

### Solution

Le problème vient probablement de `package-lock.json` manquant.

**Sur votre machine locale :**
```bash
# Backend
cd backend
npm install
git add package-lock.json

# Frontend  
cd ../frontend
npm install
git add package-lock.json

# Commit
git commit -m "chore: add package-lock.json files"
git push
```

**Avec GitHub Desktop :**
1. Les fichiers `package-lock.json` apparaissent
2. Commit : "chore: add package-lock.json files"
3. Push origin

---

## ❌ Erreur : "Error: No url found for Pages deployment"

### Problème
GitHub Pages n'est pas activé.

### Solution

1. **Aller sur GitHub.com** > Votre repository
2. **Settings** > **Pages**
3. **Source** : Sélectionner "GitHub Actions"
4. **Save**

Ensuite, refaire un push pour relancer le workflow.

---

## ❌ Le workflow ne se déclenche pas

### Problème
Vous avez push mais aucun workflow ne se lance.

### Solutions possibles

**1. Vérifier la branche**
- Les workflows CI se déclenchent sur `main` et `dev`
- Vérifiez que vous êtes sur l'une de ces branches

**2. Vérifier les fichiers workflow**
- Les fichiers doivent être dans `.github/workflows/`
- Vérifier que les fichiers `.yml` sont bien présents

**3. Forcer le déclenchement**
Sur GitHub.com :
- Aller dans **Actions**
- Sélectionner un workflow
- Cliquer sur **Run workflow**

---

## ✅ Vérifier que tout fonctionne

### Checklist après correction

- [ ] Secrets configurés (DOCKER_USERNAME et DOCKER_PASSWORD)
- [ ] Fichier docker-publish.yml à jour
- [ ] GitHub Pages activé (si vous voulez le déploiement)
- [ ] package-lock.json présents et commités
- [ ] Push effectué vers GitHub
- [ ] Workflow visible dans l'onglet Actions

### Test complet

1. **Faire un petit changement** (ex: ajouter une ligne dans README.md)
2. **Commit et push** avec GitHub Desktop
3. **Aller sur GitHub.com** > **Actions**
4. **Vérifier** que le workflow CI se lance et passe ✅

---

## 🆘 Toujours un problème ?

### Voir les logs détaillés

1. GitHub.com > **Actions**
2. Cliquer sur le workflow qui a échoué
3. Cliquer sur le job en rouge
4. Développer les steps pour voir l'erreur exacte

### Workflows disponibles

- **CI Pipeline** (ci.yml) : Tests automatiques
- **Docker Build and Push** (docker-publish.yml) : Build Docker sur release
- **Deploy** (deploy.yml) : Déploiement automatique
- **PR Checks** (pr-checks.yml) : Validation des Pull Requests

---

## 📞 Support

Si le problème persiste :

1. **Copier l'erreur complète** depuis les logs GitHub Actions
2. **Ouvrir une issue** sur le repository
3. **Inclure** :
   - Le message d'erreur
   - Le nom du workflow
   - Ce que vous avez déjà essayé

---

**Mis à jour le 14 décembre 2024**
