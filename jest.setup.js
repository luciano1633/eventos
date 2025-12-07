const { TextEncoder, TextDecoder } = require('util')
const { ReadableStream, TransformStream, WritableStream } = require('stream/web')
const { MessageChannel } = require('worker_threads')
require('broadcastchannel-polyfill')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream
global.TransformStream = TransformStream
global.WritableStream = WritableStream
global.MessageChannel = MessageChannel
