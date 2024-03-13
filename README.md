# bun-dep-link

switch bun dep or github

## Feature

- `bun-dep --github` : dependencies use bun link,
- `bun-dep --link`: dependencies use github link,

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
  "pre-commit": "bunx dep-github && bun test && bunx dep-link"
}
```
