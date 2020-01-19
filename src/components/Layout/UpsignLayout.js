import React from 'react';
import { Layout } from "antd";
import "./UpsignLayout.scss";

const { Header, Content, Footer } = Layout;

const UpsignLayout = (props) => {
    return (
        <Layout className="layout">
            <Header style={{ padding: 0 }}>
                {props.children[0]}
            </Header>
            <Content>
                {props.children[1]}
            </Content>
            <Footer>
                {props.children[2]}
            </Footer>
        </Layout>

    );
}

export default UpsignLayout