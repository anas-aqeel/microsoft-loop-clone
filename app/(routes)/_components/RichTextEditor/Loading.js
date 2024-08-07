import React from 'react'

const Loading = () => {
  return (
    <div className="animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
  </div>
  )
}

export default Loading