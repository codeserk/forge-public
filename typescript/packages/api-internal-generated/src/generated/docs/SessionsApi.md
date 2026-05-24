# SessionsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSessions**](#getsessions) | **GET** /api/v1/sessions | Get sessions|

# **getSessions**
> SessionsSessionsResponse getSessions()

Get paginated list of sessions with optional filters

### Example

```typescript
import {
    SessionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SessionsApi(configuration);

let limit: number; // (default to undefined)
let projectID: string; // (default to undefined)
let active: boolean; // (optional) (default to undefined)
let countries: string; // (optional) (default to undefined)
let deviceBrowsers: string; // (optional) (default to undefined)
let deviceOSs: string; // (optional) (default to undefined)
let deviceTypes: string; // (optional) (default to undefined)
let isBounce: boolean; // (optional) (default to undefined)
let lastSeenFrom: string; // (optional) (default to undefined)
let lastSeenTo: string; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let userID: string; //filters (optional) (default to undefined)
let userTypes: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getSessions(
    limit,
    projectID,
    active,
    countries,
    deviceBrowsers,
    deviceOSs,
    deviceTypes,
    isBounce,
    lastSeenFrom,
    lastSeenTo,
    page,
    userID,
    userTypes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **active** | [**boolean**] |  | (optional) defaults to undefined|
| **countries** | [**string**] |  | (optional) defaults to undefined|
| **deviceBrowsers** | [**string**] |  | (optional) defaults to undefined|
| **deviceOSs** | [**string**] |  | (optional) defaults to undefined|
| **deviceTypes** | [**string**] |  | (optional) defaults to undefined|
| **isBounce** | [**boolean**] |  | (optional) defaults to undefined|
| **lastSeenFrom** | [**string**] |  | (optional) defaults to undefined|
| **lastSeenTo** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **userID** | [**string**] | filters | (optional) defaults to undefined|
| **userTypes** | [**string**] |  | (optional) defaults to undefined|


### Return type

**SessionsSessionsResponse**

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

