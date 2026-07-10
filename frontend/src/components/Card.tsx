import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`bg-slate-800 rounded-xl p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;