const url = "http://54.152.127.221/api"

async function getData(){
    let response = await fetch(url)
    let data = await response.json()
    console.log(data);

}
await getData()