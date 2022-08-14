import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
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

    const renderCampaigns = () => {
        const items = campaigns.map(address => {
            console.log("Campaigns");
            return {
                header: address,
                description: <a> View Campaigns </a>,
                flud: true
            }
        });

        return <Card.Group items={items} />
    }

    return renderCampaigns()
}

// export async function getInitialProps() {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log("Campaings ", campaigns)
//     return {
//         props: { campaigns },
//     };
// }

export default CampaignIndex;