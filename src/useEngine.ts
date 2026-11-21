import { useSyncExternalStore } from 'react';
import { getState, subscribe } from './audio/engine';

/** Re-renders when deck play state or BPM changes. */
export const useEngine = () => useSyncExternalStore(subscribe, getState);
