import React, { useContext, useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import RepeatedColumns from './RepeatedColumns';
import SortedColumns from './SortedColumns';
import Store, { Context } from '../Contexts/context';

const ItemsHandler = ({ data }) => {
    const [state] = useContext(Context);
    const [output, setOutput] = useState({ leftBox: [], rightBox: [] });

    const resetData = () => {
        setOutput(() => ({ leftBox: [], rightBox: [] }));
    };

    const printData = () => {
        const rightBox = data.map((el) => {
            return state.selectedList.reduce((acum, item, ndx) => {
                acum[item] = el[item];
                return acum;
            }, {});
        });
        const leftBox = data.map((el) => {
            return state.list1.reduce((acum, item, ndx) => {
                acum[item] = el[item];
                return acum;
            }, {});
        });
        setOutput((output) => ({ ...output, rightBox, leftBox }));
    };
    return (
        <Card>
            <Row>
                <Col span={12}>
                    <Card title="¿Qué columnas se repiten?">
                        <RepeatedColumns data={data} list={1} />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="¿Como quieres ordenarlos?">
                        <Card>
                            <SortedColumns dataList={state.list2} />
                        </Card>

                        <Card>
                            <RepeatedColumns data={data} list={2} />
                        </Card>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <div
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                            }}>
                            <Button onClick={resetData}>Cancel</Button>
                            <Button type="primary" onClick={printData}>
                                OK
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <pre>{JSON.stringify(output, null, 2)}</pre>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default ({ data }) => (
    <Store>
        <ItemsHandler data={data} />
    </Store>
);
