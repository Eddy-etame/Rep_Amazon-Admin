# Application admin (Angular)

Doc détaillée côté administration : **[Amaz_back/docs/services/admin-service.md](../Amaz_back/docs/services/admin-service.md)**  
Runbook opérationnel : **[Amaz_back/docs/ADMIN_RUNBOOK.md](../Amaz_back/docs/ADMIN_RUNBOOK.md)**

Petite SPA Angular qui affiche la **santé agrégée** de la plateforme (`/health/aggregate` via la gateway) et fournit un lien direct vers le back-office **AdminJS** (`http://localhost:3010/admin`). Ce n'est pas l'outil CRUD métier — toute la gestion des données passe par AdminJS ou l'API admin de la gateway.
