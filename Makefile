.PHONY: lint csharp-lint-stats csharp-lint-stats-unity \
        csharp-gen-meta-stats csharp-gen-meta-stats-unity \
        csharp-version-stats-patch csharp-version-stats-minor csharp-version-stats-major \
        csharp-version-stats-unity-patch csharp-version-stats-unity-minor csharp-version-stats-unity-major \
        ts-lint-stats ts-test-stats ts-build-stats

# General

lint: csharp-lint-stats csharp-lint-stats-unity ts-lint-stats

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

# C# / Stats Unity

csharp-lint-stats-unity:
	dotnet build csharp/packages/stats-unity/src/Codeserk.ForgeStatsUnity.csproj -warnaserror

csharp-gen-meta-stats-unity:
	./scripts/gen-unity-meta.sh csharp/packages/stats-unity

csharp-version-stats-unity-patch:
	cd csharp/packages/stats-unity && npm version patch --no-git-tag-version

csharp-version-stats-unity-minor:
	cd csharp/packages/stats-unity && npm version minor --no-git-tag-version

csharp-version-stats-unity-major:
	cd csharp/packages/stats-unity && npm version major --no-git-tag-version

# TypeScript / Stats

ts-lint-stats:
	cd typescript/packages/stats && npm run lint

ts-test-stats:
	cd typescript/packages/stats && npm test

ts-build-stats:
	cd typescript/packages/stats && npm run build
