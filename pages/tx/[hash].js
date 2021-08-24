import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../component/Breadcrumb'
import styles from '../../styles/Home.module.css'
import axios from "axios";
import { useRouter } from 'next/dist/client/router'
import Icon from '../../component/icon'


export default function Home() {

    const [data, setData] = useState(null)
    const router = useRouter();
    const hash = router.query.hash;

    useEffect(() => {
        async function loadTransaction(param) {
            axios.get(`/api/get-transaction?hash=${param}`)
                .then(res => {
                    // console.log(res?.data)
                    setData(res?.data?.data)
                })
                .catch(err => {
                    if (err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }

        async function loadTransactionFromBlock(param, pos) {
            axios.get(`/api/get-transaction-from-block?param=${param}&pos=${pos}`)
                .then(res => {
                    // console.log(res?.data)
                    setData(res?.data?.data)
                })
                .catch(err => {
                    if (err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }
        if (hash) {

            let paramArr = hash.split(',');

            // console.log(paramArr.length, "////")

            if (paramArr.length > 1) {
                const firstParams = paramArr[0]
                const pos = paramArr[1]
                loadTransactionFromBlock(firstParams, pos);
            } else {
                loadTransaction(hash);
            }
        }
    }, [hash]);

    return (
        <div>
            <Breadcrumb />
            <div style={{ fontSize: "15px" }} class="col-md-10 overflow-hidden mt-4 mx-auto">

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon />
                        Transaction Hash
                    </div>
                    <div class="col-md">
                        {data?.hash}
                    </div>

                </div>
                {/* <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                       <Icon />
                        status
                    </div>
                    <div class="col-md">
                        {data?.blockNumber}
                    </div>

                </div> */}

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> Block:
                    </div>
                    <div class="col-md">
                        <a alt="block hash " className="text-primary" href={`/block/${data?.blockNumber}`}>
                            {data?.blockNumber}
                        </a>
                    </div>

                </div>

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon />  From
                    </div>
                    <div class="col-md">
                        <a alt="block hash " className="text-primary" href={`/address/${data?.from}`}>
                            {data?.from}
                        </a>
                    </div>

                </div>

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> To
                    </div>
                    <div class="col-md"> <a alt="block hash " className="text-primary" href={`/address/${data?.to}`}>
                        {data?.to}
                    </a>
                    </div>

                </div>


                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> Value
                    </div>
                    <div class="col-md">
                        {data?.value} Ether
                    </div>

                </div>

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> Gas
                    </div>
                    <div class="col-md">
                        {data?.gas.toLocaleString()}
                    </div>

                </div>
                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> gas price
                    </div>
                    <div class="col-md">
                        {data?.gasPrice.toLocaleString()}
                    </div>

                </div>

                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                        <Icon /> Nonce
                    </div>
                    <div class="col-md">
                        {data?.nonce}
                    </div>

                </div>

            </div>
        </div>
    )
}

