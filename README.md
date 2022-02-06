bug reproduction

ESM modules from node_modules seem to get inlined twice

this breaks the expectation that a module is a singleton that can retain state

0) do NOT install dependencies, I made modifications to `node_modules/aaa-repro-config` and `node_modules/aaa-repro-edge`. 

1) `npm run dev`
2) visit `http://localhost:3000/foo`
3) it returns `null`, but should return `true`


calling `configure()` to set a value inside the `_middleware` from app sets the state

but the place reading that value with `getConfig()` from another module never sees the configured value

more details in `pages/foo/_middleware`
