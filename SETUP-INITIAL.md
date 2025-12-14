# ⚙️ Configuration Initiale - IMPORTANT !

> À faire AVANT de push sur GitHub pour la première fois

## 🚨 Problème courant

Si vous push directement sans ces étapes, les workflows GitHub Actions **échoueront** avec :
```
Error: Some specified paths were not resolved, unable to cache dependencies
```

## ✅ Solution : Générer les package-lock.json

Ces fichiers sont nécessaires pour que GitHub Actions puisse mettre en cache les dépendances npm.

### Sur votre machine locale

**Ouvrir un terminal dans le dossier du projet et exécuter :**

```bash
# 1. Backend
cd backend
npm install
cd ..

# 2. Frontend
cd frontend
npm install
cd ..
```

Cela va créer :
- ✅ `backend/package-lock.json`
- ✅ `frontend/package-lock.json`
- ✅ `backend/node_modules/` (ignoré par git)
- ✅ `frontend/node_modules/` (ignoré par git)

### Avec GitHub Desktop

Après avoir lancé `npm install` :

1. **GitHub Desktop** détecte automatiquement les nouveaux fichiers
2. Vous verrez 2 nouveaux fichiers :
   - `backend/package-lock.json`
   - `frontend/package-lock.json`
3. **Commit** : `chore: add package-lock.json files`
4. **Push origin**

## 📋 Checklist complète avant premier push

- [ ] Extraire le projet
- [ ] `cd backend && npm install`
- [ ] `cd ../frontend && npm install`
- [ ] Ouvrir GitHub Desktop
- [ ] Ajouter le repository local
- [ ] Commit : `feat: initial commit`
- [ ] Publier sur GitHub
- [ ] Créer la branche `dev`
- [ ] Configurer les secrets (DOCKER_USERNAME, DOCKER_PASSWORD)

## 🧪 Tester localement avant de push

### Backend
```bash
cd backend
npm test
# Tous les tests doivent passer ✅
```

### Frontend
```bash
cd frontend
npm test
# Tous les tests doivent passer ✅
```

### Docker
```bash
# À la racine du projet
docker-compose up --build
# L'application doit démarrer ✅
```

## 🔄 Workflow après configuration

Une fois les `package-lock.json` commités :

1. ✅ Le cache npm fonctionne dans GitHub Actions
2. ✅ `npm ci` peut être utilisé (plus rapide que `npm install`)
3. ✅ Les workflows CI passent correctement

## ⚠️ Si vous avez déjà push sans les package-lock.json

### Solution 1 : Ajouter les fichiers manquants

```bash
# Sur votre machine
cd backend
npm install
cd ../frontend
npm install
cd ..

# Dans GitHub Desktop
# Les fichiers package-lock.json apparaissent
Commit : "chore: add package-lock.json files"
Push origin

# Sur GitHub.com > Actions
# Les workflows devraient maintenant passer ✅
```

### Solution 2 : Le workflow utilise déjà npm install

Le workflow `ci.yml` a été mis à jour pour utiliser `npm install` au lieu de `npm ci`, ce qui fonctionne même sans `package-lock.json`.

**MAIS** : Il est quand même **fortement recommandé** d'avoir les `package-lock.json` pour :
- ✅ Versions exactes des dépendances
- ✅ Builds reproductibles
- ✅ Cache npm plus rapide
- ✅ Meilleure sécurité

## 🎯 Ordre recommandé

### Nouveau projet

```
1. Extraire le ZIP
2. cd backend && npm install && cd ..
3. cd frontend && npm install && cd ..
4. Tester localement (npm test, docker-compose up)
5. GitHub Desktop : Add repository
6. Commit + Push
7. Créer branche dev
8. Configurer secrets
9. Créer une release pour tester
```

### Projet existant avec erreurs

```
1. npm install dans backend/
2. npm install dans frontend/
3. Commit les package-lock.json
4. Push
5. Vérifier que les workflows passent ✅
```

## 💡 Pourquoi package-lock.json est important ?

### Sans package-lock.json
```json
"dependencies": {
  "express": "^4.18.2"  // Peut installer 4.18.x, 4.19.x, etc.
}
```
➡️ Versions différentes à chaque installation
➡️ Builds non reproductibles
➡️ Bugs potentiels

### Avec package-lock.json
```json
"express": {
  "version": "4.18.2",  // Version EXACTE
  "resolved": "https://...",
  "integrity": "sha512-..."
}
```
➡️ Même version partout
➡️ Builds reproductibles
➡️ Plus sûr

## 🆘 Erreurs courantes

### "npm ERR! code ENOENT"
➡️ Vous n'êtes pas dans le bon dossier
➡️ Assurez-vous d'être dans `backend/` ou `frontend/`

### "npm WARN deprecated"
➡️ Normal, juste des warnings
➡️ Pas grave, continuez

### Tests qui échouent
➡️ Vérifiez que Docker Desktop est démarré (pour certains tests)
➡️ Relancez `npm install`
➡️ Essayez `npm test` plusieurs fois

## ✅ Vérification finale

Avant de push, vérifiez que vous avez :

```
✅ backend/package.json
✅ backend/package-lock.json  ← IMPORTANT
✅ backend/node_modules/       (ignoré par git)

✅ frontend/package.json
✅ frontend/package-lock.json  ← IMPORTANT
✅ frontend/node_modules/      (ignoré par git)
```

Dans GitHub Desktop, les `node_modules/` ne doivent **PAS** apparaître (ils sont dans `.gitignore`).

---

**Une fois cette configuration faite, vous n'aurez plus à vous en soucier ! 🎉**

**Prochaine étape : START-HERE.md**
