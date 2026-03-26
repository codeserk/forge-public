using UnityEngine;

namespace Codeserk.ForgeStats.Unity
{
    // ScriptableObject that holds the Forge Stats configuration.
    // Create one via Assets > Create > Forge > Stats Config,
    // place it in a Resources folder named exactly "StatsConfig",
    // then fill in the URL and SDK key from your Forge dashboard.
    // See https://forge.codeserk.es/docs/sdks/csharp-unity
    [CreateAssetMenu(fileName = "StatsConfig", menuName = "Forge/Stats Config")]
    public class StatsConfig : ScriptableObject
    {
        public string Url;
        public string Sdk;
    }
}
