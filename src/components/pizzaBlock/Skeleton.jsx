import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
      speed={2}
      width={260}
      height={460}
      viewBox="0 0 260 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="285" rx="5" ry="5" width="240" height="90" /> 
      <rect x="0" y="390" rx="4" ry="4" width="85" height="30" /> 
      <rect x="120" y="390" rx="15" ry="15" width="120" height="38" /> 
      <rect x="0" y="240" rx="5" ry="5" width="240" height="25" /> 
      <circle cx="120" cy="110" r="110" />
    </ContentLoader>
  )

export default Skeleton;