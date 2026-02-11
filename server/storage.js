import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, 'data')
const LIXIS_FILE = path.join(DATA_DIR, 'lixis.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')
const CHALLENGES_FILE = path.join(DATA_DIR, 'challenges.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Load data from file or return default
function loadJSON(filepath, defaultData) {
  try {
    if (fs.existsSync(filepath)) {
      const data = fs.readFileSync(filepath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(`Error loading ${filepath}:`, error.message)
  }
  return defaultData
}

// Save data to file
function saveJSON(filepath, data) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error(`Error saving ${filepath}:`, error.message)
    return false
  }
}

// Auto-save with debounce
let saveTimeouts = {}

function autoSave(key, filepath, data, delay = 1000) {
  if (saveTimeouts[key]) {
    clearTimeout(saveTimeouts[key])
  }
  saveTimeouts[key] = setTimeout(() => {
    saveJSON(filepath, data)
    console.log(`💾 Auto-saved: ${path.basename(filepath)}`)
  }, delay)
}

export const Storage = {
  // Lixis
  loadLixis: () => loadJSON(LIXIS_FILE, {}),
  saveLixis: (data) => saveJSON(LIXIS_FILE, data),
  autoSaveLixis: (data) => autoSave('lixis', LIXIS_FILE, data),

  // Settings
  loadSettings: () => loadJSON(SETTINGS_FILE, {
    allowPublicCreation: false,
    successAmount: 200000,
    failAmount: 100000,
  }),
  saveSettings: (data) => saveJSON(SETTINGS_FILE, data),
  autoSaveSettings: (data) => autoSave('settings', SETTINGS_FILE, data),

  // Challenges
  loadChallenges: () => loadJSON(CHALLENGES_FILE, null),
  saveChallenges: (data) => saveJSON(CHALLENGES_FILE, data),
  autoSaveChallenges: (data) => autoSave('challenges', CHALLENGES_FILE, data),
}

export default Storage
