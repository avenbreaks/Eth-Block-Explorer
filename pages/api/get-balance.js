import nc from "next-connect";
import { onError } from "../../utils";
import web3Agent from "../../web3Agent";

const handler = nc({ onError });

handler.get((req, res) => {

    const { address } = req.query;

    web3Agent.eth.getBalance(address)
        .then(data => {
            // console.log(data);
            return res.json({ status: "success", data: `${data/1000000000000000000} Ether` })
        })
        .catch(err => {
            console.log(err.toString())
            return res.status(400).json({ status: 'error', message: err.toString() })
        })

});

export default handler;
