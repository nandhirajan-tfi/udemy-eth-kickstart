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

    return (
        <Layout>
            <h3>Create a Request</h3>
            <Form>
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
                        value={value}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </Form.Field>

                <Button primary>Create</Button>
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