# OrganizationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**archiveOrganization**](#archiveorganization) | **DELETE** /api/v1/organizations/{id} | Archive|
|[**cancelOrganizationSubscription**](#cancelorganizationsubscription) | **DELETE** /api/v1/organizations/{id}/billing | Cancel subscription|
|[**createOrganization**](#createorganization) | **POST** /api/v1/organizations | Create|
|[**createOrganizationCheckoutSession**](#createorganizationcheckoutsession) | **POST** /api/v1/organizations/{id}/billing/session | Create checkout session|
|[**getOrganizationInvitations**](#getorganizationinvitations) | **GET** /api/v1/organizations/{id}/invitations | Get invitations in organization|
|[**getOrganizationUpcomingInvoice**](#getorganizationupcominginvoice) | **GET** /api/v1/organizations/{id}/billing/invoice | Get upcoming invoice|
|[**getOrganizationUsers**](#getorganizationusers) | **GET** /api/v1/organizations/{id}/users | Get users in a organization|
|[**getUserOrganizations**](#getuserorganizations) | **GET** /api/v1/organizations/mine | GetFromUser|
|[**removeOrganizationStatsSubscription**](#removeorganizationstatssubscription) | **DELETE** /api/v1/organizations/{id}/billing/stats | Remove stats subscription|
|[**updateOrganization**](#updateorganization) | **PATCH** /api/v1/organizations/{id} | Update|
|[**updateOrganizationStatsSubscription**](#updateorganizationstatssubscription) | **PUT** /api/v1/organizations/{id}/billing/stats | Add or update stats subscription|

# **archiveOrganization**
> OrganizationResponse archiveOrganization()

Archive one organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.archiveOrganization(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**OrganizationResponse**

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

# **cancelOrganizationSubscription**
> OrganizationResponse cancelOrganizationSubscription()

Cancels the entire organization subscription at period end

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.cancelOrganizationSubscription(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**OrganizationResponse**

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

# **createOrganization**
> OrganizationCreateResponse createOrganization(request)

Create new organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration,
    OrganizationCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let request: OrganizationCreateRequest; //Create organization body

const { status, data } = await apiInstance.createOrganization(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **OrganizationCreateRequest**| Create organization body | |


### Return type

**OrganizationCreateResponse**

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

# **createOrganizationCheckoutSession**
> OrganizationCreateCheckoutSessionResponse createOrganizationCheckoutSession()

Creates a Stripe Checkout Session to set up a subscription for the organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.createOrganizationCheckoutSession(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**OrganizationCreateCheckoutSessionResponse**

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

# **getOrganizationInvitations**
> Array<ResponseInvitation> getOrganizationInvitations()

Gets all the invitations associated to a given organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.getOrganizationInvitations(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**Array<ResponseInvitation>**

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

# **getOrganizationUpcomingInvoice**
> OrganizationUpcomingInvoiceResponse getOrganizationUpcomingInvoice()

Returns the upcoming invoice for the organization\'s subscription, including line items and discounts

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.getOrganizationUpcomingInvoice(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**OrganizationUpcomingInvoiceResponse**

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

# **getOrganizationUsers**
> Array<ResponseUser> getOrganizationUsers()

Get users in a given organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)

const { status, data } = await apiInstance.getOrganizationUsers(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Organization ID | defaults to undefined|


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

# **getUserOrganizations**
> Array<OrganizationResponse> getUserOrganizations()

Gets all the organization to which the user has access

### Example

```typescript
import {
    OrganizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

const { status, data } = await apiInstance.getUserOrganizations();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<OrganizationResponse>**

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

# **removeOrganizationStatsSubscription**
> ProjectResponse removeOrganizationStatsSubscription(request)

Removes the stats subscription item for a project

### Example

```typescript
import {
    OrganizationApi,
    Configuration,
    OrganizationRemoveStatsSubscriptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)
let request: OrganizationRemoveStatsSubscriptionRequest; //Subscription params

const { status, data } = await apiInstance.removeOrganizationStatsSubscription(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **OrganizationRemoveStatsSubscriptionRequest**| Subscription params | |
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**ProjectResponse**

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

# **updateOrganization**
> OrganizationResponse updateOrganization(request)

Update one organization

### Example

```typescript
import {
    OrganizationApi,
    Configuration,
    OrganizationUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)
let request: OrganizationUpdateRequest; //Update organization body

const { status, data } = await apiInstance.updateOrganization(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **OrganizationUpdateRequest**| Update organization body | |
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**OrganizationResponse**

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

# **updateOrganizationStatsSubscription**
> ProjectResponse updateOrganizationStatsSubscription(request)

Adds or updates the stats subscription item for a project to a new tier/quota

### Example

```typescript
import {
    OrganizationApi,
    Configuration,
    OrganizationUpdateStatsSubscriptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new OrganizationApi(configuration);

let id: string; //Organization ID (default to undefined)
let request: OrganizationUpdateStatsSubscriptionRequest; //Subscription params

const { status, data } = await apiInstance.updateOrganizationStatsSubscription(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **OrganizationUpdateStatsSubscriptionRequest**| Subscription params | |
| **id** | [**string**] | Organization ID | defaults to undefined|


### Return type

**ProjectResponse**

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

