import React from 'react';
import { Grid } from '@mui/material';

import { ReactComponent as CompanyLogo } from '../../img/company-logo.svg'

function Footer() {

    return (
        <Grid className='footer'>
            <CompanyLogo />
            <Grid className='footer__values'>
                <div className='footer__values__text'>© Muhammad Iqbal Wijonarko</div>
            </Grid>
        </Grid>
    )
}

export default Footer;