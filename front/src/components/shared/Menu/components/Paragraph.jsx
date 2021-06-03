import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const TypographyListHeader = styled(Typography)`
    font-weight: 600;
    font-family: Roboto, sans-serif;
`;

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const Paragraph = (props) => (
    <List>
        <ListItemLink>
            <TypographyListHeader variant="h5">{props.value.name}</TypographyListHeader>
        </ListItemLink>
        {props.value.paragraphs.map((item, i) => (
            <ListItemLink key={item.id}>
                <Typography>
                    {props.value.id}.{i + 1} {item.name}
                </Typography>
            </ListItemLink>
        ))}
    </List>
);

export default Paragraph;
