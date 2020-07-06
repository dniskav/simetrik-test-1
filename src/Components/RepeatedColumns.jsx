import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Input, Checkbox } from 'antd';
import { Context } from '../Contexts/context';

const RepeatedColumns = ({ data = [], list = 1 }) => {
    const [info, setInfo] = useState([]);
    const [columnsHeaders, setColumnsHeaders] = useState([]);
    const [filteredColumnsHeaders, setFilteredColumnsHeaders] = useState([]);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        setInfo(() => [...data]);
    }, [data]);

    useEffect(() => {
        if (info[0]) {
            setColumnsHeaders(() =>
                Object.keys(info[0]).map((k) => ({ label: k, value: k })),
            );
        }
    }, [info]);

    useEffect(() => {
        setFilteredColumnsHeaders(() => columnsHeaders);
    }, [columnsHeaders]);

    const filterColumnName = (e) => {
        const { value } = e.target;
        if (value.length > 2) {
            setFilteredColumnsHeaders(() =>
                columnsHeaders.filter((header) => header.label.includes(value)),
            );
        } else {
            setFilteredColumnsHeaders(() => columnsHeaders);
        }
    };

    const onChange = (res) => {
        dispatch({ type: `SET_LIST_${list}`, list1: res, list2: res });
    };

    return (
        <>
            <Input placeholder="Buscar Columna" onChange={filterColumnName} />
            <Checkbox.Group
                options={filteredColumnsHeaders}
                onChange={onChange}
            />
        </>
    );
};

export default RepeatedColumns;
