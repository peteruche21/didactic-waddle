import { useDappStore } from "@client/utils/store";
import { useForm } from "react-hook-form";

interface IInputProps {
  wallet: string;
  contract?: string;
  tokenid?: string;
  tabNumber: number;
}

const Form = ({ tabNumber }: { tabNumber: number }) => {
  const connection = useDappStore((state) => state.connection);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInputProps>();

  const onSubmit = async (data: IInputProps) => {
    data.tabNumber = tabNumber;
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center flex-col space-y-5 max-w-md"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Delegate Wallet</span>
        </label>
        <input
          type="text"
          id="wallet"
          placeholder="Example, your Hot Wallet"
          className={`input input-bordered w-full max-w-xs ${
            errors.wallet && "border-red-500"
          }`}
          {...register("wallet", { required: true })}
        />
      </div>

      {tabNumber > 1 && (
        <div className="inline-flex gap-2 w-full">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Contract</span>
            </label>
            <input
              type="text"
              id="contract"
              placeholder={
                tabNumber === 2 ? "ERC20 Token contract" : "Address of the NFT"
              }
              className={`input input-bordered w-full max-w-xs ${
                errors.contract && "border-red-500"
              }`}
              {...register("contract", { required: tabNumber >= 2 })}
            />
          </div>
          {tabNumber > 2 && (
            <div className="form-control w-[30%]">
              <label className="label">
                <span className="label-text">Token ID</span>
              </label>
              <input
                type="text"
                id="tokenid"
                placeholder="#"
                className={`input input-bordered w-full max-w-xs ${
                  errors.tokenid && "border-red-500"
                }`}
                {...register("tokenid", { required: tabNumber === 3 })}
              />
            </div>
          )}
        </div>
      )}
      {connection?.isConnected ? (
        <button className="btn">Submit Delegation</button>
      ) : (
        <button className="btn disabled" disabled>
          Connect your vault first
        </button>
      )}
    </form>
  );
};

export default Form;
