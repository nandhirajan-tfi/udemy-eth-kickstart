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
                fluid: true
            }
        });

        return (
            <div>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
                <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
                <Card.Group items={items} />
            </div>

        )

    }

    return renderCampaigns();
}

// export async function getInitialProps() {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log("Campaings ", campaigns)
//     return {
//         props: { campaigns },
//     };
// }

export default CampaignIndex;