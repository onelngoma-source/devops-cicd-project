# Guide de Contribution

## Convention de commits

Utilisez le format Conventional Commits :

```
<type>(<scope>): <description>

Types :
- feat: Nouvelle fonctionnalité
- fix: Correction de bug
- docs: Documentation
- style: Formatage
- refactor: Refactoring
- test: Tests
- chore: Maintenance

Exemples :
feat(api): add user authentication
fix(frontend): correct button alignment
docs(readme): update installation steps
```

## Workflow

1. Basculer sur dev
2. Créer une branche feature
3. Développer
4. Commit régulièrement
5. Push vers GitHub
6. Créer une Pull Request
7. Attendre les checks
8. Review et merge

## Tests

Toujours lancer les tests avant de push :

```bash
npm test
```

## Questions ?

Ouvrez une issue sur GitHub !
