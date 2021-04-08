// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaReact } from 'react-icons/fa'
import FileUpload from './components/FileUpload'
function App() {
  return (
    <div className="container mt-4">
      <div className="display-4 text-center mb-4">
        <FaReact /> React File Upload
      </div>
      <FileUpload />
    </div>
  )
}

export default App
