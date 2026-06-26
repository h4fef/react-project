import {NavLink} from "react-router";
import type {LinkProp} from "../../props/LinkProp.ts";
import {linkIcons} from "../../data/linkIcons.ts";

const NavItem = (linkProp: LinkProp) => {
    const Icon = linkIcons[linkProp.icon];
    return <li className="">
        <NavLink to={linkProp.href} className="gap-4">
            {({isActive}) => (
                <>
                    <Icon className={isActive ? 'text-blue-500' : 'text-gray-600'}/>
                    <span className={isActive ? 'text-blue-500' : 'text-gray-600'}>{linkProp.routeName}</span>
                </>
            )}
        </NavLink>
    </li>
}

export default NavItem;