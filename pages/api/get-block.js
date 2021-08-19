import nc from "next-connect";
import { onError } from "../../utils";
import web3Agent from "../../web3Agent";

const handler = nc({ onError });

handler.get((req, res) => {

    const { param } = req.query;

    web3Agent.eth.getBlock(param)
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
