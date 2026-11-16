---
name: restore-omp
description: Safely restore the current user's OMP rules and skills from a local backup or secret GitHub Gist created by backup-omp.
---

# Restore OMP rules and skills

Restore `~/.omp/agent/rules` and `~/.omp/agent/skills` from a backup created by `backup-omp`. Restoring replaces current folders, including this skill. Do not restore automatically.

## Select and inspect the backup

1. Ask the user to identify a local `rules-and-skills.tar.gz` archive or a Gist URL or ID. If the user has not chosen, use `list-omp-backups` to list local and Gist backups and ask which to use. Do not silently select the newest backup.
2. For a Gist, require an authenticated `gh` CLI. Download its dated `*.tar.gz.base64` file into a private temporary directory, then decode it into an archive there. Treat the Gist URL as sensitive. Do not expose credentials. Keep the downloaded file outside the destination folders.
3. Validate the gzip archive and inspect its member names and types before extraction. Require both top-level `rules` and `skills` directories, and reject absolute paths, `..` components, duplicate paths, device files, FIFOs, and members outside those directories. Treat links as untrusted: reject absolute or escaping link targets, and never follow an archive-created link when writing another member. Stop on any suspicious or unsupported entry. Do not run code from the archive.
4. Extract into a new private staging directory outside `~/.omp/agent`, using a safe extraction method that enforces the checks above. Verify both staged directories exist. If safe extraction cannot be assured, stop and explain; never fall back to unsafe extraction.
5. Before creating a safety backup, find the latest existing local backup under `~/.omp/backups` by its backup directory timestamp. Do not treat the selected restore source as the latest unless it actually is. If no local backup exists, say so; do not claim the current configuration is backed up.
6. Safely validate and stage the latest local backup using the same checks as the selected source. Compare both current folders against it recursively, including file contents, file types, and symbolic-link targets. Report added, removed, and changed paths without printing file contents or secrets. If differences exist, warn explicitly that the latest current configuration is not fully backed up. If validation or comparison fails, warn that backup status is unknown; do not claim it is backed up. External symbolic-link targets are never covered by this comparison.
7. Separately compare the current folders with the selected restore source and summarize which paths would be added, removed, or changed. Report the selected source, latest backup used for comparison, and both destination paths. Warn that current folders will be replaced, that external symbolic-link targets were not included in the backup, and that the restored skills may differ from current skills. Ask for explicit confirmation before modifying either destination.

## Restore after confirmation

1. Create and verify a fresh local backup of the current rules and skills using `backup-omp`'s local backup workflow. Do not upload this safety backup unless separately confirmed. Stop if the backup fails.
2. Move the current `rules` and `skills` folders into a new private, uniquely named recovery directory under `~/.omp/backups`. Keep the recovery directory outside both source and destination folders. Never overwrite existing paths.
3. Move the staged `rules` and `skills` directories into `~/.omp/agent`. If any move fails, restore both original directories from the recovery directory where possible, report exactly what succeeded or failed, and retain all recovery material. Do not claim success if rollback is incomplete.
4. Verify that both restored directories exist. Report the source, destination paths, safety backup path, and recovery directory. Keep the safety backup and recovery directory; do not delete either without explicit permission. Explain that OMP may need a restart to discover restored skills.

Clean up only temporary downloaded and staged files when safe. Do not delete the original backup or Gist. If any step fails, stop and explain the error.
