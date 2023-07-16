import { formatRelative, subDays } from "date-fns"
import { id } from "date-fns/locale"
import Link from "next/link"
import React from "react"
export default function MostRead({ most_popular }) {
    return (
        <div className="d-flex col-md-3 col-12 flex-column">
            <h4><strong>Banyak dibaca</strong></h4>
            <div className="d-flex flex-column pt-3">
                {most_popular?.map((e) => (
                    <Link key={e.id} href={`/blogs/${e.slug}`}><div  className="d-flex flex-column">
                        <h5 className="">{e.title}</h5>
                        <div className="d-flex flex-row">
                            <span className=""><i className="bi bi-clipboard2"></i> {e.category}</span>
                        </div>
                        <hr />
                    </div></Link>
                ))}
            </div>
        </div>
    )
}