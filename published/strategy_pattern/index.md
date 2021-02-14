# Strategy pattern

## Summary
- Definitions
- Usage

## Definitions
TODO:

## Without strategy pattern
```typescript
    // Don't do this
    const main = async (processor, order) => {
        if (processor === 'coinbase') {
          withCoinbase(order)
        } else if (processor === 'paypal') {
          withPayPal(order)
        } else if (processor === 'payexpress') {
          withPayExpress(order)
        } else {
          throw new Error({ message: `Processor '${processor}' is unknown to checkout method.` })
        }
    }
```

## With strategy pattern
- Define different use cases
```typescript
  const withCoinbase = (order: IOrder): Promise<ICheckout> => {
    return new Promise(async (resolve, reject) => {
      // do something
    })
  }

  const withPayExpress (order: IOrder): Promise<ICheckout> => {
    return new Promise(async (resolve, reject) => {
      // do something
    })
  }

  const withPayPal (order: IOrder): Promise<ICheckout> {
    return new Promise((resolve, reject) => {
      // do something
    })
  }
```

- Define strategies
```typescript
  const getStrategies = (): {processor: string, handler: (order:IOrder) => void}[] => {
    return [
      { processor: 'coinbase', handler: withCoinbase },
      { processor: 'paypal', handler: withPayPal },
      { processor: 'payexpress', handler: withPayExpress }
    ]
  }
```

- Use it in your main function as follow
```typescript
    const main = async (processor) => {
        const strategy = getStrategies().find(strategy => strategy.processor === processor)
        if (!strategy) {
          throw new Error({ message: `Processor '${processor}' is unknown to checkout method.` })
        }
        const checkout = await strategy.handler(order)
    }
```

## Full source code
```typescript
    // Define handlers
    const withCoinbase = (order: IOrder): Promise<ICheckout> => {
        return new Promise(async (resolve, reject) => {
          // do something
        })
    }

    const withPayExpress (order: IOrder): Promise<ICheckout> => {
        return new Promise(async (resolve, reject) => {
        // do something
        })
    }


    const withPayPal (order: IOrder): Promise<ICheckout> {
        return new Promise((resolve, reject) => {
        // do something
        })
    }

    // Define strategies with handlers
    const getStrategies = (): {processor: string, handler: (order) => void}[] => {
        return [
          { processor: 'coinbase', handler: withCoinbase },
          { processor: 'paypal', handler: withPayPal },
          { processor: 'payexpress', handler: withPayExpress }
        ]
    }

    // Simpler usage in main
    const main = async (processor): Promise<ICheckout> => {
        const strategy = getStrategies().find(strategy => strategy.processor === processor)
        if (!strategy) {
          throw new Error({ message: `Processor '${processor}' is unknown to checkout method.` })
        }
        return strategy.handler(order)
    }
```

## Another example: security policies
```typescript

const userAgentChanged = ({ userAgent, token }) => ({
  test: () => {
    return userAgent && token.user_agent !== userAgent
  },
  execute: () => {
    // should not be possible so deny access
    console.log('user agent changed from %o to %o', token.user_agent, userAgent)
    throw new AuthenticationException({
      message: `We're detecting awkward account activity. Resetting your current session for security concern.`,
    })
  }
})

const userIpChanged = ({ ip, token }) => ({
  test: () => {
    return ip && token.ip !== ip
  },
  execute: () => {
    // IP can change because of network change
    console.log('[security] IP changed from %o to %o', token.ip, ip)
  }
})

const userIpAndUserAgentChanged = ({ ip, userAgent, token }) => ({
  test: () => {
    return userAgent && ip && token.user_agent !== userAgent && token.ip !== ip
  },
  execute: () => {
    // TODO: should lock. Same as when velocity change is too big
    console.log('[security] IP & user agent changed')
  }
})


const userVelocityCheck = ({ ip, token }): SecurityStrategy => ({
  test: () => {
    // if velocity > 300km in the last 1h then flag deny access
    // TODO
    return false
  },
  execute: () => {
    // TODO: calculate velocity = delta(currentLocation - previousLocation)
  }
})

const securityChecks = (options, strategies) => {
  const {token, ip, userAgent} = options
  for (const strategy of strategies) {
    if (strategy.test()) {
      strategy.execute()
    }
  }
}
```


## Tweet
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">✨✨✨ Strategy pattern ✨✨✨<br><br>- can make your code look nicer ✅<br>- allows you to focus on abstraction ✅<br><br>Comprehension is key to turn lines of code 💻into business results 💰!<br><br>Full source code below <br>👇🏾👇🏾👇🏾 <a href="https://t.co/2bdaXd8oPm">pic.twitter.com/2bdaXd8oPm</a></p>&mdash; Optimus Debugger✨ (@babacarcissedia) <a href="https://twitter.com/babacarcissedia/status/1262196429843546114?ref_src=twsrc%5Etfw">May 18, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
