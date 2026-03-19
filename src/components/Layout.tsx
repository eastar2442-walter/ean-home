import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Menu, X, Instagram, Youtube, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '회사소개', path: '/company' },
    { name: '공사분야', path: '/construction' },
    { name: '포트폴리오', path: '/portfolio' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter leading-none">(주)이안정보통신</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">EAN INFO & COMM</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  ADMIN
                </Link>
              )}
              <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
                견적 문의
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-primary text-white py-4 rounded-lg font-bold mt-4"
              >
                견적 문의하기
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="text-primary w-6 h-6" />
                <span className="text-xl font-bold tracking-tighter">(주)이안정보통신</span>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed mb-8">
                최첨단 보안 시스템 구축과 안정적인 네트워크 인프라를 통해 고객의 안전과 가치를 실현합니다. 
                CCTV 설치부터 네트워크 공사, 출입통제 시스템까지 전문가의 통합 솔루션을 경험하세요.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">공사분야</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link to="/construction" className="hover:text-primary">CCTV 보안 시스템</Link></li>
                <li><Link to="/construction" className="hover:text-primary">네트워크 구축</Link></li>
                <li><Link to="/construction" className="hover:text-primary">출입통제 시스템</Link></li>
                <li><Link to="/construction" className="hover:text-primary">유지보수 및 컨설팅</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">고객지원</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link to="/company" className="hover:text-primary">회사소개</Link></li>
                <li><Link to="/portfolio" className="hover:text-primary">포트폴리오</Link></li>
                <li><Link to="/contact" className="hover:text-primary">견적 문의</Link></li>
                <li><Link to="/admin" className="hover:text-primary">관리자 로그인</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span>사업자등록번호: 589-87-02900</span>
              <span>대표: 권민수</span>
              <span>주소: 경기도 오산시 밀머리로 64, 다짐프라자 310호</span>
              <span>전화: 031-375-8230</span>
            </div>
            <p>© 2026 (주)이안정보통신. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
