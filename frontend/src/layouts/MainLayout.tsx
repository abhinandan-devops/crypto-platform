import Navbar from "../components/Navbar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "30px",
        }}
      >
        {children}
      </main>
    </>
  );
}

export default MainLayout;