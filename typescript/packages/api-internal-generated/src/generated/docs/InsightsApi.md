# InsightsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createInsightsMetric**](#createinsightsmetric) | **POST** /api/v1/stats/insights/metrics | Create insights metric|
|[**createInsightsQuery**](#createinsightsquery) | **POST** /api/v1/stats/insights/queries | Create insights query|
|[**createInsightsView**](#createinsightsview) | **POST** /api/v1/stats/insights/views | Create insights view|
|[**deleteInsightsMetric**](#deleteinsightsmetric) | **DELETE** /api/v1/stats/insights/metrics/{id} | Delete insights metric|
|[**deleteInsightsQuery**](#deleteinsightsquery) | **DELETE** /api/v1/stats/insights/queries/{id} | Delete insights query|
|[**deleteInsightsView**](#deleteinsightsview) | **DELETE** /api/v1/stats/insights/views/{id} | Delete insights view|
|[**evaluateInsightsMetric**](#evaluateinsightsmetric) | **POST** /api/v1/stats/insights/metrics/evaluate | Evaluate an insights metric expression|
|[**evaluateInsightsQuery**](#evaluateinsightsquery) | **POST** /api/v1/stats/insights/queries/evaluate | Evaluate insights query|
|[**getInsightsFields**](#getinsightsfields) | **GET** /api/v1/stats/insights/fields | Get insights field catalog|
|[**getInsightsMetric**](#getinsightsmetric) | **GET** /api/v1/stats/insights/metrics/{id} | Get insights metric|
|[**getInsightsMetricData**](#getinsightsmetricdata) | **GET** /api/v1/stats/insights/metrics/{id}/data | Get insights metric data|
|[**getInsightsMetrics**](#getinsightsmetrics) | **GET** /api/v1/stats/insights/metrics | List insights metrics|
|[**getInsightsQueries**](#getinsightsqueries) | **GET** /api/v1/stats/insights/queries | List insights queries|
|[**getInsightsQuery**](#getinsightsquery) | **GET** /api/v1/stats/insights/queries/{id} | Get insights query|
|[**getInsightsQueryData**](#getinsightsquerydata) | **GET** /api/v1/stats/insights/queries/{id}/data | Get insights query data|
|[**getInsightsViews**](#getinsightsviews) | **GET** /api/v1/stats/insights/views | List insights views|
|[**updateInsightsMetric**](#updateinsightsmetric) | **PATCH** /api/v1/stats/insights/metrics/{id} | Update insights metric|
|[**updateInsightsQuery**](#updateinsightsquery) | **PATCH** /api/v1/stats/insights/queries/{id} | Update insights query|
|[**updateInsightsView**](#updateinsightsview) | **PATCH** /api/v1/stats/insights/views/{id} | Update insights view|

# **createInsightsMetric**
> InsightsMetricResponse createInsightsMetric(request)

Create a new saved insights metric. The expression must reference queries in {query_name}.{agg_name} form.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsCreateMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let request: InsightsCreateMetricRequest; //Create metric body

const { status, data } = await apiInstance.createInsightsMetric(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsCreateMetricRequest**| Create metric body | |


### Return type

**InsightsMetricResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createInsightsQuery**
> InsightsQueryResponse createInsightsQuery(request)

Create a new saved insights query (live or aggregated)

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsCreateQueryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let request: InsightsCreateQueryRequest; //Create query body

const { status, data } = await apiInstance.createInsightsQuery(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsCreateQueryRequest**| Create query body | |


### Return type

**InsightsQueryResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createInsightsView**
> InsightsViewResponse createInsightsView(request)

Create a chart placement for an existing query or metric on the Insights board.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsCreateViewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let request: InsightsCreateViewRequest; //Create view body

const { status, data } = await apiInstance.createInsightsView(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsCreateViewRequest**| Create view body | |


### Return type

**InsightsViewResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteInsightsMetric**
> InsightsDeleteWithCascadeResponse deleteInsightsMetric()

Delete a saved insights metric. Dependent views are cascade-deleted.

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Metric ID (default to undefined)

const { status, data } = await apiInstance.deleteInsightsMetric(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**InsightsDeleteWithCascadeResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteInsightsQuery**
> InsightsDeleteWithCascadeResponse deleteInsightsQuery()

Delete a saved insights query. Fails with 409 if any active metric still references the query by name. Dependent views are cascade-deleted.

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Query ID (default to undefined)

const { status, data } = await apiInstance.deleteInsightsQuery(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Query ID | defaults to undefined|


### Return type

**InsightsDeleteWithCascadeResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteInsightsView**
> deleteInsightsView()

Delete a chart placement from the Insights board.

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //View ID (default to undefined)

const { status, data } = await apiInstance.deleteInsightsView(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | View ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** |  |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **evaluateInsightsMetric**
> InsightsMetricDataResponse evaluateInsightsMetric(request)

Evaluate an arbitrary metric expression over a time range without persisting it. Used by the metric builder preview.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsEvaluateMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let request: InsightsEvaluateMetricRequest; //Evaluate metric body

const { status, data } = await apiInstance.evaluateInsightsMetric(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsEvaluateMetricRequest**| Evaluate metric body | |


### Return type

**InsightsMetricDataResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **evaluateInsightsQuery**
> InsightsEvaluateQueryResponse evaluateInsightsQuery(request)

Run an insights query definition live against the events table. Used for builder preview and source=events queries.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsEvaluateQueryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let request: InsightsEvaluateQueryRequest; //Evaluate query body

const { status, data } = await apiInstance.evaluateInsightsQuery(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsEvaluateQueryRequest**| Evaluate query body | |


### Return type

**InsightsEvaluateQueryResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsFields**
> InsightsFieldsResponse getInsightsFields()

Returns the catalog of fields available for use in conditions, breakdowns, and aggregations: built-in event columns plus custom event attributes discovered from recent events. Custom attributes are namespace-prefixed (data.<key> / user.<key>) and must be referenced with that prefix; bare custom keys are rejected. Discovery is an authoring aid only and never gates query creation.

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let projectID: string; //Project ID (default to undefined)
let type: string; //Event type to scope discovery to (optional) (default to undefined)

const { status, data } = await apiInstance.getInsightsFields(
    projectID,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|
| **type** | [**string**] | Event type to scope discovery to | (optional) defaults to undefined|


### Return type

**InsightsFieldsResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsMetric**
> InsightsMetricResponse getInsightsMetric()

Get a saved insights metric by ID

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Metric ID (default to undefined)

const { status, data } = await apiInstance.getInsightsMetric(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**InsightsMetricResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsMetricData**
> InsightsMetricDataResponse getInsightsMetricData()

Evaluate a metric over a time range. Returns a per-bucket series of values (nil where division-by-zero occurs).

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Metric ID (default to undefined)
let from: string; //Start of time range (RFC3339) (default to undefined)
let to: string; //End of time range (RFC3339) (default to undefined)
let compareToPrevious: boolean; //If true, also evaluates the same-length immediately-preceding range and returns it as `previous` (optional) (default to undefined)

const { status, data } = await apiInstance.getInsightsMetricData(
    id,
    from,
    to,
    compareToPrevious
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|
| **from** | [**string**] | Start of time range (RFC3339) | defaults to undefined|
| **to** | [**string**] | End of time range (RFC3339) | defaults to undefined|
| **compareToPrevious** | [**boolean**] | If true, also evaluates the same-length immediately-preceding range and returns it as &#x60;previous&#x60; | (optional) defaults to undefined|


### Return type

**InsightsMetricDataResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsMetrics**
> Array<InsightsMetricResponse> getInsightsMetrics()

List saved insights metrics for a project

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let projectID: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.getInsightsMetrics(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|


### Return type

**Array<InsightsMetricResponse>**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsQueries**
> Array<InsightsQueryResponse> getInsightsQueries()

List saved insights queries for a project, optionally filtered by source

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let projectID: string; //Project ID (default to undefined)
let source: string; //Source filter: events or aggregated (optional) (default to undefined)

const { status, data } = await apiInstance.getInsightsQueries(
    projectID,
    source
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|
| **source** | [**string**] | Source filter: events or aggregated | (optional) defaults to undefined|


### Return type

**Array<InsightsQueryResponse>**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsQuery**
> InsightsQueryResponse getInsightsQuery()

Get a saved insights query by ID

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Query ID (default to undefined)

const { status, data } = await apiInstance.getInsightsQuery(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Query ID | defaults to undefined|


### Return type

**InsightsQueryResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsQueryData**
> InsightsEvaluateQueryResponse getInsightsQueryData()

Fetch the data for a saved query. Live (events) queries evaluate against the events table; aggregated queries are served from the materialized stats table (Phase 3 onwards).

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Query ID (default to undefined)
let from: string; //Start of time range (RFC3339) (default to undefined)
let to: string; //End of time range (RFC3339) (default to undefined)
let compareToPrevious: boolean; //If true, also evaluates the same-length immediately-preceding range and returns it as `previous` (optional) (default to undefined)
let aggregatePeriod: boolean; //If true, collapses the time axis: one row per BreakdownValue summed across the full range (TimeBucket is zero) (optional) (default to undefined)

const { status, data } = await apiInstance.getInsightsQueryData(
    id,
    from,
    to,
    compareToPrevious,
    aggregatePeriod
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Query ID | defaults to undefined|
| **from** | [**string**] | Start of time range (RFC3339) | defaults to undefined|
| **to** | [**string**] | End of time range (RFC3339) | defaults to undefined|
| **compareToPrevious** | [**boolean**] | If true, also evaluates the same-length immediately-preceding range and returns it as &#x60;previous&#x60; | (optional) defaults to undefined|
| **aggregatePeriod** | [**boolean**] | If true, collapses the time axis: one row per BreakdownValue summed across the full range (TimeBucket is zero) | (optional) defaults to undefined|


### Return type

**InsightsEvaluateQueryResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInsightsViews**
> Array<InsightsViewResponse> getInsightsViews()

List insights views (chart placements) for a project

### Example

```typescript
import {
    InsightsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let projectID: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.getInsightsViews(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|


### Return type

**Array<InsightsViewResponse>**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateInsightsMetric**
> InsightsMetricResponse updateInsightsMetric(request)

Update a saved insights metric.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsUpdateMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Metric ID (default to undefined)
let request: InsightsUpdateMetricRequest; //Update metric body

const { status, data } = await apiInstance.updateInsightsMetric(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsUpdateMetricRequest**| Update metric body | |
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**InsightsMetricResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateInsightsQuery**
> InsightsQueryResponse updateInsightsQuery(request)

Update a saved insights query (source is immutable; use \"save as new\" to change it)

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsUpdateQueryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //Query ID (default to undefined)
let request: InsightsUpdateQueryRequest; //Update query body

const { status, data } = await apiInstance.updateInsightsQuery(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsUpdateQueryRequest**| Update query body | |
| **id** | [**string**] | Query ID | defaults to undefined|


### Return type

**InsightsQueryResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateInsightsView**
> InsightsViewResponse updateInsightsView(request)

Update a chart placement on the Insights board.

### Example

```typescript
import {
    InsightsApi,
    Configuration,
    InsightsUpdateViewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InsightsApi(configuration);

let id: string; //View ID (default to undefined)
let request: InsightsUpdateViewRequest; //Update view body

const { status, data } = await apiInstance.updateInsightsView(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InsightsUpdateViewRequest**| Update view body | |
| **id** | [**string**] | View ID | defaults to undefined|


### Return type

**InsightsViewResponse**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

