# 📘 Guide GitHub Desktop - Pas à pas

Ce guide vous accompagne pour utiliser GitHub Desktop avec ce projet DevOps.

## 📥 Installation de GitHub Desktop

1. Télécharger : [desktop.github.com](https://desktop.github.com/)
2. Installer l'application
3. Se connecter avec votre compte GitHub

## 🚀 Démarrage du projet

### Étape 1 : Ajouter le projet dans GitHub Desktop

#### Méthode A : Projet déjà extrait

1. Extraire le fichier ZIP du projet
2. Ouvrir **GitHub Desktop**
3. Menu : **File** > **Add Local Repository...**
4. Cliquer **"Choose..."**
5. Sélectionner le dossier `devops-cicd-project`
6. Cliquer **"Add Repository"**

#### Méthode B : Initialiser un nouveau dépôt

1. Extraire le fichier ZIP
2. Ouvrir **GitHub Desktop**
3. Menu : **File** > **New Repository...**
4. **Ne pas cliquer Create**, juste fermer
5. Utiliser **Add Local Repository** (Méthode A)

### Étape 2 : Publier sur GitHub.com

1. Dans GitHub Desktop, en haut vous verrez :
   ```
   Publish repository
   ```

2. Cliquer sur **"Publish repository"**

3. Une fenêtre s'ouvre :
   - **Name** : `devops-cicd-project` (déjà rempli)
   - **Description** : "Pipeline CI/CD avec GitHub Actions"
   - **Keep this code private** : Décocher (pour un repo public)
   - Organisation : Laisser sur votre compte personnel

4. Cliquer **"Publish repository"**

5. ✅ Votre code est maintenant sur GitHub !

## 🌿 Gestion des branches

### Créer la branche `dev`

1. En haut de GitHub Desktop, cliquer sur **"Current Branch: main"**

2. Cliquer sur **"New Branch"**

3. Remplir :
   - **Name** : `dev`
   - **Create branch based on** : `main`

4. Cliquer **"Create Branch"**

5. Cliquer **"Publish branch"** pour l'envoyer sur GitHub

✅ Vous avez maintenant 2 branches : `main` et `dev`

### Créer une branche feature

Pour chaque nouvelle fonctionnalité :

1. **Basculer sur dev** :
   - Cliquer **"Current Branch"**
   - Sélectionner `dev`

2. **Créer la branche** :
   - **Current Branch** > **New Branch**
   - Name : `feature/nom-de-ma-fonctionnalite`
   - Basée sur : `dev`
   - **Create Branch**

3. **Publier** :
   - Cliquer **"Publish branch"**

Exemples de noms de branches :
- `feature/add-authentication`
- `feature/improve-ui`
- `fix/bug-login`
- `docs/update-readme`

## ✏️ Faire des modifications

### Workflow typique

1. **Ouvrir votre éditeur de code** (VS Code, Sublime, etc.)

2. **Modifier des fichiers**

3. **Retourner dans GitHub Desktop**
   - Les changements apparaissent automatiquement à gauche
   - Vous voyez ce qui a été ajouté (vert) et supprimé (rouge)

### Comprendre l'interface

```
┌─────────────────────────────────────────┐
│  Current Branch: feature/xxx    Publish │  ← En haut
├─────────────────────────────────────────┤
│                                         │
│  Changes (2)                    History │  ← Onglets
│                                         │
│  ☑ backend/src/routes.js       M       │  ← Fichiers modifiés
│  ☑ frontend/src/App.js         M       │
│  ☐ docs/README.md             A       │  ← A = Ajouté, M = Modifié
│                                         │
├─────────────────────────────────────────┤
│  Summary (required)                     │  ← Message de commit
│  [feat: add new endpoint          ]    │
│                                         │
│  Description                            │  ← Description (optionnel)
│  [Added user authentication       ]    │
│                                         │
│  [Commit to feature/xxx          ]    │  ← Bouton commit
└─────────────────────────────────────────┘
```

## 💾 Faire un commit

### Commit simple

1. **Écrire le message** (en bas à gauche) :
   - **Summary** : `feat: add user profile`
   - **Description** : (optionnel) Détails supplémentaires

2. Cliquer **"Commit to [nom-de-la-branche]"**

### Format des messages (Important !)

Utiliser le format **Conventional Commits** :

```
<type>(<scope>): <description>

Exemples :
feat: add login page
fix: correct button alignment
docs: update README
style: format code
refactor: improve API structure
test: add unit tests
chore: update dependencies
```

**Types** :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactoring
- `test` : Tests
- `chore` : Maintenance

### Commit avec plusieurs fichiers

Par défaut, tous les fichiers modifiés sont sélectionnés (☑).

Pour commit uniquement certains fichiers :
1. Décocher les fichiers que vous ne voulez pas inclure
2. Écrire le message
3. Commit

Faire un autre commit pour les autres fichiers.

## 🚀 Push vers GitHub

### Push simple

Après avoir fait des commits :

1. En haut, le bouton change :
   ```
   Push origin  (1)  ← Nombre de commits à push
   ```

2. Cliquer **"Push origin"**

3. ✅ Vos commits sont maintenant sur GitHub.com !

### Pull (récupérer les modifications)

Si d'autres personnes ont fait des changements :

1. Cliquer **"Fetch origin"** (en haut)
2. Si des changements existent, cliquer **"Pull origin"**

💡 **Conseil** : Faites toujours un **Fetch** avant de commencer à travailler !

## 🔀 Créer une Pull Request

### Depuis GitHub Desktop

1. Après avoir push vos commits, GitHub Desktop affiche :
   ```
   Create Pull Request
   ```

2. Cliquer dessus

3. Cela ouvre **GitHub.com** dans votre navigateur

4. Sur GitHub.com :
   - **Base** : `dev` (branche de destination)
   - **Compare** : `feature/votre-feature` (votre branche)
   - **Title** : Titre descriptif
   - **Description** : Expliquer vos changements
   
5. Cliquer **"Create Pull Request"**

### Que se passe-t-il ensuite ?

1. **Workflows GitHub Actions se lancent automatiquement** :
   - Tests backend ✅
   - Tests frontend ✅
   - Linting ✅
   - Build Docker ✅

2. **Vous verrez les résultats** directement sur la PR

3. **Attendre la review** (si configuré)

4. **Merger** une fois tout est vert ✅

## 🔄 Merger une Pull Request

### Sur GitHub.com

1. Aller sur votre repository
2. Onglet **"Pull requests"**
3. Cliquer sur votre PR
4. Attendre que tous les checks soient verts ✅
5. Cliquer **"Merge pull request"**
6. Cliquer **"Confirm merge"**

### Récupérer dans GitHub Desktop

1. Basculer sur la branche `dev` :
   - **Current Branch** > `dev`

2. Cliquer **"Fetch origin"**

3. Cliquer **"Pull origin"**

4. ✅ Vous avez maintenant les dernières modifications !

## 📦 Workflow complet d'une fonctionnalité

### De A à Z

```
1. Basculer sur dev
   ↓
2. Pull les dernières modifications
   ↓
3. Créer une branche feature
   ↓
4. Coder la fonctionnalité
   ↓
5. Commit régulièrement
   ↓
6. Push vers GitHub
   ↓
7. Créer une Pull Request
   ↓
8. Attendre les checks automatiques
   ↓
9. Review par un autre développeur
   ↓
10. Merger la PR
   ↓
11. Revenir sur dev et pull
```

### En détail

**1. Basculer sur dev**
```
Current Branch > dev
```

**2. Pull**
```
Fetch origin > Pull origin
```

**3. Nouvelle branche**
```
Current Branch > New Branch
Name: feature/add-profile
Based on: dev
Create Branch
```

**4. Coder**
```
Ouvrir VS Code ou autre éditeur
Faire vos modifications
```

**5. Commit**
```
Dans GitHub Desktop:
Summary: feat: add user profile page
Commit to feature/add-profile
```

**6. Push**
```
Push origin
```

**7. PR**
```
Create Pull Request (dans GitHub Desktop)
Remplir sur GitHub.com
Create Pull Request
```

**8-10. Review et merge** (sur GitHub.com)

**11. Nettoyer**
```
Current Branch > dev
Fetch origin > Pull origin
```

## 🏷️ Créer une release (tag)

Les releases se font sur **GitHub.com**, pas dans GitHub Desktop.

### Sur GitHub.com

1. Aller sur votre repository
2. Cliquer **"Releases"** (à droite)
3. Cliquer **"Draft a new release"**
4. **Choose a tag** : `v1.0.0`
5. **Target** : `main`
6. **Release title** : `Version 1.0.0`
7. **Description** : Décrire les changements
8. Cliquer **"Publish release"**

🎉 **Le pipeline Docker se déclenche automatiquement !**

### Voir le tag dans GitHub Desktop

1. Menu : **Repository** > **View on GitHub**
2. Onglet **"Releases"**
3. Vous verrez toutes vos releases

## 🔍 Voir l'historique

### Dans GitHub Desktop

1. Cliquer sur l'onglet **"History"** (en haut)
2. Vous verrez tous les commits
3. Cliquer sur un commit pour voir les détails

### Graphe des branches

1. Menu : **Repository** > **View on GitHub**
2. Sur GitHub.com, onglet **"Insights"**
3. Menu latéral : **"Network"**
4. Vous verrez un graphe de toutes les branches

## 🔧 Résolution de conflits

### Que se passe-t-il ?

Quand 2 personnes modifient le même fichier, il peut y avoir un **conflit**.

### Dans GitHub Desktop

1. GitHub Desktop détecte le conflit
2. Un message apparaît : **"Merge conflicts"**
3. Cliquer **"Open in [votre éditeur]"**

4. Dans votre éditeur, vous verrez :
```javascript
<<<<<<< HEAD
// Votre version
const hello = "world";
=======
// Leur version
const hello = "universe";
>>>>>>> dev
```

5. **Choisir** quelle version garder (ou combiner)

6. **Supprimer** les marqueurs (`<<<<`, `====`, `>>>>`)

7. **Sauvegarder** le fichier

8. **Retourner dans GitHub Desktop**

9. Cliquer **"Commit merge"**

## 🎯 Conseils et astuces

### ✅ Bonnes pratiques

1. **Fetch régulièrement** : Toujours faire "Fetch origin" avant de travailler
2. **Commits fréquents** : Commiter souvent avec des messages clairs
3. **Branches courtes** : Garder vos branches feature petites et ciblées
4. **Pull avant Push** : Toujours pull avant de push
5. **Messages clairs** : Utiliser le format Conventional Commits

### ⚠️ À éviter

1. ❌ Ne jamais commiter directement sur `main`
2. ❌ Ne pas faire de gros commits avec plein de changements
3. ❌ Ne pas oublier de push vos commits
4. ❌ Ne pas créer une PR sans tester localement
5. ❌ Ne pas merger sans attendre les checks

### 💡 Raccourcis clavier

- `Ctrl+T` (Windows) / `Cmd+T` (Mac) : Créer une branche
- `Ctrl+Shift+P` / `Cmd+Shift+P` : Ouvrir les préférences
- `Ctrl+,` / `Cmd+,` : Paramètres

### 🔄 Workflow quotidien

**Chaque matin** :
```
1. Ouvrir GitHub Desktop
2. Fetch origin
3. Pull si nécessaire
4. Commencer à coder
```

**Pendant la journée** :
```
1. Faire des modifications
2. Commit régulièrement
3. Push à la fin de la journée (ou plus souvent)
```

**Avant de partir** :
```
1. Commit tous les changements
2. Push origin
3. Créer une PR si la feature est terminée
```

## 📚 Ressources

- [Documentation GitHub Desktop](https://docs.github.com/en/desktop)
- [Guide Git](https://git-scm.com/book/en/v2)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🆘 Problèmes courants

### GitHub Desktop ne démarre pas
➡️ Redémarrer l'application ou réinstaller

### Je ne vois pas mes modifications
➡️ Menu > Repository > Refresh

### Erreur "repository not found"
➡️ Vérifier que vous êtes connecté au bon compte GitHub

### Je ne peux pas push
➡️ Vérifier votre connexion internet et que le repo existe sur GitHub

---

**Vous êtes maintenant prêt à utiliser GitHub Desktop comme un pro ! 🚀**
