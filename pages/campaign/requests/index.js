import React from "react";
import { Button, Table } from "semantic-ui-react";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = props => {
    const { Header, Row, HeaderCell, Body } = Table;

    const renderRows = () => {
        return props.requests.map((request, idx) => {
            return <RequestRow
                key={idx}
                id={idx}
                request={request}
                address={props.address}
                approversCount={props.approversCount}
            />
        })
    }

    return (
        <Layout>
            <h3>Request Index</h3>
            <Link route={`/campaign/${props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (context) => {
    const address = context.query.address;
    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, idx) => {
            return campaign.methods.requests(idx).call();
        })
    );

    return {
        address,
        requests,
        requestCount,
        approversCount
    };
}

export default RequestIndex;