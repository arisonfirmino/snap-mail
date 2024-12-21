import Header from "@/app/components/header/header";
import MessagesList from "@/app/components/messages-list";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col px-5 pt-20 md:pt-[110px] xl:px-20">
      <Header />
      <div className="hidden md:flex">
        <MessagesList />
      </div>
      {children}
    </main>
  );
};

export default Container;
