#!/usr/bin/env bash
# Generates .meta files for a Unity UPM package served from a git repository.
# Unity treats git packages as immutable and won't auto-generate .meta files,
# so they must be committed to the repo.
#
# Usage: ./scripts/gen-unity-meta.sh [package-dir]
# Default package-dir: csharp/packages/stats
set -euo pipefail

if [ $# -eq 0 ]; then
  PACKAGE_DIRS=(csharp/packages/stats csharp/packages/stats-unity)
else
  PACKAGE_DIRS=("$@")
fi

generate_guid() {
  uuidgen | tr -d '-' | tr '[:upper:]' '[:lower:]'
}

write_meta() {
  local item="$1"
  local meta="${item}.meta"

  if [ -f "$meta" ]; then
    return
  fi

  local guid
  guid=$(generate_guid)

  if [ -d "$item" ]; then
    cat > "$meta" <<EOF
fileFormatVersion: 2
guid: $guid
folderAsset: yes
DefaultImporter:
  externalObjects: {}
  userData:
  bundleFileVersion: 1
EOF
  elif [[ "$item" == *.cs ]]; then
    cat > "$meta" <<EOF
fileFormatVersion: 2
guid: $guid
MonoImporter:
  externalObjects: {}
  serializedVersion: 2
  defaultReferences: []
  executionOrder: 0
  icon: {instanceID: 0}
  userData:
  bundleFileVersion: 1
EOF
  elif [[ "$item" == *.asmdef ]]; then
    cat > "$meta" <<EOF
fileFormatVersion: 2
guid: $guid
AssemblyDefinitionImporter:
  externalObjects: {}
  userData:
  bundleFileVersion: 1
EOF
  else
    cat > "$meta" <<EOF
fileFormatVersion: 2
guid: $guid
DefaultImporter:
  externalObjects: {}
  userData:
  bundleFileVersion: 1
EOF
  fi

  echo "Generated $meta"
}

for PACKAGE_DIR in "${PACKAGE_DIRS[@]}"; do
  while IFS= read -r item; do
    write_meta "$item"
  done < <(find "$PACKAGE_DIR" -mindepth 1 \
    -not -path "*/.git/*" \
    -not -path "*/bin*" \
    -not -path "*/obj*" \
    -not -name ".*" \
    -not -name "*.meta" \
    | sort)
done
