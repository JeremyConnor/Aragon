import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

app.store(
    /// event is the event from Web3
    async (state, { event }) => {
      const nextState = {
        ...state,
      }
  
      try {
        switch (event) {
          case 'Increment':
            return { ...nextState, count: await getValue() }
          case 'Decrement':
            return { ...nextState, count: await getValue() }
          case events.SYNC_STATUS_SYNCING:
            return { ...nextState, isSyncing: true }
          case events.SYNC_STATUS_SYNCED:
            return { ...nextState, isSyncing: false }
          default:
            return state
        }
      } catch (err) {
        console.log(err)
      }
    },
    {
      init: initializeState(),
    }
)

/***********************
 *   Event Handlers    *
 ***********************/

function initializeState() {
    return async cachedState => {
        return {
            ...cachedState,
            count: await getValue(),
        }
    }
}
  
async function getValue() {
    // Get current value from the contract by calling the public getter
    // app.call() returns a single-emission observable that we can immediately turn into a promise
    return parseInt(await app.call('value').toPromise(), 10)
}