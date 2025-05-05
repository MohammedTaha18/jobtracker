import { userData,changeValues,islogged,Loading} from "./authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { asyncLogin } from "./authSlice";
import { useEffect } from "react";
import { Audio } from 'react-loader-spinner';
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(Loading)
  const {state} = useLocation()
  const isLoggedIn = useSelector(islogged)
  const {email,name} = useSelector(userData)
  const handleChange = (field) => (e) => {
    dispatch(changeValues({ field, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all fields');
      return;
    }
    try {
      await dispatch(asyncLogin({ email, name })).unwrap();
      navigate(state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      toast.error(`${err}: try logging again`, { autoClose: 1000 });
    }
  };
  



  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Logged in successfully!", { autoClose: 1000 });
      navigate(state?.from?.pathname || '/', { replace: true });
    }
  }, [isLoggedIn, navigate, state]);

  
  if(isLoading){
    return ( <div className="d-flex justify-content-center align-items-center vh-100">
         <Audio
           height="80"
           width="80"
           radius="9"
           color="black"
           ariaLabel="loading"
         />
       </div>)
   }

  return(
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={handleChange("name")}
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    id="email"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;