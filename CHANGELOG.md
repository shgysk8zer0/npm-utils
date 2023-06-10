# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Install `@shgysk8zer0/js-utils`

### Fixed
- Correctly output chunks named `[name]-[hash].cjs` instead of `.js` ext

### Removed
- Uninstall `rollup` and `eslint`

## [v1.0.4] - 2023-06-05

### Added
- `url` module with `pathToURL()` & `pathToURL()`

### Fixed
- Fix path for esm `exports` (#8)
- Fix matched importmap resolving to URL (using `pathToURL()`)

### Changed

- `importmap` updates & fixes

## [v1.0.3] - 2023-06-05

### Fixed
- Create `exports` for all es modules in `/cjs/*.cjs` (#6)

### Changed
- Move all modules into `/esm/*.js`

## [v1.0.2] - 2023-06-05

### Added
- Several new modules for extensions, mime-types and other constants
- New functionality in `importmap` module to be compatible with `@shgysk8zer0/rollup-import`

## [v1.0.1] - 2023-06-03

### Added
- Add `exports` with `require` & `import` options

## [v1.0.0] - 202306-03

Initial Release
