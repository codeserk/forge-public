# PersonalAccessTokensApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createPersonalAccessToken**](#createpersonalaccesstoken) | **POST** /api/v1/personal-access-tokens | Create a personal access token|
|[**listPersonalAccessTokens**](#listpersonalaccesstokens) | **GET** /api/v1/personal-access-tokens | List personal access tokens|
|[**revokePersonalAccessToken**](#revokepersonalaccesstoken) | **DELETE** /api/v1/personal-access-tokens/{id} | Revoke a personal access token|

# **createPersonalAccessToken**
> PatCreateResponse createPersonalAccessToken(request)

Generates a new PAT for the current user. The sdkKey is returned once and never again.

### Example

```typescript
import {
    PersonalAccessTokensApi,
    Configuration,
    PatCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalAccessTokensApi(configuration);

let request: PatCreateRequest; //Create PAT request

const { status, data } = await apiInstance.createPersonalAccessToken(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **PatCreateRequest**| Create PAT request | |


### Return type

**PatCreateResponse**

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
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listPersonalAccessTokens**
> Array<PatResponse> listPersonalAccessTokens()

Returns all PATs owned by the current user. Plaintext is never returned.

### Example

```typescript
import {
    PersonalAccessTokensApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalAccessTokensApi(configuration);

const { status, data } = await apiInstance.listPersonalAccessTokens();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PatResponse>**

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
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **revokePersonalAccessToken**
> string revokePersonalAccessToken()

Marks the token as revoked. Once revoked it can no longer authenticate.

### Example

```typescript
import {
    PersonalAccessTokensApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalAccessTokensApi(configuration);

let id: string; //PAT ID (default to undefined)

const { status, data } = await apiInstance.revokePersonalAccessToken(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | PAT ID | defaults to undefined|


### Return type

**string**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

