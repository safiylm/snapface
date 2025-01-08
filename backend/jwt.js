const jwt = require('jsonwebtoken');

// Configuration
const SECRET_KEY = 'votre_secret_key'; // Utilisez une clé secrète forte et gardez-la privée.
const RESET_URL_BASE = 'http://localhost:4200/reinistialisation-password';

// Générer un lien unique
  function generateResetLink(userId) {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' }); // Le lien expire après 1 heure
  return `${RESET_URL_BASE}/${token}`;
}

// Vérifier le lien
 function verifyResetLink(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.userId; // Retourne l'ID de l'utilisateur si valide
  } catch (error) {
    return null; // Jeton invalide ou expiré
  }
}


module.exports = {verifyResetLink, generateResetLink};