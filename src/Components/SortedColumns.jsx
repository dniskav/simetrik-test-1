import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useContext,
} from 'react';
import { Table } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
    SortAscendingOutlined,
    SortDescendingOutlined,
} from '@ant-design/icons';
import { Context } from '../Contexts/context';

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
}) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName:
                    dragIndex < index
                        ? ' drop-over-downward'
                        : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
    },
];

const DragSortingTable = ({ dataList }) => {
    const [data, setData] = useState([]);
    const [state, dispatch] = useContext(Context);
    const components = {
        body: {
            row: DragableBodyRow,
        },
    };

    useEffect(() => {
        if (dataList[0]) {
            setData(() =>
                dataList.map((k) => ({
                    key: k,
                    name: k,
                    icon: (
                        <>
                            <SortAscendingOutlined /> <SortDescendingOutlined />
                        </>
                    ),
                })),
            );
            dispatch({ type: 'SET_SELECTED_LIST', selectedList: dataList });
        }
    }, [dataList]);

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = data[dragIndex];
            const dt = update(data, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                ],
            });
            setData(dt);
            dispatch({ type: 'SET_SELECTED_LIST', selectedList: dt.map(r => r.name) });
        },
        [data, state.selectedList],
    );

    const manager = useRef(RNDContext);

    return (
        <DndProvider manager={manager.current.dragDropManager}>
            <Table
                columns={columns}
                dataSource={data}
                components={components}
                onRow={(record, index) => ({
                    index,
                    moveRow,
                })}
            />
        </DndProvider>
    );
};

export default DragSortingTable;
