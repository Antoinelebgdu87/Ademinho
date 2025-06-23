# Déploiement sur Vercel - Guide Rapide

## 🚀 Déploiement Automatique

### Option 1: Via Vercel CLI (Recommandé)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Login Vercel
vercel login

# 3. Déployer
vercel

# 4. Promouvoir en production
vercel --prod
```

### Option 2: Via GitHub + Vercel Dashboard

1. Push le code sur GitHub
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Auto-déploiement à chaque push

## ⚙️ Configuration Automatique

Le projet est pré-configuré avec :

- ✅ `vercel.json` - Configuration Vercel
- ✅ Routes SPA configurées
- ✅ Cache optimisé pour les assets
- ✅ Build command automatique
- ✅ Variables d'environnement prêtes

## 🛠️ Variables d'Environnement

Ajouter dans Vercel Dashboard > Settings > Environment Variables :

```
NODE_ENV=production
VITE_API_URL=https://api.jsonbin.io/v3/b
```

## 📁 Structure après déploiement

```
https://your-app.vercel.app/
├── / (Homepage)
├── /about (À propos)
├── /works (Portfolio)
├── /contact (Contact)
└── /admin (Panel admin)
```

## 🔧 Fonctionnalités Vercel

- ✅ **Auto-builds** sur push Git
- ✅ **HTTPS** automatique
- ✅ **CDN global** pour vitesse
- ✅ **Preview deployments** sur PR
- ✅ **Analytics** intégrés
- ✅ **Domaine custom** gratuit

## 🎯 Performance

- ✅ **Lighthouse 100/100** possible
- ✅ **Edge locations** worldwide
- ✅ **Static generation** optimisée
- ✅ **Image optimization** automatique

## 🚀 URL de démo

Après déploiement, l'app sera accessible sur :
`https://ademinho-portfolio-[random].vercel.app`

## 🔐 Éditeur visuel

- Fonctionne identique en production
- Sauvegarde globale via API
- Accessible via `Ctrl+E` partout
