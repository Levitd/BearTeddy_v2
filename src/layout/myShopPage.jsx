import React from "react";
import Page from "../components/page";
import Title from "../components/title";
import { FormattedMessage } from "react-intl";
import MyShopForm from "../components/ui/myShopForm";

const MyShopPage = ({ shop }) => {
    return (
        <Page widthScreen="max-w-lg mb-20 lg:mb-2">
            <Title><FormattedMessage id={shop ? "shop_settings" : "create_shop"} /></Title>
            <MyShopForm shop={shop} />
        </Page>
    );
};

export default MyShopPage;
