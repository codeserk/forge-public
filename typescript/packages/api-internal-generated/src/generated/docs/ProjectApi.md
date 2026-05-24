# ProjectApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**archiveProject**](#archiveproject) | **DELETE** /api/v1/projects/{id} | Archive|
|[**createProject**](#createproject) | **POST** /api/v1/projects | Create|
|[**createProjectClient**](#createprojectclient) | **POST** /api/v1/projects/{id}/clients | CreateProjectClient|
|[**deleteProjectClient**](#deleteprojectclient) | **DELETE** /api/v1/projects/{id}/clients/{clientID} | DeleteProjectClient|
|[**getProjectUsers**](#getprojectusers) | **GET** /api/v1/projects/{id}/users | Get users in a project|
|[**getUserProjects**](#getuserprojects) | **GET** /api/v1/projects/mine | GetFromUser|
|[**restoreProject**](#restoreproject) | **POST** /api/v1/projects/{id}/restore | Restore|
|[**updateProject**](#updateproject) | **PATCH** /api/v1/projects/{id} | Update|
|[**updateProjectClient**](#updateprojectclient) | **PATCH** /api/v1/projects/{id}/clients/{clientID} | UpdateProjectClient|
|[**updateProjectPublicSettings**](#updateprojectpublicsettings) | **PATCH** /api/v1/projects/{id}/public-settings | UpdatePublicSettings|
|[**updateStatsConfig**](#updatestatsconfig) | **PATCH** /api/v1/projects/{id}/stats-config | Update stats config|

# **archiveProject**
> ProjectResponse archiveProject()

Archive one project

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.archiveProject(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Project ID | defaults to undefined|


### Return type

**ProjectResponse**

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

# **createProject**
> ProjectCreateResponse createProject(request)

Create new project

### Example

```typescript
import {
    ProjectApi,
    Configuration,
    ProjectCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let request: ProjectCreateRequest; //Create project body

const { status, data } = await apiInstance.createProject(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ProjectCreateRequest**| Create project body | |


### Return type

**ProjectCreateResponse**

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

# **createProjectClient**
> ProjectResponse createProjectClient()

Create new project client

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.createProjectClient(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Project ID | defaults to undefined|


### Return type

**ProjectResponse**

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

# **deleteProjectClient**
> ProjectResponse deleteProjectClient()

Delete a project client

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)
let clientID: string; //Client ID (default to undefined)

const { status, data } = await apiInstance.deleteProjectClient(
    id,
    clientID
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Project ID | defaults to undefined|
| **clientID** | [**string**] | Client ID | defaults to undefined|


### Return type

**ProjectResponse**

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

# **getProjectUsers**
> Array<ResponseUser> getProjectUsers()

Get users in a given project

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.getProjectUsers(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Project ID | defaults to undefined|


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

# **getUserProjects**
> Array<ProjectResponse> getUserProjects()

Gets all the project to which the user has access

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

const { status, data } = await apiInstance.getUserProjects();
```

### Parameters
This endpoint does not have any parameters.


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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **restoreProject**
> ProjectResponse restoreProject()

Restore a previously archived project (clears archivedAt). The pending hard-delete task no-ops.

### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.restoreProject(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Project ID | defaults to undefined|


### Return type

**ProjectResponse**

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

# **updateProject**
> ProjectResponse updateProject(request)

Update one project

### Example

```typescript
import {
    ProjectApi,
    Configuration,
    ProjectUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)
let request: ProjectUpdateRequest; //Update project body

const { status, data } = await apiInstance.updateProject(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ProjectUpdateRequest**| Update project body | |
| **id** | [**string**] | Project ID | defaults to undefined|


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

# **updateProjectClient**
> ProjectResponse updateProjectClient(request)

Update a project client

### Example

```typescript
import {
    ProjectApi,
    Configuration,
    ProjectUpdateClientRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)
let clientID: string; //Client ID (default to undefined)
let request: ProjectUpdateClientRequest; //Update project client

const { status, data } = await apiInstance.updateProjectClient(
    id,
    clientID,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ProjectUpdateClientRequest**| Update project client | |
| **id** | [**string**] | Project ID | defaults to undefined|
| **clientID** | [**string**] | Client ID | defaults to undefined|


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

# **updateProjectPublicSettings**
> ProjectResponse updateProjectPublicSettings(request)

Update public settings of a project

### Example

```typescript
import {
    ProjectApi,
    Configuration,
    ProjectUpdatePublicSettingsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)
let request: ProjectUpdatePublicSettingsRequest; //Update project public settings body

const { status, data } = await apiInstance.updateProjectPublicSettings(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ProjectUpdatePublicSettingsRequest**| Update project public settings body | |
| **id** | [**string**] | Project ID | defaults to undefined|


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

# **updateStatsConfig**
> ProjectResponse updateStatsConfig(request)

Update stats config for a project, including aggregation dimensions.

### Example

```typescript
import {
    ProjectApi,
    Configuration,
    ProjectUpdateStatsConfigRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; //Project ID (default to undefined)
let request: ProjectUpdateStatsConfigRequest; //Update stats config body

const { status, data } = await apiInstance.updateStatsConfig(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ProjectUpdateStatsConfigRequest**| Update stats config body | |
| **id** | [**string**] | Project ID | defaults to undefined|


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

