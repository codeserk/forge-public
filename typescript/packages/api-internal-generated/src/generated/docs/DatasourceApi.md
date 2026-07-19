# DatasourceApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**archiveDatasource**](#archivedatasource) | **DELETE** /api/v1/observability/datasources/{id} | Archive datasource|
|[**archiveDatasourceMetric**](#archivedatasourcemetric) | **DELETE** /api/v1/observability/datasource-metrics/{id} | Archive datasource metric|
|[**createDatasource**](#createdatasource) | **POST** /api/v1/observability/datasources | Create datasource|
|[**createDatasourceMetric**](#createdatasourcemetric) | **POST** /api/v1/observability/datasource-metrics | Create datasource metric|
|[**evaluateDatasourceMetric**](#evaluatedatasourcemetric) | **GET** /api/v1/observability/datasource-metrics/{id}/evaluate | Evaluate datasource metric|
|[**getDatasource**](#getdatasource) | **GET** /api/v1/observability/datasources/{id} | Get datasource|
|[**getDatasourceHealth**](#getdatasourcehealth) | **GET** /api/v1/observability/datasources/{id}/health | Get datasource health|
|[**getDatasourceMetric**](#getdatasourcemetric) | **GET** /api/v1/observability/datasource-metrics/{id} | Get datasource metric|
|[**getDatasourceMetrics**](#getdatasourcemetrics) | **GET** /api/v1/observability/datasource-metrics | List datasource metrics|
|[**getDatasources**](#getdatasources) | **GET** /api/v1/observability/datasources | List datasources|
|[**queryDatasourceLogs**](#querydatasourcelogs) | **GET** /api/v1/observability/datasources/{id}/logs | Query datasource logs|
|[**updateDatasource**](#updatedatasource) | **PATCH** /api/v1/observability/datasources/{id} | Update datasource|
|[**updateDatasourceMetric**](#updatedatasourcemetric) | **PATCH** /api/v1/observability/datasource-metrics/{id} | Update datasource metric|

# **archiveDatasource**
> DatasourceDatasourceResponse archiveDatasource()

Archive a datasource. The record is soft-deleted via archivedAt.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Datasource ID (default to undefined)

const { status, data } = await apiInstance.archiveDatasource(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Datasource ID | defaults to undefined|


### Return type

**DatasourceDatasourceResponse**

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

# **archiveDatasourceMetric**
> DatasourceDatasourceMetricResponse archiveDatasourceMetric()

Archive a datasource metric. The record is soft-deleted via archivedAt.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Metric ID (default to undefined)

const { status, data } = await apiInstance.archiveDatasourceMetric(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**DatasourceDatasourceMetricResponse**

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

# **createDatasource**
> DatasourceDatasourceResponse createDatasource(request)

Create a new datasource attached to a project.

### Example

```typescript
import {
    DatasourceApi,
    Configuration,
    DatasourceCreateDatasourceRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let request: DatasourceCreateDatasourceRequest; //Create datasource body

const { status, data } = await apiInstance.createDatasource(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceCreateDatasourceRequest**| Create datasource body | |


### Return type

**DatasourceDatasourceResponse**

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

# **createDatasourceMetric**
> DatasourceDatasourceMetricResponse createDatasourceMetric(request)

Create a metric tied to a datasource. Tier-derived limits apply.

### Example

```typescript
import {
    DatasourceApi,
    Configuration,
    DatasourceCreateMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let request: DatasourceCreateMetricRequest; //Create metric body

const { status, data } = await apiInstance.createDatasourceMetric(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceCreateMetricRequest**| Create metric body | |


### Return type

**DatasourceDatasourceMetricResponse**

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

# **evaluateDatasourceMetric**
> DatasourceDatasourceMetricResultResponse evaluateDatasourceMetric()

Run a live range query for a metric. Results are cached for the metric\'s configured TTL.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Metric ID (default to undefined)
let from: string; //Start of time range (RFC3339) (default to undefined)
let to: string; //End of time range (RFC3339) (default to undefined)
let step: number; //Step size in milliseconds (default to undefined)

const { status, data } = await apiInstance.evaluateDatasourceMetric(
    id,
    from,
    to,
    step
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|
| **from** | [**string**] | Start of time range (RFC3339) | defaults to undefined|
| **to** | [**string**] | End of time range (RFC3339) | defaults to undefined|
| **step** | [**number**] | Step size in milliseconds | defaults to undefined|


### Return type

**DatasourceDatasourceMetricResultResponse**

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

# **getDatasource**
> DatasourceDatasourceResponse getDatasource()

Get a datasource by ID

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Datasource ID (default to undefined)

const { status, data } = await apiInstance.getDatasource(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Datasource ID | defaults to undefined|


### Return type

**DatasourceDatasourceResponse**

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

# **getDatasourceHealth**
> DatasourceDatasourceHealthResponse getDatasourceHealth()

Check live connectivity to the datasource agent and report per-integration availability.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Datasource ID (default to undefined)

const { status, data } = await apiInstance.getDatasourceHealth(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Datasource ID | defaults to undefined|


### Return type

**DatasourceDatasourceHealthResponse**

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
|**502** | Bad Gateway |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasourceMetric**
> DatasourceDatasourceMetricResponse getDatasourceMetric()

Get a datasource metric by ID

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Metric ID (default to undefined)

const { status, data } = await apiInstance.getDatasourceMetric(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**DatasourceDatasourceMetricResponse**

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

# **getDatasourceMetrics**
> Array<DatasourceDatasourceMetricResponse> getDatasourceMetrics()

List datasource metrics for a project, optionally filtered by datasource or persistence flag.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let projectID: string; //Project ID (default to undefined)
let datasourceID: string; //Filter by datasource ID (optional) (default to undefined)
let persistenceOnly: boolean; //Only return metrics with persistence enabled (optional) (default to undefined)

const { status, data } = await apiInstance.getDatasourceMetrics(
    projectID,
    datasourceID,
    persistenceOnly
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|
| **datasourceID** | [**string**] | Filter by datasource ID | (optional) defaults to undefined|
| **persistenceOnly** | [**boolean**] | Only return metrics with persistence enabled | (optional) defaults to undefined|


### Return type

**Array<DatasourceDatasourceMetricResponse>**

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

# **getDatasources**
> Array<DatasourceDatasourceResponse> getDatasources()

List datasources for a project

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let projectID: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.getDatasources(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|


### Return type

**Array<DatasourceDatasourceResponse>**

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

# **queryDatasourceLogs**
> DatasourceLogsResponse queryDatasourceLogs()

Run a live logs query for a datasource. Results are NOT cached.

### Example

```typescript
import {
    DatasourceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Datasource ID (default to undefined)
let expr: string; //Log query expression (default to undefined)
let from: string; //Start of time range (RFC3339) (default to undefined)
let to: string; //End of time range (RFC3339) (default to undefined)
let limit: number; //Maximum number of log lines (default 1000, capped at 10000) (optional) (default to undefined)

const { status, data } = await apiInstance.queryDatasourceLogs(
    id,
    expr,
    from,
    to,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Datasource ID | defaults to undefined|
| **expr** | [**string**] | Log query expression | defaults to undefined|
| **from** | [**string**] | Start of time range (RFC3339) | defaults to undefined|
| **to** | [**string**] | End of time range (RFC3339) | defaults to undefined|
| **limit** | [**number**] | Maximum number of log lines (default 1000, capped at 10000) | (optional) defaults to undefined|


### Return type

**DatasourceLogsResponse**

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

# **updateDatasource**
> DatasourceDatasourceResponse updateDatasource(request)

Update a datasource\'s editable fields.

### Example

```typescript
import {
    DatasourceApi,
    Configuration,
    DatasourceUpdateDatasourceRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Datasource ID (default to undefined)
let request: DatasourceUpdateDatasourceRequest; //Update datasource body

const { status, data } = await apiInstance.updateDatasource(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceUpdateDatasourceRequest**| Update datasource body | |
| **id** | [**string**] | Datasource ID | defaults to undefined|


### Return type

**DatasourceDatasourceResponse**

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

# **updateDatasourceMetric**
> DatasourceDatasourceMetricResponse updateDatasourceMetric(request)

Update a datasource metric. Tier-derived limits apply.

### Example

```typescript
import {
    DatasourceApi,
    Configuration,
    DatasourceUpdateMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourceApi(configuration);

let id: string; //Metric ID (default to undefined)
let request: DatasourceUpdateMetricRequest; //Update metric body

const { status, data } = await apiInstance.updateDatasourceMetric(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceUpdateMetricRequest**| Update metric body | |
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**DatasourceDatasourceMetricResponse**

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

