# Kasa - Application Front-End React

Projet realise dans le cadre du parcours OpenClassrooms (Projet 05).

Kasa est une application de location de logements construite en React, avec routage client et composants reutilisables (galerie, fiche logement, blocs repliables).

## Apercu

Objectifs fonctionnels du projet :
- afficher une galerie de logements depuis des donnees JSON,
- naviguer vers une page de detail via un identifiant dynamique,
- proposer une page de contact avec des sections collapsables,
- gerer les erreurs de navigation avec une page dediee,
- paginer la galerie d'accueil via une route dynamique.

## Stack Technique

- React 19
- React Router DOM 7
- Vite
- Sass (SCSS)
- ESLint
- Font Awesome (SVG via @fortawesome/react-fontawesome)

## Architecture

src/
    main.jsx
    App.jsx
    router.jsx
    bdd/
        data.json
    components/
        accordion/
        carousel/
        footer/
        header/
    pages/
        index/
            index.jsx
            indexPlaceholder.jsx
        property/
            property.jsx
            propertyPlaceholder.jsx
        contact/
            contact.jsx
        errorPage/
            errorPage.jsx
        ui/
            ui.jsx
    scss/
        _variables.scss
        style.scss

## Routes

- `/` : page d'accueil
- `/page/:page` : page d'accueil paginée
- `/contact` : page de contact
- `/fiche-logement/:id` : fiche detaillée d'un logement
- `/fiche-logement` : redirige vers la page d'erreur
- `*` : page d'erreur (routes inconnues)

## Branches

- Branch main
- Branch feature/fetch-data-api
- Branch remove-infinites-scroll*

* Branche principale, présentée en soutenance

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
- Chargement paresseux (`React.lazy`) des pages avec `Suspense` et composants placeholder dedies par page.
- Separation claire composants de mise en page (`components/`) et pages (`pages/`).
- Donnees mockees locales (`src/bdd/data.json`) pour developper sans dependance API.
- Style en SCSS modules par composant avec variables globales partagees.
- Alias de chemin `@/` configure dans Vite et jsconfig pour des imports absolus.

## Auteur

Projet realise par Leonie Dobbelstein dans le cadre de la formation OpenClassrooms.
