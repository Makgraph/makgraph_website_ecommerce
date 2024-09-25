const Message = ({ variant, children }) => {
    return <div className={`px-4 py-2 rounded ${variant}`}>{children}</div>;
  };
  
  Message.defaultProps = {
    variant: "bg-[#dbeafe] text-[#1e40af]", // Défaut variant Tailwind CSS
  };
  
  export default Message;