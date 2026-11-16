---
name: list-omp-backups
description: List OMP rules and skills backups stored locally and in the current GitHub account's secret Gists.
---

# List OMP backups

List backups without changing, downloading, restoring, or deleting them.

1. Find local `~/.omp/backups/omp-*/rules-and-skills.tar.gz` files. Report each path and the timestamp from its parent directory, newest first. If none exist, say so. Do not list recovery directories as backup archives.
2. Check whether `gh` is installed and authenticated. If available, query all pages of the authenticated account's Gists, including secret Gists. Identify backup Gists by the `OMP rules and skills backup` description and an archive file named either `rules-and-skills.tar.gz.base64` or `omp-rules-and-skills-*.tar.gz.base64`. Report each matching Gist's filename, description, creation time, URL, and visibility, newest first. Do not print unrelated Gists or their contents. Do not expose credentials.
3. Report local and Gist results separately. If GitHub is unavailable or the request fails, report that Gist results are unavailable, not that no Gists exist. Secret Gist URLs grant access to anyone who has them; treat URLs as sensitive and share them only with the user.
4. Do not claim an archive is valid or that its contents match current configuration without separately verifying it. Do not assume local and Gist backups are identical based on their names or dates.
