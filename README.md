# bun-dep-link

Switch bun dep or github

## Feature

- `bunx --bun bun-dep-link --github` : dependencies use bun link,
- `bunx --bun bun-dep-link --link`: dependencies use github link,

## Config

package.json add githubDependencies, like:

```json
"githubDependencies": {
    "indexed-redis": "github:ymzuiku/indexed-redis#main"
}

```

## Suggestion

package.json add:

```json
"scripts": {
  "github":"bunx --bun bun-dep-link --github",
  "local":"bunx --bun bun-dep-link --local",
  "pre-commit": "bun github && bun test && bunx dep-link"
}
```
