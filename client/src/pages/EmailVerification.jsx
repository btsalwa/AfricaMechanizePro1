// import { useEffect, useState } from 'react';
// import { useLocation } from 'wouter';
// import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { apiRequest } from '@/lib/queryClient';

// export default function EmailVerification() {
//   const [, setLocation] = useLocation();
//   const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');

//     if (!token) {
//       setStatus('error');
//       setMessage('No verification token provided');
//       return;
//     }

//     const verifyEmail = async () => {
//       try {
//         const response = await apiRequest(`/api/auth/verify-email?token=${token}`);
//         setStatus('success');
//         setMessage(response.message);
//       } catch (error) {
//         setStatus('error');
//         setMessage(error.message || 'Verification failed');
//       }
//     };

//     verifyEmail();
//   }, []);

//   const handleContinue = () => {
//     if (status === 'success') {
//       setLocation('/login');
//     } else {
//       setLocation('/');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-green-800 mb-2">Africa Mechanize</h1>
//           <p className="text-green-600">Sustainable Agricultural Mechanization</p>
//         </div>
        
//         <Card className="w-full">
//           <CardHeader className="text-center space-y-4">
//             <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center">
//               {status === 'verifying' && (
//                 <div className="bg-blue-100">
//                   <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
//                 </div>
//               )}
//               {status === 'success' && (
//                 <div className="bg-green-100">
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 </div>
//               )}
//               {status === 'error' && (
//                 <div className="bg-red-100">
//                   <XCircle className="h-6 w-6 text-red-600" />
//                 </div>
//               )}
//             </div>
            
//             <CardTitle className="text-2xl font-bold">
//               {status === 'verifying' && 'Verifying Email...'}
//               {status === 'success' && 'Email Verified!'}
//               {status === 'error' && 'Verification Failed'}
//             </CardTitle>
            
//             <CardDescription>
//               {status === 'verifying' && 'Please wait while we verify your email address.'}
//               {message}
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent>
//             {status !== 'verifying' && (
//               <div className="space-y-4">
//                 {status === 'success' && (
//                   <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//                     <p className="text-sm text-green-800">
//                       Your email has been successfully verified! You can now sign in to your account 
//                       and access all features of Africa Mechanize.
//                     </p>
//                   </div>
//                 )}
                
//                 {status === 'error' && (
//                   <div className="p-4 bg-red-50 rounded-lg border border-red-200">
//                     <p className="text-sm text-red-800">
//                       The verification link may be invalid or expired. Please try registering again 
//                       or contact support if you continue to have issues.
//                     </p>
//                   </div>
//                 )}
                
//                 <Button 
//                   className="w-full" 
//                   onClick={handleContinue}
//                   data-testid="button-continue"
//                 >
//                   {status === 'success' ? 'Continue to Login' : 'Go to Homepage'}
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }