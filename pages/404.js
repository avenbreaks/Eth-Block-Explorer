import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Breadcrumb from '../component/Breadcrumb'
import styles from '../styles/Home.module.css'
import axios from 'axios'


export default function Home() {

    useEffect(() => {
        async function loadBlocks() {
            axios.get(`/api/get-block?param=latest`)
                .then(res => {
                    console.log(res?.data)
                })
                .catch(err=>{
                    console.log(err.toString())
                })
        }
        loadBlocks();
    }, []);

    return (
        <div>
            <Breadcrumb />
        </div>
    )
}

