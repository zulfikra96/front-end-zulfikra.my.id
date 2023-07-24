import React from "react"
export async function getServerSideProps() {

    setTimeout(async () => {
        const apify = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        fetch(`${process.env.LOCAL_BASE_URL}/analytics/visitors`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            path: "/notfound",
            ip:apify.ip
          })
        })
      })
    return {
        props: {
            
        }
    }
}
export default function Notfound() {
    return (
        <div>
            <h3>404 not found</h3>
        </div>
    )
}