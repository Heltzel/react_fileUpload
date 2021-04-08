import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

function FileUpload() {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Bestand kiezen')
  const [uploadedFile, setUploadedFile] = useState({})

  const onChangeHandler = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('file', file)

    try {
      const res = await axios.post('/upload', formdata, {
        'Content-Type': 'multipart/form-data',
      })
      const { fileName, filePath } = res.data
      setUploadedFile({ fileName, filePath })
    } catch (error) {
      if (error.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(error.response.data.msg)
      }
    }
    setFileName('Bestand kiezen')
  }

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Form.File
          id="customFile"
          label={fileName}
          data-browse="Bestand kiezen"
          custom
          onChange={onChangeHandler}
        />

        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="mt-4"
          block
        >
          Uploaden
        </Button>
      </Form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-12 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            {/* <img
              style={{ width: '100%' }}
              src={typeof file != undefined && uploadedFile.filePath}
              alt=""
            /> */}
            <object
              data={uploadedFile.filePath}
              type="application/pdf"
              style={{ objectFit: 'contain', width: '100%', height: '970px' }}
            >
              <p>Sorry, something went wrong.</p>
            </object>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default FileUpload
