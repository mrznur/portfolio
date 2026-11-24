#!/bin/sh
# Run from your portfolio project root, AFTER copying the new files in.
set -e

# 1. Remove dead files from the old design
rm -f src/Modal.jsx src/Hero.jsx src/ButtonLink.jsx src/Navbar.jsx src/Typewriter.jsx \
      src/Splash.jsx src/Section.jsx src/Card.jsx src/Tag.jsx src/App.css src/ProjectCard.jsx

# 2. Favicon must live in public/ to work in production builds
mkdir -p public
[ -f src/assets/p.png ] && cp src/assets/p.png public/p.png

# 3. Test tooling
npm install -D vitest
npm pkg set scripts.test="vitest run"

# 4. Verify
npm test
npm run build
