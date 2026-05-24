# SessionsSessionResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**country** | **string** |  | [optional] [default to undefined]
**duration** | **number** |  | [optional] [default to undefined]
**eventsTotal** | **number** |  | [default to undefined]
**firstEvent** | [**SessionsSessionEventResponse**](SessionsSessionEventResponse.md) |  | [optional] [default to undefined]
**firstEventAt** | **string** |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**isBounce** | **boolean** |  | [optional] [default to undefined]
**lastEvent** | [**SessionsSessionEventResponse**](SessionsSessionEventResponse.md) |  | [optional] [default to undefined]
**lastEventAt** | **string** |  | [default to undefined]
**user** | [**SessionsSessionUserResponse**](SessionsSessionUserResponse.md) |  | [default to undefined]
**userID** | **string** |  | [default to undefined]

## Example

```typescript
import { SessionsSessionResponse } from './api';

const instance: SessionsSessionResponse = {
    country,
    duration,
    eventsTotal,
    firstEvent,
    firstEventAt,
    id,
    isBounce,
    lastEvent,
    lastEventAt,
    user,
    userID,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
