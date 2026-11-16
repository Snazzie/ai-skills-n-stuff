# AI Skills and Stuff

A collection of AI skills and related tools.

## OMP backup skills

The `snazzies-omp-backup` plugin provides:

- `backup-omp`: Back up OMP rules and skills locally, with optional Gist upload.
- `list-omp-backups`: List local backups and matching GitHub Gists.
- `restore-omp`: Compare and restore a selected backup with confirmation and a safety backup.

### Install

With Node.js 18 or later and OMP installed, run:

```sh
npx --yes github:Snazzie/ai-skills-n-stuff
```

This adds the marketplace and installs the plugin in user scope. It downloads and runs the installer from GitHub.

In OMP, run:

```text
/marketplace add Snazzie/ai-skills-n-stuff
/marketplace install snazzies-omp-backup@snazzies-ai-skills-n-stuff
```

Or use the CLI:

```sh
omp plugin marketplace add Snazzie/ai-skills-n-stuff
omp plugin install snazzies-omp-backup@snazzies-ai-skills-n-stuff
```

Restart or reload OMP if needed to discover the skills. Installation defaults to user scope. Use `--scope project` when installing for a single project.

### Backup and security

Local archives are stored under `~/.omp/backups/`. They contain `~/.omp/agent/rules` and `~/.omp/agent/skills`; symbolic links are stored as links, not copies of external targets. Backups can contain sensitive information.

Gist upload is optional and requires the GitHub CLI and explicit confirmation. A secret Gist is not fully private: anyone with its URL can access it. Do not share the URL publicly. Listing Gists also requires an authenticated GitHub CLI.

Restore replaces the current rules and skills. The restore skill compares the current configuration with the latest local backup, asks for confirmation, and makes a fresh local safety backup before replacement.
