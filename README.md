# Channel Loader Script

This script takes a channel from one ssai-cluster and adds it to multiple other clusters. That is espacially usefull in a multi-cluster setup.

Note: The cluster need to have the same URL. The only thing that is allowed to change is the ID. (see CLUSTER_URL_TEMPLATE below)

## Prerequisites

1. Install NodeJS
2. Fetch this script

```bash
  git clone 
```

3. Install Dependencies

```bash
  npm i
```

## Config and usage

Config params:

- CHANNEL_ID - ID of the channel that is available in the source cluster and that you want to insert or update in the otehr clusters
- USERNAME - User to access the channel-api of the source or target cluster
- PASSWORD - Password to access the channel-api of the source or target cluster
- CLUSTER_RANGE - Range of the clusters to update in the form of "first..last" (e.g. 1..5 will update the cluster 1 to 5 with the data from 0)
- CLUSTER_URL_TEMPLATE - A url that points to the channel-api endpoints of the clusters. The number defined in the range will be inserted at the placeholder "{}"

```bash
  CHANNEL_ID="8111626d-f697-4330-887a-f2be0b4f2127" \
  API_USER="nowtilus" \
  PASSWORD="your_cluster_api_password" \
  CLUSTER_RANGE="1..5" \
  CLUSTER_URL_TEMPLATE="http://api.ssai-{}.blabla.serverside.ai/channel-api/api/v1/channels" \
  node index.js
```
