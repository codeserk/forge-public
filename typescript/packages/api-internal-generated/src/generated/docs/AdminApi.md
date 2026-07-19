# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminListOrganizations**](#adminlistorganizations) | **GET** /api/v1/admin/organizations | Admin list organizations|
|[**adminListProjects**](#adminlistprojects) | **GET** /api/v1/admin/projects | Admin list projects|
|[**adminListUsers**](#adminlistusers) | **GET** /api/v1/admin/users | Admin search users|

# **adminListOrganizations**
> Array<OrganizationResponse> adminListOrganizations()

Cross-tenant listing of all organizations. Admin-only.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let name: string; //Filter by name (substring, case-insensitive) (optional) (default to undefined)

const { status, data } = await apiInstance.adminListOrganizations(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] | Filter by name (substring, case-insensitive) | (optional) defaults to undefined|


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminListProjects**
> Array<ProjectResponse> adminListProjects()

Cross-tenant listing of all projects. Admin-only.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let organizationID: string; //Filter by organization id (optional) (default to undefined)

const { status, data } = await apiInstance.adminListProjects(
    organizationID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **organizationID** | [**string**] | Filter by organization id | (optional) defaults to undefined|


### Return type

**Array<ProjectResponse>**

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

# **adminListUsers**
> Array<ResponseUser> adminListUsers()

Cross-tenant user search by name or email. Admin-only. Distinct from /api/v1/users which scopes by org/project.

### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let name: string; //Filter by name (substring, case-insensitive) (optional) (default to undefined)
let email: string; //Filter by email (substring, case-insensitive) (optional) (default to undefined)

const { status, data } = await apiInstance.adminListUsers(
    name,
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] | Filter by name (substring, case-insensitive) | (optional) defaults to undefined|
| **email** | [**string**] | Filter by email (substring, case-insensitive) | (optional) defaults to undefined|


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

