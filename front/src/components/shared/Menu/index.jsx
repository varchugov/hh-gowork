import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import Api from 'src/api';
import store from 'src/store';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paragraph from 'src/components/shared/Menu/components/Paragraph';

const MenuLoadingWrapper = styled(Grid)`
    padding: 115px 0;
`;

const Menu = observer((props) => {
    useEffect(() => {
        if (!store.menuIsLoaded && !store.menuIsLoading) {
            Api.content()
                .then((response) => store.menuSetContent(response.data))
                .catch();
        }
    }, []);

    return (
        <Grid {...props}>
            {store.menuIsLoaded ? (
                store.menuContent.map((item) => (
                    <Grid key={item.id}>
                        <Paragraph value={item} />
                    </Grid>
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
