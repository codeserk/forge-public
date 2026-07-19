# DatasourceUpdateDatasourceMetricRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cache** | [**DatasourceDatasourceMetricCacheRequest**](DatasourceDatasourceMetricCacheRequest.md) |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**displayKind** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**persistence** | [**DatasourceDatasourceMetricPersistenceRequest**](DatasourceDatasourceMetricPersistenceRequest.md) |  | [optional] [default to undefined]
**query** | [**DatasourceDatasourceMetricQueryRequest**](DatasourceDatasourceMetricQueryRequest.md) |  | [default to undefined]
**resolution** | **string** |  | [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**unit** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DatasourceUpdateDatasourceMetricRequest } from './api';

const instance: DatasourceUpdateDatasourceMetricRequest = {
    cache,
    description,
    displayKind,
    name,
    persistence,
    query,
    resolution,
    tags,
    unit,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
