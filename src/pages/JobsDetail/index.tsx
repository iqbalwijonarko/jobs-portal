import { Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { jobDataType } from '../../type';

export default function JobsDetail() {
    const location: any = useLocation();
    const jobsData: jobDataType = location?.state?.job;
    const theme = useTheme();
    const isMobile = useMediaQuery((baseTheme: Theme) =>
        theme.breakpoints.down("md")
    );

    return (
        <Grid className='jobsDetail'>
            <Grid margin={'3rem'} border={'5px solid #d1bdbd'} padding={'1rem'}>
                <Grid marginBottom={'2rem'}>
                    <Typography color={'black'} fontSize={'10pt'} fontWeight={200}>
                        {jobsData.type} / {jobsData.location}
                    </Typography>
                    <Typography color={'black'} fontSize={'20pt'} fontWeight={600}>
                        {jobsData.title}
                    </Typography>
                </Grid>
                <Grid display={'flex'} flexDirection={isMobile ? 'column' : 'row'} paddingTop={'1rem'} sx={{ borderTop: '2px solid #d1bdbd' }}>
                    <Grid flexDirection={'column'}>
                        <Typography
                            color={'black'}
                            fontSize={'13pt'}
                            fontWeight={300}
                            sx={{ wordWrap: 'break-word' }}
                            className='jobsDetail__description'
                            dangerouslySetInnerHTML={{ __html: jobsData.description }}
                        />
                    </Grid>
                    <Grid display={'flex'} gap={'2rem'} flexDirection={'column'}>
                        <Grid sx={{ border: '5px solid #d1bdbd' }} padding={'.5rem'} minWidth={isMobile ? '15rem' : '20rem'} maxWidth={isMobile ? '15rem' : '20rem'} marginLeft={!isMobile ? '1rem' : ''}>
                            <Typography fontSize={'12pt'} fontWeight={600} sx={{ borderBottom: '2px solid #d1bdbd' }} paddingBottom={'.5rem'}>{jobsData.company}</Typography>
                            <img src={jobsData.company_logo} alt="" style={{ maxWidth: '12rem', textAlign: 'center' }} />
                            <Typography color={'blue'} fontSize={'10pt'} fontWeight={200} sx={{ wordWrap: 'break-word' }}>
                                {jobsData.company_url}
                            </Typography>
                        </Grid>

                        <Grid sx={{ border: '5px solid #EFECE5', backgroundColor: '#FFFEF1' }} padding={'.5rem'} minWidth={isMobile ? '15rem' : '20rem'} maxWidth={isMobile ? '15rem' : '20rem'} marginLeft={!isMobile ? '1rem' : ''}>
                            <Typography fontSize={'12pt'} fontWeight={600} sx={{ borderBottom: '2px solid #d1bdbd' }} paddingBottom={'.5rem'}>How to Apply</Typography>
                            <img src={jobsData.company_logo} alt="" style={{ maxWidth: '12rem', textAlign: 'center' }} />
                            <Typography color={'black'} fontSize={'12pt'} fontWeight={400} dangerouslySetInnerHTML={{ __html: jobsData.how_to_apply }} sx={{ wordWrap: 'break-word' }} />

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
