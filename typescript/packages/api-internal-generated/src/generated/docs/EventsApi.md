# EventsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getEventSummaries**](#geteventsummaries) | **GET** /api/v1/events/summaries | Get event summaries|
|[**getEvents**](#getevents) | **GET** /api/v1/events | Get events|

# **getEventSummaries**
> EventsEventSummariesResponse getEventSummaries()

Get paginated list of event summaries with aggregated metadata

### Example

```typescript
import {
    EventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let limit: number; // (default to undefined)
let projectID: string; // (default to undefined)
let appName: string; // (optional) (default to undefined)
let appVersionID: string; // (optional) (default to undefined)
let appVersionName: string; // (optional) (default to undefined)
let bucket: string; // (optional) (default to undefined)
let bucketContains: string; // (optional) (default to undefined)
let country: string; // (optional) (default to undefined)
let deviceBrowser: string; // (optional) (default to undefined)
let deviceOS: string; // (optional) (default to undefined)
let deviceOSVersion: string; // (optional) (default to undefined)
let deviceType: string; // (optional) (default to undefined)
let firstSeenFrom: string; // (optional) (default to undefined)
let firstSeenTo: string; // (optional) (default to undefined)
let lastSeenFrom: string; // (optional) (default to undefined)
let lastSeenTo: string; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let referrer: string; // (optional) (default to undefined)
let referrerEvent: string; // (optional) (default to undefined)
let referrerUTMCampaign: string; // (optional) (default to undefined)
let referrerUTMContent: string; // (optional) (default to undefined)
let referrerUTMMedium: string; // (optional) (default to undefined)
let referrerUTMSource: string; // (optional) (default to undefined)
let referrerUTMTerm: string; // (optional) (default to undefined)
let sort: 'bucket' | 'first_seen' | 'last_seen' | 'total'; //sort (optional) (default to undefined)
let sortOrder: 'asc' | 'desc'; // (optional) (default to undefined)
let type: string; //filters (optional) (default to undefined)
let userType: string; //topK filters (optional) (default to undefined)

const { status, data } = await apiInstance.getEventSummaries(
    limit,
    projectID,
    appName,
    appVersionID,
    appVersionName,
    bucket,
    bucketContains,
    country,
    deviceBrowser,
    deviceOS,
    deviceOSVersion,
    deviceType,
    firstSeenFrom,
    firstSeenTo,
    lastSeenFrom,
    lastSeenTo,
    page,
    referrer,
    referrerEvent,
    referrerUTMCampaign,
    referrerUTMContent,
    referrerUTMMedium,
    referrerUTMSource,
    referrerUTMTerm,
    sort,
    sortOrder,
    type,
    userType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **appName** | [**string**] |  | (optional) defaults to undefined|
| **appVersionID** | [**string**] |  | (optional) defaults to undefined|
| **appVersionName** | [**string**] |  | (optional) defaults to undefined|
| **bucket** | [**string**] |  | (optional) defaults to undefined|
| **bucketContains** | [**string**] |  | (optional) defaults to undefined|
| **country** | [**string**] |  | (optional) defaults to undefined|
| **deviceBrowser** | [**string**] |  | (optional) defaults to undefined|
| **deviceOS** | [**string**] |  | (optional) defaults to undefined|
| **deviceOSVersion** | [**string**] |  | (optional) defaults to undefined|
| **deviceType** | [**string**] |  | (optional) defaults to undefined|
| **firstSeenFrom** | [**string**] |  | (optional) defaults to undefined|
| **firstSeenTo** | [**string**] |  | (optional) defaults to undefined|
| **lastSeenFrom** | [**string**] |  | (optional) defaults to undefined|
| **lastSeenTo** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **referrer** | [**string**] |  | (optional) defaults to undefined|
| **referrerEvent** | [**string**] |  | (optional) defaults to undefined|
| **referrerUTMCampaign** | [**string**] |  | (optional) defaults to undefined|
| **referrerUTMContent** | [**string**] |  | (optional) defaults to undefined|
| **referrerUTMMedium** | [**string**] |  | (optional) defaults to undefined|
| **referrerUTMSource** | [**string**] |  | (optional) defaults to undefined|
| **referrerUTMTerm** | [**string**] |  | (optional) defaults to undefined|
| **sort** | [**&#39;bucket&#39; | &#39;first_seen&#39; | &#39;last_seen&#39; | &#39;total&#39;**]**Array<&#39;bucket&#39; &#124; &#39;first_seen&#39; &#124; &#39;last_seen&#39; &#124; &#39;total&#39;>** | sort | (optional) defaults to undefined|
| **sortOrder** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to undefined|
| **type** | [**string**] | filters | (optional) defaults to undefined|
| **userType** | [**string**] | topK filters | (optional) defaults to undefined|


### Return type

**EventsEventSummariesResponse**

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

# **getEvents**
> EventsEventsResponse getEvents()

Get paginated list of events with optional filters

### Example

```typescript
import {
    EventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let limit: number; // (default to undefined)
let projectID: string; // (default to undefined)
let appVersionID: string; // (optional) (default to undefined)
let appVersionName: string; // (optional) (default to undefined)
let bucket: string; // (optional) (default to undefined)
let bucketContains: string; // (optional) (default to undefined)
let countries: string; // (optional) (default to undefined)
let dateFrom: string; // (optional) (default to undefined)
let dateTo: string; // (optional) (default to undefined)
let deviceBrowsers: string; // (optional) (default to undefined)
let deviceOSs: string; // (optional) (default to undefined)
let deviceTypes: string; // (optional) (default to undefined)
let name: string; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let referrer: string; // (optional) (default to undefined)
let sessionID: string; //filters (optional) (default to undefined)
let type: string; // (optional) (default to undefined)
let types: string; // (optional) (default to undefined)
let userID: string; // (optional) (default to undefined)
let userTypes: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getEvents(
    limit,
    projectID,
    appVersionID,
    appVersionName,
    bucket,
    bucketContains,
    countries,
    dateFrom,
    dateTo,
    deviceBrowsers,
    deviceOSs,
    deviceTypes,
    name,
    page,
    referrer,
    sessionID,
    type,
    types,
    userID,
    userTypes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | defaults to undefined|
| **projectID** | [**string**] |  | defaults to undefined|
| **appVersionID** | [**string**] |  | (optional) defaults to undefined|
| **appVersionName** | [**string**] |  | (optional) defaults to undefined|
| **bucket** | [**string**] |  | (optional) defaults to undefined|
| **bucketContains** | [**string**] |  | (optional) defaults to undefined|
| **countries** | [**string**] |  | (optional) defaults to undefined|
| **dateFrom** | [**string**] |  | (optional) defaults to undefined|
| **dateTo** | [**string**] |  | (optional) defaults to undefined|
| **deviceBrowsers** | [**string**] |  | (optional) defaults to undefined|
| **deviceOSs** | [**string**] |  | (optional) defaults to undefined|
| **deviceTypes** | [**string**] |  | (optional) defaults to undefined|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **referrer** | [**string**] |  | (optional) defaults to undefined|
| **sessionID** | [**string**] | filters | (optional) defaults to undefined|
| **type** | [**string**] |  | (optional) defaults to undefined|
| **types** | [**string**] |  | (optional) defaults to undefined|
| **userID** | [**string**] |  | (optional) defaults to undefined|
| **userTypes** | [**string**] |  | (optional) defaults to undefined|


### Return type

**EventsEventsResponse**

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

