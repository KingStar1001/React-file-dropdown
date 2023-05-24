import React, { useRef, useState, useCallback } from 'react'

import { NoteIcon, FileIcon } from 'components/SVGIcons'

const Dropbox = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([])

  const ref = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    ref.current?.click()
  }

  const handleFiles = useCallback((files: any) => {
    setSelectedFiles((prevArray: any) => [...prevArray, files[0]])
  }, [])

  const dragOver = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault()
  }, [])

  const dragEnter = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault()
  }, [])

  const dragLeave = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault()
  }, [])

  const fileDrop = useCallback(
    (e: { preventDefault: () => void; dataTransfer: { files: any } }) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length) {
        handleFiles(files)
      }
    },
    [handleFiles]
  )

  const filesSelected = useCallback(() => {
    if (ref.current?.files?.length) {
      handleFiles(ref.current.files)
    }
  }, [handleFiles])

  const fileType = useCallback((fileName: any) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName
  }, [])

  const fileSize = useCallback((size: any) => {
    if (size === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(size) / Math.log(k))
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  const removeFile = useCallback(
    (name: string) => {
      const selectedFileIndex = selectedFiles.findIndex((e: any) => e.name === name)
      selectedFiles.splice(selectedFileIndex, 1)
      // update selectedFiles array
      setSelectedFiles([...selectedFiles])
    },
    [selectedFiles]
  )

  return (
    <div>
      <div className="bg-[#A7E0CF] w-[670px] rounded-xl p-1 mx-4">
        <div className="border-2 border-dotted rounded-xl border-[#1A2741] p-4 flex items-center justify-center">
          <div onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop}>
            <div className="text-[22px] leading-[145%] text-center text-[#1A2741] max-w-[420px]">
              Add file to check container or start signing by uploading documents
            </div>
            <input type="file" className="hidden" ref={ref} onChange={filesSelected} />
            <button
              className="my-4 border-2 border-[#1A2741] rounded-[6px] py-2.5 px-7 flex items-center gap-2 mx-auto group hover:bg-[#1A2741]"
              onClick={handleClick}
            >
              <NoteIcon className="fill-[#28AB82]" />
              <p className="text-[22px] font-bold leading-[26px] text-[#1A2741] group-hover:text-white">Add file(s)</p>
            </button>
            <div className="text-[#1A2741] text-center">or drop document(s) here</div>
          </div>
        </div>
      </div>
      <div className="mx-4">
        {selectedFiles.map((data: any, i: number) => (
          <div className="relative flex mt-2 mb-4" key={i}>
            <div>
              <FileIcon className="absolute fill-gray-500" />
              <div className="text-xs z-10 leading-none mt-6 px-1 ml-2 text-white uppercase bg-[#0080C8] rounded inline-block">
                {fileType(data.name)}
              </div>
              <span className={`ml-6 text-[#4aa1f3] inline-block ${data.invalid ? '!text-[#9aa9bb]' : ''}`}>{data.name}</span>
              <span className="text-[#30693D] mt-2 ml-2 mr-1 font-bold text-sm inline-block">({fileSize(data.size)})</span>{' '}
            </div>
            <div className="absolute text-red-700 cursor-pointer top-4 right-2 first-letter" onClick={() => removeFile(data.name)}>
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropbox
