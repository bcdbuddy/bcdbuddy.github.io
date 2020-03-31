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
  
  fun observe (listener: ObserverListener) {
    this.listeners.add(listener)
  }

  interface ObserverListener<T> {
    fun onChanged(value: T)
  } 
}
class CounterObserver: Observer<Int> {
  var counter: Int
  override setValue (value: Int) {
      counter = value
      notify(value)
  }

  fun increment () {
    this.setValue(count + 1)
  }

  fun decrement () {
    this.setValue(count - 1)
  }
}

// usage
val counterObserver = CounterObserver()
counterObserver.observe(object: ObserverListener<Int> {
    override fun onChanged (value: Int) {
        // update UI
    }
})
```

Livedata as Observer that is lifecycle aware.
