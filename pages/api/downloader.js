// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function sendDownloadRequest(dataset_id, email) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return await fetch("http://172.17.11.216:8080/datasets/download?dataset_id="+dataset_id+"&email="+email).then(async (response) => {
    if (response.ok)
      return response.json()
    else {
      console.log(await response.json())
      return null
    }
  }).catch(e => {
    console.log("HH", e)
    return null
  });
}

export default async function handler(req, res) {
  const respD = await sendDownloadRequest(req.query.dataset_id, req.query.email)
  res.status(200).json(respD)
}
