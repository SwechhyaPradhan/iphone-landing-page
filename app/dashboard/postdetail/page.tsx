import React from 'react'
import AddPostPage from './addpostdetail/page'
import ShowPostPage from './showpostdetail/page'


const page = () => {
    return (
      <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Post Details</h1>
  
    <div className="">
        <AddPostPage />
      </div>
  
    {/* Table */}
    <ShowPostPage />
  </div>
    )
  }
  
  export default page