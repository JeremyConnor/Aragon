import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

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