# Admin — santé plateforme

Petite SPA Angular : agrégation **`/health/aggregate`** (gateway) + lien vers **AdminJS** (`:3010/admin`). Ce n'est **pas** l'outil CRUD métier — voir [Amaz_back/docs/ADMIN_RUNBOOK.md](../Amaz_back/docs/ADMIN_RUNBOOK.md).

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1.

## Serveur de développement

```bash
ng serve
```

Ouvrir **`http://localhost:4203/`** (port dans `angular.json`).

## Scaffolding de code

Angular CLI inclut des outils de scaffolding. Pour générer un nouveau composant :

```bash
ng generate component nom-du-composant
```

Pour voir la liste complète des schémas disponibles (`components`, `directives`, `pipes`, etc.) :

```bash
ng generate --help
```

## Build

Pour compiler le projet :

```bash
ng build
```

Les artefacts de build sont stockés dans le répertoire `dist/`. Par défaut, le build de production optimise l'application pour la performance.

## Tests unitaires

Pour exécuter les tests unitaires avec [Vitest](https://vitest.dev/) :

```bash
ng test
```

## Tests end-to-end

Pour les tests end-to-end (e2e) :

```bash
ng e2e
```

Angular CLI ne fournit pas de framework de tests e2e par défaut. On peut choisir celui qui convient au projet.

## Ressources supplémentaires

Pour plus d'informations sur Angular CLI, consulter la [documentation officielle Angular CLI](https://angular.dev/tools/cli).
