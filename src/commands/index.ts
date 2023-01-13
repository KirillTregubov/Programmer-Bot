import { Command } from '../lib/types'
import Apply from './apply.js'
import Adopt from './adopt.js'
import Ping from './ping.js'

export const Commands: Command[] = [Adopt, Apply, Ping]

export default Commands
