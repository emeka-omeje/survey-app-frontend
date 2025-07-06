// import { useForm } from 'react-hook-form';

// type AuthCodeFormData = {
//   code: string;
// };

// const AuthCode = () => {
//   const { register, handleSubmit } = useForm<AuthCodeFormData>();

//   const onSubmit = (data: AuthCodeFormData) => {
//     console.log(data);
//     // Call API to verify the authentication code
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow rounded-md">
//         <h2 className="text-2xl font-bold text-gray-800 text-center">Verify Code</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Authentication Code</label>
//             <input
//               type="text"
//               {...register('code')}
//               required
//               className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Verify
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AuthCode;


// import styles from "./onboarding.module.css";

const AuthCode = () => {
  return (
    <div className="authcode-container">
      <form className="authcode-form">
        <h2>Verify Code</h2>
        <label htmlFor="code">Authentication Code</label>
        <input type="text" id="code" name="code" className="form-input" />

        <button type="submit" className="btn btn-primary">Verify</button>
      </form>
    </div>
  );
};

export default AuthCode;