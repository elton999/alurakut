import { typeOf } from "react-is";
import styled from "styled-components";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";
import Box from '../Box';


export function ProfileGaleriaBox({ props }) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
            <ul>
                {props.items.splice(0, 6).map((item) => {
                    let isAPerson = typeof item === 'string';
                    return (
                        <li key={isAPerson ? item : item.id}>
                            <a href={`/users/${!isAPerson ? item : item.title}`} key={isAPerson ? item : item.title}>
                                <img src={isAPerson ? `https://github.com/${item}.png` : item.image} />
                                <span>{isAPerson ? item : item.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default ProfileGaleriaBox;