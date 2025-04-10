import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutBtn = () => {
	// const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{true ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer'  />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutBtn;
