import Header from "@/app/components/header/header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col px-5 pt-20 md:pt-[110px] xl:px-20">
      <Header />
      {children}
    </main>
  );
};

export default Container;
