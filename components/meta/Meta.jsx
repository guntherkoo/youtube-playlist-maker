import React from 'react';
import Head from 'next/head';

const Meta = () => {
    const setGoogleAnalytics = () => {
        return {
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-T3J4J5JKDM');
            `
        }
    }

    return (
        <Head>
            <title>YouTube Custom Playlist Maker</title>
            <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
            <link rel='icon' sizes='64x64' href='/static/favicon.ico' />

            <meta property='og:title' content='YouTube Custom Playlist Maker' />
            <meta property='og:description' content='Create your own YouTube custom playlist' />
            <meta property='og:image' content='' />
            <meta property='og:url' content='https://youtube-playlist-maker.vercel.app/' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta property='twitter:title' content='YouTube Custom Playlist Maker' />
            <meta property='twitter:description' content='Create your own YouTube custom playlist' />
            <meta property='twitter:image' content='' />
            <meta property='twitter:image:src' content='' />
            
            <script async src='https://www.googletagmanager.com/gtag/js?id=G-T3J4J5JKDM'/>
            <script dangerouslySetInnerHTML={setGoogleAnalytics()} />
        </Head>
    );
}

export default Meta;
