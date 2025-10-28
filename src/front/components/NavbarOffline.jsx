import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavbarOffline = () => {
const navigate = useNavigate()
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<button onClick={()=>{return navigate('/')}}  className="navbar-brand transparent" href="#">JWT Proyect</button>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
							<li className="nav-item">
								<button className="btn btn-success" onClick={()=>{
									return navigate('/login')
								}}>Log in</button>
							</li>
							<li className="">
								<button className="btn btn-primary" onClick={()=>{
									return navigate('/register')
								}}>Sign up</button>
							</li>
							<li className="">
								<button className="btn btn-primary" onClick={()=>{
									return navigate('/')
								}}>Home</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};