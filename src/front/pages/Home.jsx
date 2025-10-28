import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { user } from "../api/user.js";

export const Home = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	const userCall = async () => {
		const data = await user()
		console.log(data)
		console.log(data.status)
		if(data.status == 200){
			dispatch({type: "userOnline"})
		}
		if(data.status == 401){
			dispatch({type: "userOffline"})
		}
	}

	useEffect(() => {
		userCall()

	}, [])




	return (
		<>
			<div className="blurredTop home"></div>

			<div className="body d-flex justify-content-evenly align-items-center">
				<div className="row text-center container m-3">
					<div className="col">
						<button className="btn btn-success" onClick={()=>{ 
							return navigate('/login')}}>Log in</button>

					</div>
					<div className="col">
						<button className='btn btn-primary' onClick={() => {
							return navigate('/register')
						}}>Register</button>
					</div>

				</div>
			</div>
			<div className="blurredBottom home"></div>
		</>
	);
}; 