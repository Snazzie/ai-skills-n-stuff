---
name: backup-omp
description: Back up the current user's OMP rules and skills locally, with optional upload to a secret GitHub Gist.
---

# Back up OMP rules and skills

Back up both `~/.omp/agent/rules` and `~/.omp/agent/skills`. Do not modify either source. Store backups outside the source folders to avoid recursive archives. Preserve symbolic links as links; their external targets are not included. Do not delete or overwrite existing backups.

Run this command:

```bash
set -eu
umask 077
agent="$HOME/.omp/agent"
[ -d "$agent/rules" ] && [ -d "$agent/skills" ] || { echo "OMP rules or skills folder is missing" >&2; exit 1; }
backup_root="$HOME/.omp/backups"
mkdir -p "$backup_root"
backup_dir=$(mktemp -d "$backup_root/omp-$(date +%Y%m%d-%H%M%S)-XXXXXX")
archive="$backup_dir/rules-and-skills.tar.gz"
if ! tar -czf "$archive" -C "$agent" rules skills || ! tar -tzf "$archive" >/dev/null; then
  rm -f "$archive"
  rmdir "$backup_dir"
  echo "Backup failed" >&2
  exit 1
fi
printf 'Backup verified: %s\n' "$archive"
```

Report the archive path and note that symbolic-link targets outside the archived folders are not included. If the command fails, report the error instead of claiming success. Do not restore or remove backups unless the user explicitly requests it.

## Optional GitHub Gist upload

After creating the local backup, ask for explicit confirmation before uploading it. Explain that a secret Gist is not truly private: anyone with its URL can access it, and the archive may contain sensitive information. Do not upload unless the user confirms. Never include the Gist URL in a public location.

Use the verified archive path from the current backup. Require the GitHub CLI and an authenticated account with permission to create Gists. Do not request or expose credentials. Gists store text, so encode the archive as base64 in a private temporary directory. Create a new secret Gist without `--public`; do not overwrite an existing Gist.

```bash
set -eu
umask 077
archive="/path/to/verified/rules-and-skills.tar.gz"
command -v gh >/dev/null || { echo "GitHub CLI is not installed" >&2; exit 1; }
gh auth status >/dev/null
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT
stamp=$(date +%Y-%m-%d-%H%M%S)
file="$tmpdir/omp-rules-and-skills-$stamp.tar.gz.base64"
base64 < "$archive" > "$file"
gh gist create "$file" --desc "OMP rules and skills backup $stamp"
```

Replace the placeholder with the verified archive path, properly shell-quoted. Report the Gist URL and local archive path on success. If upload fails, report the error and retain the local backup. To recover the archive from the Gist file, decode its base64 content before extracting it.
