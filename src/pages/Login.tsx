import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { Shield, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다. 관리자 계정인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100"
      >
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Shield className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">관리자 로그인</h1>
        <p className="text-gray-500 mb-10">웹사이트 콘텐츠 관리를 위해 로그인하세요.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              <span>Google 계정으로 로그인</span>
            </>
          )}
        </button>

        <p className="mt-8 text-xs text-gray-400">
          관리자 권한이 있는 계정만 접근 가능합니다.<br />
          권한 문의: eomtaemi35@gmail.com
        </p>
      </motion.div>
    </div>
  );
}
