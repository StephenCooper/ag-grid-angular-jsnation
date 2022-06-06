# JS Nation - AG Grid Angular Workshop

## Cell Styling

Add cell class to columns.

```ts
    { field: 'gold', cellClass: 'medal-gold' },
    { field: 'silver', cellClass: 'medal-silver' },
    { field: 'bronze', cellClass: 'medal-bronze' },
```

Styles in styles.scss.

```css
.medal-gold {
    background-color: gold;
}

.medal-silver {
    background-color: silver;
}

.medal-bronze {
    background-color: orange;
}
```

If you want the styles in the app.component.ts file then you will need to change the components encapsulation property to `ViewEncapsulation.None`.

### Conditional Cell Styling 

Now only style the cells where medals have been won. There are a number of ways to achieve this with either making `cellClass` a function or using the `cellClassRules` property.

```ts
{
      field: 'gold',
      cellClass: (params: CellClassParams) => params.data.gold > 0 ? 'medal-gold' : null
    },
    {
      field: 'silver',
      cellClassRules: {
        'medal-silver': (params: CellClassParams) => params.data.silver > 0
      }
    },
    {
      field: 'bronze',
      // Short hand format where x gives the column value
      cellClassRules: {
        'medal-bronze': 'x > 0'
      }
    },
```
More styling details in the [documentation](https://ag-grid.com/angular-data-grid/cell-styles/#cell-style-cell-class--cell-class-rules-params).
