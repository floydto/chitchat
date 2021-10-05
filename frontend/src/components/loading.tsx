import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Loader } from 'semantic-ui-react'
import "../css/loading.css"

const Loading = () => {
  return(
    <Dimmer active>
      <Loader size="huge" content={"Preparing Chat..."} />
    </Dimmer>
    )
}

export default Loading