# Kasa - Application Front-End React

Projet realise dans le cadre du parcours OpenClassrooms (Projet 05).

Kasa est une application de location de logements construite en React, avec routage client et composants reutilisables (galerie, fiche logement, blocs repliables).

## Apercu

Objectifs fonctionnels du projet :
- afficher une galerie de logements depuis des donnees JSON,
- naviguer vers une page de detail via un identifiant dynamique,
- proposer une page de contact avec des sections collapsables,
- gerer les erreurs de navigation avec une page dediee.

## Stack Technique

- React 19
- React Router
- Vite
- Sass (SCSS)
- ESLint
- Font Awesome

## Architecture

```text
src/
	App.jsx
	main.jsx
	bdd/
		data.json
	layout/
		Router.jsx
		Header.jsx
		Footer.jsx
		Index.jsx
		Contact.jsx
		AccommodationDetails.jsx
		PageError.jsx
		collapse.jsx
	scss/
		style.scss
```

## Routes

- `/` : page d'accueil
- `/contact` : page de contact
- `/fiche-logement/:id` : fiche detaillee d'un logement

## Lancer Le Projet

### Prerequis

- Node.js 18 ou superieur
- npm

### Installation

```bash
npm install
```

### Developpement

```bash
npm run dev
```

Vite affiche ensuite l'URL locale (souvent `http://localhost:5173`).

### Build Production

```bash
npm run build
```

### Preview Production

```bash
npm run preview
```

### Qualite De Code

```bash
npm run lint
```

## Choix Techniques

- Routage centralise avec `createBrowserRouter` pour structurer les pages et la gestion d'erreur.
- Separation claire presentation/logique via des composants dedies dans `src/layout`.
- Donnees mockees locales (`src/bdd/data.json`) pour developper sans dependance API.
- Style global en SCSS avec organisation par zones de page.

## Ameliorations Possibles

- Ajouter des tests unitaires (React Testing Library).
- Ajouter une integration continue (lint/build automatiques).
- Charger les donnees via API avec etats de chargement/erreur.
- Ameliorer l'accessibilite (navigation clavier, attributs ARIA des collapses).

## Auteur

Projet realise par Leonie Dobbelstein dans le cadre de la formation OpenClassrooms.
