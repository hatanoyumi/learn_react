const useGalleryController = <T>({ data, currentIndex, setIndex }: Props<T>) => {
  const end = data.length - 1;

  const next = () => {
    if (currentIndex === end) return;
    const nextActiveIndex = currentIndex + 1;
    setIndex(nextActiveIndex);
  };

  const prev = () => {
    if (currentIndex === 0) return;
    const prevActiveIndex = currentIndex - 1;
    setIndex(prevActiveIndex);
  };

  const goToId = (id: string) => {
    const idx = data.findIndex((it) => it.id === id);
    if (idx === -1) return;

    setIndex(idx);
  };

  return {
    next,
    prev,
    goToId,
  };
};

export default useGalleryController;

type Props<T> = {
  data: (T & { id: string })[];
  currentIndex: number;
  setIndex: (index: number) => void;
};
