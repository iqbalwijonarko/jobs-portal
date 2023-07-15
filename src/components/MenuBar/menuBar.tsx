import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import jwt_decode from 'jwt-decode';
import { AppBar, Button, Dialog, Grid, Typography } from '@mui/material';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { useHistory } from "react-router";

import { ReactComponent as CompanyLogo } from '../../img/company-logo.svg'

export type GoogleData = {
    given_name: string,
    picture: string,
    email: string
}

function MenuBar() {
    const history = useHistory();
    const [profile, setProfile] = useState<GoogleData | null>();
    const [isOpen, setIsOpen] = useState(false);

    const successMessage = (response: any) => {
        const decoded: any = jwt_decode(response?.credential);
        setProfile(decoded)
        setIsOpen(false)
    };

    const errorMessage = (error: any) => {
        console.log(error);
    };

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const onClickHomepage = () => {
        history.push(`/`)
    }

    return (
        <>
            <AppBar position='static' className='menu-bar'>

                <Grid padding='0'>
                    
                    {isOpen && (
                        <Dialog open={isOpen}>
                            <Grid className='menu-bar__dialog'>
                                <Grid style={{ textAlign: 'end' }}>
                                    <Button onClick={() => setIsOpen(false)} className='menu-bar__dialog__buttonClose' >
                                        <CloseIcon />
                                    </Button>
                                </Grid>
                                <Grid className='menu-bar__dialog__buttonLogin'>
                                    <Typography className='menu-bar__dialog__buttonLogin__textHeader'>Sign In</Typography>
                                    <Typography className='menu-bar__dialog__buttonLogin__subText'>Welcome to Jobs List</Typography>
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            successMessage(credentialResponse);
                                        }}
                                        onError={() => errorMessage}
                                    />
                                </Grid>
                            </Grid>
                        </Dialog>
                    )}

                    <Grid className='menu-bar__outside'>
                        <Button onClick={() => onClickHomepage()}>
                            <CompanyLogo />
                        </Button>
                        {profile?.picture ? (
                            <>
                                <Grid display={'flex'}>
                                    <Button onClick={() => logOut()}>
                                        <Typography color={'white'} fontWeight={600}>Sign Out</Typography>
                                    </Button>
                                    <img src={profile.picture} alt='google-profile' style={{
                                        borderRadius: '25%',
                                        width: '3rem'
                                    }} />
                                </Grid>
                            </>
                        ) :
                            (
                                <Button onClick={() => setIsOpen(true)}>
                                    <Typography color={'white'} fontWeight={600}>Sign In</Typography>
                                </Button>
                            )
                        }
                    </Grid>

                </Grid>
            </AppBar>
        </>
    );
}

export default MenuBar;