import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

const CampaignShow = props => {

    const [summary, setSummary] = useState({});
    const router = useRouter();

    useEffect(() => {
        getCampaignSummary();
        console.log("Summary ", summary);
    }, []);

    const getCampaignSummary = async () => {
        const campaign = Campaign(router.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log("Sumary ", summary);
        setSummary(summary);
    }

    return (
        <Layout>
            <h1>CampaignShow</h1>
        </Layout>
    )
}


export default CampaignShow;