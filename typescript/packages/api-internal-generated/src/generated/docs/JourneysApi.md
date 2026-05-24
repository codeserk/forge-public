# JourneysApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getJourneyPaths**](#getjourneypaths) | **GET** /api/v1/journeys | Get journey paths|

# **getJourneyPaths**
> Array<JourneyJourneyPathResponse> getJourneyPaths()

Get aggregated journey paths for a project within a date range

### Example

```typescript
import {
    JourneysApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JourneysApi(configuration);

let from: string; // (default to undefined)
let projectID: string; // (default to undefined)
let to: string; // (default to undefined)
let fromSource: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.getJourneyPaths(
    from,
    projectID,
    to,
    fromSource
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **from** | [**string**] |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **to** | [**string**] |  | defaults to undefined|
| **fromSource** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**Array<JourneyJourneyPathResponse>**

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

