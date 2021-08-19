import nc from "next-connect";
import { onError } from "../../utils";
import web3Agent from "../../web3Agent";

const handler = nc({ onError });

handler.get((req, res) => {

    const { hash, address } = req.query;

    const param = hash ? hash : address;

    web3Agent.eth.getTransaction(param)
        .then(data => {
            // console.log(data);
            return res.json({ status: "success", data: data })
        })
        .catch(err => {
            console.log(err.toString())
            return res.status(400).json({ status: 'error', message: err.toString() })
        })

});

export default handler;
