import styled from "styled-components";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";
import Box from '../Box';


export function ProfileGaleriaBox({ props }) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
            <ul>
                {props.items.slice(0, 6).map((item) => {
                    let isAPerson = typeof item === 'string';
                    return (
                        <li key={isAPerson ? item : item.id}>
                            <a href={`/users/${!isAPerson ? item : item.login}`} key={isAPerson ? item : item.login}>
                                <img src={isAPerson ? `https://github.com/${item}.png` : item.avatar_url} />
                                <span>{isAPerson ? item : item.login}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default ProfileGaleriaBox;