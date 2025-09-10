# Semantic Versioning Setup

Dieses Projekt verwendet automatisches Semantic Versioning basierend auf Conventional Commits.

## Funktionsweise

### Git Hook (Lokal)
- Nach jedem Commit wird automatisch geprüft, ob ein neuer Tag erstellt werden soll
- Das Script `scripts/semantic-version.js` analysiert die Commit-Message
- Bei Conventional Commits wird entsprechend ein neuer Tag erstellt

### GitHub Actions (Remote)
- **Tests**: Führt Unit Tests, E2E Tests und Linting aus
- **Build**: Erstellt die Anwendung und testet den Build
- **Release**: Erstellt automatisch Tags und GitHub Releases (nur wenn Tests und Build erfolgreich)

## Conventional Commits

Verwende diese Commit-Message-Formate:

### Features (Minor Version Bump)
```
feat: add new user dashboard
feat(auth): implement OAuth login
```

### Bug Fixes (Patch Version Bump)
```
fix: resolve memory leak in data processing
fix(ui): correct button alignment issue
```

### Breaking Changes (Major Version Bump)
```
feat!: redesign API endpoints
feat(api)!: change user authentication flow

BREAKING CHANGE: The user authentication API has been completely redesigned
```

### Weitere Typen (Prerelease)
```
docs: update installation guide
style: format code according to prettier
refactor: extract common utility functions
test: add unit tests for user service
chore: update dependencies
ci: add automated deployment
build: optimize webpack configuration
```

## Versionierung

- **Major** (1.0.0 → 2.0.0): Breaking Changes
- **Minor** (1.0.0 → 1.1.0): Neue Features
- **Patch** (1.0.0 → 1.0.1): Bug Fixes
- **Prerelease** (1.0.0 → 1.0.1-alpha.1): Dokumentation, Styling, etc.

## Workflow-Ablauf

1. **Commit** mit Conventional Commit Message
2. **Lokal**: Git Hook erstellt automatisch Tag
3. **Push** zum Repository
4. **GitHub Actions**:
   - Tests werden ausgeführt
   - Build wird erstellt
   - Bei Erfolg: Release-Workflow erstellt GitHub Release

## Manuelle Verwendung

```bash
# Script manuell ausführen
node scripts/semantic-version.js

# Aktuelle Version anzeigen
git describe --tags --abbrev=0

# Alle Tags anzeigen
git tag -l
```

## Beispiele

```bash
# Feature hinzufügen
git commit -m "feat: add dark mode toggle"
# → Erstellt Tag v0.1.0 (oder v1.1.0 wenn bereits v1.0.0 existiert)

# Bug fix
git commit -m "fix: resolve navigation issue"
# → Erstellt Tag v0.0.1 (oder v1.0.1 wenn bereits v1.0.0 existiert)

# Breaking Change
git commit -m "feat!: redesign component API"
# → Erstellt Tag v1.0.0 (oder v2.0.0 wenn bereits v1.x.x existiert)
```
