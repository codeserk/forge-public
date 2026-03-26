.PHONY: lint csharp-lint-stats \
        csharp-gen-meta-stats \
        csharp-version-stats-patch csharp-version-stats-minor csharp-version-stats-major

# General

lint: csharp-lint-stats

# C# / Stats

csharp-lint-stats:
	dotnet build csharp/packages/stats/src/Codeserk.ForgeStats.csproj -warnaserror

csharp-gen-meta-stats:
	./scripts/gen-unity-meta.sh csharp/packages/stats

csharp-version-stats-patch:
	cd csharp/packages/stats && npm version patch --no-git-tag-version

csharp-version-stats-minor:
	cd csharp/packages/stats && npm version minor --no-git-tag-version

csharp-version-stats-major:
	cd csharp/packages/stats && npm version major --no-git-tag-version
