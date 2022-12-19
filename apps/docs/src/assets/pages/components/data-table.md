# Data Table

<app-references
issues="https://github.com/valentingavran/anglify/labels/component%3A%20Data%20Table"
material-design="https://material.io/components/data-tables"
w3c="https://www.w3.org/WAI/ARIA/apg/patterns/table/"/>

This component is used for displaying tabular data. Features include sorting, searching, pagination and row selection.

## Examples

### Multi sort

Using the `multiSort` prop will enable you to sort on multiple columns at the same time.
<app-code-example component="data-table" example="multi-sort"></app-code-example>

### Search

The data table exposes a `search` prop that allows you to filter your data.
<app-code-example component="data-table" example="search"></app-code-example>

### Filterable

You can easily disable specific columns from being included when searching through table rows by setting the property
`filterable` to false on the header item(s). In the example below the dessert name column is no longer searchable.
<app-code-example component="data-table" example="filterable"></app-code-example>

### Loading

You can use the loading prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the `loadingText` prop or the `loading` slot.

<app-code-example component="data-table" example="loading"></app-code-example>

### No Data

If there is no data and the Data Table is not in the loading state, then the empty state is displayed. The displayed message can be customized via the `noDataText` property or via the `no-data` slot.
<app-code-example component="data-table" example="no-data"></app-code-example>

### Header Slot

You can use the dynamic slots `header:<name>` to customize only certain columns. `<name>` is the name of
the value property in the corresponding header item sent to headers.
<app-code-example component="data-table" example="header-slot"></app-code-example>

### Item Slot

You can use the dynamic slots `item:<name>` to customize only certain columns. `<name>` is the name of
the value property in the corresponding header item sent to headers. So to customize the calories column we’re using the
`item:calories` slot.
<app-code-example component="data-table" example="item-slot"></app-code-example>

### Computed Content

The `computeContent` method can be used to manipulate the content of the respective column. The method receives the item as an argument.
<app-code-example component="data-table" example="computed-content"></app-code-example>

### Expandable Rows

<app-code-example component="data-table" example="expandable-rows"></app-code-example>

### Hide default header and footer

You can apply the `hideDefaultHeader` and `hideDefaultFooterProps` to remove the default header and footer
respectively.
<app-code-example component="data-table" example="hide-default-header-and-footer"></app-code-example>

### Selectable Rows

The `selectableRows` prop will render a checkbox in the default header to toggle all rows, and a checkbox for each default row.
You can switch between allowing multiple selected rows at the same time or just one with the `singleSelect` prop.
<app-code-example component="data-table" example="selectable-rows"></app-code-example>

### Complex data

<app-code-example component="data-table" example="complex-data"></app-code-example>

### Mobile Mode

The `mobile` property can be used to toggle the mobile view of the data table on and off. You can use the [Anglify Breakpoint Observer Service](/features/breakpoints) if you want to display this mode only on specific screen sizes.
<app-code-example component="data-table" example="mobile-mode"></app-code-example>

### Show Columns Control

With the `showColumnsControl` property you can add the columns button to the footer. This button enables you to show and hide individual columns. In the header config you can define the default hidden columns with the `hidden` property and for the mobile view you can use the `hiddenOnMobile` property.

The hidden columns in the mobile view are independent from the hidden columns in the normal view.
<app-code-example component="data-table" example="columns-control"></app-code-example>

## API

```typescript
import { DataTableComponent, SlotDirective } from '@anglify/components';
```

<app-inputs-table components="DataTableComponent" interfaces="DataTableHeader"></app-inputs-table>

<app-styling-table component="data-table"></app-styling-table>
