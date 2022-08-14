import React from "react";
import { Button } from "semantic-ui-react";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";

const RequestIndex = props => {
    return (
        <Layout>
            <h3>Request Index</h3>
            <Link route={`/campaign/${props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (context) => {
    const address = context.query.address;

    return {
        address
    };
}

export default RequestIndex;