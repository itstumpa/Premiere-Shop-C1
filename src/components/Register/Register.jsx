import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
   getAdditionalUserInfo,
   updateProfile,
} from "firebase/auth";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase.init.js";
import Signup from "../../assets/Signup.png"
import { useAuth } from "../../contexts/AuthContext";


const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
 const { user, loading } = useAuth();


  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);


  const handleGoogleSignin = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
    const additionalUserInfo = getAdditionalUserInfo(result);
console.log('result', result)
  const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

                // create user in the database
                fetch('http://localhost:3000/users',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data)
                    })
 .catch((err) => console.error("DB save error:", err));
          
      
      if (additionalUserInfo?.isNewUser) {
       
        toast.success("Registration successful! Welcome!");
      } else {
      
        toast.info("This email is already registered. You've been logged in!");
      }
      
      navigate(from, { replace: true });
    })
    .catch((e) => {
      console.log(e);
      if (e.code === "auth/popup-closed-by-user") {
        toast.info("Sign-in cancelled.");
      } else if (e.code === "auth/account-exists-with-different-credential") {
        toast.error("An account already exists with this email using a different sign-in method.");
      } else {
        toast.error(e.message);
      }
    });
};


  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.Name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must include at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be minimum 8 characters."
      );
      return;
    }

    

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
      const user = res.user; 
      console.log("User created:", user);

      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });
        toast.success("Profile updated successfully!");
      } catch (err) {
        console.error("Profile update failed:", err);
        toast.error("User created but profile not updated");
      }

      navigate("/"); 
    })
      .catch((e) => {
        console.log(e);
        console.log(e.code);
        if (e.code === "auth/email-already-in-use") {
          toast.error("This email is already registered. Please login instead.");
        } else if (e.code === "auth/weak-password") {
          toast.error("At least 8 digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } 

  return (

    <div className="flex lg:flex-row gap-42  items-center justify-center my-30 ">
      
      {/* Image Section */}
      <div className="lg:flex justify-center items-center hidden">
        <img
          className="w-[200px] h-[150px] lg:w-[400px] md:h-[400px]"
          src={Signup}
          alt="Login illustration"
        />
      </div>
    
      {/* Form Section */}
      <div className="card bg-base-100 w-full max-w-xs md:max-w-md shrink-0 shadow-2xl md:w-1/2">
        <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register now!</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset relative">
            <label className="label">Name</label>
            <input
              type={"text"}
              name="Name"
               required
              className="input input-bordered w-full bg-blue-900/20 text-black placeholder:white/60 focus:outine-none focus:ring-2 focus:ring-blue-400"
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
               required
              className="input input-bordered w-full bg-blue-900/20 text-black placeholder:white/60 focus:outine-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            


            <label className="label">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              required
              className="input input-bordered w-full bg-blue-900/20 text-black placeholder:white/60 focus:outine-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
            <span
              onClick={() => setshow(!show)}
              className="absolute right-7 top-[175px] cursor-pointer z-50"
            >
              {show ? <Eye /> : <EyeClosed />}
            </span>
            <label htmlFor="photoURL" className="block mb-1 font-medium">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
             required
            className="input input-bordered w-full bg-blue-900/20 text-black placeholder:white/60 focus:outine-none focus:ring-2 focus:ring-blue-400"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter image URL"
          />
           
            <button type="submit" className="btn btn-neutral bg-violet-600 border-violet-700 mt-8 ">
              Register
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px w-16 bg-black/30"></div>
              <span className="text-sm text-black/70">or</span>
              <div className="h-px w-16 bg-black/30"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="btn bg-white text-black mt-4 border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Register with Google
            </button>
          </fieldset>
          
        </form>
        <p className="text-center">
          Already have an Account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800 underline font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
