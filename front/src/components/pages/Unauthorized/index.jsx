import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Header from 'src/components/shared/Header';
import LinkButton from 'src/components/shared/LinkButton';

const Unauthorized = () => {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <Box align={'center'}>
                    <Box fontSize={100} color={'primary.main'}>
                        401
                    </Box>
                    Чтобы просматривать контент данной страницы,
                    <LinkButton href={'/signup'} name={'Зарегистрируйтесь'} color={'primary'} />
                    или
                    <LinkButton href={'/signin'} name={'Войдите'} color={'default'} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Unauthorized;
