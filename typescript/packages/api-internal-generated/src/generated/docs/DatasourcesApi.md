# DatasourcesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**archiveDatasource**](#archivedatasource) | **DELETE** /api/v1/datasources/{id} | Archive datasource|
|[**archiveDatasourceAgent**](#archivedatasourceagent) | **DELETE** /api/v1/datasource-agents/{id} | Archive datasource agent|
|[**archiveDatasourceMetric**](#archivedatasourcemetric) | **DELETE** /api/v1/datasource-metrics/{id} | Archive datasource metric|
|[**createDatasource**](#createdatasource) | **POST** /api/v1/datasources | Create datasource|
|[**createDatasourceAgent**](#createdatasourceagent) | **POST** /api/v1/datasource-agents | Create datasource agent|
|[**createDatasourceMetric**](#createdatasourcemetric) | **POST** /api/v1/datasources/{datasourceID}/metrics | Create datasource metric|
|[**evaluateDatasourceMetric**](#evaluatedatasourcemetric) | **POST** /api/v1/datasource-metrics/{id}/evaluate | Evaluate datasource metric|
|[**getDatasource**](#getdatasource) | **GET** /api/v1/datasources/{id} | Get datasource|
|[**getDatasourceAgent**](#getdatasourceagent) | **GET** /api/v1/datasource-agents/{id} | Get datasource agent|
|[**getDatasourceAgents**](#getdatasourceagents) | **GET** /api/v1/datasource-agents | List datasource agents|
|[**getDatasourceMetric**](#getdatasourcemetric) | **GET** /api/v1/datasource-metrics/{id} | Get datasource metric|
|[**getDatasourceMetrics**](#getdatasourcemetrics) | **GET** /api/v1/datasources/{datasourceID}/metrics | List datasource metrics|
|[**getDatasources**](#getdatasources) | **GET** /api/v1/datasources | List datasources|
|[**ingestDatasource**](#ingestdatasource) | **POST** /api/v1/datasources/{id}/ingest | Ingest datasource|
|[**updateDatasource**](#updatedatasource) | **PATCH** /api/v1/datasources/{id} | Update datasource|
|[**updateDatasourceMetric**](#updatedatasourcemetric) | **PATCH** /api/v1/datasource-metrics/{id} | Update datasource metric|

# **archiveDatasource**
> DatasourceDatasourceArchiveResponse archiveDatasource()

Archive a datasource by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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

**DatasourceDatasourceArchiveResponse**

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

# **archiveDatasourceAgent**
> DatasourceDatasourceAgentArchiveResponse archiveDatasourceAgent()

Archive a datasource agent by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let id: string; //Agent ID (default to undefined)

const { status, data } = await apiInstance.archiveDatasourceAgent(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Agent ID | defaults to undefined|


### Return type

**DatasourceDatasourceAgentArchiveResponse**

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **archiveDatasourceMetric**
> DatasourceDatasourceMetricArchiveResponse archiveDatasourceMetric()

Archive a datasource metric by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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

**DatasourceDatasourceMetricArchiveResponse**

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

# **createDatasource**
> DatasourceDatasourceResponse createDatasource(request)

Create a new datasource

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceCreateDatasourceRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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

# **createDatasourceAgent**
> DatasourceCreateDatasourceAgentResponse createDatasourceAgent(request)

Create a new datasource agent. The plaintext tenant token is returned ONCE and never stored.

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceCreateDatasourceAgentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let request: DatasourceCreateDatasourceAgentRequest; //Create agent body

const { status, data } = await apiInstance.createDatasourceAgent(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceCreateDatasourceAgentRequest**| Create agent body | |


### Return type

**DatasourceCreateDatasourceAgentResponse**

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

# **createDatasourceMetric**
> DatasourceDatasourceMetricResponse createDatasourceMetric(request)

Create a new metric on a datasource

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceCreateDatasourceMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let datasourceID: string; //Datasource ID (default to undefined)
let request: DatasourceCreateDatasourceMetricRequest; //Create metric body

const { status, data } = await apiInstance.createDatasourceMetric(
    datasourceID,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceCreateDatasourceMetricRequest**| Create metric body | |
| **datasourceID** | [**string**] | Datasource ID | defaults to undefined|


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

# **evaluateDatasourceMetric**
> DatasourceDatasourceMetricResultResponse evaluateDatasourceMetric(request)

Evaluate a metric over a time range

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceEvaluateDatasourceMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let id: string; //Metric ID (default to undefined)
let request: DatasourceEvaluateDatasourceMetricRequest; //Evaluate range

const { status, data } = await apiInstance.evaluateDatasourceMetric(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceEvaluateDatasourceMetricRequest**| Evaluate range | |
| **id** | [**string**] | Metric ID | defaults to undefined|


### Return type

**DatasourceDatasourceMetricResultResponse**

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

# **getDatasource**
> DatasourceDatasourceResponse getDatasource()

Get a datasource by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasourceAgent**
> DatasourceDatasourceAgentResponse getDatasourceAgent()

Get a datasource agent by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let id: string; //Agent ID (default to undefined)

const { status, data } = await apiInstance.getDatasourceAgent(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Agent ID | defaults to undefined|


### Return type

**DatasourceDatasourceAgentResponse**

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasourceAgents**
> Array<DatasourceDatasourceAgentResponse> getDatasourceAgents()

List datasource agents for an organization

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let organizationID: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.getDatasourceAgents(
    organizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **organizationID** | [**string**] | Organization ID | defaults to undefined|


### Return type

**Array<DatasourceDatasourceAgentResponse>**

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
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasourceMetric**
> DatasourceDatasourceMetricResponse getDatasourceMetric()

Get a datasource metric by ID

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasourceMetrics**
> Array<DatasourceDatasourceMetricResponse> getDatasourceMetrics()

List metrics for a datasource

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let datasourceID: string; //Datasource ID (default to undefined)

const { status, data } = await apiInstance.getDatasourceMetrics(
    datasourceID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **datasourceID** | [**string**] | Datasource ID | defaults to undefined|


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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDatasources**
> Array<DatasourceDatasourceResponse> getDatasources()

List datasources for a project

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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

# **ingestDatasource**
> DatasourceIngestDatasourceResponse ingestDatasource()

Trigger an ingest run for a datasource over the last 7 days

### Example

```typescript
import {
    DatasourcesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let id: string; //Datasource ID (default to undefined)

const { status, data } = await apiInstance.ingestDatasource(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Datasource ID | defaults to undefined|


### Return type

**DatasourceIngestDatasourceResponse**

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

Update an existing datasource

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceUpdateDatasourceRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

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

Update an existing datasource metric

### Example

```typescript
import {
    DatasourcesApi,
    Configuration,
    DatasourceUpdateDatasourceMetricRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasourcesApi(configuration);

let id: string; //Metric ID (default to undefined)
let request: DatasourceUpdateDatasourceMetricRequest; //Update metric body

const { status, data } = await apiInstance.updateDatasourceMetric(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DatasourceUpdateDatasourceMetricRequest**| Update metric body | |
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

