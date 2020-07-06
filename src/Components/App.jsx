import React from 'react';
import { Layout } from 'antd';
import ItemsHandler from './ItemsHandler';
import styled from 'styled-components';
import data from '../testData';

const { Header, Footer, Content } = Layout;

const MainWrapper = styled(Layout)`
    width: 720px;
    margin: 0 auto;
`;

const App = () => (
    <MainWrapper>
        <Header></Header>
        <Content>
            <ItemsHandler data={data} />
        </Content>
        <Footer>By <a href="mailto:dniskav@gmail.com" rel="noopener noreferrer" target="_blank">dniskav@gmail.com</a></Footer>
    </MainWrapper>
);

export default App;
