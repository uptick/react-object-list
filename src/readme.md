# Instructions for porting over npm-list from workforce

## Snapshot testing
Insetad of
```javascript
import { snapshotTest } from 'utils/tests'


it('snapshots!', () => {
  snapshotTest(<div>This works!</div>)
})
```
Use
```javascript
import { snapshotTest } from 'utils/tests'
it('snapshots!', () => {
  snapshotTest(<div>This works!</div>)
})
```

## Generate CSS styling
Recommend to import css styles into the `index.js` file
```javascript
import './api-list.sass'
```
This will generate the complete styles in the `dist` folder when running `yarn build`
