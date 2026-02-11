// Version info - Update this when deploying
export const APP_VERSION = '1.2.0'
export const BUILD_TIME = new Date().toISOString()

// Changelog
export const CHANGELOG = {
  '1.2.0': [
    'Fix: Properly check allowPublicCreation setting',
    'Fix: Add missing fragment tag in CreateLixi',
    'Update: Funny challenges for Tet',
    'Add: Custom modals (Alert, Confirm, Prompt)',
    'Add: Bigger fireworks effects',
    'Add: Admin detail modal with approve/reject',
  ],
  '1.1.0': [
    'Remove: Tre em and Nguoi lon groups',
    'Keep only: Nam and Nu groups',
  ],
  '1.0.0': [
    'Initial release',
  ],
}
