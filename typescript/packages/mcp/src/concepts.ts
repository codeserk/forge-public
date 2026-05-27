/**
 * Behavioral knowledge the swagger cannot express. Surfaced via
 * forge_help({ api: "concepts" }). Keep this in sync with server behavior.
 */
export const CONCEPTS_DOC = `Forge concepts & gotchas (not derivable from swagger)

GENERAL
- Dates are RFC3339, e.g. "2026-05-20T00:00:00Z". A bare "2026-05-20" returns 422.
- Auth scopes map to HTTP method: GET=read, POST=create, PATCH/PUT=update, DELETE=delete.
  The read-only /evaluate previews are POST, so they still require the "create" scope.
- Token-management endpoints (client.personalAccessTokens.*) are blocked for PAT-authenticated
  callers entirely — a token can never list, mint, or revoke tokens. Use a user session.

INSIGHTS: QUERIES
- source is "events" (live) or "aggregated", and is FROZEN after create (update ignores it).
  slug is also frozen. To change either, delete and recreate.
- aggregated reads pre-materialized buckets: full history, but EMPTY until the insights worker
  has aggregated this query (no historical backfill — it fills forward from creation).
- events is evaluated live on read (cached ~1h) but only covers raw-event retention (days, not
  months). Use it for previews; use aggregated for persistent dashboards.
- conditions: operations are eq | neq only; multiple conditions are AND-ed.
- breakdownKeys: at most one; a query with a breakdown CANNOT be referenced by a metric.
- aggregation func: count | uniq | sum | avg | min | max. uniq/sum/avg/min/max need a "field".
- Validate a query spec without saving via client.insights.evaluateInsightsQuery (always live).

INSIGHTS: FIELD NAMESPACE (predicate / breakdownKeys / aggregations.field)
- Built-in event columns are referenced BARE with their exact casing: "Name", "Bucket",
  "UserID", "UserCountry", "DeviceType", "DeviceOS", "AppVersionName", etc.
- Custom event data must be PREFIXED: "data.<key>" reads the event Data payload,
  "user.<key>" reads custom per-user UserData. E.g. data.quantity, data.hexagramNumber,
  data.tossType, user.plan. The prefix also disambiguates a data key that collides with a
  built-in name (data.Type is the payload field; bare "Type" is the column).
- A BARE unknown key (e.g. "quantity" instead of "data.quantity") is REJECTED with 422.
  This is a hard contract, not a fallback.
- Numeric data fields aggregate via sum/avg/min/max. Booleans are cast server-side to 1/0,
  so avg(data.success) is a real success rate (not always 0); they also work as breakdowns.
- Discover the valid keys (built-in + custom, already prefixed, each with a value type) via
  client.insights.getInsightsFields({ projectID, type }).

INSIGHTS: METRICS
- Expression grammar: tokens are "query_slug.aggregation_name", combined with + - * / , parens,
  and a ternary (cond ? a : b). No function calls / builtins. Division by zero yields null
  (renders as a gap in charts).
- Referenced aggregated queries must all share the same granularity. An all-live metric defaults
  to daily. Breakdown queries cannot be referenced.
- Preview an unsaved expression via client.insights.evaluateInsightsMetric (reads the referenced
  saved queries — so if those are aggregated-but-not-yet-materialized, it returns empty).

INSIGHTS: VIEWS (what the Insights dashboard page actually renders)
- Queries and metrics are NOT shown on their own — they surface through Views.
- createInsightsView: sourceType "query"|"metric", sourceID = the query/metric ID (not slug),
  chartType "number"|"line"|"bar", size "1x1"|"2x1"|"2x2", showOnDashboard, and a config blob
  (config.common/number/line/bar) with enums for legend, valueFormat, sort, goodDirection, etc.

FUNNELS vs INSIGHTS — pick the right tool
- A sequential user journey (ordered steps with drop-off) belongs in a Funnel, not in insights
  metrics. Funnel steps are { eventType, eventBucket (required, exact match), label };
  conversionWindow is in HOURS (default 168 = 7 days). runFunnel({ id, from, to }) computes it.
- Insights metrics are for NON-sequential ratios/KPIs (e.g. readings per user, yield).

DON'T DUPLICATE THE MAIN STATS DASHBOARD
- It already shows totals (events, users, sessions, events/session, avg duration, bounce rate
  with deltas + sparklines) and Tops (pages/event names, device/OS/browser/userType,
  country/region/city, referrer/channel/UTM). Errors, Funnels, Journeys, Sessions have their own
  pages. Reserve custom queries/metrics for things these cannot express.

DISCOVERY
- There is no "list event types" endpoint. Derive types, buckets, and field keys from
  client.events.getEventSummaries and client.insights.getInsightsFields before authoring.
- getInsightsFields returns built-in columns PLUS custom keys discovered from recent events,
  each already namespace-prefixed (data.<key> / user.<key>) with a "type" (number | bool |
  string) so you can pick valid aggregations. It is an authoring aid scoped by ?type=; an
  empty/partial result never blocks creation (you can author data.<key> before data flows).`
