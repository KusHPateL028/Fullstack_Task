import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chatbot from './page/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/chat/:id" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
