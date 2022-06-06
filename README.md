# JS Nation - AG Grid Angular Workshop

## Enterprise Features

So far everything we have seen has been part of the community package which is completely free to use in any situation. However, there are many more features available to AG Grid via the Enterprise version. 

To enable enterprise features first install the package.

```bash
npm install ag-grid-enterprise
```
Then add this import to your application to enable all the enterprise features.
```ts
import 'ag-grid-enterprise';
```

### Auto enabled Features

The following features are automatically enabled with Enterprise
  - Set Filter (see Country Column)
  - Context Menu (right click the grid)
    - Copy / Export
  - Column Header Menus

### Grouping and Aggregation

Now lets turn on a very popular feature of row grouping and aggregation. We will use the `rowGroupPanelShow` to enable the user to easily group our data.

```html
    <ag-grid-angular
    
      [rowGroupPanelShow]="'always'"
    >
    </ag-grid-angular>
```

Then we need to add the property `enableRowGroup` to all the columns that we want to allow the user to group by.

```ts
    {
      field: 'country',
      cellRenderer: CellComponent,
      cellRendererParams: {
        label: 'Country'
      },
      enableRowGroup: true,
    },
    {
      field: 'year',
      enableRowGroup: true
    },
```

Then for the medal columns it makes sense to provide an aggregation for the groups so we set that up as follows. Here we say to sum the values for the group. Other aggregations exist.

```ts
    {
      field: 'total',
      filter: 'agNumberColumnFilter',
      enableValue: true,
      aggFunc: 'sum'
    }
```

Now the columns with `enableRowGroup:true` can be dragged into the top bar and the grid will group rows by that column. See how the columns with aggregations setup show the aggregated value in the column.

(We may want to tweak our custom cell renderers from the previous steps to handle grouping)

## Enterprise Accessories

There are other features you may want to use.
  - Status Bar
  - Side Bar
    - Filter Tool Panel
    - Column Tool Panel
  - Integrated Charts
