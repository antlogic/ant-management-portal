import React, {Component} from 'react';
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

const UpsignLayout = (props) => {
    const Navigation = props.children[0]
    console.log(Navigation)
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