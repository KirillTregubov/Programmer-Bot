import { Command } from '../lib/types'
import ping from './ping.js'
import adopt from './adopt.js'

export const Commands: Command[] = [adopt, ping]

export default Commands
