using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Codeserk.ForgeStats
{
    internal class SignatureBuilder
    {
        private readonly string _secret;
        private readonly List<string> _parts = new List<string>();

        public SignatureBuilder(string secret)
        {
            _secret = secret;
        }

        public SignatureBuilder Add(string part)
        {
            _parts.Add(part ?? string.Empty);
            return this;
        }

        public SignatureBuilder WithUrl(string url)
        {
            return Add(url);
        }

        public SignatureBuilder WithBody(string? bodyJson)
        {
            var bodyPart = Convert.ToBase64String(Encoding.UTF8.GetBytes(bodyJson ?? string.Empty));
            return Add(bodyPart);
        }

        public string Build(string? timeString = null)
        {
            var content = GenerateContent(timeString);
            return CalculateSignature(content, _secret);
        }

        private static string CalculateSignature(string content, string secret)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secret);
            var contentBytes = Encoding.UTF8.GetBytes(content);
            using (var hmac = new HMACSHA256(keyBytes))
            {
                var hash = hmac.ComputeHash(contentBytes);
                return Convert.ToBase64String(hash);
            }
        }

        private string GenerateContent(string? timeString)
        {
            if (string.IsNullOrEmpty(timeString))
            {
                var now = DateTime.UtcNow;
                now = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, 0, DateTimeKind.Utc);

                // Match JS toISOString() format with zeroed seconds/ms
                timeString = now.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
            }

            var allParts = new List<string>(_parts) { timeString! };
            var joined = string.Join("_", allParts).Trim();
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(joined));
        }
    }
}
