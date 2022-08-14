import React from "react";

import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card } from "semantic-ui-react";

const CampaignShow = props => {
    const { summary } = props;

    const renderCards = () => {
        const items = [
            {
                header: props.summary.manager,
                meta: "Address Of manager",
                description: "The manager created this campaign"
            }];
        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h1>CampaignShow</h1>
            {renderCards()}
        </Layout>
    )
}

CampaignShow.getInitialProps = async (context) => {
    const campaign = Campaign(context.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        summary: {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    };
}

export default CampaignShow;