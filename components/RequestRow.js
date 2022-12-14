import React from "react";
import { Table, Button } from "semantic-ui-react";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = props => {
    const { Row, Cell } = Table;
    const { request = {}, id, approversCount, address } = props;
    const { description, value, recipient, approvalCount, complete } = request;
    const readyToFinalize = approvalCount > (approversCount / 2);

    const onApprove = async () => {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.approveRequest(id).send({
            from: accounts[0],
        });
    }

    const onFinalize = async () => {
        const campaign = Campaign(address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0],
        });
    }

    return (
        <Row disabled={complete} positive={readyToFinalize && !complete}>
            <Cell>{id}</Cell>
            <Cell>{description}</Cell>
            <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{approversCount}</Cell>
            <Cell>
                {
                    complete ? null : (<Button
                        color="green"
                        basic
                        onClick={onApprove}
                    >
                        Approve
                    </Button>)
                }

            </Cell>
            <Cell>
                {
                    complete ? null : (<Button
                        color="teal"
                        basic
                        onClick={onFinalize}
                    >
                        Finalize
                    </Button>)
                }
            </Cell>
        </Row>
    )
}

export default RequestRow;