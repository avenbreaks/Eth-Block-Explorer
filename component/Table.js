import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const Table = ({txHash}) => {

    const [data, setData] = useState(null)
    const router = useRouter();

    useEffect(() => {
        async function loadTransaction() {
            axios.get(`/api/get-transaction?hash=${txHash}`)
                .then(res => {
                    console.log(res?.data)
                    setData(res?.data?.data)
                })
                .catch(err => {
                    if(err?.response?.status == 400) console.log(err.toString())
                    else router.push('/404')
                })
        }
        loadTransaction()
    }, [txHash]);


    return (
        <tr>
            <td className="p-3" colSpan={"0"}><div style={{textOverflow: "ellipsis",overflow: "hidden",
maxWidth:"70%",
whiteSpace: "nowrap", }}>{data?.hash}</div> </td>
            <td className="p-3" style={{ textOverflow: "hidden", }}><a href={`/block/${data?.blockNumber}`} className="text-primary"> {data?.blockNumber} </a></td>
            <td className="p-3"><a href={`/address/${data?.from}`} className="text-primary"> <div style={{textOverflow: "ellipsis",overflow: "hidden",
maxWidth:"70%",
whiteSpace: "nowrap", }}>{data?.from}</div>  </a></td>
            <td className="p-3"><a  href={`/address/${data?.to}`} className="text-primary"><div style={{textOverflow: "ellipsis",overflow: "hidden",
maxWidth:"70%",
whiteSpace: "nowrap", }}> {data?.to} </div> </a></td>
            <td className="p-3"> {data?.value} Ether</td>
            {/* <td className="p-3"> {data?.gasPrice/1000000000000000000} ether </td> */}

        </tr>
    )
}

export default Table;