import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../contexts/ThemeContext";

function Chatbot() {
    const { theme } = useTheme();
    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
}

export default Chatbot;