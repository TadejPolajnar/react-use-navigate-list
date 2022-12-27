import { useCallback, useEffect, useMemo, useState } from 'react';

const getDeepValue = <T extends object, K extends keyof T>(
  obj: T,
  path = 'id'
) => {
  const pathArr = path.split('.');

  // @ts-ignore
  return pathArr.reduce((acc: T, key) => acc && acc[key], obj);
};

type useNavigateListProps<T, K extends keyof T> = {
  list: T[];
  onSelect: (item: T) => void;
  indexPath?: K;
  vertical?: boolean;
};

const useNavigateList = <T extends object, K extends keyof T>({
  list,
  onSelect,
  indexPath,
  vertical = true
}: useNavigateListProps<T, K>) => {
  const [cursor, setCursor] = useState(0);

  const prevItemKey = useMemo(
    () => (vertical ? 'ArrowUp' : 'ArrowLeft'),
    [vertical]
  );

  const nextItemKey = useMemo(
    () => (vertical ? 'ArrowDown' : 'ArrowRight'),
    [vertical]
  );

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === prevItemKey) {
        setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
      } else if (key === nextItemKey) {
        setCursor((prevState) =>
          prevState < list.length - 1 ? prevState + 1 : prevState
        );
      } else if (key === 'Enter') {
        onSelect(list[cursor] as T);
      }
    },
    [cursor, list, nextItemKey, prevItemKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]);

  const onHover = useCallback(
    (hoveredItem: T) => {
      setCursor(
        list.findIndex(
          (listItem) =>
            getDeepValue(listItem, indexPath as string) ===
            getDeepValue(hoveredItem, indexPath as string)
        )
      );
    },
    [indexPath, list]
  );

  return useMemo(
    () => ({
      activeIndex: cursor,
      itemProps: (item: T) => ({
        onMouseEnter: () => onHover(item),
        onClick: () => onSelect(item)
      })
    }),
    [cursor, onHover]
  );
};

export default useNavigateList;
