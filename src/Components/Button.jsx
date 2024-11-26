function Button({ text, icon, onClick }) {
  return (
      <button
          className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold flex items-center justify-center rounded-full" 
          style={{
              width: '200px',   
              height: '60px',  
              padding: '0',     
          }}
          onClick={onClick} 
      >
          {icon && (
              <img
                  src={icon}
                  alt={text}
                  style={{
                      width: '30px',  
                      height: '30px', 
                      marginRight: '8px',
                      marginLeft: '10px'
                  }}
              />
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
              {text}
          </div>
      </button>
  );
}

export default Button;
