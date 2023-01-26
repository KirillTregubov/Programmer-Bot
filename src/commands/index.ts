import { Command } from '../lib/types'
import Apply from './apply.js'
import ApplyList from './applylist.js'
import Adopt from './adopt.js'
import Ping from './ping.js'

export const Commands: Command[] = [Adopt, ApplyList, Apply, Ping]

export default Commands
