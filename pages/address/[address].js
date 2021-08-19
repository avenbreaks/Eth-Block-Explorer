import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../component/Breadcrumb'
import styles from '../../styles/Home.module.css'
import axios from "axios";
import { useRouter } from 'next/dist/client/router'


export default function Home() {

    const router = useRouter();
    const address = router.query.address;
    const [data , setData] = useState(null)

    useEffect(() => {
        async function load() {
            axios.get(`/api/get-balance?address=${address}`)
                .then(res => {
                    setData(res?.data)

                })
                .catch(err=>{
                    if(err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }
        load();
    }, [address]);

    return (
        <div>
            <Breadcrumb  name="Address" value={address} />

            <div class="col-md-10 border overflow-hidden mt-4 mx-auto">
            <div class="row rounded  border-bottom p-3">
                    <div class="col-md-3">
                   <b>Overview</b>
                    </div>
                    <div class="col-md">
                        {/* {data?.data} */}
                    </div>

                </div>
                <div class="row rounded  border-bottom p-3">
                    <div class="col-md-3">
                    Balance:
                    </div>
                    <div class="col-md">
                        {data?.data}
                    </div>

                </div>
                <div class="row  border-bottom p-3">
                    <div class="col-md-3">
                    EtherValue:
                    </div>
                    <div class="col-md">
                    {data?.data}
                    </div>

                </div>





            </div>  </div>
    )
}

