import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../component/Breadcrumb'
import styles from '../../styles/Home.module.css'
import axios from "axios";
import { useRouter } from 'next/dist/client/router'
import Icon from '../../component/icon'
import Table from '../../component/Table'


export default function Home() {

    const [data, setData] = useState(null)
    const router = useRouter();
    const param = router.query.param;

    useEffect(() => {
        async function loadBlocks() {
            axios.get(`/api/get-block?param=${param}`)
                .then(res => {
                    setData(res?.data?.data)
                    // console.log(res?.data?.data)
                })
                .catch(err => {
                    if (err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }
        loadBlocks();
    }, [param]);

    return (
        <div>
            <Breadcrumb />
            <div style={{ fontSize: "15px", background: "#fff", }} class=" col-md-11 mx-auto card p-4 overflow-hidden mt-4 mx-auto"
            >

                <h3>Transactions</h3>
                <div className="table-responsive mt-2">

                <table class="table" style={{fontSize: "15px", }}>
                    <thead>
                        <tr className="text">
                            <th colSpan="1" scope="col">Tanx Hash</th>
                            <th scope="col">Block</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Value</th>
                            {/* <th scope="col">Txc fee</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.transactions.length > 0 ?
                            data?.transactions?.map(tran => (
                                <Table txHash={tran} />
                            ))
                            : ""}
                    </tbody>
                </table>
                
                </div>
            </div>
        </div>
    )
}

