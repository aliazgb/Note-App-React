type MessageProps = {
  children: React.ReactNode;
};

function Message({ children }: MessageProps) {
  return <div>{children}</div>;
}

export default Message;

