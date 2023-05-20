import React from 'react'
import { Tabs } from "antd";
import 'antd/dist/antd.css'
import { Button, Row, Col } from 'react-bootstrap'
import OrderList from '../OrderListScreen/orderListScreen'
import { Container } from 'react-bootstrap';
import OrderReport from '../OrderReport/OrderReport';

const { TabPane } = Tabs;

const OrderManagementScreen = () => {
      return (

            <Container>

                  <div className="ml-3">
                        <h2 className="text-center m-2" style={{ fontSize: "35px" }}>ORDER MANAGEMENT</h2>
                        <Tabs defaultActiveKey="1">
                        <TabPane tab="Order List" key="2">
                                    <OrderList />
                              </TabPane>
                            
                              <TabPane tab="Order Report" key="4">
                                    <OrderReport />
                              </TabPane>
                        </Tabs>
                  </div>
            </Container>
      )
}

export default OrderManagementScreen
