#!/bin/bash

# Script de déploiement automatique pour Vercel
echo "🚀 Déploiement automatique du portfolio Ademinho"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Build du projet
echo "🔨 Build du projet..."
npm run build

# Vérifier que le build a réussi
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

# Déploiement
echo "🌐 Déploiement en cours..."
vercel --prod

echo "✅ Déploiement terminé !"
echo "🔗 Votre site est maintenant en ligne"
