

function TextInput({ inputValue, onInputChange }) {
    return (
        <div className="flex flex-col items-center mt-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-md p-2 w-full max-w-md">
                <textarea
                    rows="4"
                    className="w-full bg-transparent text-white placeholder-white resize-none p-0 outline-none"
                    placeholder="Enter your mood..." 
                    value={inputValue}
                    onChange={onInputChange} 
                    style={{ textAlign: 'left', border: 'none', margin: 0 }}
                />
            </div>
            
        </div>
    );
}

export default TextInput;
