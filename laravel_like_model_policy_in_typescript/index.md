# Laravel like model policy in Typescript

- permissions: add, edit, delete, view, view all
- used for this project: https://neptune-store.now.sh


## Conception
- class with static methods representing a permission (or action)
  * take authUser and the resource as parameters
  * would have loved it be static but seems like static can't be type ts`AppPolicy <U, T>`. Any way around? please let me know in the comments below

```ts
class AppPolicy<U,T> {
  view (user: U, T)
}
```