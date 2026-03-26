.PHONY: lint lint-csharp-stats

lint: lint-csharp-stats

lint-csharp-stats:
	dotnet build csharp/packages/stats/src/Codeserk.ForgeStats.csproj -warnaserror
