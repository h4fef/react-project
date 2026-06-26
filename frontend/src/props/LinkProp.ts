import type {IconName} from "../data/linkIcons.ts";

export type LinkProp = {
    href: string;
    routeName: string;
    icon: IconName;
}