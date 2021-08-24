import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../component/Breadcrumb'
import styles from '../../styles/Home.module.css'
import axios from "axios"
import { useRouter } from 'next/dist/client/router'
import Link from "next/link"
import Icon from '../../component/icon'


export default function Home() {
    const [data, setData] = useState(null)

    const router = useRouter()
    const param = router.query.param

    useEffect(() => {
        async function load() {
            axios.get(`/api/get-block?param=${param}`)
                .then(res => {
                    setData(res?.data)
                    console.log(res?.data)
                })
                .catch(err => {
                    if (err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }
        load()
    }, [param])

    return (
        <div>
            <Breadcrumb name="Block" value={data?.data.number} />
            <div style={{ fontSize: "15px" }} className="col-md-10 overflow-hidden mt-4 mx-auto">

                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />
                        # BlockHeight
                    </div>
                    <div className="col-md">

                        {data?.data?.number}
                        <a href={`/block/` + (data?.data.number - 1)}> <button className="btn btn-small py-0 px-2 btn-danger"> {'<'} </button></a>

                        <a href={`/block/` + (data?.data.number + 1)}> <button className="btn btn-small py-0 px-2 btn-primary"> {'>'}  </button> </a>
                    </div>

                </div>
                <div className="row rounded  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />

                        Timestamp
                    </div>
                    <div className="col-md">
                        {new Date(data?.data.timestamp).toDateString()}
                    </div>
                </div>




                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />
                        Transactions
                    </div>
                    <div className="col-md">
                        <a href={`${"/txs/" + data?.data.number}`}>
                            <>
                                <span style={{ fontSize: "13px" }} className="btn btn-small px-2 p-0 btn-primary">{data?.data.transactions.length}  transactions</span></></a>   in this block
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />
                        Difficult
                    </div>
                    <div className="col-md">
                        {data?.data.difficulty}
                    </div>

                </div>

                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />                        Size
                    </div>
                    <div className="col-md">
                        {data?.data.size} bytes
                    </div>

                </div>

                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />                        Gas Used
                    </div>
                    <div className="col-md">
                        {data?.data.gasUsed.toLocaleString()}
                    </div>

                </div>

                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />                        Gas Limit
                    </div>
                    <div className="col-md">
                        {data?.data.gasLimit.toLocaleString()}
                    </div>

                </div>


                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />                        Mined by
                    </div>
                    <div className="col-md">
                        <a alt="block hash " className="text-primary" href={`/address/${data?.data.miner}`}>
                            {data?.data.miner}
                        </a>
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon />                        Hash
                    </div>
                    <div className="col-md">
                        <a alt="block hash " className="text-primary" href={`/block/${data?.data.hash}`}>
                            {data?.data.hash}
                        </a>
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> MixHash
                    </div>
                    <div className="col-md">
                        {data?.data["mixHash"]}
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> ParentHash
                    </div>
                    <div className="col-md">
                        <a alt="block hash " className="text-primary" href={`/block/${data?.data.parentHash}`}>
                            {data?.data.parentHash}
                        </a>
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> Sha3Uncles
                    </div>
                    <div className="col-md">
                        {data?.data.sha3Uncles}
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> ReceiptsRoot
                    </div>
                    <div className="col-md">
                        {data?.data.receiptsRoot}
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> StateRoot
                    </div>
                    <div className="col-md">
                        {data?.data.stateRoot}
                    </div>

                </div>
                <div className="row  border-bottom p-3">
                    <div className="col-md-3">
                        <Icon /> Nonce
                    </div>
                    <div className="col-md">
                        {data?.data.nonce}
                    </div>

                </div>


            </div>  </div>
    )
}

