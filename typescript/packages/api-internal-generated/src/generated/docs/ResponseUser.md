# ResponseUser


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**createdAt** | **string** |  | [default to undefined]
**email** | **string** |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**isEmailVerified** | **boolean** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**organizations** | [**Array&lt;ResponseUserOrganization&gt;**](ResponseUserOrganization.md) |  | [optional] [default to undefined]
**projects** | [**Array&lt;ResponseUserProject&gt;**](ResponseUserProject.md) |  | [optional] [default to undefined]
**role** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]

## Example

```typescript
import { ResponseUser } from './api';

const instance: ResponseUser = {
    createdAt,
    email,
    id,
    isEmailVerified,
    name,
    organizations,
    projects,
    role,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
