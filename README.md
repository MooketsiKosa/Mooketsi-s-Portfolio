# Mooketsi Kosa - Developer Portfolio
A personal portfolio website built in vanilla HTML, CSS, and JavaScript. Features a Three.js 3D hero section, scroll-driven depth transitions, 3D card tilt effects, animated skill bars, project filtering, and a contact form.

**Live site:** [mooketsikosa.netlify.app](https://mooketsikosa.netlify.app)

## Project Structure
    Mooketsi_Kosa_Portfolio/
    ├── index.html                        # Main HTML - structure only, no inline styles
    ├── assets/
    │   ├── css/
    │   │   └── style.css                 # All styling including 3D motion rules
    │   ├── js/
    │   │   └── main.js                   # All behaviour: Three.js, tilt, scroll, typed, AOS
    │   ├── img/
    │   │   └── profile-img.jpg           # Profile photo
    │   └── Cvs/
    │       ├── Mooketsi_s_Resume_Software Engineering.pdf
    │       └── Mooketsi_s_Resume_Data Engineering.pdf
    └── README.md
## Features
### 3D Motion & Visuals
- **Three.js hero** - rotating icosahedron centrepiece with a wireframe shell, orbiting coloured spheres, a floating particle field with connection lines, and mouse-driven camera parallax. Fades out as the user scrolls past the hero section
- **3D card tilt** - project cards track the mouse cursor and tilt up to 12° in perspective on hover, snapping back smoothly on leave
- **Scroll depth transitions** - sections enter the viewport by rotating forward from a slightly recessed 3D position, giving a layered depth feel as the user scrolls. Respects `prefers-reduced-motion`

### Content & Interaction
- **Typewriter role animation** - cycles through Data Engineer, Software Developer, Backend Developer, Final-Year CS Student
- **Animated counters**- stats count up when they scroll into view
- **Project filter** - filter cards by All / Data Eng / Full-Stack / Backend without page reload
- **Flip cards** - project cards flip on hover to reveal a detail view with tech highlights
- **AOS scroll animations** - sections and elements fade and slide in as the page scrolls
- **CV download dropdown** - dual CV download (Software Engineering & Data Engineering) via Google Drive links
- **Contact form** - opens the user's mail client via `mailto:` with pre-filled subject and body
- **Mobile navbar** - hamburger menu with animated open/close transition
- **Back-to-top button** - appears after scrolling 400px, smooth scrolls to top

---

## Tech Stack

    | Layer | Technology |
    | Structure | HTML5 |
    | Styling | CSS3 (custom properties, flexbox, grid) |
    | Behaviour | Vanilla JavaScript (ES6+) |
    | 3D graphics | [Three.js r128](https://threejs.org/) |
    | Scroll animations | [AOS 2.3.4](https://michalsnik.github.io/aos/) |
    | Icons | [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/), [Devicon](https://devicon.dev/) |
    | Fonts | Plus Jakarta Sans, Fraunces, JetBrains Mono (Google Fonts) |
    | Deployment | [Netlify](https://netlify.com) |

## Getting Started
No build step or package manager needed. The project runs entirely in the browser.

**Option 1 - Open directly**
```
Open index.html in any modern browser
```

**Option 2 - Local dev server (recommended to avoid CORS on assets)**
```bash
# Using Python
python -m http.server 3000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:3000`.

## Customisation

### Updating CV links
Open `assets/js/main.js` and update the two Google Drive URLs at the top of the `CV_LINKS` object:

```js
const CV_LINKS = {
  software: 'https://drive.google.com/file/d/1_7_KYotPU_zzZorbR_AnH4TUEs56jZdG/view?usp=drive_link',
  data:     'https://drive.google.com/file/d/1D5TLQ81I6MUi-KRBFvJWt7YSMgXWN_-W/view?usp=drive_link'
};
```

### Changing the typed roles
Find the `roles` array in `main.js`:

```js
const roles = ['Data Engineer', 'Software Developer', 'Backend Developer', 'Final-Year CS Student'];
```

### Adding a project card
Copy an existing `<!-- Card N -->` block in `index.html` and update the title, description, tags, colours, icon, year, and `data-category` attribute. Valid category values are `data`, `fullstack`, `backend` (or a space-separated combination like `"fullstack data"`).

### Updating the Three.js scene
The entire Three.js setup lives in the `initThreeHero` IIFE at the bottom of `main.js`. Key variables:
- `TILT_MAX` - maximum tilt angle for project cards (default `12` degrees)
- `partCount` - number of floating particles in the hero (default `180`)
- `orbitColors` - colours of the orbiting spheres around the icosahedron

## Deployment (Netlify)

1. Push the project to a GitHub repository
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import from Git**
3. Select the repository - no build command needed, publish directory is the root (`/`) or the folder containing `index.html`
4. Click **Deploy site**

Netlify will assign a URL immediately. To use a custom domain, go to **Site settings → Domain management**.

## Contact

**Mooketsi Kosa**
- Email: [KosaMooketsi@gmail.com](mailto:KosaMooketsi@gmail.com)
- LinkedIn: [linkedin.com/in/Mooketsikosa](https://linkedin.com/in/Mooketsikosa)
- GitHub: [github.com/MooketsiKosa](https://github.com/MooketsiKosa)
- Portfolio: [mooketsikosa.netlify.app](https://mooketsikosa.netlify.app)


© 2026 Mooketsi Kosa
