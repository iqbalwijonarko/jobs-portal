
import { Box, Button, Checkbox, Grid, TextField, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import { useHistory } from "react-router";

import emptySearch from '../../img/empty.jpg'

import { jobDataType } from '../../type';

export default function Home() {
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery((baseTheme: Theme) =>
        theme.breakpoints.down("md")
    );
    const [jobListData, setJobListData] = useState<jobDataType[]>([]);
    const [jobDescription, setJobDescription] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [isFullTimeOnly, setIsFullTimeOnly] = useState(false);

    const currentDate = new Date();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json', {
                params: {
                    description: jobDescription,
                    location: jobLocation,
                    type: isFullTimeOnly,
                }
            });
            setJobListData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobDescription, jobLocation, isFullTimeOnly]);

    const onClickJobsDetail = (job: jobDataType) => {
        history.push({
            pathname: '/jobs-detail',
            state: { job },
        });
    };

    const isSearchNotEmpty = jobDescription?.length > 0 || jobLocation?.length > 0 || isFullTimeOnly

    return (
        <>
            <Grid className='home'>
                <Grid className='home__profile' display={'flex'} alignItems={'center'}>
                    <Grid container gap={'2rem'} flexWrap={'nowrap'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={!isMobile ? 'space-between' : undefined}>
                        <Grid container maxWidth={'80%'} gap={'2rem'} flexWrap={'nowrap'} flexDirection={isMobile ? 'column' : 'row'}>
                            <Grid display={'flex'} flexDirection={'column'}>
                                <Typography color={'black'} fontWeight={600}>Jobs Description</Typography>
                                <TextField
                                    size='small'
                                    style={{ width: '40vw', minWidth: '18rem' }}
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid display={'flex'} flexDirection={'column'}>
                                <Typography color={'black'} fontWeight={600}>Location</Typography>
                                <TextField
                                    size='small'
                                    style={{ width: '40vw', minWidth: '18rem' }}
                                    value={jobLocation}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                            <Checkbox
                                checked={isFullTimeOnly}
                                onChange={(e) => setIsFullTimeOnly(e.target.checked)}
                            />
                            <Typography color={'black'} fontWeight={400}>Full Time Only</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className='home__valuesContainer' margin={'3rem'} border={'5px solid #d1bdbd'} padding={'1rem'}>
                    <Typography color={'black'} fontSize={'20pt'} fontWeight={600}>{isSearchNotEmpty ? `Showing ${jobListData.length} jobs` : 'Job List'}</Typography>
                    <Grid>
                        <ul style={{ paddingLeft: 0, wordWrap: 'break-word' }}>
                            {jobListData && jobListData.length > 0 ? (
                                jobListData.map((job: jobDataType) => {
                                    const jobDateCreated = new Date(job?.created_at);
                                    const dateCounter = differenceInDays(currentDate, jobDateCreated)

                                    return (
                                        <li style={{ listStyleType: 'none' }}>
                                            <Box sx={{ borderTop: 1 }} borderColor={'black'} padding={'.5rem'}>
                                                <Grid display={'flex'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'space-between'}>
                                                    <Grid>
                                                        <Button style={{ padding: 0 }} onClick={() => onClickJobsDetail(job)}>
                                                            <Typography fontSize={isMobile ? '10pt' : undefined} color={'#854687'} fontWeight={800} textAlign={'start'}>{job?.title}</Typography>
                                                        </Button>
                                                        <Grid display={'flex'} flexDirection={'row'} gap={'.5rem'}>
                                                            <Typography fontSize={isMobile ? '8pt' : undefined} fontWeight={600} color={'#a19494'}>{job?.company}</Typography>
                                                            <Typography fontSize={isMobile ? '8pt' : undefined}> -</Typography>
                                                            <Typography fontSize={isMobile ? '8pt' : undefined} fontWeight={600} color={'#ffc107'}>{job?.type}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid textAlign={'end'} marginTop={'1rem'}>
                                                        <Typography fontSize={isMobile ? '10pt' : undefined} fontWeight={600} color={'#7d8590'}>{job?.location}</Typography>
                                                        <Typography fontSize={isMobile ? '10pt' : undefined} fontWeight={400} color={'#7d8590'}>{dateCounter} day ago</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </li>
                                    )
                                })
                            ) :
                                <Grid textAlign={'center'} padding={'auto'}>
                                    <img src={emptySearch} alt='empty-search' style={{ height: '50vh' }} />
                                </Grid>
                            }
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}