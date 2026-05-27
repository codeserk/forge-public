# InsightsUpdateQueryRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**aggregations** | [**Array&lt;InsightsCreateAggregationRequest&gt;**](InsightsCreateAggregationRequest.md) |  | [default to undefined]
**breakdownKeys** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**conditions** | [**Array&lt;InsightsCreateConditionRequest&gt;**](InsightsCreateConditionRequest.md) |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**eventType** | **string** |  | [default to undefined]
**granularity** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**pinned** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { InsightsUpdateQueryRequest } from './api';

const instance: InsightsUpdateQueryRequest = {
    aggregations,
    breakdownKeys,
    conditions,
    description,
    eventType,
    granularity,
    name,
    pinned,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
