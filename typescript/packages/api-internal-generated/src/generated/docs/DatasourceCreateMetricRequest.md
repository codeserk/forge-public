# DatasourceCreateMetricRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cache** | [**DatasourceDatasourceMetricCacheDTO**](DatasourceDatasourceMetricCacheDTO.md) |  | [optional] [default to undefined]
**datasourceID** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**displayKind** | **string** |  | [default to undefined]
**kind** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**organizationID** | **string** |  | [default to undefined]
**persistence** | [**DatasourceDatasourceMetricPersistenceDTO**](DatasourceDatasourceMetricPersistenceDTO.md) |  | [optional] [default to undefined]
**projectID** | **string** |  | [default to undefined]
**query** | [**DatasourceDatasourceMetricQueryDTO**](DatasourceDatasourceMetricQueryDTO.md) |  | [optional] [default to undefined]
**resolution** | **string** |  | [default to undefined]
**slug** | **string** |  | [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**unit** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DatasourceCreateMetricRequest } from './api';

const instance: DatasourceCreateMetricRequest = {
    cache,
    datasourceID,
    description,
    displayKind,
    kind,
    name,
    organizationID,
    persistence,
    projectID,
    query,
    resolution,
    slug,
    tags,
    unit,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
