import { eq } from './eq'
import { truthy } from './truthy'
import { promise } from './promises'
import { json } from './json'
import { writable } from './writable'
import { email } from './everyday'
import { link, ipv4, hex } from './everyday'

function likely(a: any, b: any): boolean {
  return eq(a, b)
}

likely.eq = eq
likely.truthy = truthy
likely.promise = promise
likely.json = json
likely.writable = writable
likely.email = email
likely.link = link
likely.ipv4 = ipv4
likely.hex = hex

export { likely }
