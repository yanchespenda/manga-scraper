import { useState, Fragment } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import { Sites } from '../interfaces/components/ListSupport';
import { environment } from '../utils/config';
import axios from "axios";
import { Formik, Form, Field, FormikProps } from 'formik';
import * as yup from "yup";

/* Material-UI Core */
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar' 
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

/* Material-UI Icon */
import CloseIcon from '@material-ui/icons/Close'

import ListSupport from "../components/parts/pages/IndexPage/ListSupport";

import IndexStyle from '../styles/pages/index.module.scss'



interface IIndexPage {
    sitesData?: Array<Sites>
}

interface InterfaceForm {
    mangaUrl: string;
}

interface IResAction {
    enable: boolean
    link: string
}


export default function IndexPage ({ sitesData }: IIndexPage) {
    const [IsLoading, setIsLoading] = useState(false)
    const [OpenSnackbar, setOpenSnackbar] = useState(false)
    const [SnackbarMessage, setSnackbarMessage] = useState('')
    const [ActionContainer, setActionContainer] = useState(false)
    const [PDFAction, setPDFAction] = useState<IResAction>({enable: false, link: ''})
    const [ReaderAction, setReaderAction] = useState<IResAction>({enable: false, link: ''})
    const [IsLoadingPDF, setIsLoadingPDF] = useState(false)

    const runGetImages = (data: InterfaceForm, resetForm: Function, isLoading: Function) => {
        if (!IsLoading && !IsLoadingPDF) {
            setIsLoading(true)
            setActionContainer(false)

            const params = new URLSearchParams()
            params.append('url', data.mangaUrl)

            axios.post('start', params).then(res => {
                // console.log('res',res)
                setPDFAction(res.data.pdfLink)
                setReaderAction(res.data.reader)
                setActionContainer(true)
                resetForm({})
            }).catch( (error) => {
                setSnackbarMessage('Sorry, something went wrong')
                if (error.response) {
                    if (error.response.data?.message) {
                        setSnackbarMessage(error.response.data.message)
                    }
                }
                setOpenSnackbar(true)
            }).then( () => {
                isLoading(false)
                setIsLoading(false)
            })
        }
    }

    const runPDF = () => {
        if (!IsLoadingPDF && ReaderAction.link.length > 0) {
            setIsLoadingPDF(true)

            const params = new URLSearchParams()
            params.append('id', ReaderAction.link)

            axios.post('pdf', params).then(res => {
                setPDFAction({
                    enable: true,
                    link: res.data.data
                })
            }).catch( (error) => {
                setSnackbarMessage('Sorry, something went wrong')
                if (error.response) {
                    if (error.response.data?.message) {
                        setSnackbarMessage(error.response.data.message)
                    }
                }
                setOpenSnackbar(true)
            }).then( () => {
                setIsLoadingPDF(false)
            })
        }
    }

    const generateReaderLink = (readerId: string) => ('/reader/' + readerId)

    const snackbarHandle = () => {
        setOpenSnackbar(!OpenSnackbar)
    }

    return (
        <Fragment>
            <Layout>
                <div className={ IndexStyle.greetingText }>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Hello 👋
                    </Typography>
                </div>

                <Formik 
                    initialValues={{
                        mangaUrl: '',
                    }}
                    validationSchema={yup.object().shape({
                        mangaUrl: yup.string()
                            .required('Manga URL required')
                            .url('Manga URL not valid')
                    })}
                    onSubmit={(values: InterfaceForm, { resetForm, setSubmitting}) => {
                        runGetImages(values, resetForm, setSubmitting)
                    }}
                >
                    {
                        (props: FormikProps<InterfaceForm>) => {
                            const {
                                values,
                                touched,
                                errors,
                                handleBlur,
                                handleChange,
                                isSubmitting,
                                submitForm
                            } = props

                            return (
                                <Form className={[IndexStyle.formIndex].join(' ')}>
                                    <Field
                                        component={ TextField }
                                        name="mangaUrl"
                                        label="Manga URL"
                                        variant="outlined"
                                        fullWidth
                                        id="mangaUrl"
                                        value={values.mangaUrl || ''}
                                        type="text"
                                        helperText={
                                            errors.mangaUrl && touched.mangaUrl
                                                ? errors.mangaUrl
                                                : 'Enter manga url.'
                                        }
                                        error={
                                            errors.mangaUrl && touched.mangaUrl
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={ isSubmitting }
                                    />
                                    <div className={[IndexStyle.formAction, 'layout-row layout-align-center-center'].join(' ')}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={ isSubmitting }
                                            onClick={ submitForm }
                                        >
                                            Get Images
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                
                {
                    ActionContainer ? (
                        <div className={[IndexStyle.actionParent].join(' ')}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                {
                                    PDFAction.enable ? (
                                        <Fragment>
                                            {
                                                PDFAction.link.length > 0 ? (
                                                    <Link href={ PDFAction.link }>
                                                        <Button variant="contained" color="primary">
                                                            Download PDF
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button variant="contained" color="primary" onClick={ runPDF }>
                                                        Generate PDF
                                                    </Button>
                                                )
                                            }
                                        </Fragment>
                                    ) : ('')
                                }
                                {
                                    ReaderAction.enable ? (
                                        <Fragment>
                                            <Link href={generateReaderLink(ReaderAction.link)}>
                                                <Button variant="contained" color="primary">
                                                    Read Online
                                                </Button>
                                            </Link>
                                            
                                        </Fragment>
                                    ) : ('')
                                }
                            </Grid>
                        </div>
                    ) : ('')
                }

                <div className={[ IndexStyle.supportParent, 'flex' ].join(' ')}>
                    <Typography variant="h4" gutterBottom>
                        Supported websites
                    </Typography>
                    <ListSupport sites={ sitesData } />
                </div>
            </Layout>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={ OpenSnackbar }
                autoHideDuration={6000}
                onClose={ snackbarHandle }
                message={ SnackbarMessage }
                action={
                <Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={ snackbarHandle }>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Fragment>
                }
            />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const url = environment.API_URL + environment.API_VERSION + 'support'
    try {
        const res = await fetch(url)
        const data = await res.json()

        return {
            props: {
                sitesData: data
            }
        }
    } catch (error) { }
    
    return {
        props: {
            sitesData: []
        }
    }
}

// export default IndexPage
