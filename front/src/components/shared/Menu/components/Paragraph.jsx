import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TypographyListHeader = styled(Typography)`
    font-weight: 600;
    font-family: Roboto, sans-serif;
`;

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const Paragraph = (props) => (
    <List>
        <TypographyListHeader variant="h5">{props.value.name}</TypographyListHeader>
        {props.currentParagraph &&
            props.value.paragraphs.map((item, i) => {
                const paragraphIsCurrent = Number(props.currentParagraph) === Number(item.id);

                return Number(props.currentParagraph) >= Number(item.id) ? (
                    <ListItemLink
                        key={item.id}
                        href={paragraphIsCurrent ? '/test' : `/test?chapter=${props.value.id}&paragraph=${i + 1}`}
                        style={paragraphIsCurrent ? { color: '#ffffff', backgroundColor: '#4caf50' } : {}}
                    >
                        <Typography>
                            {props.value.id}.{i + 1} {item.name}
                        </Typography>
                    </ListItemLink>
                ) : (
                    <Box key={item.id} color={'#aaaaaa'} px={2} py={1}>
                        <Typography>
                            {props.value.id}.{i + 1} {item.name}
                        </Typography>
                    </Box>
                );
            })}
    </List>
);

export default Paragraph;
