import { createStorage as create, CreateStorageParams } from './storageCache'
import {
  enableStorageEncryption,
  DEFAULT_CACHE_TIME,
} from '/@/config/encryptionSetting'
import defaultConfig from '/@/config/defaultSettings'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // No encryption in debug mode
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: defaultConfig.StoragePrefix,
    ...options,
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {},
) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  })
}

export default WebStorage
