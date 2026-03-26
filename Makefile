.PHONY: lint lint-csharp-stats \
        gen-meta-csharp-stats \
        version-csharp-stats-patch version-csharp-stats-minor version-csharp-stats-major

# ── General ───────────────────────────────────────────────────────────────────

lint: lint-csharp-stats

# ── C# / Stats ────────────────────────────────────────────────────────────────

lint-csharp-stats:
	dotnet build csharp/packages/stats/src/Codeserk.ForgeStats.csproj -warnaserror

gen-meta-csharp-stats:
	./scripts/gen-unity-meta.sh csharp/packages/stats

version-csharp-stats-patch:
	cd csharp/packages/stats && npm version patch --no-git-tag-version

version-csharp-stats-minor:
	cd csharp/packages/stats && npm version minor --no-git-tag-version

version-csharp-stats-major:
	cd csharp/packages/stats && npm version major --no-git-tag-version
