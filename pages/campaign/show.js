import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";

const CampaignShow = props => {
    const router = useRouter();

    useEffect(() => {
        console.log(router.query.address);
    }, []);

    return (
        <Layout>
            <h1>CampaignShow</h1>
        </Layout>
    )
}


export default CampaignShow;