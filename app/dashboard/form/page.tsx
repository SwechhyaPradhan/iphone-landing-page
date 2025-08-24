import React from 'react'
import AddFormPage from './addform/page'
import ProductTable from './showform/page'

const page = () => {
  return (
    <div className="p-6 space-y-6">
  <h1 className="text-2xl font-bold">Product Inventory</h1>

  <div className="">
      <AddFormPage />
    </div>

  {/* Table */}
  <ProductTable />
</div>
  )
}

export default page
