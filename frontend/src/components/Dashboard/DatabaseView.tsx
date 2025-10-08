import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react';
import type { Bucket, BucketRecord } from '../../utils/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRecordInBucket } from '../../utils/hooks';
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import {  ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus } from 'lucide-react'  
import { formatDistanceToNow } from 'date-fns';
import { HashLoader } from "react-spinners";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postRecordInBucket } from '../../utils/hooks';

interface DatabaseViewProps {
  bucket: Bucket
  onBack: () => void
}

export function DatabaseView({bucket, onBack}: DatabaseViewProps ) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { data: records = [], isLoading } = useQuery<BucketRecord[]>({
    queryKey: ['records', bucket.id],
    queryFn: () => getRecordInBucket(bucket.id), 
    retry: false,
    refetchOnWindowFocus: false
  })
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const recordSubmitMutation = postRecordInBucket();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData)
    recordSubmitMutation.mutate({ id: bucket.id, data: formData }, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({queryKey:['records']});
      },
    });
  };

  const columnHelper = createColumnHelper<BucketRecord>();

  const dynamicColumns = bucket.fieldSchema.fields.map(field => 
    columnHelper.accessor(
      (row) => row.data[field.fieldName], 
      {
        id: field.fieldName, 
        header: field.fieldName, 
        cell: info => {
          const value = info.getValue();
          if (!value) return <span className="text-gray-400">-</span>;
          if (field.fieldType === 'date' && value) {
            return new Date(value).toLocaleDateString();
          }
          if (field.fieldType === 'url' && value) {
            return <a href={value} rel="noopener noreferrer" target="_blank" className='text-blue-600'>Link</a>;
          }
          if (field.fieldType === 'number') {
            return <span className="text-gray-700">{value}</span>;
          }
          
          return <span className="text-gray-700">{value}</span>;
        }
      }
    )
  );

  const columns = [ ...dynamicColumns];

  const table = useReactTable({
    data: records,
    columns: columns, 
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 sm:p-6">
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto'>
          <button 
            onClick={onBack} 
            className='flex flex-row items-center justify-center gap-2 bg-transparent text-[#030213] font-semibold py-2 px-4 rounded-xl text-sm sm:text-base whitespace-nowrap'
          >
            <ArrowLeft className="h-4 w-4" />
            Back to buckets
          </button>

          <div className='w-full sm:w-auto'>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bucket.name}</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Updated {formatDistanceToNow(new Date(bucket.updatedAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className='flex flex-row items-center justify-center gap-2 bg-[#030213] hover:bg-[#1f1f46] text-white font-semibold py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto rounded-xl' onClick={handleClickOpen}>
            <Plus className="h-4 w-4" />
            Add Record
          </button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Record </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new record to {bucket.name} by filling out the form below.
          </DialogContentText>
          <form id='record-form' onSubmit={handleSubmit}>
            {bucket.fieldSchema.fields.map((field) => (
              <div key={field.fieldName} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">{field.fieldName}</label>
                <input
                  type={
                    field.fieldType === 'date' ? 'date' :
                    field.fieldType === 'number' ? 'number' :
                    field.fieldType === 'url' ? 'url' :
                    'text'
                  }
                  name={field.fieldName}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
              </div>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="bg-[#030213] text-white py-2 px-4 rounded-md hover:bg-[#1f1f46]/80">
            Close
          </button>
          <button type='submit' form='record-form' className="bg-[#030213] text-white py-2 px-4 rounded-md hover:bg-[#1f1f46]/80">
            Submit
          </button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      <div className="rounded-lg overflow-hidden bg-white shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <HashLoader color="#030213" size={50} />
            <p className="text-gray-600 mt-4 text-sm font-medium">Loading your records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <div className="ext-sm sm:text-base lg:text-lg mb-2">No records yet. Click "Add Record" to create your first entry</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm bg-[#030213] hover:bg-[#1f1f46] text-white border font-medium rounded-xl transition-colors w-full sm:w-auto" onClick={handleClickOpen}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                </button>
              </div>
            </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th 
                        key={header.id}
                        className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td 
                        key={cell.id}
                        className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <span className='mr-2'>
            Items per page
          </span>
          <select className='border border-gray-300 rounded-md shadow-sm focus:ring-[#030213] focus:border-[#030213] p-2'
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          >
            {[10, 20, 30].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-2'>
            <button className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-[#030213] disabled:opacity-50'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={20} />
            </button>

            <button className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 text-[#030213] disabled:opacity-50'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={20} />
            </button>

            <span className='flex items-center'>
              <input className='w-16 p-2 rounded-md border border-gray-300 text-center'
              min={1}
              max={table.getPageCount()}
              type='number'
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0; table.setPageIndex(page)
              }}
              />
              <span className='ml-1'>of {table.getPageCount()}</span>
            </span>

            <button className='p-2 rounded-md bg-ray-200 hover:bg-gray-300 text-[#030213] disabled:opacity-50'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={20} />
            </button>

            <button className='p-2 rounded-md bg-ray-200 hover:bg-gray-300 text-[#030213] disabled:opacity-50'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={20} />
            </button>
        </div>
      </div>
    </div>
  )
}