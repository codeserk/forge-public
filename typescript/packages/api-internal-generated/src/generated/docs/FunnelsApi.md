# FunnelsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createFunnel**](#createfunnel) | **POST** /api/v1/funnels | Create funnel|
|[**deleteFunnel**](#deletefunnel) | **DELETE** /api/v1/funnels/{id} | Delete funnel|
|[**getFunnel**](#getfunnel) | **GET** /api/v1/funnels/{id} | Get funnel|
|[**getFunnelStats**](#getfunnelstats) | **GET** /api/v1/funnels/{id}/stats | Get funnel stats|
|[**getFunnels**](#getfunnels) | **GET** /api/v1/funnels | Get funnels|
|[**runFunnel**](#runfunnel) | **POST** /api/v1/funnels/{id}/run | Run funnel|
|[**updateFunnel**](#updatefunnel) | **PUT** /api/v1/funnels/{id} | Update funnel|

# **createFunnel**
> FunnelFunnelResponse createFunnel(request)

Create a new funnel

### Example

```typescript
import {
    FunnelsApi,
    Configuration,
    FunnelCreateFunnelRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let request: FunnelCreateFunnelRequest; //Create funnel body

const { status, data } = await apiInstance.createFunnel(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **FunnelCreateFunnelRequest**| Create funnel body | |


### Return type

**FunnelFunnelResponse**

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

# **deleteFunnel**
> FunnelFunnelDeleteResponse deleteFunnel()

Delete a funnel by ID

### Example

```typescript
import {
    FunnelsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let id: string; //Funnel ID (default to undefined)

const { status, data } = await apiInstance.deleteFunnel(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Funnel ID | defaults to undefined|


### Return type

**FunnelFunnelDeleteResponse**

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

# **getFunnel**
> FunnelFunnelResponse getFunnel()

Get a funnel by ID

### Example

```typescript
import {
    FunnelsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let id: string; //Funnel ID (default to undefined)

const { status, data } = await apiInstance.getFunnel(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Funnel ID | defaults to undefined|


### Return type

**FunnelFunnelResponse**

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

# **getFunnelStats**
> FunnelFunnelStatsResponse getFunnelStats()

Get funnel stats for a date range

### Example

```typescript
import {
    FunnelsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let id: string; //Funnel ID (default to undefined)
let from: string; // (default to undefined)
let to: string; // (default to undefined)

const { status, data } = await apiInstance.getFunnelStats(
    id,
    from,
    to
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Funnel ID | defaults to undefined|
| **from** | [**string**] |  | defaults to undefined|
| **to** | [**string**] |  | defaults to undefined|


### Return type

**FunnelFunnelStatsResponse**

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

# **getFunnels**
> Array<FunnelFunnelResponse> getFunnels()

Get funnels for a project

### Example

```typescript
import {
    FunnelsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let projectID: string; // (default to undefined)

const { status, data } = await apiInstance.getFunnels(
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectID** | [**string**] |  | defaults to undefined|


### Return type

**Array<FunnelFunnelResponse>**

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

# **runFunnel**
> FunnelFunnelStatsResponse runFunnel(request)

Run a funnel over a date range

### Example

```typescript
import {
    FunnelsApi,
    Configuration,
    FunnelRunFunnelRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let id: string; //Funnel ID (default to undefined)
let request: FunnelRunFunnelRequest; //Run funnel body

const { status, data } = await apiInstance.runFunnel(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **FunnelRunFunnelRequest**| Run funnel body | |
| **id** | [**string**] | Funnel ID | defaults to undefined|


### Return type

**FunnelFunnelStatsResponse**

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

# **updateFunnel**
> FunnelFunnelResponse updateFunnel(request)

Update an existing funnel

### Example

```typescript
import {
    FunnelsApi,
    Configuration,
    FunnelUpdateFunnelRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FunnelsApi(configuration);

let id: string; //Funnel ID (default to undefined)
let request: FunnelUpdateFunnelRequest; //Update funnel body

const { status, data } = await apiInstance.updateFunnel(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **FunnelUpdateFunnelRequest**| Update funnel body | |
| **id** | [**string**] | Funnel ID | defaults to undefined|


### Return type

**FunnelFunnelResponse**

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

