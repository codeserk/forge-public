# OrganizationUpcomingInvoiceResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currency** | **string** |  | [optional] [default to undefined]
**discounts** | [**Array&lt;OrganizationInvoiceDiscountResponse&gt;**](OrganizationInvoiceDiscountResponse.md) |  | [optional] [default to undefined]
**lineItems** | [**Array&lt;OrganizationInvoiceLineItemResponse&gt;**](OrganizationInvoiceLineItemResponse.md) |  | [optional] [default to undefined]
**periodEnd** | **string** |  | [optional] [default to undefined]
**periodStart** | **string** |  | [optional] [default to undefined]
**subtotal** | **number** |  | [optional] [default to undefined]
**total** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { OrganizationUpcomingInvoiceResponse } from './api';

const instance: OrganizationUpcomingInvoiceResponse = {
    currency,
    discounts,
    lineItems,
    periodEnd,
    periodStart,
    subtotal,
    total,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
