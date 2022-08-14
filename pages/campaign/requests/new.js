import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

const RequestNew = props => {
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const onSubmit = async () => {
        event.preventDefault();
        setLoading(true);
        setErrMsg("");

        const campaign = Campaign(props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient)
                .send({ from: accounts[0] });

        } catch (err) {
            setErrMsg(err.message);
        }

        setLoading(false);
    }

    return (
        <Layout>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errMsg}></Message>
                <Button
                    primary
                    loading={loading}
                >
                    Create
                </Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps = async (context) => {
    const address = context.query.address;

    return {
        address
    };
}

export default RequestNew;