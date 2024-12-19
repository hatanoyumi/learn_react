import { loadingMessageAtom, openLoadingAtom } from '@common/store/atom';
import { getDefaultStore } from 'jotai';

export const globalLoadingHandler = () => {
  const store = getDefaultStore();
  const setLoading = (bool: boolean) => store.set(openLoadingAtom, bool);
  const setMessage = (msg: string) => store.set(loadingMessageAtom, msg);

  return {
    openLoadingPopup(message?: string) {
      message ? setMessage(message) : null;
      return setLoading(true);
    },
    closeLoadingPopup() {
      setMessage('');
      return setLoading(false);
    },
    isLoadingOpen() {
      return store.get(openLoadingAtom);
    },
    getLoadingMessage() {
      return store.get(loadingMessageAtom);
    },
  };
};
