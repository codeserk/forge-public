# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCurrentUser**](#getcurrentuser) | **GET** /api/v1/auth/me | Current user|
|[**login**](#login) | **POST** /api/v1/auth/login | Login|
|[**register**](#register) | **POST** /api/v1/auth/register | Register|
|[**sendVerifyEmail**](#sendverifyemail) | **POST** /api/v1/auth/send-verify-email | Send verify email|
|[**updateCurrentUser**](#updatecurrentuser) | **POST** /api/v1/auth/me | Update current user|
|[**verifyEmail**](#verifyemail) | **POST** /api/v1/auth/verify-email | Verify email|

# **getCurrentUser**
> ResponseUser getCurrentUser()

Gets current user, if logged in

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.getCurrentUser();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ResponseUser**

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

# **login**
> AuthLoginResponse login(request)

Login using credentials

### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let request: AuthLoginRequest; //Login request body

const { status, data } = await apiInstance.login(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **AuthLoginRequest**| Login request body | |


### Return type

**AuthLoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **register**
> AuthLoginResponse register(request)

Register using email and credentials

### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let request: AuthRegisterRequest; //Register request body

const { status, data } = await apiInstance.register(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **AuthRegisterRequest**| Register request body | |


### Return type

**AuthLoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sendVerifyEmail**
> sendVerifyEmail()

Re-sends the verification email

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.sendVerifyEmail();
```

### Parameters
This endpoint does not have any parameters.


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
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateCurrentUser**
> ResponseUser updateCurrentUser(request)

Updates the logged in user

### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthUpdateUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let request: AuthUpdateUserRequest; //Update user request

const { status, data } = await apiInstance.updateCurrentUser(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **AuthUpdateUserRequest**| Update user request | |


### Return type

**ResponseUser**

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

# **verifyEmail**
> ResponseUser verifyEmail(request)

Verifies the user email

### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthVerifyEmailRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let request: AuthVerifyEmailRequest; //Verify email request body

const { status, data } = await apiInstance.verifyEmail(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **AuthVerifyEmailRequest**| Verify email request body | |


### Return type

**ResponseUser**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

