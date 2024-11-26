

function TextInput({ inputValue, onInputChange }) {
    return (
        <div className="flex flex-col items-center mt-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-md p-2 w-full max-w-md"> {/* Container for the textarea */}
                <textarea
                    rows="4" // Number of rows in the textarea
                    className="w-full bg-transparent text-white placeholder-white resize-none p-0 outline-none" // Full-width, transparent, no padding, and no outline
                    placeholder="Enter your mood..." 
                    value={inputValue}  // Controlled input value
                    onChange={onInputChange} 
                    style={{ textAlign: 'left', border: 'none', margin: 0 }} // Ensure text is left-aligned, no border, and no margin
                />
            </div>
            
        </div>
    );
}

export default TextInput;
