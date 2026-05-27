# InsightsEvaluateQueryRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**aggregations** | [**Array&lt;InsightsEvaluateAggregationRequest&gt;**](InsightsEvaluateAggregationRequest.md) |  | [default to undefined]
**breakdownKeys** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**compareToPrevious** | **boolean** |  | [optional] [default to undefined]
**conditions** | [**Array&lt;InsightsEvaluateConditionRequest&gt;**](InsightsEvaluateConditionRequest.md) |  | [optional] [default to undefined]
**eventType** | **string** |  | [default to undefined]
**from** | **string** |  | [default to undefined]
**granularity** | **string** |  | [optional] [default to undefined]
**projectID** | **string** |  | [default to undefined]
**to** | **string** |  | [default to undefined]

## Example

```typescript
import { InsightsEvaluateQueryRequest } from './api';

const instance: InsightsEvaluateQueryRequest = {
    aggregations,
    breakdownKeys,
    compareToPrevious,
    conditions,
    eventType,
    from,
    granularity,
    projectID,
    to,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
