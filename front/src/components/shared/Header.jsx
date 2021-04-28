import React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';

import HomePageLink from 'src/components/shared/HomePageLink';

const HeaderContent = styled.div`
    padding: 11px 0px;
`;

function HeaderComponent() {
    return (
        <header>
            <Container maxWidth="xl">
                <HeaderContent>
                    <HomePageLink />
                </HeaderContent>
            </Container>
        </header>
    );
}

export default HeaderComponent;
