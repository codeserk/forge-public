# StatsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getActiveSessions**](#getactivesessions) | **GET** /api/v1/stats/session/active | Get active sessions|
|[**getAggregationCardinalities**](#getaggregationcardinalities) | **GET** /api/v1/stats/aggregation-cardinalities | Get aggregation cardinalities|
|[**getDimensionBreakdown**](#getdimensionbreakdown) | **GET** /api/v1/stats/event/dimension-breakdown | Get dimension breakdown|
|[**getEventOverview**](#geteventoverview) | **GET** /api/v1/stats/event/overview | Get event overview|
|[**getEventTimeseries**](#geteventtimeseries) | **GET** /api/v1/stats/event/timeseries | Get event timeseries|
|[**getEventTypes**](#geteventtypes) | **GET** /api/v1/stats/event/types | Get event types|
|[**getSessionOverview**](#getsessionoverview) | **GET** /api/v1/stats/session/overview | Get session overview|
|[**getSessionTimeseries**](#getsessiontimeseries) | **GET** /api/v1/stats/session/timeseries | Get session timeseries|
|[**getStatsConfig**](#getstatsconfig) | **GET** /api/v1/stats/config | Get stats config|
|[**getTopByDimension**](#gettopbydimension) | **GET** /api/v1/stats/top-by-dimension | Get top by dimension|
|[**putEventTypeConfig**](#puteventtypeconfig) | **PUT** /api/v1/stats/event/type-config | Put event type config|
|[**queryEvents**](#queryevents) | **POST** /api/v1/stats/event/query | Query events|

# **getActiveSessions**
> StatsActiveSessionsResponse getActiveSessions()

Endpoint to get the current number of active sessions

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let projectID: string; // (default to undefined)

const { status, data } = await apiInstance.getActiveSessions(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] |  | defaults to undefined|


### Return type

**StatsActiveSessionsResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAggregationCardinalities**
> StatsAggregationCardinalitiesResponse getAggregationCardinalities()

Endpoint to get cardinalities

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let projectID: string; // (default to undefined)

const { status, data } = await apiInstance.getAggregationCardinalities(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] |  | defaults to undefined|


### Return type

**StatsAggregationCardinalitiesResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDimensionBreakdown**
> StatsDimensionBreakdownResponse getDimensionBreakdown()

Top-N value combinations for a configured aggregation dimension group, scoped by date range and optional type filter.

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let keys: Array<string>; //Keys defines the dim group to read, e.g. [\"Type\",\"appVersion\"]. Required. (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let date: string; // (optional) (default to undefined)
let filter: string; //Filter is a \"key1=value1,key2=value2\" list for additional dim filters. (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let type: string; //Type optionally scopes to a single event type (sets Values[indexOf(Keys,\'Type\')] = type). (optional) (default to undefined)

const { status, data } = await apiInstance.getDimensionBreakdown(
    granularity,
    keys,
    period,
    projectID,
    date,
    filter,
    limit,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **keys** | **Array&lt;string&gt;** | Keys defines the dim group to read, e.g. [\&quot;Type\&quot;,\&quot;appVersion\&quot;]. Required. | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **filter** | [**string**] | Filter is a \&quot;key1&#x3D;value1,key2&#x3D;value2\&quot; list for additional dim filters. | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **type** | [**string**] | Type optionally scopes to a single event type (sets Values[indexOf(Keys,\&#39;Type\&#39;)] &#x3D; type). | (optional) defaults to undefined|


### Return type

**StatsDimensionBreakdownResponse**

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

# **getEventOverview**
> StatsEventOverviewResponse getEventOverview()

Endpoint to get event overview

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let date: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getEventOverview(
    granularity,
    period,
    projectID,
    date
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StatsEventOverviewResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventTimeseries**
> StatsEventTimeseriesResponse getEventTimeseries()

Gets event timeseries

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let comparisonTimeRange: string; // (optional) (default to undefined)
let date: string; // (optional) (default to undefined)
let keys: Array<string>; // (optional) (default to undefined)
let timeRange: string; // (optional) (default to undefined)
let values: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.getEventTimeseries(
    granularity,
    period,
    projectID,
    comparisonTimeRange,
    date,
    keys,
    timeRange,
    values
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **comparisonTimeRange** | [**string**] |  | (optional) defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **keys** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **timeRange** | [**string**] |  | (optional) defaults to undefined|
| **values** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**StatsEventTimeseriesResponse**

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

# **getEventTypes**
> StatsEventTypesResponse getEventTypes()

Endpoint to get event types with optional config per type

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let projectID: string; // (default to undefined)

const { status, data } = await apiInstance.getEventTypes(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] |  | defaults to undefined|


### Return type

**StatsEventTypesResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionOverview**
> StatsSessionOverviewResponse getSessionOverview()

Endpoint to get session overview

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let date: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSessionOverview(
    granularity,
    period,
    projectID,
    date
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StatsSessionOverviewResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSessionTimeseries**
> StatsSessionTimeseriesResponse getSessionTimeseries()

Endpoint to get event time stats

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let date: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSessionTimeseries(
    granularity,
    period,
    projectID,
    date
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StatsSessionTimeseriesResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStatsConfig**
> StatsStatsConfigDetailResponse getStatsConfig()

Get stats config for a project, including aggregation dimensions.

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let projectID: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.getStatsConfig(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] | Project ID | defaults to undefined|


### Return type

**StatsStatsConfigDetailResponse**

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

# **getTopByDimension**
> StatsTopResponse getTopByDimension()

Endpoint to get top by dimension

### Example

```typescript
import {
    StatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let granularity: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // (default to undefined)
let period: 'realtime' | 'day' | '7days' | '14days' | 'week' | 'month' | 'year' | 'all'; // (default to undefined)
let projectID: string; // (default to undefined)
let aggregation: Array<string>; // (optional) (default to undefined)
let date: string; // (optional) (default to undefined)
let keys: Array<string>; // (optional) (default to undefined)
let values: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.getTopByDimension(
    granularity,
    period,
    projectID,
    aggregation,
    date,
    keys,
    values
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **granularity** | [**&#39;hourly&#39; | &#39;daily&#39; | &#39;weekly&#39; | &#39;monthly&#39; | &#39;yearly&#39;**]**Array<&#39;hourly&#39; &#124; &#39;daily&#39; &#124; &#39;weekly&#39; &#124; &#39;monthly&#39; &#124; &#39;yearly&#39;>** |  | defaults to undefined|
| **period** | [**&#39;realtime&#39; | &#39;day&#39; | &#39;7days&#39; | &#39;14days&#39; | &#39;week&#39; | &#39;month&#39; | &#39;year&#39; | &#39;all&#39;**]**Array<&#39;realtime&#39; &#124; &#39;day&#39; &#124; &#39;7days&#39; &#124; &#39;14days&#39; &#124; &#39;week&#39; &#124; &#39;month&#39; &#124; &#39;year&#39; &#124; &#39;all&#39;>** |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **aggregation** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **keys** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **values** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**StatsTopResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **putEventTypeConfig**
> ResponseEventTypeConfigResponse putEventTypeConfig(request)

Upsert config for a given event type. Only provided fields are updated.

### Example

```typescript
import {
    StatsApi,
    Configuration,
    StatsPutEventTypeConfigRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let request: StatsPutEventTypeConfigRequest; //Put event type config body

const { status, data } = await apiInstance.putEventTypeConfig(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **StatsPutEventTypeConfigRequest**| Put event type config body | |


### Return type

**ResponseEventTypeConfigResponse**

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

# **queryEvents**
> StatsEventTimeseriesResponse queryEvents(request)

Query events with custom filters and aggregations

### Example

```typescript
import {
    StatsApi,
    Configuration,
    StatsQueryEventsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new StatsApi(configuration);

let request: StatsQueryEventsRequest; //Query events request

const { status, data } = await apiInstance.queryEvents(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **StatsQueryEventsRequest**| Query events request | |


### Return type

**StatsEventTimeseriesResponse**

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

