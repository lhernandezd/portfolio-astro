Always run npm commands (`npm install`, `npm ci`, `npm view`, etc.) in this
repo with `--registry=https://registry.npmjs.org` explicitly appended.

**Why:** the global `~/.npmrc` on this machine points to an internal
registry (`${DJ_NPM_REGISTRY}`) that returns 403s for public packages when
the corresponding env vars aren't set. Overriding the registry per-command
sidesteps that broken global config for this repo specifically.
