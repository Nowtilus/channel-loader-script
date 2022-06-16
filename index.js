import fetch from "node-fetch";
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Loading Config
const ids = process.env.CHANNEL_ID
if(!ids) throw new Error('CHANNEL_ID is not set')
const password = process.env.PASSWORD
if(!password) throw new Error('PASSWORD is not set')
const username = process.env.API_USER
if(!username) throw new Error('API_USER is not set')
const clusterRange = process.env.CLUSTER_RANGE.split('..') // 1..5
if(!clusterRange || clusterRange.length !== 2) throw new Error('USERNAME is not set')
const firstCluster = clusterRange[0]
const lastCluster = clusterRange[1]

const clusterUrlTemplate = process.env.CLUSTER_URL_TEMPLATE // http://api.ssai-{}.serverside.ai/blablabla
if(!clusterUrlTemplate) throw new Error('USERNAME is not set')

const sourceUrl = clusterUrlTemplate.replace('{}', '0')

// console.log(channelId, password, username, clusterRange, clusterUrlTemplate, sourceUrl)

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
}

function loadChannel () {
  run()
}

const channeIds = ids.split(",")

async function run () {
  for (const channelId of channeIds) {    
    console.log('UPDATING CHANNEL:', channelId)
    try {
      console.log(sourceUrl + '/' + channelId)
      const response = await fetch(sourceUrl + '/' + channelId, {
        method: 'GET', 
        headers
      })
      if(response.status !== 200) throw new Error('Failed to get channel: ' + response.status)
      const channel = await response.json()
      console.log('LOADED CHANNEL:', JSON.stringify(channel))
      
      for(let i = firstCluster; i <= lastCluster; i++) {
        const clusterUrl = clusterUrlTemplate.replace('{}', i)
        
        console.log('UPDATING CLUSTER:', clusterUrl)
  
        const deleteResponse = await fetch(clusterUrl + '/' + channelId, {
          method: 'DELETE',
          headers
        })
        if(![200,404].includes(deleteResponse.status)) throw new Error('Failed to delete channel: ' + deleteResponse.status)
        console.log('DELETED:', channelId)
  
        await sleep(2000)
        
        const createResponse = await fetch(clusterUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(channel),
        })
        if(createResponse.status !== 201) throw new Error('Failed to create channel: ' + createResponse.status)
        const data = await createResponse.json()
        console.log('UPDATED CHANNEL IN CLUSTER:', clusterUrl)
        
        await sleep(2000)
        const enableResponse = await fetch(clusterUrl + '/' + channelId, {
          method: 'POST',
          headers,
          body: JSON.stringify({"state": "enabled"}),
        })
        const enableData = await enableResponse.text()
        if(enableResponse.status !== 200) throw new Error('Failed to enable channel: ' + enableResponse.status + ' - ' + enableData)
        console.log('ENABLED CHANNEL IN CLUSTER:', clusterUrl)
  
        // console.log('Waiting 10s For Channel to be created ...')
        // await sleep(30000)
        // // Check if it's playing
        // // https://live.ssai-" + std::to_string(num) + ".jio.serverside.ai" + path
        // const avilCheckUrl = "https://live.ssai-" + i + ".jio.serverside.ai/view/" + channelId + '?api-key=' + channel.apiKey
        // console.log(avilCheckUrl)
        // console.log("https://live.jioreel.com/view/" + channelId + '?api-key=' + channel.apiKey)
        // const avilCheckResponse = await fetch(avilCheckUrl, {
        //   method: 'POST',
        //   headers,
        //   body: JSON.stringify({"state": "enabled"}),
        // })
        // const avilCheckData = await avilCheckResponse.text()
        // if(![200,401].includes(avilCheckData.status)) throw new Error('Channel not available: ' + avilCheckData.status + ' - ' + avilCheckData)
        // console.log('CHANNEL IS AVAILABLE!')
      }
  
      console.log('FINISHED UPDATING ALL CLUSTERS')
    } catch (e) {
      console.error(e)
    }
  }
}

run()