import { useEffect, useMemo, useState, useCallback } from 'react';

const getDeepValue = (obj, path) => {
    const paths = path.split('.');
    let current = obj;

    for (let i = 0; i < paths.length; ++i) {
        if (current[paths[i]] === undefined) {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }
    return current;
};

const useNavigateList = ({
  list,
  indexPath = 'id',
  vertical = true
}) => {
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
        ({ key }) => {
            if (key === prevItemKey) {
                setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
            } else if (key === nextItemKey) {
                setCursor((prevState) =>
                    prevState < list.length - 1 ? prevState + 1 : prevState
                );
            } else if (key === 'Enter') {
                console.log(list[cursor]);
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
        (hoveredItem) => {
            setCursor(
                list.findIndex(
                    (listItem) =>
                        getDeepValue(listItem, indexPath) ===
                        getDeepValue(hoveredItem, indexPath)
                )
            );
        },
        [indexPath, list]
    );

    return useMemo(
        () => ({
            activeIndex: cursor,
            itemProps: (item) => ({
                onMouseEnter: () => onHover(item)
            })
        }),
        [cursor, onHover]
    );
};


export default useNavigateList

//wsl$/Ubuntu/home/tadpol/github/react-use-navigate-list/react-use-navigate-list-0.0.1.tgz