# MoviesApp — Premium Video Streaming Platform

A responsive, high-performance video streaming and movie discovery application built with **React.js**. Inspired by modern enterprise streaming solutions like Netflix and Prime Video, this application features secure JWT-based authentication, interactive slider carousels, dynamic search index queries, global state-based failure/loading loops, and deep-linked layout views.

Developed as a marquee milestone project within the **CCBP Intensive Curriculum**, this application showcases advanced proficiency in single-page application (SPA) routing, robust API integration patterns, modular component design, and responsive styling architecture.

---

## 🚀 Key Features & System Capabilities

### 1. Secure Authentication & Route Guarding (`/login`)
- **JWT Session Persistence:** Validates user credentials against an external API and secures the returning JSON Web Token inside localized client-side browser cookies via `js-cookie`.
- **Interceptors & Route Guards:** Utilizes a highly robust `ProtectedRoute` higher-order component pattern to block unauthorized traffic. Unauthenticated users hitting secure paths are automatically trapped and forced back to `/login`.
- **Dynamic Form Validation:** Features automated state alerts and gracefully handles API authentication faults (e.g., mismatched passwords, missing user profiles).

### 2. High-Fidelity Movie Dashboard (`/`)
- **Hero Video/Poster Banner:** Automatically chooses and features a high-impact trending title from the server on load, building a massive contextual backdrop layer complete with title tags, descriptive overviews, and interactive action buttons.
- **Dynamic Content Sliders:** Packs interactive, sleek carousels that partition media titles into separate fluid rails like *Trending Now* and *Top Rated Content*.
- **State-Driven Fallbacks:** Integrates centralized loader spinner animations and dedicated error fallback designs featuring functional "Try Again" network retries.

### 3. Deep-Linked Movie Profiles (`/movies/:id`)
- **Dynamic Routing:** Decouples specific path param matching hooks to download isolated media datasets instantly on point-of-interest clicks.
- **Rich Context Layouts:** Parses dynamic asset configurations including high-resolution backdrop matrices, runtimes, release years, audio channel availability, generic tags, and complete textual synopsis logs.
- **Recommendation Grid Engine:** Automatically runs internal map properties to output a grid system mapping out relevant titles, allowing endless contextual loops across the layout structure.

### 4. Interactive Search Architecture (`/search`)
- **Keyword Processing queries:** Provides instant global searches by capturing text entry fields and modifying endpoint structural properties dynamically.
- **Clean Failure & Empty-Result Handlers:** Renders a bespoke fallback view if no entries match the criteria, allowing users to rapidly wipe input fields and try alternate keywords.

### 5. Profile & Session Management (`/account`)
- **User Verification:** Extracts and showcases persistent profile properties alongside masked account credential placeholders.
- **Total Session Eviction:** Wipes browser context tokens and routes the viewer immediately back to the `/login` gateway.

---

## 🛠️ Tech Stack & Technical Implementation

- **Core Engine:** React.js (Functional components, custom Hooks, lifecycle state abstractions)
- **Routing Engine:** React Router DOM (Declarative routing matrix, exact path configurations, dynamic parameter binding)
- **Data Persistence & Networking:** Fetch API, Browser Cookies (`js-cookie`), and asynchronous execution workflows
- **Styling UI Layouts:** Responsive Web Design (RWD) with CSS3, Flexbox/Grid modules, Custom Component Modifiers, and Tailwind/Bootstrap utilities
- **Third-Party Integrations:**
  - `react-slick` & `slick-carousel` (For fluid hardware-accelerated slider mechanisms)
  - `react-loader-spinner` (For modern, polished UI loading indicators)
  - `react-icons` (For scalable UI iconography)

---

## 📋 API Contract Matrix

Every secure call intercepts current token strings from the cookie directory and injects them straight into HTTP Header structures: `Authorization: Bearer {jwt_token}`.

| Target Resource | HTTP Method | Endpoint URL Structure |
| :--- | :--- | :--- |
| **User Sign-In Validation** | `POST` | `https://apis.ccbp.in/login` |
| **Trending Catalog Grid** | `GET` | `https://apis.ccbp.in/movies-app/trending-movies` |
| **Top Rated Catalog Grid** | `GET` | `https://apis.ccbp.in/movies-app/top-rated-movies` |
| **Isolated Movie Profile Details** | `GET` | `https://apis.ccbp.in/movies-app/movies/{id}` |
| **Global Keyword Querying** | `GET` | `https://apis.ccbp.in/movies-app/movies-search?search={query}` |

---

## 📐 Architecture & Structural Directory

The system enforces strict separation of concerns, keeping logical wrapper views decoupled from isolated layout blocks:

```text
src/
├── components/
│   ├── AccountRoute/        # Account profile overview & session removal
│   ├── HomeRoute/           # Dashboard featuring hero banners and sliders
│   ├── LoginRoute/          # Secure credential capture and cookie injection
│   ├── MovieDetailsRoute/   # Dynamic deep-linked parameters and related view grids
│   ├── SearchRoute/         # Dynamic search results display
│   ├── ProtectedRoute/      # Global application routing safety wrapper
│   ├── Header/              # Sticky responsive navigation shell
│   ├── Footer/              # Standard global context closing anchor
│   └── MovieSlider/         # Highly decoupled multi-item slick configuration slick setups
├── App.js                   # Root level structural routing definition table
└── index.js                 # Global application mounting wrapper
