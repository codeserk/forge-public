# InvitationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteInvitation**](#deleteinvitation) | **DELETE** /api/v1/invitations/{id} | Delete invitation|
|[**inviteUser**](#inviteuser) | **POST** /api/v1/invitations/invite | Invite user|

# **deleteInvitation**
> ResponseInvitation deleteInvitation()

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

