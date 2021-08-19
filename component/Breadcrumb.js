import { useRouter } from "next/dist/client/router";
import React, { useState } from "react"


export default function Breadcrumb({name ="", value = ""}) {

    const [filterBy, setFilterBy] = useState("address");
    const [query, setQuery] = useState();
    const router = useRouter();

    const handleResolveSearch = (e) => {
        e.preventDefault();
        router.push(`/${filterBy}/${query}`);
    }

    return (
        <>
            <div className="Breadcrumb pt-5">
                <div className="col-10 mx-auto">
                    <label className="sr-only mb-2 text-white" htmlFor="inlineFormInputGroup">
                       <a href="/" > The Ehtereum Blockchain Explorer </a>
                    </label>
                    <form onSubmit={handleResolveSearch}>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <select onChange={(e) => setFilterBy(e.target.value)} className="input-group-text">
                                    <option value="address">
                                        address
                                    </option>
                                    <option value="block">
                                        block
                                    </option>
                                    <option value="tx">
                                        transaction
                                    </option>
                                </select>
                            </div>
                            <input
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup"
                                placeholder="search address, blockNumber, block Hash, transaction Hash ...."
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">@</div>
                            </div>
                        </div>
                    </form>

                    <h3 className="text-white pt-3 pb-2"># {name}: {value}</h3>
                </div>
            </div>

        </>
    )
}