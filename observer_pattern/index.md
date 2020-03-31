# Observer Pattern
## Summary
- What is a design pattern ?
- What is Observer pattern ?
- How useful is the Observer pattern ?

```kt

abstract class Observer<T> {
  val listeners: ArrayList<ObserverListener> = ArrayList()
  abstract fun setValue (value: T)
  fun notify (value: T) {
    listeners.forEach { listener -> listener.onChanged(value) }
  }
  
  fun observer (listener: ObserverListener) {
    this.listeners.add(listener)
  }

  interface ObserverListener<T> {
    fun onChanged(value: T)
  } 
}
class Counter: Observer<Int> {
  var counter: Int
  override setValue (value: Int) {
      counter = value
      notify(value)
  }
}
```
