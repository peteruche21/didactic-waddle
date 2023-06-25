import Blockies from "react-blockies";

export const AddrBlockies = ({ address }: { address: string }) => (
  <div className="w-7 overflow-hidden relative">
    <Blockies seed={address} size={10} scale={3} className="identicon" />
  </div>
);
