import React from "react";
import { Card, CardProps } from "@pankod/refine";

import { useTranslate } from "@pankod/refine";

export const Aside: React.FC<CardProps> = (props: any) => {
    const translate = useTranslate();

    return (
        <Card
            {...props}
            title={translate("common:aside.title")}
            extra={<a href="#">{translate("common:aside.more")}</a>}
        >
            <p>{translate("common:aside.content")}</p>
        </Card>
    );
};