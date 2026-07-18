import Navbar from "../components/Navbar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </>
  );
}

export default MainLayout;