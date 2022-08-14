import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = props => {
    const [value, setValue] = useState(0);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrMsg("");

        const campaign = Campaign(props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether")
            });

            console.log("Props ", props.address);
            Router.replaceRoute(`/campaign/${props.address}`);
            // Router.pushRoutes("/");
        } catch (err) {
            setErrMsg(err.message);
        }

        setLoading(false);
        setValue(0);
    }

    return (
        <Form onSubmit={onSubmit} error={!!errMsg}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    label="ether"
                    labelPosition="right"
                    onChange={(event) => setValue(event.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={errMsg}></Message>
            <Button
                primary
                loading={loading}
            >
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm;
