import React from "react";
import { Card, Grid } from "semantic-ui-react";

import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

const CampaignShow = props => {
    const { summary } = props;
    const { minContribution, balance, requestsCount, approversCount, manager, address } = summary;

    const renderCards = () => {
        const items = [{
            header: manager,
            meta: "Address Of manager",
            description: "The manager created this campaign",
            style: {
                overflowWrap: "break-word"
            }
        }, {
            header: minContribution,
            meta: "Minimum Contribution (Wei)",
            description: "You must contribute at least this much wei to become an approver",
            style: {
                overflowWrap: "break-word"
            }
        }, {
            header: requestsCount,
            meta: "Number of Requests",
            description: "A request tries to withdraw money from the campaign",
            style: {
                overflowWrap: "break-word"
            }
        }, {
            header: approversCount,
            meta: "Number of Approvers",
            description: "Total Approvers to given vote the request",
            style: {
                overflowWrap: "break-word"
            }
        }, {
            header: web3.utils.fromWei(balance, "ether"),
            meta: "Campaign Balance (Ether)",
            description: "The balance is how much money this campaign holds",
            style: {
                overflowWrap: "break-word"
            }
        }];
        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Column width={10}>
                    {renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={address} />
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

CampaignShow.getInitialProps = async (context) => {
    const campaign = Campaign(context.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        summary: {
            minContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: context.query.address
        }
    };
}

export default CampaignShow;