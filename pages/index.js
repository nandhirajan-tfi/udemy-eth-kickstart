import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

const CampaignIndex = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        getCampaigns();
    }, []);

    const getCampaigns = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(campaigns);
    }

    return <h1>Welcome to New Campaign Page {campaigns}</h1>
}

export default CampaignIndex;