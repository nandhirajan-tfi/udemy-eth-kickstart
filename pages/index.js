import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";

const CampaignIndex = (props) => {
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

// export async function getInitialProps() {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log("Campaings ", campaigns)
//     return {
//         props: { campaigns },
//     };
// }

export default CampaignIndex;