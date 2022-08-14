import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { Link, Router } from "../../routes";

import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = props => {
    const [minContribution, setMinContribution] = useState(0);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrMsg("");
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute("/");
        }
        catch (err) {
            setErrMsg(err.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minContribution}
                        onChange={(event) => setMinContribution(event.target.value)}
                    />
                </Form.Field>

                <Message
                    error
                    header="Oops"
                    content={errMsg}
                />
                <Button
                    primary
                    loading={loading}
                >
                    Create Campaign
                </Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew;