#!/bin/bash

# ==============================================================================
# Script de sauvegarde automatisé - Projet Orion (MicroCRM)
# ==============================================================================

# Variables
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_ARCHIVE="$BACKUP_DIR/orion_config_backup_$TIMESTAMP.tar.gz"

echo "🚀 Démarrage de la sauvegarde du projet Orion..."

# 1. Création du dossier de destination s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# 2. Création de l'archive (sauvegarde des fichiers d'infrastructure et config)
echo "📦 Archivage des fichiers Docker, configurations Logstash et scripts..."
tar -czf "$BACKUP_ARCHIVE" docker-compose*.yml logstash/

# Vérification du statut de la commande précédente
if [ $? -eq 0 ]; then
  echo "✅ Sauvegarde terminée avec succès !"
  echo "📁 Fichier généré : $BACKUP_ARCHIVE"
  
  # On ne garde que les 5 dernières sauvegardes pour ne pas saturer le disque
  echo "🧹 Nettoyage des anciennes sauvegardes (conservation des 5 plus récentes)..."
  ls -1t "$BACKUP_DIR"/orion_config_backup_*.tar.gz | tail -n +6 | xargs -d '\n' rm -f -- 2>/dev/null
else
  echo "❌ Erreur lors de la création de la sauvegarde."
  exit 1
fi