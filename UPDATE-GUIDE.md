# ⚡ MISE À JOUR EXPRESS - 2 minutes

> Si vous avez déjà commencé le projet et rencontrez des erreurs

## 🔧 Problèmes résolus

✅ Erreur `invalid tag "/devops-app:latest"`
✅ Erreur `deprecated version of actions/upload-artifact: v3`

## 🚀 Mise à jour rapide (Option 1 - Recommandée)

### Étape 1 : Télécharger les fichiers corrigés

Téléchargez le **nouveau ZIP** et extrayez-le.

### Étape 2 : Copier les fichiers corrigés

Depuis le **nouveau projet** vers votre **projet actuel**, copiez :

```
✅ .github/workflows/ci.yml
✅ .github/workflows/docker-publish.yml
✅ TROUBLESHOOTING-GITHUB-ACTIONS.md (nouveau)
✅ CHANGELOG.md (nouveau)
```

### Étape 3 : Commit avec GitHub Desktop

1. Ouvrir **GitHub Desktop**
2. Les 4 fichiers modifiés/ajoutés apparaissent
3. **Summary** : `fix: update workflows and add troubleshooting guide`
4. **Commit to main** (ou votre branche actuelle)
5. **Push origin**

### Étape 4 : Vérifier

1. **GitHub.com** > Votre repo > **Actions**
2. Faire un nouveau push ou créer une release
3. Les workflows devraient passer en **vert** ✅

---

## 🔄 Tout recommencer (Option 2)

Si vous préférez repartir de zéro :

### Étape 1 : Nettoyer

1. **Supprimer** l'ancien dossier local
2. **Sur GitHub.com** : Settings > Delete this repository (si vous voulez)

### Étape 2 : Repartir

1. Extraire le **nouveau ZIP**
2. Suivre **START-HERE.md**
3. Tout est déjà corrigé ! ✅

---

## 📋 Qu'est-ce qui a changé ?

### Fichier `ci.yml`
```yaml
# AVANT
- uses: actions/upload-artifact@v3  ❌

# APRÈS  
- uses: actions/upload-artifact@v4  ✅
```

### Fichier `docker-publish.yml`
```yaml
# AVANT
env:
  DOCKER_IMAGE: ${{ secrets.DOCKER_USERNAME }}/devops-app  ❌
# Causait: /devops-app:latest (incorrect)

# APRÈS
images: |
  ${{ secrets.DOCKER_USERNAME }}/devops-app  ✅
  ghcr.io/${{ github.repository_owner }}/devops-app  ✅
# Produit: votre-username/devops-app:latest (correct)
```

---

## ✅ Checklist de vérification

Après la mise à jour, vérifiez que :

- [ ] Fichiers `.github/workflows/*.yml` remplacés
- [ ] Commit effectué
- [ ] Push effectué
- [ ] Secrets toujours configurés (DOCKER_USERNAME, DOCKER_PASSWORD)
- [ ] Test : push sur GitHub
- [ ] Workflow CI passe ✅
- [ ] Test : créer une release
- [ ] Workflow Docker Build passe ✅

---

## 🧪 Tests rapides

### Test 1 : CI

```bash
# Modifier un fichier
echo "# Test" >> README.md

# GitHub Desktop
Commit : "test: verify CI"
Push origin

# GitHub.com > Actions
✅ CI Pipeline devrait être vert
```

### Test 2 : Docker Build

```bash
# GitHub.com
Releases > Draft new release
Tag : v1.0.1
Publish release

# Actions
✅ Docker Build and Push devrait être vert
✅ Deploy devrait être vert

# Docker Hub
✅ Image devops-app visible
```

---

## 🆘 Toujours des problèmes ?

### Voir les logs

1. **GitHub.com** > **Actions**
2. Cliquer sur le workflow en rouge
3. Cliquer sur le job en rouge
4. Développer les steps pour voir l'erreur

### Consulter la documentation

- **TROUBLESHOOTING-GITHUB-ACTIONS.md** : Solutions aux erreurs courantes
- **CHANGELOG.md** : Détails de toutes les corrections

### Secrets manquants ?

Vérifiez sur **GitHub.com** > **Settings** > **Secrets** :
- ✅ `DOCKER_USERNAME` existe
- ✅ `DOCKER_PASSWORD` existe (doit être un token Docker Hub)

### Refaire les secrets

1. **hub.docker.com** > Account Settings > Security
2. New Access Token
3. Permissions : Read, Write, Delete
4. Copier le token
5. Sur GitHub : remplacer `DOCKER_PASSWORD` avec ce token

---

## 💡 Pourquoi ces erreurs ?

### upload-artifact v3
GitHub a **déprécié** la version v3 le 16 avril 2024. Tous les workflows doivent utiliser v4+.

### Tags Docker
Le format correct d'un tag Docker est `username/image:tag`, pas `/image:tag`.

---

## ✨ Améliorations bonus

Le nouveau `docker-publish.yml` inclut aussi :

- ✅ Push sur **GHCR** (GitHub Container Registry)
- ✅ Build **multi-plateforme** (amd64 + arm64)
- ✅ Tags **sémantiques** automatiques (v1.0.0, v1.0, v1)

---

**Temps de mise à jour : ~2 minutes** ⏱️

**Dernière mise à jour : 14 décembre 2024**
