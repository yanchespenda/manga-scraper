// import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { useRouter } from 'next/router'
import { environment } from "../../utils/config";
import Head from "next/head";

import { LazyImage } from "react-lazy-images"
// import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'


/* Material-UI Core */
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button'

/* Material-UI Icon */


import ReaderStyle  from "../../styles/pages/Reader.module.scss";
import Link from "next/link";

interface IReaderPage {
    title: string,
    images: string[]
}

export default function ReaderPage () {
    const router = useRouter()

    let readerData: IReaderPage = {title: '', images: []}

    const id = router.query.id;
    if (id.toString().length > 0) {
        const url = environment.API_URL + environment.API_VERSION + 'reader?id=' + id
        const { data } = useSWR(url)
        readerData = data || {title: '', images: []}
    }

    return (
        <Fragment>
            <Head>
                <title>{ readerData.title }</title>
            </Head>
            <section className={ ReaderStyle.comikSection }>
                <div className={ ReaderStyle.readerContainer }>
                    <div className={ ReaderStyle.readerPreContainer }>
                        <div className={ ReaderStyle.infometa }>
                            <div className="layout-column layout-align-center-center">
                                <Typography variant="h5" component="h2">
                                    { readerData.title }
                                </Typography>

                                <div className={ ReaderStyle.metaAction }>
                                    <Link href="/">
                                        <Button variant="contained" color="primary">
                                            Find other
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={ ReaderStyle.readerCanvasContainer }>
                            {
                                readerData.images?.map((item, idx) => {

                                    return (
                                        <LazyImage
                                            key={ idx }
                                            src={ item }
                                            alt={`Image of ${readerData.title} - ${idx}`}
                                            placeholder={({ imageProps, ref }) => (
                                                <img ref={ref} src="/assets/images/collect.gif" alt={ imageProps.alt } />
                                            )}
                                            actual={({ imageProps }) => <img {...imageProps} />}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

/* export const getServerSideProps: GetServerSideProps = async ctx => {
    const id = ctx.params?.id || '';
    const url = environment.API_URL + environment.API_VERSION + 'reader?id=' + id
    try {
        const res = await fetch(url)
        const data = await res.json()

        return {
            props: {
                readerData: data
            }
        }
    } catch (error) { }
    
    return {
        props: {
            readerData: []
        }
    }
} */