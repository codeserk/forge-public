# EventUsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getEventUsers**](#geteventusers) | **GET** /api/v1/event-users | Get event users|

# **getEventUsers**
> EventusersEventUsersResponse getEventUsers()

Get paginated list of event users with optional filters

### Example

```typescript
import {
    EventUsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventUsersApi(configuration);

let limit: number; // (default to undefined)
let projectID: string; // (default to undefined)
let country: string; // (optional) (default to undefined)
let deviceBrowser: string; // (optional) (default to undefined)
let deviceOS: string; // (optional) (default to undefined)
let deviceType: string; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let type: string; // (optional) (default to undefined)
let userAgent: string; //filters (optional) (default to undefined)

const { status, data } = await apiInstance.getEventUsers(
    limit,
    projectID,
    country,
    deviceBrowser,
    deviceOS,
    deviceType,
    page,
    type,
    userAgent
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **country** | [**string**] |  | (optional) defaults to undefined|
| **deviceBrowser** | [**string**] |  | (optional) defaults to undefined|
| **deviceOS** | [**string**] |  | (optional) defaults to undefined|
| **deviceType** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **type** | [**string**] |  | (optional) defaults to undefined|
| **userAgent** | [**string**] | filters | (optional) defaults to undefined|


### Return type

**EventusersEventUsersResponse**

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

