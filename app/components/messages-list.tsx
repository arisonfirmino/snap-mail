import MessageItem from "@/app/components/message-item";

const MessagesList = () => {
  return (
    <div className="right-20 top-0 h-screen w-full space-y-5 xl:fixed xl:max-w-96 xl:border-x">
      <div className="hidden items-center justify-between border-b p-5 md:flex md:px-0 xl:px-5">
        <p className="text-base font-medium uppercase">Caixa de entrada</p>
      </div>

      <ul className="space-y-5 px-5 md:px-0 xl:px-5">
        <li>
          <MessageItem />
        </li>
      </ul>
    </div>
  );
};

export default MessagesList;
