import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paragraph from 'src/components/shared/Menu/components/Paragraph';
import Api from 'src/api';
import store from 'src/store';

const MenuLoadingWrapper = styled(Grid)`
    padding: 115px 0;
`;

const getCurrentParagraph = (chapters) => {
    for (const chapter of chapters) {
        if (chapter.currentParagraph !== null) {
            return chapter.currentParagraph;
        }
    }

    return null;
};

const Menu = observer((props) => {
    useEffect(() => {
        if (!store.menuIsLoaded && !store.menuIsLoading) {
            Api.getContent()
                .then((response) => {
                    store.menuSetContent(response.data);
                })
                .catch();
        }
    }, []);

    return (
        <Grid {...props}>
            {store.menuIsLoaded ? (
                store.menuContent.map((item) => (
                    <Box key={item.id} ml={2} width={'230px'}>
                        <Paragraph value={item} currentParagraph={getCurrentParagraph(store.menuContent)} />
                    </Box>
                ))
            ) : (
                <MenuLoadingWrapper container justify="center">
                    <CircularProgress />
                </MenuLoadingWrapper>
            )}
        </Grid>
    );
});

export default Menu;
