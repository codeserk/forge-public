# InvitationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**acceptInvitation**](#acceptinvitation) | **POST** /api/v1/invitations/{id}/accept | Accept invitation|
|[**deleteInvitation**](#deleteinvitation) | **DELETE** /api/v1/invitations/{id} | Delete invitation|
|[**getInvitationByID**](#getinvitationbyid) | **GET** /api/v1/invitations/{id} | Get invitation by ID|
|[**getMyInvitations**](#getmyinvitations) | **GET** /api/v1/invitations/mine | Get my invitations|
|[**inviteUser**](#inviteuser) | **POST** /api/v1/invitations/invite | Invite user|
|[**rejectInvitation**](#rejectinvitation) | **POST** /api/v1/invitations/{id}/reject | Reject invitation|

# **acceptInvitation**
> ResponseInvitation acceptInvitation()

Accepts an invitation addressed to the authenticated user

### Example

```typescript
import {
    InvitationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

let id: string; //Invitation ID (default to undefined)

const { status, data } = await apiInstance.acceptInvitation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invitation ID | defaults to undefined|


### Return type

**ResponseInvitation**

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
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteInvitation**
> deleteInvitation()

Deletes an invitation

### Example

```typescript
import {
    InvitationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

let id: string; //Invitation ID (default to undefined)

const { status, data } = await apiInstance.deleteInvitation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invitation ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** |  |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInvitationByID**
> ResponseInvitation getInvitationByID()

Returns the invitation if it is addressed to the authenticated user

### Example

```typescript
import {
    InvitationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

let id: string; //Invitation ID (default to undefined)

const { status, data } = await apiInstance.getInvitationByID(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invitation ID | defaults to undefined|


### Return type

**ResponseInvitation**

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

# **getMyInvitations**
> Array<ResponseInvitation> getMyInvitations()

Returns pending invitations addressed to the authenticated user

### Example

```typescript
import {
    InvitationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

const { status, data } = await apiInstance.getMyInvitations();
```

### Parameters
This endpoint does not have any parameters.


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
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **inviteUser**
> ResponseInvitation inviteUser(request)

Sends invitation to user via e-mail

### Example

```typescript
import {
    InvitationsApi,
    Configuration,
    InvitationInviteUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

let request: InvitationInviteUserRequest; //Get users request

const { status, data } = await apiInstance.inviteUser(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **InvitationInviteUserRequest**| Get users request | |


### Return type

**ResponseInvitation**

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

# **rejectInvitation**
> ResponseInvitation rejectInvitation()

Rejects an invitation addressed to the authenticated user

### Example

```typescript
import {
    InvitationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitationsApi(configuration);

let id: string; //Invitation ID (default to undefined)

const { status, data } = await apiInstance.rejectInvitation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invitation ID | defaults to undefined|


### Return type

**ResponseInvitation**

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
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

