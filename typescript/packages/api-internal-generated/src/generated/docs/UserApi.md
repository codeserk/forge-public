# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getUsers**](#getusers) | **GET** /api/v1/users | Get users|

# **getUsers**
> Array<ResponseUser> getUsers()

Get users using some filters

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let organizationID: string; // (optional) (default to undefined)
let projectID: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getUsers(
    organizationID,
    projectID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **organizationID** | [**string**] |  | (optional) defaults to undefined|
| **projectID** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<ResponseUser>**

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

