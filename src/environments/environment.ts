import { hoteDevServeur } from '../../../shared-frontend/hote-dev-serveur';

const h = hoteDevServeur();

export const environment = {
  production: false,
  /** Gateway API (health aggregate, etc.) */
  gatewayOrigin: `http://${h}:3000`,
  /** admin-service root (liveness GET /health) */
  adminServiceOrigin: `http://${h}:3010`,
  /** AdminJS back-office (admin-service) */
  adminJsUrl: `http://${h}:3010/admin`,
  /** Link to backend runbook in repo (open locally or on GitHub) */
  adminRunbookUrl:
    'https://github.com/Eddy-etame/Amaz_back/blob/main/docs/ADMIN_RUNBOOK.md',
  /** Dashboard + platform health poll interval */
  healthPollIntervalMs: 2 * 60 * 1000
};
