#!/bin/bash

COMPONENTS_DIR="src/components"
PROJECT_ROOT="src"

echo "🔍 Scanning for unused files in $COMPONENTS_DIR (including subfolders)..."
echo

unused=()

find "$COMPONENTS_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) | while read -r file; do
  relative_path="${file#src/}"             
  import_path="${relative_path%.*}"       

  used=$(grep -r --exclude-dir="node_modules" --exclude="check-unused-components.sh" --exclude-dir="dist" --exclude-dir="out" "$import_path" "$PROJECT_ROOT")

  if [[ -z "$used" ]]; then
    echo "❌ Unused: $relative_path"
    unused+=("$file")
  else
    echo "✅ Used: $relative_path"
  fi
done

echo
echo "📋 Summary:"
if [ ${#unused[@]} -eq 0 ]; then
  echo "🎉 All component files are being used!"
else
  echo "⚠️ The following component files appear to be unused:"
  for f in "${unused[@]}"; do
    echo " - $f"
  done

  echo
  read -p "🗑️  Do you want to delete these unused files? (y/n): " confirm
  if [[ "$confirm" == "y" ]]; then
    for f in "${unused[@]}"; do
      rm "$f"
      echo "🗑️ Deleted $f"
    done
    echo "✅ Cleanup complete."
  else
    echo "❌ No files deleted."
  fi
fi
